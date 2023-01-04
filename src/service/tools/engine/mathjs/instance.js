import { create, all } from 'mathjs';

import InstanceCalculationEngineToolService from '../instance';

class MathJsInstanceCalculationEngineToolService extends InstanceCalculationEngineToolService {
	constructor(engine) {
		super(engine);

		this._math = create(all);
		this._parser = this._math.parser();
		this._math.import({
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

	calculate(correlationId, calculationSteps, evaluationName) {
		this._enforceNotNull('MathJsInstanceCalculationEngineToolService', 'calculate', calculationSteps, 'calculationSteps', correlationId);

		this._evaluationName = evaluationName;
		try {
			const results = {};
			const resultSteps = [];
			for (const calculationStep of calculationSteps)
				this._evaluate(correlationId, calculationStep, resultSteps);

			for (const resultStep of resultSteps)
			{
				if (resultStep.var) {
					results[resultStep.var] = this._parser.get(resultStep.var);
					continue;
				}

				if (resultStep.data) {
					for (const [key, value] of Object.entries(calculationStep.data))
						results[key] = this._parser.get(key);
					continue;
				}
			}

			return this._engine._successResponse(results, correlationId);
		}
		catch (err) {
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
			return this._engine._error('MathJsInstanceCalculationEngineToolService', 'evaluate', null, err, null, null, correlationId);
		}
	}

	_evaluate(correlationId, calculationStep, resultSteps) {
		this._enforceNotNull('MathJsInstanceCalculationEngineToolService', '_evaluate', calculationStep, 'calculationStep', correlationId);

		let found = this._evaluateSet(correlationId, calculationStep, resultSteps);
		found |= this._evaluateEvaluate(correlationId, calculationStep, resultSteps);
		if (!found)
			throw Error('Unknown calculation type.');

		for (const watcher of this._watchers) {
			watcher.hasChanged = false;
			watcher.value = this._parser.get(watcher.var);
			
			for (const listener of this._listeners) {
				if (watcher.hasChanged)
					// listener(correlationId, this._engine.symTypeSet, watcher.var, watcher.value, {
					// 	symTypeEvaluate: this.symTypeEvaluate,
					// 	symTypeEvaluate: this.symTypeSet
					// });
					this._publish(correlationId, listener, this._engine.symTypeSet, watcher.var, watcher.value, this._evaluationName);
			}
		}
	}

	_evaluateEvaluate(correlationId, calculationStep, resultSteps) {
		if (calculationStep.type !== this._engine.symTypeEvaluate)
			return false;

		this._enforceNotEmpty('MathJsInstanceCalculationEngineToolService', '_evaluateEvaluate', calculationStep.evaluate, 'evaluate', correlationId);
		this._enforceNotEmpty('MathJsInstanceCalculationEngineToolService', '_evaluateEvaluate', calculationStep.var, 'var', correlationId);

		const step = `${calculationStep.var} = ${calculationStep.evaluate}`;
		for (const listener of this._listeners)
			this._publish(correlationId, listener, this._engine.symTypeEvaluate, step, null, this._evaluationName);

		this._parser.evaluate(step);
		const value = this._parser.get(calculationStep.var);

		if (calculationStep.unit) {
			const stepC = `${calculationStep.var} = ${calculationStep.var} to ${calculationStep.unit}`;
			for (const listener of this._listeners) {
				this._publish(correlationId, listener, this._engine.symTypeSet, calculationStep.var, value, this._evaluationName);
				this._publish(correlationId, listener, this._engine.symTypeEvaluate, stepC, null, this._evaluationName);
			}


			this._parser.evaluate(stepC);
		}
		
		if (calculationStep.result)
			resultSteps.push(calculationStep);

		this._initWatchers(correlationId, calculationStep);
		
		return true;
	}

	_evaluateSet(correlationId, calculationStep, resultSteps) {
		if (calculationStep.type !== this._engine.symTypeSet)
			return false;

		this._enforceNotEmptyEither('MathJsInstanceCalculationEngineToolService', '_evaluateSet', calculationStep.data, calculationStep.var, 'data', 'var', correlationId);

		if (!String.isNullOrEmpty(calculationStep.data)) {
			// turn data object into individual sets...
			let step;
			for (const [key, value] of Object.entries(calculationStep.data)) {
				//this._parser.set(key, value);
				step = { type: this._engine.symTypeSet, var: key, value: value, convert: calculationStep.convert, unit: calculationStep.unit, units: calculationStep.units, result: calculationStep.result, evaluationName: this._evaluationName };
				this._evaluateSet(correlationId, step, resultSteps);
			}
			return true;
		}

		if (!String.isNullOrEmpty(calculationStep.var)) {
			let value = calculationStep.value;
			// if (calculationStep.convert && calculationStep.convert === this._engine.symConvertNumber)
			// 	value = Number(calculationStep.value);
			if (value) {
				if (calculationStep.unit) {
					// value = this._math.unit(value + ' ' + calculationStep.unit);
					value = this._math.unit(`${value} ${calculationStep.unit}`);
					this._parser.set(calculationStep.var, value);
				}
				else if (calculationStep.units && calculationStep.units.from && calculationStep.units.to) {
					// value = this._math.unit(value + ' ' + calculationStep.units.from) + ' to ' + calculationStep.units.to;
					// this._parser.set(calculationStep.var, this._math.unit(value + ' ' + calculationStep.units.from));
					this._parser.set(calculationStep.var, this._math.unit(`${value} ${calculationStep.units.from}`));
					// this._parser.evaluate(calculationStep.var + ' = ' + calculationStep.var + ' to ' + calculationStep.units.to);
					this._parser.evaluate(`${calculationStep.var} = ${calculationStep.var} to ${calculationStep.units.to}`);
				}
				else
					this._parser.set(calculationStep.var, value);
			}
			else
				this._parser.set(calculationStep.var, value);
			
			if (calculationStep.result)
				resultSteps.push(calculationStep);
			this._initWatchers(correlationId, calculationStep);
			
			return true;
		}

		return false;
	}

	_initWatchers(correlationId, calculationStep) {
		if (String.isNullOrEmpty(calculationStep.var))
			return;

		this._watchers.push(this._proxy(calculationStep));
	}

	_publish(correlationId, listener, type, name, value) {
		listener(correlationId, type, name, value, this._evaluationName, {
			symTypeEvaluate: this.symTypeEvaluate,
			symTypeSet: this.symTypeSet
		});
	}
}

export default MathJsInstanceCalculationEngineToolService;
