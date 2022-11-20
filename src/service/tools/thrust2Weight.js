import LibraryConstants from '@thzero/library_client/constants';
// import Constants from '@/constants';

import BaseService from '@thzero/library_client/service/index';

import CalculationData from './calculationData';

class Thrust2WeightToolsService extends BaseService {
	constructor() {
		super();

		this._externalCommunicationService = null;
	}

    init(injector) {
		this._externalCommunicationService = injector.getService(LibraryConstants.InjectorKeys.SERVICE_COMMUNICATION_REST);
    }

    async initialize(correlationId) {
		return new CalculationData();
    }

	async calculate(correlationId, data) {
		return data.calculate(correlationId);
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

export default Thrust2WeightToolsService;
