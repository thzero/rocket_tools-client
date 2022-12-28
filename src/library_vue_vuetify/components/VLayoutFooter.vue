<template>
	<v-footer
		app
		absolute
	>
		<VVersion :version="version" />
		<v-spacer />
		<VCopyright :version="version" />
		<span
			v-if="isDev"
			style="padding-left: 4px;"
		>
			{{ breakpointName }}
		</span>
	</v-footer>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';

import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

// import base from '@/library_vue/components/base';
import { useBaseComponent } from '@/library_vue/components/base';

import VCopyright from './VCopyright';
import VVersion from './VVersion';

export default {
	name: 'VtLayoutFooter',
	components: {
		VCopyright,
		VVersion
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
			success,
		} = useBaseComponent(props, context);

		const useDisplayI = useDisplay();

		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);

		const version = ref({});

		const breakpointName = computed(() => {
			// return LibraryUtility.isDev ? $vuetify.display.name : '';
			return LibraryUtility.isDev ? useDisplayI.name : '';
		});
		const isDev = computed(() => {
			return LibraryUtility.isDev;
		});

		onMounted(async () => {
			await serviceStore.dispatcher.requestVersion(correlationId());
			version.value = serviceStore.state.version;
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
			breakpointName,
			isDev,
			version
		};
	},
	// data: () => ({
	// 	version: {}
	// }),
	// computed: {
	// 	breakpointName() {
	// 		return LibraryUtility.isDev ? this.$vuetify.display.name : '';
	// 	},
	// 	isDev() {
	// 		return LibraryUtility.isDev;
	// 	}
	// },
	// async created() {
	// 	await GlobalUtility.$store.dispatcher.root.requestVersion(this.correlationId());
	// 	this.version = GlobalUtility.$store.state.version;
	// }
};
</script>

<style scoped>
</style>
