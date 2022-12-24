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
		settings.measurementUnits = {
			id: Constants.MeasurementUnits.english.id
		};
		settings.measurementUnits.id = Constants.MeasurementUnits.english.id;
		settings.measurementUnits.acceleration = Constants.MeasurementUnits.english.acceleration.default;
		settings.measurementUnits.area = Constants.MeasurementUnits.english.area.default;
		settings.measurementUnits.distance = Constants.MeasurementUnits.english.distance.default;
		settings.measurementUnits.velocity = Constants.MeasurementUnits.english.velocity.default;
		settings.measurementUnits.volume = Constants.MeasurementUnits.english.volume.default;
		settings.measurementUnits.weight = Constants.MeasurementUnits.english.weight.default;
		return settings;
	}

	static measurementUnits() {
		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
		const settings = serviceStore.getters.user.getUserSettings();
		return settings && settings.measurementUnits && settings.measurementUnits.id ? settings.measurementUnits.id : Constants.MeasurementUnits.english;
	}

	static measurementUnitsOptions() {
		return [ Constants.MeasurementUnits.english.id, Constants.MeasurementUnits.metrics.id ];
	}

	static measurementUnitsWeightPoundsDisplay(settings) {
		const measurementUnits = settings && settings.measurementUnits && settings.measurementUnits.id ? settings.measurementUnits.id : Constants.MeasurementUnits.english;
		return GlobalUtility.$trans.t('measurementUnits.' + measurementUnits + '.weight.pounds');
	}

	static userDisplayName(correlationId, user) {
		if (!user || !user.settings)
			return '';

		const settings = user.settings ? user.settings : null;
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
