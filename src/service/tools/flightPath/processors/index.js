import Handlebars from 'handlebars';

import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

import BaseService from '@thzero/library_client/service/index';

class FlightPathProcessorService extends BaseService {
	constructor() {
		super();

		this._templateMain = null;
		this._templatePinLaunch = null;
		this._templatePinsAdditional = null;
		this._templatePinTouchdown = null;
	}

	get id() {
		throw Error('Not Implemented');
	}

	get data() {
		return this._data;
	}

	process(correlationId, engine, results, data, measurementUnits, templateMain, templatePinLaunch, templatePinTouchdown, templatePinsAdditional) {
		this._enforceNotNull('FlightPathProcessorService', 'process', engine, 'engine', correlationId);
		this._enforceNotNull('FlightPathProcessorService', 'process', results, 'results', correlationId);
		this._enforceNotNull('FlightPathProcessorService', 'process', data, 'data', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits, 'measurementUnits', correlationId);
		
		let response = this._setTemplateMain(correlationId, engine, templateMain);
		if (this._hasFailed(response))
			return response;
		response = this._setTemplatePinLaunch(correlationId, engine, templatePinLaunch);
		if (this._hasFailed(response))
			return response;
		response = this._setTemplatePinTouchdown(correlationId, engine, templatePinTouchdown);
		if (this._hasFailed(response))
			return response;
		this._setTemplatePinsAdditional(correlationId, engine, templatePinsAdditional);
		if (this._hasFailed(response))
			return response;

		this._data = new FlightPath();

		const responseProcessData = this._processData(correlationId, data);
		if (this._hasFailed(responseProcessData))
			return responseProcessData;

		const responseProcessDataSort = this._processDataSort(correlationId);
		if (this._hasFailed(responseProcessDataSort))
			return responseProcessDataSort;

		if (responseProcessDataSort.results && LibraryUtility.isFunction(responseProcessDataSort.results))
			this._data.sort(responseProcessDataSort.results);

		const responseProcessDataPost = this._processDataPost(correlationId);
		if (this._hasFailed(responseProcessDataPost))
			return responseProcessDataPost;

		const path = [];
		const divisor = (measurementUnits === Constants.MeasurementUnits.english.id ? 3.281 : 1);
		let previous = null;
		let temp = this._data.rows.shift();
		results.launch = `${temp.longitude},${temp.latitude}`;
		while (temp) {
			previous = temp;
			path.push(`${temp.longitude},${temp.latitude},${this._round(temp.altitude / divisor)}`);
			temp = this._data.rows.shift();
			if (!temp)
				results.touchdown = `${previous.longitude},${previous.latitude}`;
		}

		results.coords = path;
		results.flightPath = this._kml(correlationId, results, path.join('\n'));

		return this._successResponse(results, correlationId);
	}

