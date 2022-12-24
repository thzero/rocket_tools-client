<script>
import vOpenSource from '@/library_vue_vuetify/components/VOpenSource';

export default {
	name: 'OpenSource',
	extends: vOpenSource,
	setup(props) {
		const initializeDependenciesClient = async () => {
			return [
				{
					category: 'client',
					name: 'chart.js',
					url: 'https://github.com/chartjs/Chart.js',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/chartjs/Chart.js/blob/master/LICENSE.md'
				},
				// {
				//	 category: 'client',
				//	 name: 'decimal.js',
				//	 url: 'https://github.com/MikeMcl/decimal.js/',
				//	 licenseName: 'MIT',
				//	 licenseUrl: 'https://github.com/MikeMcl/decimal.js/blob/master/LICENCE.md'
				// },
				// {
				// 	category: 'client',
				// 	name: 'decimal.js',
				// 	url: 'https://github.com/MikeMcl/decimal.js-light',
				// 	licenseName: 'MIT',
				// 	licenseUrl: 'https://github.com/MikeMcl/decimal.js-light/blob/master/LICENCE.md'
				// },
				{
					category: 'client',
					name: 'papaparse',
					url: 'https://github.com/mholt/PapaParse',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/mholt/PapaParse/blob/master/LICENSE'
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
				}
			];
		};

		return Object.assign(vOpenSource.setup(props), {
			initializeDependenciesClient
		});
	},
};
</script>
