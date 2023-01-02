import Constants from '@/constants';

import BaseService from '@thzero/library_client/service/index';

class Thrust2WeightToolsService extends BaseService {
	constructor() {
		super();
	}

    init(injector) {
		this._serviceCalculationEngine = injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_CALCULATION_ENGINE);
    }

	async calculate(correlationId, data) {
		// eslint-disable-next-line prefer-const
		let isMetric = false;
		let massInKg = Number(data.mass);
		if (massInKg <= 0)
			return { success: false };

		if (!isMetric)
			massInKg = Number(data.mass) / 2.2;

		const results = {
			success: true,
			calcuated: true
		};

		/*
		Thrust to Weight ratio - force in newtons divided by weight in newtons
		F = ma
		N = 1 kg⋅m/s2 = ma
		W (in Newtons) = m * 9.8ms−2
		*/

		// const massInNewtons = (massInKg * 9.8);
		// // N = 1 kg⋅m/s2
		// results.initial = data.thrustInitial != null ? Number(data.thrustInitial) / massInNewtons : null;
		// results.peak = data.thrustPeak != null ? Number(data.thrustPeak) / massInNewtons : null;
		// results.average = data.thrustAverage != null ? Number(data.thrustAverage) / massInNewtons : null;

		const calculationSteps = [
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'gravity',
				value: 9.8
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'massInKg',
				value: massInKg
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'thrustInitial',
				value: Number(data.thrustInitial)
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'thrustPeak',
				value: Number(data.thrustPeak)
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'thrustAverage',
				value: Number(data.thrustAverage)
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'massInNewtons',
				evaluate: 'massInNewtons = massInKg * gravity'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'initial',
				evaluate: 'initial = thrustInitial / massInNewtons',
				result: true
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'peak',
				evaluate: 'peak = thrustPeak != null ? thrustPeak / massInNewtons : null',
				result: true
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'average',
				evaluate: 'average = thrustAverage != null ? thrustAverage / massInNewtons : null',
				result: true
			}
		];

		// const instance = this._serviceCalculationEngine.initialize(correlationId);
		// instance.addListener(correlationId, (type, name, value) => {
		// 	console.log('type', type);
		// 	console.log(name, value);
		// });
		// const responseCalculate = instance.calculate(correlationId, calculationSteps);
		// if (this._hasFailed(responseCalculate))
		// 	return responseCalculate;

		// return this._successResponse(responseCalculate.results, correlationId);
		
		return this._successResponse({
			steps: calculationSteps,
			instance: this._serviceCalculationEngine.initialize(correlationId)
		}, correlationId);
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
