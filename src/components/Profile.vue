<template>
	<div>
		<h1>Welcome, {{ name }}</h1>
		<div>
			<img
				v-if="hasPicture"
				:src="picture"
				class="responsive"
			>
		</div>
	</div>
</template>

<script>
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import base from '@/library_vue/components/base';

export default {
	name: 'Profile',
	extends: base,
	setup(props) {
		return Object.assign(base.setup(props), {
		});
	},
	data: () => ({
		serviceStore: null,
		signedIn: false
	}),
	computed: {
		hasPicture() {
			return (this.user != null && this.user.external.picture != null && this.user.external.picture !== '');
		},
		name() {
			return (this.user != null && this.user.external.name != null ? this.user.external.name : '');
		},
		picture() {
			return (this.user != null && this.user.external.picture != null ? this.user.external.picture : null);
		},
		user() {
			return this.serviceStore.$store.state.user;
		}
	},
	created() {
		this.serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
	}
};
</script>

<style scoped>
</style>
