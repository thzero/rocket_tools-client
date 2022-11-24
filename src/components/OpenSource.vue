<script>
import QOpenSource from '@/library_vue_quasar/components/QOpenSource';

export default {
	name: 'OpenSource',
	extends: QOpenSource,
	setup(props) {
		return Object.assign(QOpenSource.setup(props), {
		});
	},
	methods: {
		initializeDependenciesClient() {
			return [
				{
					category: 'client',
					name: '@thzero/library_client',
					url: 'https://github.com/thzero/library_client',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_client/blob/master/license.md'
				},
				{
					category: 'client',
					name: '@thzero/library_client_firebase',
					url: 'https://github.com/thzero/library_client_firebase',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_client_firebase/blob/master/license.md'
				},
				{
					category: 'client',
					name: '@thzero/library_client_service_rest_axios',
					url: 'https://github.com/thzero/library_client_service_rest_axios',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_client_service_rest_axios/blob/master/license.md'
				},
				{
					category: 'client',
					name: '@thzero/library_common',
					url: 'https://github.com/thzero/library_common',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_common/blob/master/license.md'
				},
				{
					category: 'client',
					name: '@thzero/library_client_vue3',
					url: 'https://github.com/thzero/library_client_vue3',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_client_vue3/blob/master/license.md'
				},
				{
					category: 'client',
					name: '@thzero/library_client_vue3_components',
					url: 'https://github.com/thzero/library_client_vue3_components',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_client_vue3_components/blob/master/license.md'
				},
				{
					category: 'client',
					name: '@thzero/library_client_vue3_quasar',
					url: 'https://github.com/thzero/library_client_vue3_quasar',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_client_vue3_quasar/blob/master/license.md'
				},
				{
					category: 'client',
					name: 'async-mutex',
					url: 'https://github.com/DirtyHairy/async-mutex',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/DirtyHairy/async-mutex/blob/master/LICENSE'
				},
				{
					category: 'client',
					name: 'axios',
					url: 'https://github.com/axios/axios',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/axios/axios/blob/master/LICENSE'
				},
				{
					category: 'client',
					name: 'chart.js',
					url: 'https://github.com/chartjs/Chart.js',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/chartjs/Chart.js/blob/master/LICENSE.md'
				},
				{
					category: 'client',
					name: 'html2canvas',
					url: 'https://github.com/niklasvh/html2canvas',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/niklasvh/html2canvas/blob/master/LICENSE'
				},
				{
					category: 'client',
					name: 'papaparse',
					url: 'https://github.com/mholt/PapaParse',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/mholt/PapaParse/blob/master/LICENSE'
				},
				{
					category: 'client',
					name: 'dayjs',
					url: 'https://github.com/iamkun/dayjs',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/iamkun/dayjs/blob/dev/LICENSE'
				},
				{
					category: 'client',
					name: 'dayjs-plugin-utc',
					url: 'https://github.com/guisturdy/dayjs-plugin-utc',
					licenseName: '??',
					licenseUrl: ''
				},
				{
					category: 'client',
					name: 'decimal.js',
					url: 'https://github.com/MikeMcl/decimal.js-light',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/MikeMcl/decimal.js-light/blob/master/LICENCE.md'
				},
				{
					category: 'client',
					name: 'firebase',
					url: 'https://github.com/firebase/firebase-js-sdk',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/firebase/firebase-js-sdk/blob/master/LICENSE'
				},
				{
					category: 'client',
					name: 'github-markdown-css',
					url: 'https://github.com/sindresorhus/github-markdown-css',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/sindresorhus/github-markdown-css/blob/gh-pages/license'
				},
				{
					category: 'client',
					name: 'lodash',
					url: 'https://github.com/lodash/lodash',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/lodash/lodash/blob/master/LICENSE'
				},
				{
					category: 'client',
					name: 'nanoid',
					url: 'https://github.com/ai/nanoid',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/ai/nanoid/blob/main/LICENSE'
				},
				{
					category: 'client',
					name: 'pinia',
					url: 'https://github.com/vuejs/pinia',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/vuejs/pinia/blob/v2/LICENSE'
				},
				{
					category: 'client',
					name: 'pinia-plugin-persistedstate-2',
					url: 'https://github.com/iendeavor/pinia-plugin-persistedstate-2',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/iendeavor/pinia-plugin-persistedstate-2/blob/main/LICENSE'
				},
				{
					category: 'client',
					name: 'quasar',
					url: 'https://github.com/quasarframework/quasar',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/quasarframework/quasar/blob/dev/LICENSE'
				},
				{
					category: 'client',
					name: 'rocket_tools-client',
					url: 'https://github.com/thzero/rocket_tools-client',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/rocket_tools-client/blob/master/license.md'
				},
				{
					category: 'client',
					name: 'thenBy.js',
					url: 'https://github.com/Teun/thenBy.js',
					licenseName: 'Apache License 2.0',
					licenseUrl: 'https://github.com/Teun/thenBy.js/blob/master/LICENSE.TXT'
				},
				{
					category: 'client',
					name: 'vue',
					url: 'https://github.com/vuejs/vue',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/vuejs/vue/blob/dev/LICENSE'
				},
				// {
				// 	category: 'client',
				// 	name: 'vue-async-computed',
				// 	url: 'https://github.com/foxbenjaminfox/vue-async-computed',
				// 	licenseName: 'MIT',
				// 	licenseUrl: 'https://github.com/foxbenjaminfox/vue-async-computed/blob/master/LICENSE'
				// },
				{
					category: 'client',
					name: 'vue-i18n',
					url: 'https://github.com/kazupon/vue-i18n',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/kazupon/vue-i18n/blob/dev/LICENSE'
				},
				{
					category: 'client',
					name: 'vue-router',
					url: 'https://github.com/vuejs/vue-router',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/vuejs/vue-router/blob/dev/LICENSE'
				},
				{
					category: 'client',
					name: 'vuelidate',
					url: 'https://github.com/vuelidate/vuelidate',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/vuelidate/vuelidate/blob/next/LICENSE'
				}
				// {
				// 	category: 'client',
				// 	name: 'veux',
				// 	url: 'https://github.com/vuejs/vuex',
				// 	licenseName: 'MIT',
				// 	licenseUrl: 'https://github.com/vuejs/vuex/blob/dev/LICENSE'
				// },
				// {
				// 	category: 'client',
				// 	name: 'vuex-persist',
				// 	url: 'https://github.com/championswimmer/vuex-persist',
				// 	licenseName: 'MIT',
				// 	licenseUrl: 'https://github.com/championswimmer/vuex-persist/blob/master/LICENSE.md'
				// }
			];
		},
		initializeDependenciesServer() {
			return [
				{
					category: 'server',
					name: '@hapi/joi',
					url: 'https://github.com/hapijs/joi',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/hapijs/joi/blob/master/LICENSE.md'
				},
				{
					category: 'server',
					name: '@hapi/joi-date',
					url: 'https://github.com/hapijs/joi-date',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/hapijs/joi-date/blob/master/LICENSE.md'
				},
				{
					category: 'server',
					name: '@thzero/library_common',
					url: 'https://github.com/thzero/library_common',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_common/blob/master/license.md'
				},
				{
					category: 'server',
					name: '@thzero/library_common_service',
					url: 'https://github.com/thzero/library_common_service',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_common_service/blob/master/license.md'
				},
				{
					category: 'server',
					name: '@thzero/library_server',
					url: 'https://github.com/thzero/library_server',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_server/blob/master/license.md'
				},
				{
					category: 'server',
					name: '@thzero/library_server_fastify',
					url: 'https://github.com/thzero/library_server_fastify',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_server_fastify/blob/master/license.md'
				},
				{
					category: 'server',
					name: '@thzero/library_server_firebase',
					url: 'https://github.com/thzero/library_server_firebase',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_server_firebase/blob/master/license.md'
				},
				{
					category: 'server',
					name: '@thzero/library_server_logger_pino',
					url: 'https://github.com/thzero/library_server_logger_pino',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_server_logger_pino/blob/master/license.md'
				},
				{
					category: 'server',
					name: '@thzero/library_server_repository_mongo',
					url: 'https://github.com/thzero/library_server_repository_mongo',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_server_repository_mongo/blob/master/license.md'
				},
				{
					category: 'server',
					name: '@thzero/library_server_validation_joi',
					url: 'https://github.com/thzero/library_server_validation_joi',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_server_validation_joi/blob/master/license.md'
				},
				{
					category: 'server',
					name: '@thzero/library_server_validation_joi',
					url: 'https://github.com/thzero/library_server_validation_joi',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_server_validation_joi/blob/master/license.md'
				},
				{
					category: 'server',
					name: 'async-mutex',
					url: 'https://github.com/DirtyHairy/async-mutex',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/DirtyHairy/async-mutex/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'config',
					url: 'https://github.com/lorenwest/node-config',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/lorenwest/node-config/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'dayjs',
					url: 'https://github.com/iamkun/dayjs',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/iamkun/dayjs/blob/dev/LICENSE'
				},
				{
					category: 'server',
					name: 'dayjs-plugin-utc',
					url: 'https://github.com/guisturdy/dayjs-plugin-utc',
					licenseName: '??',
					licenseUrl: ''
				},
				// {
				//	 category: 'server',
				//	 name: 'decimal.js',
				//	 url: 'https://github.com/MikeMcl/decimal.js/',
				//	 licenseName: 'MIT',
				//	 licenseUrl: 'https://github.com/MikeMcl/decimal.js/blob/master/LICENCE.md'
				// },
				{
					category: 'server',
					name: 'decimal.js',
					url: 'https://github.com/MikeMcl/decimal.js-light',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/MikeMcl/decimal.js-light/blob/master/LICENCE.md'
				},
				{
					category: 'server',
					name: 'fastify',
					url: 'https://github.com/fastify/fastify',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/fastify/fastify/blob/main/LICENSE'
				},
				{
					category: 'server',
					name: 'firebase',
					url: 'https://github.com/firebase/firebase-js-sdk',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/firebase/firebase-js-sdk/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'jsonwebtoken',
					url: 'https://github.com/auth0/node-jsonwebtoken',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/auth0/node-jsonwebtoken/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'lodash',
					url: 'https://github.com/lodash/lodash',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/lodash/lodash/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'mongodb',
					url: 'https://github.com/mongodb/node-mongodb-native',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/mongodb/node-mongodb-native/blob/master/LICENSE.md'
				},
				{
					category: 'server',
					name: 'pino',
					url: 'https://github.com/pinojs/pino',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/pinojs/pino/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'rocket_tools-server',
					url: 'https://github.com/thzero/rocket_tools-server',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/rocket_tools-server/blob/master/license.md'
				},
				{
					category: 'server',
					name: 'short-uuid',
					url: 'https://github.com/oculus42/short-uuid',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/oculus42/short-uuid/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'terminus',
					url: 'https://github.com/godaddy/terminus',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/godaddy/terminus/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'uuid',
					url: 'https://github.com/kelektiv/node-uuid',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/kelektiv/node-uuid/blob/master/LICENSE.md'
				}
			];
		}
	}
};
</script>
