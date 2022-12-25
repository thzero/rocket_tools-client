import Constants from '@/constants';

import MotorSearchExternalService from '@/service/external/motorSearch';

class ThrustCurveMotorSearchExternalService extends MotorSearchExternalService {
	constructor() {
		super();
	}

	nameLocale() {
		return 'menu.thrustcurve';
	}

	async _manufacturers(correlationId) {
		const opts = {
			ignoreCorrelationId: true,
			ignoreToken: true
		};
		const response = await this._serviceCommunicationRest.get(correlationId, this._urlKey(), { url: 'metadata.json' }, opts);
		this._logger.debug('ThrustCurveMotorSearchExternalService', '_manufacturers', 'response', response, correlationId);
		if (response) {
			const manufacturers = response.manufacturers;
			return this._successResponse(manufacturers, correlationId);
		}

		return response;
	}

	async _motor(correlationId, motorId) {
		const opts = {
			ignoreCorrelationId: true,
			ignoreToken: true
		};
		const body = {
			motorId: motorId,
			format: 'RASP',
			data: 'samples',
			maxResults: 200
		};
		const response = await this._serviceCommunicationRest.post(correlationId, this._urlKey(), { url: 'download.json' }, body, opts);
		this._logger.debug('ThrustCurveMotorSearchExternalService', '_manufacturers', 'response', response, correlationId);
		if (response && response.results) {
			let motor = null;
			for (const item of response.results) {
				if (item.motorId !== motorId)
					continue;

				motor = item;
				break;
			}

			return this._successResponse(motor, correlationId);
		}

		return response;
	}

    async _search(correlationId, criteria) {
		try {
			//    const body = {
			// 		diameter: criteria.diameter,
			// 		impulseClass: criteria.impulseClass,
			// 		sparky: criteria.sparky != null ? criteria.sparky : true,
			// 		availability: 'available',
			// 		maxResults: 200
			// 	};

			// 	// if (!String.isNullOrEmpty(request.manufacturer)) {
			// 	// 	body.manufacturer = request.manufacturer;
			// 	// }

			// 	if (criteria.singleUse != null && criteria.SingleUse) {
			// 		body.type = 'SU';
			// 	}

			// 	const opts = {
			// 		ignoreCorrelationId: true,
			// 		ignoreToken: true
			// 	};

			// 	if (!criteria.manufacturer || (criteria.manufacturer && Array.isArray(criteria.manufacturer) && criteria.manufacturer.length === 0)) {
			// 		const response = await this._serviceCommunicationRest.post(correlationId, this._urlKey(), { url: 'search.json' }, body, opts);
			// 		this._logger.debug('EquipmentService', '_search', 'response', response, correlationId);
			// 		return response;
			// 	}

			// 	if (!Array.isArray(criteria.manufacturer))
			// 		criteria.manufacturer = [ criteria.manufacturer ];

			// 	const results = [];
			// 	let response;
			// 	for (const manufacturer of criteria.manufacturer) {
			// 		body.manufacturer = manufacturer;
			// 		response = await this._serviceCommunicationRest.post(correlationId, this._urlKey(), { url: 'search.json' }, body, opts);
			// 		this._logger.debug('EquipmentService', '_search', 'response', response, correlationId);
			// 		results.push(...response.results);
			// 	}

			// 	return this._successResponse(results, correlationId);

			const opts = {
					ignoreCorrelationId: true,
					ignoreToken: true
				};
			const body = {
					availability: 'available',
					maxResults: 500
			};
			if (!String.isNullOrEmpty(criteria.impulseClass)) {
				body.impulseClass = criteria.impulseClass;
			}
			if (!String.isNullOrEmpty(criteria.motor)) {
				body.commonName = criteria.motor;
				let response = await this._serviceCommunicationRest.post(correlationId, this._urlKey(), { url: 'search.json' }, body, opts);
				delete body.commonName;
				if (!response || !response.results || (response.results && (response.results.length === 0))) {
					body.designation = criteria.motor;
					response = await this._serviceCommunicationRest.post(correlationId, this._urlKey(), { url: 'search.json' }, body, opts);
					delete body.designation;
				}

				if (response && response.results && (response.results.length > 0))
					body.impulseClass = response.results[0].impulseClass;
			}
			if (String.isNullOrEmpty(body.impulseClass))
				return this._error('ThrustCurveMotorSearchExternalService', 'search', 'Invalid criteira', null, null, null, correlationId);

			const response = await this._serviceCommunicationRest.post(correlationId, this._urlKey(), { url: 'search.json' }, body, opts);
			this._logger.debug('ThrustCurveMotorSearchExternalService', '_search', 'response', response, correlationId);
			return this._successResponse(response.results, correlationId);
		}
		catch (err) {
			this._logger.exception('ThrustCurveMotorSearchExternalService', 'search', err, correlationId);
			return this._hasFailed(correlationId);
		}
	}

	_urlKey() {
		return Constants.ExternalKeys.MotorSearch + 'ThrustCurve';
	}

	select(item, maxLaunchRodTime, callback) {
		this._selectCallback = callback;

		this._calculationData.thrustInitial = null;
		this._calculationData.thrustAverage = item.avgThrustN;
		this._calculationData.thrustPeak = item.maxThrustN;
		this._calculationData.motor = `${item.manufacturer} ${item.designation} (${item.commonName})`;
		this._selectCallback(this._calculationData);

		if (!item.dataFiles) {
			// TODO: notification - toast?
			return;
		}

		(async () => {
			this._thrust2WeightBackendService.requestMotorsMotorSearch({ motorId: item.motorId, maxLaunchRodTime: maxLaunchRodTime }, this._requestMotorsMotorSearchResults);
		})();
	}

	_requestMotorsMotorSearchResults = (request, response) => {
		if (response.data && response.data.samples) {
			this._updateCalc(response.data, request.maxLaunchRodTime);
			return;
		}

		(async () => {
			const results = await this._thrustSearchExternalService.searchMotor({ motorId: request.motorId, maxLaunchRodTime: request.maxLaunchRodTime });
			this._updateCalc(results, request.maxLaunchRodTime);
			this._thrust2WeightBackendService.requestMotorsMotorSearchUpdate({
				motorId: results.motorId,
				samples: results.samples
			});
		})();
	}

	_updateCalc(motor, maxLaunchRodTime) {
		if (!motor || !motor.samples || (motor.samples.length <= 0))
            return;

        console.debug('_updateCalc.maxLaunchRodTime', maxLaunchRodTime);
        console.debug('_updateCalc.motor.samples', motor.samples);
        let maxThrust = 0;
        for (const sample of motor.samples) {
            if (sample.time > maxLaunchRodTime)
                break;

            if (sample.thrust > maxThrust)
                maxThrust = sample.thrust;
        }
        console.debug('_updateCalc.motor.maxThrust', maxThrust);
        this._calculationData.thrustInitial = maxThrust;
        this._selectCallback(this._calculationData);
	}
}

export default ThrustCurveMotorSearchExternalService;
