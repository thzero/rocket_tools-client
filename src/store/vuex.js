import VuexPersist from 'vuex-persist';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

import BaseStore from '@thzero/library_client_vue3/store/vuex';

class AppStore extends BaseStore {
	_init() {
		return {
			modules: {
			},
			state: {
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
			},
			actions: {
				async setFlightDate({ commit }, params) {
					commit('setFlightDate', params.value);
				},
				async setFlightInfoResolution({ commit }, params) {
					commit('setFlightInfoResolution', params.value);
				},
				async setFlightInfoStyle({ commit }, params) {
					commit('setFlightInfoStyle', params.value);
				},
				async setFlightLocation({ commit }, params) {
					commit('setFlightLocation', params.value);
				},
				async setFlightPathStyle({ commit }, params) {
					commit('setFlightPathStyle', params.value);
				},
				async setFlightTitle({ commit }, params) {
					commit('setFlightTitle', params.value);
				},
				async setMotorSearch({ commit }, params) {
					commit('setMotorSearch', params.value);
				},
				async getPlans({ commit }, correlationId) {
					const service = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_PLANS);
					const response = await service.plans(correlationId);
					this.$logger.debug('store', 'getPlans', 'response', response, correlationId);
					if (Response.hasSucceeded(response))
						commit('setPlans', { correlationId: correlationId, plans: response.results ? response.results.data : [] });
				},
				async getVersion({ commit }, correlationId) {
					const service = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_VERSION);
					const version = await service.version(correlationId);
					// this.$logger.debug('store', 'getVersion', 'version', version, correlationId);
					commit('setVersion', { correlationId: correlationId, version: version });
				},
				async initialize({ commit }, correlationId) {
					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_API);
					const response = await service.initialize(correlationId);
					// this.$logger.debug('store', 'initialize', 'response', response);
					if (Response.hasSucceeded(response)) {
						commit('setPlans', { correlationId: correlationId, plans: response.results.plans });
						commit('setVersion', { correlationId: correlationId, version: response.results.version });
					}
				},
				async setSettings({ commit }, params) {
					commit('setSettings', params);
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
				setFlightDate(state, value) {
					state.flightDate = value;
				},
				setFlightInfoResolution(state, value) {
					state.flightInfoResolution = value;
				},
				setFlightInfoStyle(state, value) {
					if (String.isNullOrEmpty(value.id))
						return;
					if (!state.flightInfoStyle)
						state.flightInfoStyle = [];
					state.flightInfoStyle = LibraryUtility.updateArrayByObject(state.flightInfoStyle, value);
				},
				setFlightLocation(state, value) {
					state.flightLocation = value;
				},
				setFlightPathStyle(state, value) {
					if (String.isNullOrEmpty(value.id))
						return;
					if (!state.flightPathStyle)
						state.flightPathStyle = [];
					state.flightPathStyle = LibraryUtility.updateArrayByObject(state.flightPathStyle, value);
				},
				setFlightTitle(state, value) {
					state.flightTitle = value;
				},
				setMotorSearch(state, value) {
					state.motorSearch = value;
				},
				setCheckumLastUpdate(state, last) {
					state.checksumLastUpdate = last;
				},
				setPlans(state, params) {
					this.$logger.debug('store', 'setPlans', 'plans.a', params.plans, params.correlationId);
					this.$logger.debug('store', 'setPlans', 'plans.b', state.plans, params.correlationId);
					state.plans = params.plans;
					this.$logger.debug('store', 'setPlans', 'plans.c', state.plans, params.correlationId);
				},
				setSettings(state, params) {
					state.settings = LibraryUtility.merge3({}, state.settings, params);
				},
				setVersion(state, params) {
					this.$logger.debug('store', 'setVersion', 'version', params.version, params.correlationId);
					state.version = params.version;
				}
			},
			dispatcher: {
				async getPlans(correlationId) {
					await GlobalUtility.$store.dispatch('getPlans', correlationId);
				},
				async getVersion(correlationId) {
					await GlobalUtility.$store.dispatch('getVersion', correlationId);
				},
				async initialize(correlationId) {
					await GlobalUtility.$store.dispatch('initialize', correlationId);
				},
				async setFlightDate(correlationId, value) {
					await GlobalUtility.$store.dispatch('setFlightDate', { correlationId: correlationId, value: value });
				},
				async setFlightInfoResolution(correlationId, value) {
					await GlobalUtility.$store.dispatch('setFlightInfoResolution', { correlationId: correlationId, value: value });
				},
				async setFlightInfoStyle(correlationId, value) {
					await GlobalUtility.$store.dispatch('setFlightInfoStyle', { correlationId: correlationId, value: value });
				},
				async setFlightLocation(correlationId, value) {
					await GlobalUtility.$store.dispatch('setFlightLocation', { correlationId: correlationId, value: value });
				},
				async setFlightPathStyle(correlationId, value) {
					await GlobalUtility.$store.dispatch('setFlightPathStyle', { correlationId: correlationId, value: value });
				},
				async setFlightTitle(correlationId, value) {
					await GlobalUtility.$store.dispatch('setFlightTitle', { correlationId: correlationId, value: value });
				},
				async setMotorSearch(correlationId, value) {
					await GlobalUtility.$store.dispatch('setMotorSearch', { correlationId: correlationId, value: value });
				},
				async setSettings(correlationId, settings) {
					await GlobalUtility.$store.dispatch('setSettings', { correlationId: correlationId, settings: settings });
				}
			}
		};
	}

	_initModules() {
		// Admin Update
	}

	_initPluginPersist() {
		return new VuexPersist({
			storage: window.localStorage,
			reducer: state => ({
				flightInfoResolution: state.flightInfoResolution,
				flightInfoStyle: state.flightInfoStyle,
				flightPathStyle: state.flightPathStyle,
				motorSearch: state.motorSearch,
				plans: state.plans,
				settings: state.settings,
				version: state.version
			})
		});
	}
}

export default AppStore;
