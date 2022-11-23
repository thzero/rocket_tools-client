<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
// import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';

import baseApp from '@/library_vue/components/baseApp';

export default {
	name: 'App',
	extends: baseApp,
	setup(props) {
		return Object.assign(baseApp.setup(props), {
		});
	},
	created: function () {
		window.addEventListener('beforeunload', function (event) {
			GlobalUtility.$EventBus.emit('beforeunload');
		}, false);
	},
	methods: {
		initialize(correlationId) {
			console.debug(GlobalUtility);
			Object.entries(GlobalUtility).forEach(([key, value]) => {
				console.log(key, value); // "someKey" "some value", "hello" "world", "js javascript foreach object"
			});
			return [
				GlobalUtility.$store.dispatcher.initialize(correlationId)
			];
		}
	}
};
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}

	#nav {
		padding: 30px;
	}

	#nav a {
		font-weight: bold;
		color: #2c3e50;
	}

	#nav a.router-link-exact-active {
		color: #42b983;
	}
	/* .bg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-color: black;
			background: url( '/images/background.png') no-repeat center center;
			background-attachment: fixed;
	} */

	.displayLink {
		cursor: pointer;
		text-decoration: underline;
	}

	.q-section-with-actions {
		padding-bottom: 4px !important;
	}
</style>
