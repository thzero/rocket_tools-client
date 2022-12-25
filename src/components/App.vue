<template>
	<router-view />
</template>

<script>
import { getCurrentInstance } from 'vue';
import { useTheme } from 'vuetify';

import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import baseApp from '@/library_vue/components/baseApp';

export default {
	name: 'App',
	extends: baseApp,
	setup(props) {
		const instance = getCurrentInstance();
		
		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);

		const initialize = async () => {
			return [
				instance.ctx.serviceStore.dispatcher.initialize(instance.ctx.correlationId())
			];
		};

		const theme = useTheme();
		const userTheme = () => {
			return !String.isNullOrEmpty(serviceStore.userTheme) ? serviceStore.userTheme : 'defaultTheme';
		};

		theme.global.name.value = userTheme;
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			theme.global.name.value = userTheme() + 'Dark';
		}
		// theme.global.current.dark = darkMode;

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
			const themeRequested = userTheme() + (event.matches ? 'Dark' : '');
			theme.global.name.value = themeRequested;
		});

		return Object.assign(baseApp.setup(props), {
			initialize,
			serviceStore
		});
	},
	// methods: {
	// 	initialize(correlationId) {
	// 		return [
	// 			GlobalUtility.$store.dispatcher.root.initialize(correlationId),
	// 		];
	// 	}
	// }
};
</script>

<style scoped>
</style>

<style>
	/* .bg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-color: black;
			background: url( '/images/background.png') no-repeat center center;
			background-attachment: fixed;
	} */

	.displayLink {
		cursor: pointer;
		text-decoration: underline;
	}
</style>
