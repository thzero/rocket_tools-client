import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';
import CommonUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

import BaseStore from '@thzero/library_client_vue3_store_pinia/store/index';

class AppStore extends BaseStore {
	_initModules() {
		// Admin Update
	}

	_initPluginPersistConfig() {
		return {
			root: {
				key: 'rocket_tools',
				storage: localStorage,
				paths: [
					'flightInfoResolution',
					'flightInfoStyle',
					'flightPathStyle',
					'motorManufacturers',
					'motorSearchCriteria',
					'motorSearchResults'
				]
			}
			// pinia2
			// root: {
			// 	key: 'rocket_tools',
			// 	includePaths: [
			// 		'flightInfoResolution',
			// 		'flightInfoStyle',
			// 		'flightPathStyle',
			// 		'motorManufacturers',
			// 		'motorSearchCriteria',
			// 		'motorSearchResults',
			// 	]
			// }
		};
	}

	_initStoreConfig() {
		return {
			state: () => ({
				checksumLastUpdate: [],
				flightDate: '',
				flightInfoResolution: Constants.FlightInfo.Resolution,
				flightInfoStyle: [],
				flightLocation: '',
				flightPathStyle: [],
				flightTitle: '',
				motorManufacturers: [],
				motorSearchCriteria: {},
				motorSearchResults: {},
				thrust2weight: {},
				tools: [],
				toolSettings: []
			}),
			actions: {
				async _initialize(correlationId, results) {
					await this.setTools(correlationId, results.tools);
				},
				async requestMotor(correlationId, motorId) {
					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_EXTERNAL_MOTOR_SEARCH);
					const response = await service.motor(correlationId, motorId, this.motorSearchResults);
					this.$logger.debug('store', 'requestMotor', 'response', response, correlationId);
					if (Response.hasSucceeded(response)) {
						this.motorSearchResults = response.results.data;
						return response.results.motor;
					}

					return null;
				},
				async requestMotorManufacturers(correlationId) {
					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_EXTERNAL_MOTOR_SEARCH);
					const response = await service.manufacturers(correlationId, this.motorManufacturers);
					this.$logger.debug('store', 'requestMotorManufacturers', 'response', response, correlationId);
					if (Response.hasSucceeded(response)) {
						this.motorManufacturers = response.results;
						return this.motorManufacturers.manufacturers;
					}

					return [];
				},
				async requestMotorSearchReset(correlationId) {
					this.motorManufacturers.ttl = null;
					this.motorManufacturers.last = null;
					this.motorSearchResults.ttl = null;
					this.motorSearchResults.last = null;
				},
				async requestMotorSearchResults(correlationId, criteria) {
					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_EXTERNAL_MOTOR_SEARCH);
					const response = await service.search(correlationId, criteria, this.motorSearchResults);
					this.$logger.debug('store', 'requestMotorSearchResults', 'response', response, correlationId);
					if (Response.hasSucceeded(response)) {
						this.motorSearchResults = response.results.data;
						return response.results.filtered;
					}

					return [];
				},
				async setFlightDate(correlationId, value) {
					this.flightDate = value;
				},
				async setFlightInfoResolution(correlationId, value) {
					this.flightInfoResolution = value;
				},
				async setFlightInfoStyle(correlationId, value) {
					if (String.isNullOrEmpty(value.id))
						return;
					if (!this.flightInfoStyle)
						this.flightInfoStyle = [];
					this.flightInfoStyle = CommonUtility.updateArrayByObject(this.flightInfoStyle, value);
				},
				async setFlightLocation(correlationId, value) {
					this.flightLocation = value;
				},
				async setFlightPathStyle(correlationId, value) {
					if (String.isNullOrEmpty(value.id))
						return;
					if (!this.flightPathStyle)
						this.flightPathStyle = [];
					this.flightPathStyle = CommonUtility.updateArrayByObject(this.flightPathStyle, value);
				},
				async setFlightTitle(correlationId, value) {
					this.flightTitle = value;
				},
				async setMotorSearchCriteria(correlationId, value) {
					this.motorSearchCriteria = value;
				},
				async setMotorSearchResults(correlationId, value) {
					this.motorSearchResults = value;
				},
				async setTools(correlationId, tools) {
					this.$logger.debug('store', 'setTools', 'tools.a', tools, correlationId);
					this.$logger.debug('store', 'setTools', 'tools.b', this.tools, correlationId);
					this.tools = tools;
					this.$logger.debug('store', 'setTools', 'tools.c', this.tools, correlationId);
				}
			},
			getters: {
				async getMotorSearchCriteria() {
					return GlobalUtility.$store.motorSearchCriteria;
				}
			},
			dispatcher: {
				async requestMotor(correlationId, motorId) {
					return await GlobalUtility.$store.requestMotor(correlationId, motorId);
				},
				async requestMotorManufacturers(correlationId, results) {
					return await GlobalUtility.$store.requestMotorManufacturers(correlationId, results);
				},
				async requestMotorSearchReset(correlationId) {
					return await GlobalUtility.$store.requestMotorSearchReset(correlationId);
				},
				async requestMotorSearchResults(correlationId, criteria) {
					return await GlobalUtility.$store.requestMotorSearchResults(correlationId, criteria);
				},
				async setFlightDate(correlationId, value) {
					await GlobalUtility.$store.setFlightDate(correlationId, value);
				},
				async setFlightInfoResolution(correlationId, value) {
					await GlobalUtility.$store.setFlightInfoResolution(correlationId, value);
				},
				async setFlightInfoStyle(correlationId, value) {
					await GlobalUtility.$store.setFlightInfoStyle(correlationId, value);
				},
				async setFlightLocation(correlationId, value) {
					await GlobalUtility.$store.setFlightLocation(correlationId, value);
				},
				async setFlightPathStyle(correlationId, value) {
					await GlobalUtility.$store.setFlightPathStyle(correlationId, value);
				},
				async setFlightTitle(correlationId, value) {
					await GlobalUtility.$store.setFlightTitle(correlationId, value);
				},
				async setMotorSearchCriteria(correlationId, value) {
					await GlobalUtility.$store.setMotorSearchCriteria(correlationId, value);
				}
			}
		};
	}
}

export default AppStore;
