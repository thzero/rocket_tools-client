import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import RestExternalService from '@thzero/library_client/service/externalRest';

class ApiService extends RestExternalService {
	async initialize(correlationId) {
		try {
			const version = {
				client: Constants.Version
			};
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'initialize');
			this._logger.debug('ApiService', 'initialize', 'response', response, correlationId);
			if (this._hasSucceeded(response)) {
				version.server = response.results.version;
				response.results.version = version;
			}

			return response;
		}
		catch (err) {
			this._logger.exception('ApiService', 'initialize', err, correlationId);
		}

		return this._error('ApiService', 'initialize', null, null, null, null, correlationId);
	}
}

export default ApiService;
