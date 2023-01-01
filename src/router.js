import { createRouter, createWebHistory } from 'vue-router';

import GlobalUtility from '@thzero/library_client/utility/global';

// const routes = [
// 	{
// 		path: '/',
// 		component: () => import('./layouts/MainLayout.vue'),
// 		children: [
// 			{
// 				path: '',
// 				name: 'default',
// 				component: () => import('./components/Home.vue'),
// 				meta: {
// 					requiresAuth: false
// 				}
// 			}
// 		]
// 	},
// 	{
// 		path: '/home',
// 		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './layouts/MainLayout.vue'),
// 		children: [
// 			{
// 				path: '',
// 				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './components/Home.vue'),
// 				meta: {
// 					requiresAuth: false
// 				}
// 			}
// 		]
// 	},
// 	{
// 		path: '/flightInfo',
// 		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './layouts/MainLayout.vue'),
// 		children: [
// 			{
// 				path: '',
// 				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './components/content/FlightInfo.vue'),
// 				meta: {
// 					requiresAuth: false
// 				}
// 			}
// 		]
// 	},
// 	{
// 		path: '/flightPath',
// 		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './layouts/MainLayout.vue'),
// 		children: [
// 			{
// 				path: '',
// 				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './components/content/FlightPath.vue'),
// 				meta: {
// 					requiresAuth: false
// 				}
// 			}
// 		]
// 	},
// 	{
// 		path: '/thrust2Weight',
// 		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './layouts/MainLayout.vue'),
// 		children: [
// 			{
// 				path: '',
// 				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './components/content/Thrust2Weight.vue'),
// 				meta: {
// 					requiresAuth: false
// 				}
// 			}
// 		]
// 	},
// 	// {
// 	// 	path: '/admin',
// 	// 	component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-admin" */ '@/library_vue_vuetify/layouts/AdminLayout.vue'),
// 	// 	children: [
// 	// 		{
// 	// 			path: '',
// 	// 			name: 'admin',
// 	// 			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-admin" */ './components/admin/Admin.vue'),
// 	// 			meta: {
// 	// 				requiresAuth: true
// 	// 			}
// 	// 		}
// 	// 	]
// 	// },
// 	{
// 		path: '/openSource',
// 		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-openSource" */ './layouts/MainLayout.vue'),
// 		children: [
// 			{
// 				path: '',
// 				name: 'openSource',
// 				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-openSource" */ './components/OpenSource.vue'),
// 				meta: {
// 					requiresAuth: false
// 				}
// 			}
// 		]
// 	},
// 	{
// 		path: '/settings',
// 		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-settings" */ './layouts/MainLayout.vue'),
// 		children: [
// 			{
// 				path: '',
// 				name: 'settings',
// 				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-settings" */ './components/Settings.vue'),
// 				meta: {
// 					requiresAuth: true
// 				}
// 			}
// 		]
// 	},
// 	{
// 		path: '/support',
// 		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './layouts/MainLayout.vue'),
// 		children: [
// 			{
// 				path: '',
// 				name: 'support',
// 				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/Support.vue'),
// 				meta: {
// 					requiresAuth: true
// 				}
// 			}
// 		]
// 	},
// 	{
// 		path: '/auth',
// 		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-auth" */ '@/library_vue_vuetify/layouts/AuthLayout.vue'),
// 		children: [
// 			{
// 				path: '',
// 				name: 'auth',
// 				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-auth" */ './components/Auth.vue'),
// 				meta: {
// 					requiresAuth: false
// 				}
// 			}
// 		]
// 	},
// 	{
// 		path: '/notFound',
// 		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-notFound" */ '@/library_vue_vuetify/layouts/BlankLayout.vue'),
// 		children: [
// 			{
// 				path: '',
// 				name: 'notFound',
// 				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-notFound" */ './components/NotFound.vue'),
// 				meta: {
// 					requiresAuth: false
// 				}
// 			}
// 		]
// 	},
// 	{
// 		path: '/:pathMatch(.*)',
// 		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-blank" */ '@/library_vue_vuetify/layouts/BlankLayout.vue'),
// 		meta: {
// 			notFound: true,
// 			requiresAuth: false
// 		}
// 	},
// 	// Always leave this as last one,
// 	// but you can also remove it
// 	{
// 		path: '/:catchAll(.*)*',
// 		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-notFound" */ '@/library_vue_vuetify/layouts/BlankLayout.vue'),
// 		children: [
// 			{
// 				path: '',
// 				name: 'notFound',
// 				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-notFound" */ './components/NotFound.vue'),
// 				meta: {
// 					requiresAuth: false
// 				}
// 			}
// 		]
// 	}
// ];
const routes = [
	{
		path: '/',
		component: () => import('./layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'default',
				component: () => import('./components/Home.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/landing',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'mobileapp',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'mobileapp',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-mobile-app" */ './components/MobileAppLanding.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/content/info/epoxy',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				// path: '',
				// name: 'epoxy',
				// component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content" */ './layouts/ContentLayout.vue'),
				// children: [
				// 	{
						path: '',
						name: 'epoxy',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/info/Epoxy.vue'),
						meta: {
							requiresAuth: false
						}
				// 	}
				// ]
			}
		]
	},
	{
		path: '/content/tools/flightInfo',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'flightInfo',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-tools" */ './layouts/ToolsLayout.vue'),
				children: [
					{
						path: '',
						name: 'flightInfo',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-tools" */ './components/content/tools/flightInfo/FlightInfo.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/content/tools/flightPath',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'flightPath',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-tools" */ './layouts/ToolsLayout.vue'),
				children: [
					{
						path: '',
						name: 'flightPath',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-tools" */ './components/content/tools/flightPath/FlightPath.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/content/tools/thrust2Weight',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'thrust2Weight',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'thrust2Weight',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content" */ './components/content/tools/Thrust2Weight.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/openSource',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'openSource',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/OpenSource.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/settings',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'settings',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/Settings.vue'),
				meta: {
					requiresAuth: true
				}
			}
		]
	},
	{
		path: '/support',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'support',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/Support.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},{
		path: '/auth',
		component: () => import(/* webpackPrefetch: true */ '@/library_vue_vuetify/layouts/AuthLayout.vue'),
		children: [
			{
				path: '',
				name: 'auth',
				component: () => import('./components/Auth.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	// {
	// 	path: '/auth',
	// 	component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-auth" */ '@/library_vue_vuetify/layouts/AuthLayout.vue'),
	// 	children: [
	// 		{
	// 			path: '',
	// 			name: 'auth',
	// 			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-auth" */ './components/Auth.vue'),
	// 			meta: {
	// 				requiresAuth: false
	// 			}
	// 		}
	// 	]
	// },
	// {
	// 	path: '/notFound',
	// 	component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-notFound" */ '@/library_vue_vuetify/layouts/BlankLayout.vue'),
	// 	children: [
	// 		{
	// 			path: '',
	// 			name: 'notFound',
	// 			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-notFound" */ './components/NotFound.vue'),
	// 			meta: {
	// 				requiresAuth: false
	// 			}
	// 		}
	// 	]
	// },
	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import(/* webpackPrefetch: true */ '@/library_vue_vuetify/layouts/BlankLayout.vue'),
		children: [
			{
				path: '',
				name: 'notFound',
				component: () => import(/* webpackPrefetch: true */ '@/library_vue_vuetify/components/VNotFound.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	// {
	// 	path: '/:catchAll(.*)*',
	// 	component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-catchAll" */ '@/library_vue_vuetify/layouts/BlankLayout.vue'),
	// 	children: [
	// 		{
	// 			path: '',
	// 			name: 'notFound',
	// 			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-catchAll" */ '@/library_vue_vuetify/components/VNotFound.vue'),
	// 			meta: {
	// 				requiresAuth: false
	// 			}
	// 		}
	// 	]
	// }
];

const router = createRouter({
	// history: createWebHashHistory(),
	history: createWebHistory(process.env.BASE_URL),
	routes
});

// eslint-disable-next-line
router.beforeResolve((to, from, next) => {
	if (to.matched.some(record => record.meta.notFound)) {
		GlobalUtility.$navRouter.push('/notFound');
		return;
	}

	next();
});

export default router;
