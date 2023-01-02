import Constants from '@/constants';

import BaseService from '@thzero/library_client/service/index';

class FoamToolsService extends BaseService {
	constructor() {
		super();
	}

    init(injector) {
		this._serviceCalculationEngine = injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_CALCULATION_ENGINE);
    }

	async calculate(correlationId, data, measurementUnits) {
		this._enforceNotNull('FoamToolsService', 'calculate', data, 'data', correlationId);
		this._enforceNotEmpty('FoamToolsService', 'calculate', measurementUnits, 'measurementUnits', correlationId);

		const calculationSteps = [
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'pi',
				value: 3.141592654
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				// data: {
				// 	bodyTubeID: Number(data.bodyTubeID),
				// 	finRootLength: Number(data.finRootLength),
				// 	finTabLength: Number(data.finTabLength),
				// 	finWidth: Number(data.finWidth),
				// 	motorTubeOD: Number(data.motorTubeOD),
				// 	numberFins: Number(data.numberFins)
				// },
				data: data,
				covert: this._serviceCalculationEngine.symConvertNumber,
				units: {
					user: measurementUnits,
					calculation: Constants.MeasurementUnits.metrics.id
				}
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'volumeBodyTube',
				evaluate: 'pi * ((bodyTubeID / 2) ^ 2) * finRootLength'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'volumeMotorTube',
				evaluate: 'pi * ((motorTubeOD / 2) ^ 2) * finRootLength'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'volumeDifference',
				evaluate: 'volumeBodyTube - volumeMotorTube'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'volumeFins',
				evaluate: '(finTabLength ? finTabLength : finRootLength) * finWidth * (bodyTubeID - motorTubeOD)'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'volumeDifference',
				evaluate: 'volumeDifference - volumeFins'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'totalVolume',
				evaluate: 'volumeBodyTube - volumeMotorTube - volumeFins',
				result: true
			}
		];
		
		return this._successResponse({
			steps: calculationSteps,
			instance: this._serviceCalculationEngine.initialize(correlationId)
		}, correlationId);
	}

	async calculateFoam(correlationId, data, measurementUnits) {
		this._enforceNotNull('FoamToolsService', 'calculate', data, 'data', correlationId);
		this._enforceNotEmpty('FoamToolsService', 'calculate', measurementUnits, 'measurementUnits', correlationId);

		const calculationSteps = [
			{
				type: this._serviceCalculationEngine.symTypeSet,
				// data: {
				// 	bodyTubeID: Number(data.bodyTubeID),
				// 	finRootLength: Number(data.finRootLength),
				// 	finTabLength: Number(data.finTabLength),
				// 	finWidth: Number(data.finWidth),
				// 	motorTubeOD: Number(data.motorTubeOD),
				// 	numberFins: Number(data.numberFins)
				// },
				data: data,
				covert: this._serviceCalculationEngine.symConvertNumber,
				units: {
					user: measurementUnits,
					calculation: Constants.MeasurementUnits.metrics.id
				},
				result: true
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'foamWeight',
				evaluate: 'massGMl * totalVolume',
				result: true
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'requiredAmount',
				evaluate: 'totalVolume / expansion',
				result: true
			}
		];
		
		return this._successResponse({
			steps: calculationSteps,
			instance: this._serviceCalculationEngine.initialize(correlationId)
		}, correlationId);
	}

	foams(correlationId) {
		return this._successResponse([
			{
				manufacturer: 'FOAM-IT',
				expansion: 10,
				massGMl: 0.080092317,
				massOzIn3: 0.046296296
			},
			{
				manufacturer: 'Mac Performance',
				expansion: 15,
				massGMl: 0.064073853,
				massOzIn3: 0.037037037
			},
			{
				manufacturer: 'Public Missiles',
				expansion: 10,
				massGMl: 0.09611078,
				massOzIn3: 0.055555556
			},
			{
				manufacturer: 'Public Missiles',
				expansion: 15,
				massGMl: 0.064073853,
				massOzIn3: 0.037037037
			},
			{
				manufacturer: 'Public Missiles',
				expansion: 20,
				massGMl: 0.04805539,
				massOzIn3: 0.027777778
			},
		]);
	}

	initialize() {
		return {
			bodyTubeID: null,
			finRootLength: null,
			finTabLength: null,
			finWidth: null,
			motorTubeOD: null,
			numberFins: null
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

export default FoamToolsService;
