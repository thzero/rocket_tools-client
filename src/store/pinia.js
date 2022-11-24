import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

import BaseStore from '@thzero/library_client_vue3/store/pinia';

class AppStore extends BaseStore {
	_init() {
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
				plans: [],
				settings: AppUtility.initializeSettingsUser(),
				thrust2weight: {},
				version: null
			}),
			actions: {
				async getMotorManufacturers(correlationId) {
					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_EXTERNAL_MOTOR_SEARCH);
					const response = await service.manufacturers(correlationId, this.motorManufacturers);
					this.$logger.debug('store', 'getMotorManufacturers', 'response', response, correlationId);
					if (Response.hasSucceeded(response)) {
						this.motorManufacturers = response.results;
						return this.motorManufacturers.manufacturers;
					}

					return [];
				},
				async getPlans(correlationId) {
					const service = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_PLANS);
					const response = await service.plans(correlationId);
					this.$logger.debug('store', 'getPlans', 'response', response, correlationId);
					if (Response.hasSucceeded(response)) {
						this.setPlans(correlationId, response.results ? response.results.data : []);
					}
				},
				async getVersion(correlationId) {
					const service = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_VERSION);
					const version = await service.version(correlationId);
					this.setVersion(correlationId, version);
				},
				async initialize(correlationId) {
					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_API);
					const response = await service.initialize(correlationId);
					if (Response.hasSucceeded(response)) {
						this.setPlans(correlationId, response.results.plans);
						this.setVersion(correlationId, response.results.version);
					}
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
					this.flightInfoStyle = LibraryUtility.updateArrayByObject(this.flightInfoStyle, value);
				},
				async setFlightLocation(correlationId, value) {
					this.flightLocation = value;
				},
				async setFlightPathStyle(correlationId, value) {
					if (String.isNullOrEmpty(value.id))
						return;
					if (!this.flightPathStyle)
						this.flightPathStyle = [];
					this.flightPathStyle = LibraryUtility.updateArrayByObject(this.flightPathStyle, value);
				},
				async setFlightTitle(correlationId, value) {
					this.flightTitle = value;
				},
				async setMotorSearchCriteria(correlationId, value) {
					this.motorSearchCriteria = value;
				},
				async setPlans(correlationId, plans) {
					this.$logger.debug('store', 'setPlans', 'plans.a', plans, correlationId);
					this.$logger.debug('store', 'setPlans', 'plans.b', this.plans, correlationId);
					this.plans = plans;
					this.$logger.debug('store', 'setPlans', 'plans.c', this.plans, correlationId);
				},
				async setSettings(correlationId, settings) {
					// commit('setSettings', params);
					this.settings = LibraryUtility.merge3({}, this.settings, settings);
				},
				async setVersion(correlationId, version) {
					// this.$logger.debug('store', 'getVersion', 'version', version, correlationId);
					// commit('setVersion', { correlationId: correlationId, version: version });
					this.$logger.debug('store', 'setVersion', 'version', version, correlationId);
					this.version = version;
				}
			},
			getters: {
				getFlightDate: (state) => () => {
					return state.flightDate;
				},
				getFlightInfoStyle: (state) => (id) => {
					if (!state.flightInfoStyle)
						return null;
					return state.flightInfoStyle.find(l => l.id);
				},
				getFlightLocation: (state) => () => {
					return state.flightLocation;
				},
				getFlightPathStyle: (state) => (id) => {
					if (!state.flightPathStyle)
						return null;
					return state.flightPathStyle.find(l => l.id);
				},
				getFlightTitle: (state) => () => {
					return state.flightTitle;
				},
				getMotorSearchCriteria: (state) => () => {
					return state.motorSearchCriteria;
				},
				getPlan: (state) => (id) => {
					if (state.plans == null)
						return null;
					return state.plans.find(plan => plan.id === id);
				},
				getSettings: (state) => (id) => {
					return state.settings ? state.settings : AppUtility.initializeSettingsUser();
				}
			},
			dispatcher: {
				async getMotorManufacturers(correlationId, results) {
					return await GlobalUtility.$store.getMotorManufacturers(correlationId, results);
				},
				async getPlans(correlationId) {
					await GlobalUtility.$store.getPlans(correlationId);
				},
				async getVersion(correlationId) {
					await GlobalUtility.$store.getVersion(correlationId);
				},
				async initialize(correlationId) {
					await GlobalUtility.$store.initialize(correlationId);
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
				},
				async setSettings(correlationId, settings) {
					await GlobalUtility.$store.setSettings(correlationId, settings);
				}
			}
		};
	}

	_initModules() {
		// Admin Update
	}

	_initPluginPersist() {
		return {
			root: {
				key: 'rocket_tools',
				includePaths: [
					'flightInfoResolution',
					'flightInfoStyle',
					'flightPathStyle',
					'motorManufacturers',
					'motorSearchCriteria',
					'plans',
					'settings',
					'version'
				]
			}
		};
	}
}

export default AppStore;
