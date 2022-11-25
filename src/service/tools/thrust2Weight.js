import BaseService from '@thzero/library_client/service/index';

class Thrust2WeightToolsService extends BaseService {
	constructor() {
		super();
	}

    init(injector) {
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

		const mass = (massInKg * 9.8);
		results.initial = data.thrustInitial != null ? Number(data.thrustInitial) / mass : null;
		results.peak = data.thrustPeak != null ? Number(data.thrustPeak) / mass : null;
		results.average = data.thrustAverage != null ? Number(data.thrustAverage) / mass : null;
		return this._successResponse(results, correlationId);
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
