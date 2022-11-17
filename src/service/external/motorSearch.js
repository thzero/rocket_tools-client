import LibraryConstants from '@thzero/library_client/constants';
// import Constants from '@/constants';

import BaseService from '@thzero/library_client/service/index';

class MotorSearchExternalService extends BaseService {
	constructor() {
		super();

		this._serviceCommunicationRest = null;
	}

    init(injector) {
		super.init(injector);

		this._serviceCommunicationRest = injector.getService(LibraryConstants.InjectorKeys.SERVICE_COMMUNICATION_REST);
    }

	nameLocale() {
		this.notImplementedError();
	}

	reset(correlationId) {
		this._calculationData.reset();
	}

    async search(correlationId, request) {
        try {
			const response = await this._search(correlationId, request);
			this._logger.debug('MotorSearchExternalService', 'search', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			this._logger.exception('MotorSearchExternalService', 'search', err, correlationId);
		}
	}

	url() {
		const config = this._config.getBackend(this._urlKey());
		return config.humanUrl;
	}

	async _search(correlationId, request) {
	}

	_urlKey() {
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

export default MotorSearchExternalService;
