import Constants from '@/constants';

import apiService from '@/service/api';
import authService from '@thzero/library_client_firebase/service';
import downloadService from '@/service/download';
import flightInfoProcessorService from '@/service/flightInfo/index';
import flightInfoProcessorEggtimerService from '@/service/flightInfo/processors/eggtimer';
import flightPathProcessorService from '@/service/flightPath/index';
import flightPathProcessorFeatherweightService from '@/service/flightPath/processors/featherweight';
import restCommunicationService from '@thzero/library_client_service_rest_axios';
import thrust2WeightToolsService from '@/service/tools/thrust2Weight';
import thrustCurveMotoSearchExternalServics from '@/service/external/motorSearchThrustCurve';
import settingsService from '@/service/settings';
import storeService from '@thzero/library_client_vue3/service/store/pinia'; // STORE TYPE
// import storeService from '@thzero/library_client_vue3/service/store/vuex'; // STORE TYPE
import userService from '@/service/user';
import versionService from '@/service/version';

import BaseServices from '@thzero/library_client_vue3/boot/baseServices';

import storeF from '@/store/pinia'; // STORE TYPE
// import storeF from '@/store/vuex'; // STORE TYPE

class Services extends BaseServices {
	_initialize() {
		super._initialize();

		this._injectService(Constants.InjectorKeys.SERVICE_API, new apiService());
		this._injectService(Constants.InjectorKeys.SERVICE_DOWNLOAD, new downloadService());

		this._injectService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO_PROCESSOR, new flightInfoProcessorService());
		this._injectService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO_PROCESSOR_EGGTIMER, new flightInfoProcessorEggtimerService());
		this._injectService(Constants.InjectorKeys.SERVICE_FLIGHT_PATH_PROCESSOR, new flightPathProcessorService());
		this._injectService(Constants.InjectorKeys.SERVICE_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT, new flightPathProcessorFeatherweightService());

		this._injectService(Constants.InjectorKeys.SERVICE_TOOLS_THRUST2WEIGHT, new thrust2WeightToolsService());

		this._injectService(Constants.InjectorKeys.SERVICE_EXTERNAL_MOTOR_SEARCH, new thrustCurveMotoSearchExternalServics());
	}

	_initializeAuth() {
		return new authService();
	}

	_initializeCommunicationRest() {
		return new restCommunicationService();
	}

	_initializeSettings() {
		return new settingsService();
	}

	_initializeStore(injector) {
		return new storeService(injector);
	}

	_initializeUser() {
		return new userService();
	}

	_initializeVersion() {
		return new versionService();
	}
}

export const bootServices = Services;
export const store = storeF;
