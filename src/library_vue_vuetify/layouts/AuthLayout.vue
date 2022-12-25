<template>
	<v-app id="root">
		<v-app-bar
			app
			color="primary"
			density="compact"
		>
			<template v-slot:prepend>
				<v-app-bar-nav-icon
					class="hidden-md-and-up"
					@click.stop="toggleDrawer"
				>
				</v-app-bar-nav-icon>
			</template>
			<v-app-bar-title class="headline text-uppercase">
				<router-link
					to="/"
					class="toolbar-title"
				>
					{{ $t('titles.application') }}
				</router-link>
			</v-app-bar-title>
		</v-app-bar>
		<v-main>
			<span class="bg" />
			<v-container
				fluid
				pt-2
			>
				<router-view />
			</v-container>
		</v-main>
		<VLayoutFooter />
	</v-app>
</template>

<script>
import baseLayout from '@/library_vue/layouts/baseLayout';

import VLayoutFooter from '@/library_vue_vuetify/components/VLayoutFooter';

export default {
	name: 'AuthLayout',
	components: {
		VLayoutFooter,
		// VVersion
	},
	extends: baseLayout,
	setup(props) {
		return Object.assign(baseLayout.setup(props), {
		});
	},
};
</script>

<style scoped>
.toolbar-title {
	color: white;
	text-decoration: none;
}
</style>
