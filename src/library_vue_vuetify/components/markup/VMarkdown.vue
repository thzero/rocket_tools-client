<template>
	<div>
		<!-- eslint-disable vue/no-v-html -->
		<div
			:class="markdownClass"
			style="background-color: transparent"
			v-html="display"
		/>
		<!--eslint-enable-->
	</div>
</template>

<script>
import baseMarkdown from '@/library_vue/components/markup/baseMarkdown';

export default {
	name: 'VtMarkdown',
	extends: baseMarkdown,
	setup (props) {
		return Object.assign(baseMarkdown.setup(props), {
		});
	}
};
</script>

<style scoped>
</style>
