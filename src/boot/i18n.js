import VueBasei18n from '@thzero/library_client_vue3/boot/basei18n';

import resources from '@/locales';

export default class AppVueBasei18n extends VueBasei18n {
	_initMessages() {
		return resources;
	}
}
