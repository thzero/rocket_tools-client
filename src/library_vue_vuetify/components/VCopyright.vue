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

import base from '@/library_vue/components/base';

export default {
	name: 'VtCopyright',
	extends: base,
	props: {
		version: {
			type: Object,
			default: null
		}
	},
	setup(props) {
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

		return Object.assign(base.setup(props), {
			author,
			authorUrl,
			copyright,
			hasAuthor,
			hasCopyright,
		});
	},
	// data () {
	// 	return {};
	// },
	// computed: {
	// 	author() {
	// 		return this.version.client && this.version.client.author ? this.version.client.author : '';
	// 	},
	// 	authorUrl() {
	// 		return this.version.client && this.version.client.author ? this.version.client.author_url : '';
	// 	},
	// 	copyright() {
	// 		return this.version.client && this.version.client.copyright ? this.version.client.copyright : '';
	// 	},
	// 	hasAuthor() {
	// 		return this.version.client && this.version.client.author && this.version.client.author_url;
	// 	},
	// 	hasCopyright() {
	// 		return this.version.client && this.version.client.copyright;
	// 	}
	// }
};
</script>

<style scoped>
</style>
