import Constants from '@/constants';

import AppUtility from '@/utility/app';
import CommonUtility from '@thzero/library_common/utility/index';

import Results from '../results';

import BaseService from '@thzero/library_client/service/index';

class FlightPathProcessorService extends BaseService {
	constructor() {
		super();

		this._serviceProcessors = [];
	}

	init(injector) {
		// TODO: Convert to library
		const serviceFlightPathProcessorFeatherweight = injector.getService(Constants.InjectorKeys.SERVICE_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT);
		this.registerProcessor(serviceFlightPathProcessorFeatherweight);
	}

	get styleDefault() {
		return {
			path: {
				flight: {
					color: '#0000ff'
				},
				ground: {
					color: '#000000'
				}
			},
			pin: {
				launch: {
					color: '#ff0000'
				},
				touchdown: {
					color: '#00ff00'
				}
			}
		};
	}

	get serviceProcessors() {
		return this._serviceProcessors;
	}

	process(correlationId, data, processorId, measurementUnits, flightInfo) {
		this._enforceNotNull('FlightPathProcessorService', 'process', data, 'data', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', processorId, 'processorId', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits, 'measurementUnits', correlationId);
		this._enforceNotNull('FlightPathProcessorService', 'process', flightInfo, 'flightInfo', correlationId);

		const results = new Results();

		if (CommonUtility.isNull(data)) {
			results.errors.push('errors.process.noInput');
			return results;
		}

		if (String.isNullOrEmpty(processorId)) {
			results.setError('errors.process.noProcessor');
			return results;
		}

		const processor = this._determineProcessor(correlationId, processorId);
		if (!processor) {
			results.setError('errors.process.noProcessor');
			return results;
		}

		results.info = this._initialize(correlationId, flightInfo);
		processor.process(correlationId, results, data, measurementUnits);
		AppUtility.debug2('results.info', results.info);

		return results;
	}

	_determineProcessor(correlationId, processorId) {
		this._enforceNotEmpty('FlightPathProcessorService', '_determineProcessor', processorId, 'processorId', correlationId);

		const processor = this._serviceProcessors.find(s => {
			return s.id.toLowerCase() === processorId.toLowerCase();
		});
		return processor;
	}

	_initialize(correlationId, flightInfo) {
		this._enforceNotNull('FlightPathProcessorService', '_initialize', flightInfo, 'flightInfo', correlationId);

		flightInfo.flightPath = [];
		return flightInfo;
	}

	registerProcessor(service) {
		this._enforceNotNull('FlightPathProcessorService', 'registerProcessor', service, 'service');

		this._serviceProcessors.push(service);
	}
}

export default FlightPathProcessorService;
