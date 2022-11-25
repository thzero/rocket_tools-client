import LibraryConstants from '@thzero/library_client/constants';
// import Constants from '@/constants';

import CommonUtility from '@thzero/library_common/utility/index';

import BaseService from '@thzero/library_client/service/index';

class MotorSearchExternalService extends BaseService {
	constructor() {
		super();

		this._serviceCommunicationRest = null;

		this._ttlDefault = 7 * 24 * 60 * 60 * 1000;
	}

    init(injector) {
		super.init(injector);

		this._serviceCommunicationRest = injector.getService(LibraryConstants.InjectorKeys.SERVICE_COMMUNICATION_REST);
    }

	nameLocale() {
		this.notImplementedError();
	}

	reset(correlationId) {
		this._calculationData.reset();
	}

    async manufacturers(correlationId, cached) {
        try {
			const now = CommonUtility.getTimestamp();
			let ttl = CommonUtility.getTimestamp() + this._ttlDefault;
			if (cached) {
				if (!cached.ttl)
					cached.ttl = ttl;
				ttl = cached.ttl;
			}

			if ((ttl > now) && (cached.manufacturers && cached.manufacturers.length > 0))
				return this._successResponse(cached, correlationId);

			const response = await this._manufacturers(correlationId);
			this._logger.debug('MotorSearchExternalService', 'manufacturers', 'response', response, correlationId);

			return this._successResponse({
				manufacturers: response.results,
				ttl: ttl,
				last: now
			}, correlationId);
		}
		catch (err) {
			this._logger.exception('MotorSearchExternalService', 'manufacturers', err, correlationId);
		}
	}

    async search(correlationId, criteria, cached) {
        try {
			const now = CommonUtility.getTimestamp();
			const ttl = CommonUtility.getTimestamp() + this._ttlDefault;

			if (cached && (cached.ttl !== null && cached.ttl > now) && (cached.data && cached.data.length > 0)) {
				const responseFilter = this._searchFilter(correlationId, criteria, cached.data);
				// If there total for this impulse class is greater than zero, use the cached results....
				if (responseFilter.results.total > 0) {
					return this._successResponse({
						filtered: this._hasSucceeded(responseFilter) ? responseFilter.results.output : [],
						data: {
							data: cached.data,
							ttl: ttl,
							last: cached.last
						}
					}, correlationId);
				}

				// Otherwise need to go get and cache the data from external...
			}

			cached = cached || {};
			cached.data = cached.data || [];

			let data = [ ...cached.data ];

			const response = await this._search(correlationId, criteria);
			this._logger.debug('MotorSearchExternalService', 'search', 'response', response, correlationId);

			// If succeeded, then update data set.
			if (this._hasSucceeded(response)) {
				const responseUpdate = this._searchUpdateData(correlationId, response.results, data, cached.data);
				if (this._successResponse(responseUpdate))
					data = response.results;
			}

			// Filter the data set for results...
			const responseFilter = this._searchFilter(correlationId, criteria, data);
			return this._successResponse({
				filtered: this._hasSucceeded(responseFilter) ? responseFilter.results.output : [],
				data: {
					data: data,
					ttl: ttl,
					last: now
				}
			}, correlationId);
		}
		catch (err) {
			this._logger.exception('MotorSearchExternalService', 'search', err, correlationId);
		}
	}

	urlHuman() {
		const config = this._config.getBackend(this._urlKey());
		return config.humanUrl;
	}

	urlMotor(motor) {
		if (String.isNullOrEmpty(motor.manufacturerAbbrev) || String.isNullOrEmpty(motor.designation)) {
			return null;
		}

		const uri = this.urlHuman() + '/motors/' + motor.manufacturerAbbrev + '/' + motor.designation;
		return uri;
	}

	async _manufacturers(correlationId) {
	}

	async _search(correlationId, criteria) {
	}

	_searchFilter(correlationId, criteria, data) {
		let total = 0;
		const output = [];
		for (const item of data) {
			if (item.impulseClass !== criteria.impulseClass)
				continue;

			total++;

			if (criteria.diameter) {
				if (item.diameter !== parseInt(criteria.diameter))
					continue;
			}

			if (criteria.diameter) {
				if (item.diameter !== parseInt(criteria.diameter))
					continue;
			}

			if (criteria.sparky !== null && criteria.sparky) {
				if (item.sparky === null || (item.sparky !== null && item.sparky === false))
					continue;
			}

			if (criteria.singleUse !== null && criteria.singleUse) {
				if (item.type !== 'SU')
					continue;
			}

			if (!String.isNullOrEmpty(criteria.manufacturer)) {
				if (!criteria.manufacturer.includes(item.manufacturer))
					continue;
			}

			output.push(item);
		}

		return this._successResponse({ output: output, total: total }, correlationId);
	}

	_searchUpdateData(correlationId, results, data, cached) {
		let result;
		let item;
		const length = results.length;
		const lengthCached = cached.length;
		let difference = [ ...cached ];
		for (let i = 0; i < length; i++) {
			result = results[i];

			for (let j = 0; j < lengthCached; j++) {
				item = cached[j];
				if (result.motorId !== item.motorId)
					continue;

					data[i] = result;
					difference = difference.filter((l) => l.motorId === result.motorId);
				break;
			}

			data.push(result);
		}

		for (const item of difference) {
			data = data.filter((l) => l.motorId === item.motorId);
		}

		return this._successResponse(correlationId, data);
	}

	_urlKey() {
	}

	select(item, maxLaunchRodTime, callback) {
		this._selectCallback = callback;

		this._calculationData.thrustInitial = null;
		this._calculationData.thrustAverage = item.avgThrustN;
		this._calculationData.thrustPeak = item.maxThrustN;
		this._calculationData.motor = `${item.manufacturer} ${item.designation} (${item.commonName})`;
		this._selectCallback(this._calculationData);

		if (!item.dataFiles) {
			// TODO: notification - toast?
			return;
		}

		(async () => {
			this._thrust2WeightBackendService.requestMotorsMotorSearch({ motorId: item.motorId, maxLaunchRodTime: maxLaunchRodTime }, this._requestMotorsMotorSearchResults);
		})();
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

export default MotorSearchExternalService;
