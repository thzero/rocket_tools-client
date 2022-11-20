import LibraryConstants from '@thzero/library_client/constants';
import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import SettingsUser from '@/common/data/settingsUser';

class AppUtility {
	static isDebug = false;

	// TODO: move to library
	static debug(args) {
		if (!AppUtility.isDebug)
			return;
		console.debug(args);
	}

	// TODO: move to library
	static debug2(name, value) {
		if (!AppUtility.isDebug)
			return;

		// eslint-disable-next-line no-unneeded-ternary
		const output = name + ': ' + (value ? value : 'null');
		console.debug(output);
	}

	static info(args) {
		console.info(args);
	}

	static initializeSettingsUser() {
		const settings = new SettingsUser();
		settings.measurementUnits = Constants.MeasurementUnits.English;
		return settings;
	}

	static settings() {
		return GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_SETTINGS);
	}

	static userDisplayName(user) {
		if (!user || !user.settings)
			return '';

		const settings = user.settings ? user.settings : AppUtility.initializeSettingsUser();
		const userName = settings && settings.gamerTag ? settings.gamerTag : user.external && user.external.name ? user.external.name : '******';
		return userName;
	}

	static _injector = null;
	static set injector(value) {
		AppUtility._injector = value;
	}

	static get injector() {
		return AppUtility._injector;
	}
}

export default AppUtility;
