import Constants from '@/constants';

import BaseService from '@thzero/library_client/service/index';

class FoamToolsService extends BaseService {
	constructor() {
		super();
	}

    init(injector) {
		this._serviceCalculationEngine = injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_CALCULATION_ENGINE);
    }

	foams(correlationId) {
		return this._successResponse([
			{
				manufacturer: 'FOAM-IT',
				expansion: 10,
				densityM: 0.080092317,
				densityE: 0.046296296
			},
			{
				manufacturer: 'Mac Performance',
				expansion: 15,
				densityM: 0.064073853,
				densityE: 0.037037037
			},
			{
				manufacturer: 'Public Missiles',
				expansion: 10,
				densityM: 0.09611078,
				densityE: 0.055555556
			},
			{
				manufacturer: 'Public Missiles',
				expansion: 15,
				densityM: 0.064073853,
				densityE: 0.037037037
			},
			{
				manufacturer: 'Public Missiles',
				expansion: 20,
				densityM: 0.04805539,
				densityE: 0.027777778
			}
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

	async initializeCalculation(correlationId, data, measurementUnits) {
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data, 'data', correlationId);
		this._enforceNotEmpty('FoamToolsService', 'initializeCalculation', measurementUnits, 'measurementUnits', correlationId);

		const calculationSteps = [
			{
				type: this._serviceCalculationEngine.symTypeSet,
				data: {
					bodyTubeID: data.bodyTubeID,
					finRootLength: data.finRootLength,
					finTabLength: data.finTabLength,
					finWidth: data.finWidth,
					motorTubeOD: data.motorTubeOD
				},
				units: {
					from: data.units,
					to: Constants.MeasurementUnits.metrics.length.mm
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
				var: 'volumeDifferenceBetweenBodyTube',
				evaluate: 'volumeBodyTube - volumeMotorTube'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'volumeFins',
				evaluate: '(finTabLength ? finTabLength : finRootLength) * finWidth * (bodyTubeID - motorTubeOD)'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'volumeDifferenceWithoutFins',
				evaluate: 'volumeDifferenceBetweenBodyTube - volumeFins'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'totalVolume',
				evaluate: 'volumeBodyTube - volumeMotorTube - volumeFins',
				result: true,
				format: this._serviceCalculationEngine.formatFixed(),
				unit: Constants.MeasurementUnits[measurementUnits].fluid.default
			}
		];
		
		return this._successResponse({
			steps: calculationSteps,
			instance: this._serviceCalculationEngine.initialize(correlationId)
		}, correlationId);
	}

	async initializeCalculationFoam(correlationId, data, measurementUnits) {
		this._enforceNotNull('FoamToolsService', 'initializeCalculationFoam', data, 'data', correlationId);
		this._enforceNotEmpty('FoamToolsService', 'initializeCalculationFoam', measurementUnits, 'measurementUnits', correlationId);

		const calculationSteps = [
			{
				type: this._serviceCalculationEngine.symTypeSet,
				data: {
					manufacturer: data.manufacturer,
					expansion: data.expansion,
				},
				result: true
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'totalVolume',
				evaluate: data.totalVolume,
				unit: Constants.MeasurementUnits.metrics.fluid.ml
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'density',
				value: data.densityM,
				unit: 'g/ml',
				// result: true,
				// format: this._serviceCalculationEngine.formatFixed()
			},
			// {
			// 	type: this._serviceCalculationEngine.symTypeSet,
			// 	var: 'densityE',
			// 	value: data.densityE,
			// 	unit: 'oz/in^3',
			// 	result: true,
			// 	format: this._serviceCalculationEngine.formatFixed()
			// },
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'foamWeight',
				evaluate: 'density * totalVolume',
				unit: Constants.MeasurementUnits[measurementUnits].weight.default,
				result: true,
				format: this._serviceCalculationEngine.formatFixed()
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'requiredAmount',
				evaluate: 'totalVolume / expansion',
				result: true,
				unit: Constants.MeasurementUnits[measurementUnits].fluid.default,
				format: this._serviceCalculationEngine.formatFixed()
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'densityMD',
				value: data.densityM,
				unit: 'g/ml',
				result: true,
				format: this._serviceCalculationEngine.formatFixed()
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'densityED',
				value: data.densityE,
				unit: 'oz/in^3',
				result: true,
				format: this._serviceCalculationEngine.formatFixed()
			},
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

export default FoamToolsService;
