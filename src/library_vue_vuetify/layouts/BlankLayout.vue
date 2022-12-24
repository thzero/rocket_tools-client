<template>
	<v-app id="root">
		<v-main>
			<span class="bg" />
			<v-container
				fluid
				pt-2
			>
				<router-view />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import baseLayout from '@/library_vue/layouts/baseLayout';

export default {
	name: 'BlankLayout',
	extends: baseLayout
};
</script>

<style scoped>
.toolbar-title {
	color: white;
	text-decoration: none;
}
</style>
