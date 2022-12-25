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
import { computed, getCurrentInstance, onMounted, ref } from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

import base from '@/library_vue/components/base';
import VCopyright from './VCopyright';
import VVersion from './VVersion';

export default {
	name: 'VtLayoutFooter',
	components: {
		VCopyright,
		VVersion
	},
	extends: base,
	setup(props) {
		const instance = getCurrentInstance();

		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);

		const version = ref({});

		const breakpointName = computed(() => {
			return LibraryUtility.isDev ? instance.ctx.$vuetify.display.name : '';
		});
		const isDev = computed(() => {
			return LibraryUtility.isDev;
		});

		onMounted(async () => {
			await serviceStore.dispatcher.requestVersion(instance.ctx.correlationId());
			version.value = serviceStore.state.version;
		});

		return Object.assign(base.setup(props), {
			breakpointName,
			isDev,
			version
		});
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
