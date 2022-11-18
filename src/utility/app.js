import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import SettingsUser from '@/common/data/settingsUser';

class AppUtility {
	static measurementUnitEnglish = 'english';
	static measurementUnitMetric = 'metric';

	static isDebug = false;

	static dateFormat(locale) {
		locale = !String.isNullOrEmpty(locale) ? locale : AppUtility.getLocale();
		const formatObj = new Intl.DateTimeFormat(locale).formatToParts(new Date());
		return formatObj.map(obj => {
			switch (obj.type) {
			case 'day':
				return 'DD';
			case 'month':
				return 'MM';
			case 'year':
				return 'YYYY';
			default:
				return obj.value;
			}
		}).join('');
	}

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
		return new SettingsUser();
	}

	static getLocale() {
		return (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;
	}

	static isNull(value) {
		return !value || value === undefined;
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

	static measurementUnits() {
		return [AppUtility.measurementUnitEnglish, AppUtility.measurementUnitMetric];
	}

	static selectOptions(options, trans, prefix, funcId, funcName, funcValue) {
		if (!options || !trans || !Array.isArray(options))
			return [];

		prefix = (prefix && prefix !== '') ? prefix + '.' : '';

		const output = options.map(l => {
			let id = l;
			if (funcId)
				id = funcId(l);

			let nameLookup = id;
			if (funcName)
				nameLookup = funcName(l);
			let name = trans(prefix + nameLookup);
			if (String.isNullOrEmpty(name))
				name = trans(prefix + nameLookup + '.title');

			let value = l;
			if (funcValue)
				value = funcValue(l);

			return {
				id: id,
				name: name,
				value: value
			};
		});
		return output;
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