	_kml(correlationId, flightInfo, data) {
		this._enforceNotNull('FlightPathProcessorService', '_kml', flightInfo, 'flightInfo', correlationId);
		this._enforceNotNull('FlightPathProcessorService', '_kml', data, 'data', correlationId);

		flightInfo.style.path.flight.color = this._reverseRgb(flightInfo.style.path.flight.color);
		flightInfo.style.path.ground.color = this._reverseRgb(flightInfo.style.path.ground.color);
		flightInfo.style.pin.launch.color = this._reverseRgb(flightInfo.style.pin.launch.color);
		flightInfo.style.pin.touchdown.color = this._reverseRgb(flightInfo.style.pin.touchdown.color);

		flightInfo.translations = {};
		flightInfo.translations.launch = GlobalUtility.$trans.t('forms.content.tools.flightPath.launch');
		flightInfo.translations.touchdown = GlobalUtility.$trans.t('forms.content.tools.flightPath.touchdown');
		flightInfo.translations.flightPath = GlobalUtility.$trans.t('forms.content.tools.flightPath.flightPath');
		flightInfo.translations.groundPath = GlobalUtility.$trans.t('forms.content.tools.flightPath.groundPath');

		flightInfo.description = '';
		if (flightInfo.date || flightInfo.location) {
			const temp2 = [];
			if (flightInfo.date)
				temp2.push(flightInfo.date.toLocaleString());
			if (flightInfo.location) {
				temp2.push('@');
				temp2.push(flightInfo.location);
			}
			flightInfo.description = `<description><![CDATA[${temp2.join(' ')}]]></description>`;
		}

		flightInfo.titleFull = flightInfo.title;
		if (String.isNullOrEmpty(flightInfo.title))
			flightInfo.titleFull = '';
		if (!String.isNullOrEmpty(flightInfo.titleFull))
			flightInfo.titleFull += ' ';
		flightInfo.titleFull += flightInfo.translations.flightPath;

		flightInfo.pins = '';
		if (flightInfo.launch) {
// 			pins += `
// 			<Placemark>
// 				<name><![CDATA[${flightInfo.translations.launch}]]></name>
// 				<Style id="normalPlacemark">
// 					<IconStyle>
// 						<color>ff${flightInfo.style.pin.launch.color}</color>
// 					</IconStyle>
// 				</Style>
// 				<Point>
// 					<coordinates>
// ${flightInfo.launch}
// 					</coordinates>
// 				</Point>
// 			</Placemark>`;
			flightInfo.pins += this._templatePinLaunch({ flightInfo: flightInfo });
		}
		if (flightInfo.touchdown) {
// 			pins += `
// 			<Placemark>
// 				<name><![CDATA[${flightInfo.translations.touchdown}]]></name>
// 				<Style id="normalPlacemark">
// 					<IconStyle>
// 						<color>ff${flightInfo.style.pin.touchdown.color}</color>
// 					</IconStyle>
// 				</Style>
// 				<Point>
// 					<coordinates>
// ${flightInfo.touchdown}
// 					</coordinates>
// 				</Point>
// 			</Placemark>`;
			flightInfo.pins += this._templatePinTouchdown({ flightInfo: flightInfo });
		}
		if (this._templatePinsAdditional)
			flightInfo.pins += this._templatePinsAdditional({ flightInfo: flightInfo });

// 		return `<?xml version="1.0" encoding="UTF-8"?>
// <kml xmlns="http://www.opengis.net/kml/2.2">
// 	<Document>
// 		<name><![CDATA[${flightInfo.titleFull}]]></name>
// 		${flightInfo.description}
// 		<visibility>1</visibility>
// 		<open>1</open>
// 		<Folder id="Tracks">
// 			<name>Tracks</name>
// 			<visibility>1</visibility>
// 			<open>0</open>${pins}
// 			<Placemark>
// 				<name><![CDATA[${flightInfo.translations.flightPath}]]></name>
// 				<Style>
// 					<LineStyle>
// 						<color>ff${flightInfo.style.path.flight.color}</color>
// 						<width>4</width>
// 					</LineStyle>
// 				</Style>
// 				<MultiGeometry>
// 					<LineString>
// 						<tessellate>0</tessellate>
// 						<altitudeMode>absolute</altitudeMode>
// 						<coordinates>
// ${flightInfo.coords}
// 						</coordinates>
// 					</LineString>
// 				</MultiGeometry>
// 			</Placemark>
// 			<Placemark>
// 				<name><![CDATA[${flightInfo.translations.groundPath}]]></name>
// 				<Style>
// 					<LineStyle>
// 						<color>ff${flightInfo.style.path.ground.color}</color>
// 						<width>4</width>
// 					</LineStyle>
// 				</Style>
// 				<MultiGeometry>
// 					<LineString>
// 						<tessellate>0</tessellate>
// 						<altitudeMode>clampToGround</altitudeMode>
// 						<coordinates>
// ${flightInfo.coords}
// 						</coordinates>
// 					</LineString>
// 				</MultiGeometry>
// 			</Placemark>
// 		</Folder>
// 	</Document>
// </kml>`;
		return this._templateMain({ flightInfo: flightInfo });
	}

	_processData(correlationId, input) {
		throw Error('Not Implemented');
	}

	_processDataPost(correlationId) {
		this._data.process(correlationId);
		return this._success(correlationId);
	}

	_processDataSort(correlationId) {
		return this._success(correlationId);
	}

	_publish(correlationId, time, altitude, altitudeF, velocity, velocityF, apogee, noseOver, drogue, main, ground) {
		this._data.publish(correlationId, time, altitude, altitudeF, velocity, velocityF, apogee, noseOver, drogue, main, ground);
	}

	_round(value, places = 2) {
		return Number(value.toFixed(places));
	}

	_reverseRgb(str) {
		return str.replace('#', '').split('').reverse().join('');
	}

	_setTemplate(correlationId, template, defaultTemplate) {
		try {
			template = !String.isNullOrEmpty(template) ? template : defaultTemplate;
			template = Handlebars.compile(template);
			return this._successResponse(template, correlationId);
		}
		catch(err) {
			return this._error('FlightPathProcessorService', '_setTemplate', null, err, null, null, correlationId);
		}
	}

