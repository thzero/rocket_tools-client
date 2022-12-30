<template>
	<div>
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-card-text class="pa-8">
<p class="text-h6 text-center pb-4">Mobile App</p>

<VMarkdown v-model="text" :use-github=false />

<p class="text-h6 text-center pt-4 pb-4">Download it today!</p>

		<v-row>
			<v-col cols="3">
			</v-col>
			<v-col cols="3" class="text-center">
				<div v-if="deviceiOsAvailable">
<a :href="deviceiOsUrl"><img src="/images/mobile/ios-app-store.svg" height="44"></a>
				</div>
				<div v-if="!deviceiOsAvailable">
<div class="pb-2">{{ $t('mobileApp.notYetAvailable') }}</div>
<img src="/images/mobile/ios-app-store.svg" height="44">
				</div>
			</v-col>
			<v-col cols="3" class="text-center">
				<div v-if="deviceAndroidAvailable">
<a :href="deviceAndroidUrl"><img src="/images/mobile/google-play-store.png" height="44"></a>
				</div>
				<div v-if="!deviceAndroidAvailable">
<div class="pb-2">{{ $t('mobileApp.notYetAvailable') }}</div>
<img src="/images/mobile/google-play-store.png" height="44">
				</div>
			</v-col>
		</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { computed, ref } from 'vue';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import { useBaseComponent } from '@/library_vue/components/base';

import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';

export default {
	name: 'MobileApp',
	components: {
		VMarkdown
	},
	setup(props, context) {
		const {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success
		} = useBaseComponent(props, context);

		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);

		const deviceAndroidUrl = ref(Constants.External.store.android);
		const deviceiOsUrl = ref(Constants.External.store.ios);

		const deviceAndroidAvailable = computed(() => {
			return !String.isNullOrEmpty(deviceAndroidUrl.value);
		});
		const deviceiOsAvailable = computed(() => {
			return !String.isNullOrEmpty(deviceAndroidUrl.value);
		});
		const text = computed(() => {
			return GlobalUtility.$trans.t('mobileApp.text1');
// 			return `
// The RocketSidekick mobile application (for Android, and eventually iOSd) provides additional capabilities that 
// provides some additional capabilities that are focused in the field usage.  Not all of the capabilities will be available on both
// applications.

// The mobile applications capabilities are:

// * Ability to calculate Thrust to Weight ratios
// * Ability to search motors via ThrurstCurve.org's applications
// * Search results are cached on the mobile device
//   * Create and maintain <sup>1</sup>
//   * Launch preparation checklists
//   * Rocket inventory
//   * Parachute inventory
//   * Altimeter inventory
//   * GPS Tracker inventory
// * Execute a preparation checklist for a launch
// * Track launches and success or failure of the launch <sup>1</sup>

// <sup>1</sup>&nbsp;Items marked with an asterik will also sync with the web application and may also be available to maintain within the web application.
// `;
		});

		return {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			deviceAndroidUrl,
			deviceiOsUrl,
			deviceAndroidAvailable,
			deviceiOsAvailable,
			serviceStore,
			text,
		};
	}
};
</script>

<style scoped>
</style>
