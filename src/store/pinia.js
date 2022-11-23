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
				motorSearch: {},
				plans: [],
				settings: AppUtility.initializeSettingsUser(),
				thrust2weight: {},
				version: null
			}),
			actions: {
				async getPlans(correlationId) {
					const service = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_PLANS);
					const response = await service.plans(correlationId);
					this.$logger.debug('store', 'getPlans', 'response', response, correlationId);
					if (Response.hasSucceeded(response)) {
						// commit('setPlans', { correlationId: correlationId, plans: response.results ? response.results.data : [] });
						// const params = { correlationId: correlationId, plans: response.results ? response.results.data : [] };
						// this.$logger.debug('store', 'setPlans', 'plans.a', params.plans, params.correlationId);
						// this.$logger.debug('store', 'setPlans', 'plans.b', this.state.plans, params.correlationId);
						// this.state.plans = params.plans;
						// this.$logger.debug('store', 'setPlans', 'plans.c', this.state.plans, params.correlationId);
						this.setPlans(correlationId, response.results ? response.results.data : []);
					}
				},
				async getVersion(correlationId) {
					const service = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_VERSION);
					const version = await service.version(correlationId);
					// this.$logger.debug('store', 'getVersion', 'version', version, correlationId);
					// commit('setVersion', { correlationId: correlationId, version: version });
					// const params = { correlationId: correlationId, version: version };
					// this.$logger.debug('store', 'setVersion', 'version', params.version, params.correlationId);
					// this.state.version = params.version;
					this.setVersion(correlationId, version);
				},
				async initialize(correlationId) {
					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_API);
					const response = await service.initialize(correlationId);
					// this.$logger.debug('store', 'initialize', 'response', response);
					if (Response.hasSucceeded(response)) {
						// commit('setPlans', { correlationId: correlationId, plans: response.results.plans });
						this.setPlans(correlationId, response.results.plans);
						// commit('setVersion', { correlationId: correlationId, version: response.results.version });
						this.setVersion(correlationId, response.results.version);
					}
				},
				async setFlightDate(correlationId, value) {
					// commit('setFlightDate', value);
					this.flightDate = value;
				},
				async setFlightInfoResolution(correlationId, value) {
					// commit('setFlightInfoResolution', value);
					this.flightInfoResolution = value;
				},
				async setFlightInfoStyle(correlationId, value) {
					// commit('setFlightInfoStyle', value);
					if (String.isNullOrEmpty(value.id))
						return;
					if (!this.flightInfoStyle)
						this.flightInfoStyle = [];
					this.flightInfoStyle = AppUtility.updateArrayByObject(this.flightInfoStyle, value);
				},
				async setFlightLocation(correlationId, value) {
					// commit('setFlightLocation', value);
					this.flightLocation = value;
				},
				async setFlightPathStyle(correlationId, value) {
					// commit('setFlightPathStyle', value);
					if (String.isNullOrEmpty(value.id))
						return;
					if (!this.flightPathStyle)
						this.flightPathStyle = [];
					this.flightPathStyle = AppUtility.updateArrayByObject(this.flightPathStyle, value);
				},
				async setFlightTitle(correlationId, value) {
					// commit('setFlightTitle', value);
					this.flightTitle = value;
				},
				async setMotorSearch(correlationId, value) {
					// commit('setMotorSearch', value);
					this.motorSearch = value;
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
				getMotorSearch: (state) => () => {
					return state.motorSearch;
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
			mutations: {
				// setFlightDate(state, value) {
				// 	state.flightDate = value;
				// },
				// setFlightInfoResolution(state, value) {
				// 	state.flightInfoResolution = value;
				// },
				// setFlightInfoStyle(state, value) {
				// 	if (String.isNullOrEmpty(value.id))
				// 		return;
				// 	if (!state.flightInfoStyle)
				// 		state.flightInfoStyle = [];
				// 	state.flightInfoStyle = AppUtility.updateArrayByObject(state.flightInfoStyle, value);
				// },
				// setFlightLocation(state, value) {
				// 	state.flightLocation = value;
				// },
				// setFlightPathStyle(state, value) {
				// 	if (String.isNullOrEmpty(value.id))
				// 		return;
				// 	if (!state.flightPathStyle)
				// 		state.flightPathStyle = [];
				// 	state.flightPathStyle = AppUtility.updateArrayByObject(state.flightPathStyle, value);
				// },
				// setFlightTitle(state, value) {
				// 	state.flightTitle = value;
				// },
				// setMotorSearch(state, value) {
				// 	state.motorSearch = value;
				// },
				// setCheckumLastUpdate(state, last) {
				// 	state.checksumLastUpdate = last;
				// },
				// setPlans(state, params) {
				// 	this.$logger.debug('store', 'setPlans', 'plans.a', params.plans, params.correlationId);
				// 	this.$logger.debug('store', 'setPlans', 'plans.b', state.plans, params.correlationId);
				// 	state.plans = params.plans;
				// 	this.$logger.debug('store', 'setPlans', 'plans.c', state.plans, params.correlationId);
				// },
				// setSettings(state, params) {
				// 	state.settings = LibraryUtility.merge3({}, state.settings, params);
				// },
				// setVersion(state, params) {
				// 	this.$logger.debug('store', 'setVersion', 'version', params.version, params.correlationId);
				// 	state.version = params.version;
				// }
			},
			dispatcher: {
				// async getPlans(correlationId) {
				// 	await GlobalUtility.$store.dispatch('getPlans', correlationId);
				// },
				// async getVersion(correlationId) {
				// 	await GlobalUtility.$store.dispatch('getVersion', correlationId);
				// },
				// async initialize(correlationId) {
				// 	await GlobalUtility.$store.dispatch('initialize', correlationId);
				// },
				// async setSettings(correlationId, settings) {
				// 	await GlobalUtility.$store.dispatch('setSettings', { correlationId: correlationId, settings: settings });
				// }
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
				async setMotorSearch(correlationId, value) {
					await GlobalUtility.$store.setMotorSearch(correlationId, value);
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
	}
}

export default AppStore;
