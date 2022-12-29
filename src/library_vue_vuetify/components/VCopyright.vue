<template>
	<span v-if="version !== null">
		© <span v-if="hasCopyright">{{ copyright }}</span>
		<a
			v-if="hasAuthor"
			class="ml-1"
			target="_blank"
			:href="authorUrl"
		>{{ author }}</a>
	</span>
</template>

<script>
import { computed } from 'vue';

import { useBaseComponent } from '@/library_vue/components/base';

export default {
	name: 'VtCopyright',
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

		const author = computed(() => {
			return props.version && props.version.client && props.version.client.author ? props.version.client.author : '';
		});
		const authorUrl = computed(() => {
			return props.version && props.version.client && props.version.client.author && props.version.client.author_url ? props.version.client.author_url : '';
		});
		const copyright = computed(() => {
			return props.version && props.version.client && props.version.client.copyright ? props.version.client.copyright : '';
		});
		const hasAuthor = computed(() => {
			return props.version && props.version.client && props.version.client.author ? props.version.client.author : '';
		});
		const hasCopyright = computed(() => {
			return props.version && props.version.client && props.version.client.copyright ? props.version.client.copyright : '';
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
			author,
			authorUrl,
			copyright,
			hasAuthor,
			hasCopyright,
		};
	}
};
</script>

<style scoped>
</style>
