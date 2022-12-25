<template>
	<div>
		<span v-if="version !== null">{{ $t('version.label') }} {{ $t('version.majorMinorDate', version.client) }}&nbsp;-&nbsp;{{ $t('version.majorMinorDate', version.server) }}</span>
	</div>
</template>

<script>
import { computed } from 'vue';

import base from '@/library_vue/components/base';

export default {
	name: 'VtVersion',
	extends: base,
	props: {
		version: {
			type: Object,
			default: null
		}
	},
	setup(props) {
		const innerVersion = computed(() => {
			return props.version;
		});

		return Object.assign(base.setup(props), {
			innerVersion
		});
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
