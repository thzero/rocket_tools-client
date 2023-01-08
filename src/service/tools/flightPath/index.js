import Constants from '@/constants';

import AppUtility from '@/utility/app';
import CommonUtility from '@thzero/library_common/utility/index';

import BaseService from '@thzero/library_client/service/index';

class FlightPathProcessorService extends BaseService {
	constructor() {
		super();

		this._serviceProcessors = [];
	}

	init(injector) {
		// TODO: Convert to library
		const serviceFlightPathProcessorFeatherweight = injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT);
		this.registerProcessor(serviceFlightPathProcessorFeatherweight);
	}

	get styleDefault() {
		return {
			path: {
				flight: {
					color: '#0000ff'
				},
				ground: {
					color: '#000000'
				}
			},
			pin: {
				launch: {
					color: '#ff0000'
				},
				touchdown: {
					color: '#00ff00'
				}
			}
		};
	}

	get serviceProcessors() {
		return this._serviceProcessors;
	}

	process(correlationId, data, processorId, flightInfo, measurementUnits, templateMain, templatePinLaunch, templatePinTouchdown, templatePinsAdditional) {
		this._enforceNotNull('FlightPathProcessorService', 'process', data, 'data', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', processorId, 'processorId', correlationId);
		this._enforceNotNull('FlightPathProcessorService', 'process', flightInfo, 'flightInfo', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits, 'measurementUnits', correlationId);

		if (CommonUtility.isNull(data))
			return this._error('FlightPathProcessorService', 'process', null, err, null, 'errors.process.noInput', correlationId);

		if (String.isNullOrEmpty(processorId))
			return this._error('FlightPathProcessorService', 'process', null, err, null, 'errors.process.noProcessor', correlationId);

		const processor = this._determineProcessor(correlationId, processorId);
		if (!processor)
			return this._error('FlightPathProcessorService', 'process', null, err, null, 'errors.process.noProcessor', correlationId);

		const results = this._initialize(correlationId, flightInfo);
		processor.process(correlationId, this, results, data, measurementUnits, templateMain, templatePinLaunch, templatePinTouchdown, templatePinsAdditional);
		AppUtility.debug2('results.info', results.info);

		return this._successResponse(results, correlationId);
	}

	registerProcessor(service) {
		this._enforceNotNull('FlightPathProcessorService', 'registerProcessor', service, 'service');

		this._serviceProcessors.push(service);
	}

	_determineProcessor(correlationId, processorId) {
		this._enforceNotEmpty('FlightPathProcessorService', '_determineProcessor', processorId, 'processorId', correlationId);

		const processor = this._serviceProcessors.find(s => {
			return s.id.toLowerCase() === processorId.toLowerCase();
		});
		return processor;
	}

	_initialize(correlationId, flightInfo) {
		this._enforceNotNull('FlightPathProcessorService', '_initialize', flightInfo, 'flightInfo', correlationId);

		flightInfo.flightPath = [];
		return flightInfo;
	}

	get defaultTemplateMain() {
		return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
	<Document>
		<name><![CDATA[{{flightInfo.titleFull}}]]></name>
		{{flightInfo.description}}
		<visibility>1</visibility>
		<open>1</open>
		<Folder id="Tracks">
			<name>Tracks</name>
			<visibility>1</visibility>
			<open>0</open>{{{flightInfo.pins}}}
			<Placemark>
				<name><![CDATA[{{flightInfo.translations.flightPath}}]]></name>
				<Style>
					<LineStyle>
						<color>ff{{flightInfo.style.path.flight.color}}</color>
						<width>4</width>
					</LineStyle>
				</Style>
				<MultiGeometry>
					<LineString>
						<tessellate>0</tessellate>
						<altitudeMode>absolute</altitudeMode>
						<coordinates>
{{flightInfo.coords}}
						</coordinates>
					</LineString>
				</MultiGeometry>
			</Placemark>
			<Placemark>
				<name><![CDATA[{{flightInfo.translations.groundPath}}]]></name>
				<Style>
					<LineStyle>
						<color>ff{{flightInfo.style.path.ground.color}}</color>
						<width>4</width>
					</LineStyle>
				</Style>
				<MultiGeometry>
					<LineString>
						<tessellate>0</tessellate>
						<altitudeMode>clampToGround</altitudeMode>
						<coordinates>
{{flightInfo.coords}}
						</coordinates>
					</LineString>
				</MultiGeometry>
			</Placemark>
		</Folder>
	</Document>
</kml>`
	}

	get defaultTemplatePinLaunch() {
		return `
		<Placemark>
			<name><![CDATA[{{flightInfo.translations.launch}}]]></name>
			<Style id="normalPlacemark">
				<IconStyle>
					<color>ff{{flightInfo.style.pin.touchdown.color}}</color>
				</IconStyle>
			</Style>
			<Point>
				<coordinates>
{{flightInfo.launch}}
				</coordinates>
			</Point>
		</Placemark>`;
	}

	get defaultTemplatePinTouchdown() {
		return `
		<Placemark>
			<name><![CDATA[{{flightInfo.translations.touchdown}}]]></name>
			<Style id="normalPlacemark">
				<IconStyle>
					<color>ff{{flightInfo.style.pin.touchdown.color}}</color>
				</IconStyle>
			</Style>
			<Point>
				<coordinates>
{{flightInfo.touchdown}}
				</coordinates>
			</Point>
		</Placemark>`;
	}
}

export default FlightPathProcessorService;
