import Constants from '@/constants';

import MotorSearchExternalService from '@/service/external/motorSearch';

class ThrustCurveMotorSearchExternalService extends MotorSearchExternalService {
	constructor() {
		super();
	}

	nameLocale() {
		return 'menu.thrustcurve';
	}

    async _search(correlationId, request) {
       const body = {
			diameter: request.diameter,
			impulseClass: request.impulseClass,
			sparky: request.sparky != null ? request.sparky : true,
			availability: 'available',
			maxResults: 200
		};

		if (request.singleUse != null && request.SingleUse) {
			body.type = 'SU';
		}

		const opts = {
			ignoreCorrelationId: true,
			ignoreToken: true
		};
		const response = await this._serviceCommunicationRest.post(correlationId, this._urlKey(), { url: 'search.json' }, body, opts);
		this._logger.debug('EquipmentService', '_search', 'response', response, correlationId);
		return response;
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
