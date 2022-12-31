import { create, all }from 'mathjs';

import InstanceCalculationEngineToolService from '../instance';

class MathJsInstanceCalculationEngineToolService extends InstanceCalculationEngineToolService {
	constructor(engine) {
		super(engine);

		const math = create(all);
		this._parser = math.parser();
		math.import({
				import: function () { throw new Error('Function import is disabled') },
				createUnit: function () { throw new Error('Function createUnit is disabled') },
				evaluate: function () { throw new Error('Function evaluate is disabled') },
				parse: function () { throw new Error('Function parse is disabled') },
				simplify: function () { throw new Error('Function simplify is disabled') },
				derivative: function () { throw new Error('Function derivative is disabled') }
			}, 
			{ 
				override: true 
			}
		);

		this._watchers = [];
	}

	calculate(correlationId, calculationSteps) {
		if (!calculationSteps)
			throw Error('No calculation steps provided.');

		try {
			const results = {};
			const resultSteps = [];
			for (const calculationStep of calculationSteps) {
				if (calculationStep.result) {
					if (String.isNullOrEmpty(calculationStep.var))
						throw Error('No var for the calculation step.');
					resultSteps.push(calculationStep);
				}
				this._evaluate(correlationId, calculationStep);
			}

			for (const resultStep of resultSteps)
				results[resultStep.var] = this._parser.get(resultStep.var);

			return this._engine._successResponse(results, correlationId);
		}
		catch (err) {
			this._engine._logger.exception('MathJsInstanceCalculationEngineToolService', 'calculate', err, correlationId);
			return this._engine._error('MathJsInstanceCalculationEngineToolService', 'calculate', null, err, null, null, correlationId);
		}
	}

	evaluate(correlationId, calculationStep) {
		try {
			this._evaluate(correlationId, calculationStep);

			const results = {};
			if (calculationStep.result && !String.isNullOrEmpty(calculationStep.var))
				results[calculationStep.var] = this._parser.get(calculationStep.var);

			return this._engine._successResponse(results, correlationId);
		}
		catch (err) {
			this._engine._logger.exception('MathJsInstanceCalculationEngineToolService', 'evaluate', err, correlationId);
			return this._engine._error('MathJsInstanceCalculationEngineToolService', 'evaluate', null, err, null, null, correlationId);
		}
	}

	_evaluate(correlationId, calculationStep) {
		if (!calculationStep)
			throw Error('No calculation step provided.');

		if (calculationStep.type === this._engine.symTypeSet) {
			if (String.isNullOrEmpty(calculationStep.var))
				throw Error('No var for the calculation step.');

			this._parser.set(calculationStep.var, calculationStep.value);
		}
		else if (calculationStep.type === this._engine.symTypeEvaluate) {
			const output = `${calculationStep.evaluate}`;
			for (const listener of this._listeners)
				listener(this._engine.symTypeEvaluate, output);

			this._parser.evaluate(calculationStep.evaluate);
		}
		else
			throw Error('Unknown calculation type.');

		if (!String.isNullOrEmpty(calculationStep.var)) 
			this._watchers.push(this._proxy(calculationStep));

		for (const watcher of this._watchers) {
			watcher.hasChanged = false;
			watcher.value = this._parser.get(watcher.var);
			
			for (const listener of this._listeners)
				if (watcher.hasChanged)
					listener(this._engine.symTypeSet, watcher.var, watcher.value);
		}
	}
}

export default MathJsInstanceCalculationEngineToolService;