	_setTemplateMain(correlationId, engine, template) {
		// const response = this._setTemplate(correlationId, template, `<?xml version="1.0" encoding="UTF-8"?>
		// <kml xmlns="http://www.opengis.net/kml/2.2">
		// 	<Document>
		// 		<name><![CDATA[{{flightInfo.titleFull}}]]></name>
		// 		{{flightInfo.description}}
		// 		<visibility>1</visibility>
		// 		<open>1</open>
		// 		<Folder id="Tracks">
		// 			<name>Tracks</name>
		// 			<visibility>1</visibility>
		// 			<open>0</open>{{{flightInfo.pins}}}
		// 			<Placemark>
		// 				<name><![CDATA[{{flightInfo.translations.flightPath}}]]></name>
		// 				<Style>
		// 					<LineStyle>
		// 						<color>ff{{flightInfo.style.path.flight.color}}</color>
		// 						<width>4</width>
		// 					</LineStyle>
		// 				</Style>
		// 				<MultiGeometry>
		// 					<LineString>
		// 						<tessellate>0</tessellate>
		// 						<altitudeMode>absolute</altitudeMode>
		// 						<coordinates>
		// {{flightInfo.coords}}
		// 						</coordinates>
		// 					</LineString>
		// 				</MultiGeometry>
		// 			</Placemark>
		// 			<Placemark>
		// 				<name><![CDATA[{{flightInfo.translations.groundPath}}]]></name>
		// 				<Style>
		// 					<LineStyle>
		// 						<color>ff{{flightInfo.style.path.ground.color}}</color>
		// 						<width>4</width>
		// 					</LineStyle>
		// 				</Style>
		// 				<MultiGeometry>
		// 					<LineString>
		// 						<tessellate>0</tessellate>
		// 						<altitudeMode>clampToGround</altitudeMode>
		// 						<coordinates>
		// {{flightInfo.coords}}
		// 						</coordinates>
		// 					</LineString>
		// 				</MultiGeometry>
		// 			</Placemark>
		// 		</Folder>
		// 	</Document>
		// </kml>`);
		const response = this._setTemplate(correlationId, template, engine.defaultTemplateMain);
		if (this._hasFailed(response))
			return response;

		this._templateMain = response.results;
		return this._success(correlationId);
	}

	_setTemplatePinLaunch(correlationId, engine, template) {
// 		const response = this._setTemplate(correlationId, template, `
// 		<Placemark>
// 			<name><![CDATA[{{flightInfo.translations.touchdown}}]]></name>
// 			<Style id="normalPlacemark">
// 				<IconStyle>
// 					<color>ff{{flightInfo.style.pin.touchdown.color}}</color>
// 				</IconStyle>
// 			</Style>
// 			<Point>
// 				<coordinates>
// {{flightInfo.touchdown}}
// 				</coordinates>
// 			</Point>
// 		</Placemark>`);
		const response = this._setTemplate(correlationId, template, engine.defaultTemplatePinLaunch);
		if (this._hasFailed(response))
			return response;

		this._templatePinLaunch = response.results;
		return this._success(correlationId);
	}

	_setTemplatePinsAdditional(correlationId, engine, template) {
		if (String.isNullOrEmpty(template)) {
			this._templatePinsAdditional = null;
			return this._success(correlationId);
		}

		const response = this._setTemplate(correlationId, template, ``);
		if (this._hasFailed(response))
			return response;

		this._templatePinsAdditional = response.results;
		return this._success(correlationId);
	}

	_setTemplatePinTouchdown(correlationId, engine, template) {
// 		const response = this._setTemplate(correlationId, template, `
// 		<Placemark>
// 			<name><![CDATA[{{flightInfo.translations.touchdown}}]]></name>
// 			<Style id="normalPlacemark">
// 				<IconStyle>
// 					<color>ff{{flightInfo.style.pin.touchdown.color}}</color>
// 				</IconStyle>
// 			</Style>
// 			<Point>
// 				<coordinates>
// {{flightInfo.touchdown}}
// 				</coordinates>
// 			</Point>
// 		</Placemark>`);
		const response = this._setTemplate(correlationId, template, engine.defaultTemplatePinTouchdown);
		if (this._hasFailed(response))
			return response;

		this._templatePinTouchdown = response.results;
		return this._success(correlationId);
	}

	_sort(correlationId, func) {
		this._data.sort(correlationId, func());
	}
}

class FlightPath {
	constructor() {
		this._rows = [];
	}

	get rows() {
		return this._rows;
	}

	publish(correlationId, time, altitude, latitude, longitude, velocityH, velocityV) {
		this._rows.push({
			altitude: Number(altitude),
			latitude: Number(latitude),
			longitude: Number(longitude),
			seconds: null,
			time: Number(time),
			velocityV: Number(velocityV),
			velocityH: velocityH ? Number(velocityH) : null
		});
	}
	
	process(correlationId) {
		let start = 0;
		let started = false;
		for (const item of this._rows) {
			if (!started && (item.velocityV <= 0))
				continue;

			item.seconds = (item.time - start);

			if (!started) {
				start = item.time;
				started = true;
			}
		}
	}
	
	sort(correlationId, func) {
		if (!func)
			return;

		this._rows = this.data().sort(func);
	}
}

export default FlightPathProcessorService;
