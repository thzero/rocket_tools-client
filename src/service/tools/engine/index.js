import BaseService from '@thzero/library_client/service/index';

class CalculationEngineToolService extends BaseService {
	constructor() {
		super();
		
		this._listeners = [];

		this.symConvertNumber = Symbol('number');
		
		this.symTypeEvaluate = Symbol('evaluate');
		this.symTypeSet = Symbol('set');
	}

	initialize(correlationId) {
		this.notImplementedError();
	}
}

export default CalculationEngineToolService;
