<template>
	<div>
		<span v-if="version !== null">{{ $t('version.label') }} {{ $t('version.majorMinorDate', version.client) }}&nbsp;-&nbsp;{{ $t('version.majorMinorDate', version.server) }}</span>
	</div>
</template>

<script>
import { computed } from 'vue';

// import base from '@/library_vue/components/base';
import { useBaseComponent } from '@/library_vue/components/base';

export default {
	name: 'VtVersion',
	props: {
		version: {
			type: Object,
			default: null
		}
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

		const innerVersion = computed(() => {
			return props.version;
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
			innerVersion
		};
	},
	// data () {
	// 	return {};
	// },
	// computed: {
	// 	innerVersion() {
	// 		return this.value;
	// 	}
	// }
};
</script>

<style scoped>
</style>
