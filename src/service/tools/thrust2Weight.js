import Constants from '@/constants';

import BaseService from '@thzero/library_client/service/index';

class Thrust2WeightToolsService extends BaseService {
	constructor() {
		super();
	}

    init(injector) {
		this._serviceCalculationEngine = injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_CALCULATION_ENGINE);
    }

	initialize() {
		return {
			mass: null,
			maxLaunchRodTime: null,
			motor: null,
			thrustAverage: null,
			thrustInitial: null,
			thrustPeak: null
		};
	}

	async initializeCalculation(correlationId, data, measurementUnits) {
		this._enforceNotNull('Thrust2WeightToolsService', 'initializeCalculation', data, 'data', correlationId);
		this._enforceNotEmpty('Thrust2WeightToolsService', 'initializeCalculation', measurementUnits, 'measurementUnits', correlationId);

		const calculationSteps = [
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'gravity',
				value: 9.8,
				unit: Constants.MeasurementUnits.metrics.acceleration.ms2
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'massInKg',
				value: data.mass,
				units: {
					from: data.units,
					to: Constants.MeasurementUnits.metrics.weight.kg
				}
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				data: {
					thrustInitial: data.thrustInitial,
					thrustPeak: data.thrustPeak,
					thrustAverage: data.thrustAverage
				},
				unit: 'N'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'massInNewtons',
				evaluate: 'massInKg * gravity',
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'initial',
				evaluate: 'thrustInitial / massInNewtons',
				result: true
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'peak',
				value: '0'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'peak',
				evaluate: 'thrustPeak != null ? thrustPeak / massInNewtons : null',
				result: true
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'average',
				value: '0'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'average',
				evaluate: 'thrustAverage != null ? thrustAverage / massInNewtons : null',
				result: true
			}
		];
		
		return this._successResponse({
			steps: calculationSteps,
			instance: this._serviceCalculationEngine.initialize(correlationId)
		}, correlationId);
	}

	update(correlationId, motor, data) {
		if (!motor || !motor.samples || (motor.samples.length <= 0) || !data)
            return;

        let initialThrust = 0;
        for (const sample of motor.samples) {
            if (sample.time > data.maxLaunchRodTime)
                break;

			if (sample.thrust > initialThrust)
			initialThrust = sample.thrust;
        }
        data.thrustAverage = motor.avgThrustN;
        data.thrustInitial = initialThrust;
        data.thrustPeak = motor.maxThrustN;
		return this._successResponse(data, correlationId);
	}
}

export default Thrust2WeightToolsService;
