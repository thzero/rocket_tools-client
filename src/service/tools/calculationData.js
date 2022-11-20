class CalculationData {
	constructor() {
		this.mass = null;
		this.motor = null;
		this.thrustAverage = null;
		this.thrustInitial = null;
		this.thrustPeak = null;
	}

	calculate(correlationId) {
		// eslint-disable-next-line prefer-const
		let isMetric = false;
		let massInKg = Number(this.mass);
		if (massInKg <= 0)
			return { success: false };

		if (!isMetric)
			massInKg = Number(this.mass) / 2.2;

		const results = {
			success: true,
			calcuated: true
		};

		const mass = (massInKg * 9.8);
		results.initial = this.thrustInitial != null ? Number(this.thrustInitial) / mass : null;
		results.peak = this.thrustPeak != null ? Number(this.thrustPeak) / mass : null;
		results.average = this.thrustAverage != null ? Number(this.thrustAverage) / mass : null;
		return results;
	}

	reset(correlationId, data) {
		this.mass = data;
		this.motor = null;
		this.thrustAverage = null;
		this.thrustInitial = null;
		this.thrustPeak = null;
	}

	update(correlationId, data) {
		this.mass = data != null ? data.mass : null;
		this.thrustAverage = data != null ? data.thrustAverage : null;
		this.thrustInitial = data != null ? data.thrustInitial : null;
		this.thrustPeak = data != null ? data.thrustPeak : null;
	}
}

export default CalculationData;
