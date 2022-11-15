<template>
	<div class="row">
		<div class="col-3">
			<div class="q-pb-md">
				<q-card class="latest-newsxxx-card">
					<q-card-section>
						<div class="col-12 text-center text-h5 q-pb-sm text-capitalize">
							{{ $t('titles.newsLatest') }}
						</div>
					</q-card-section>
					<q-card-section>
						<News/>
					</q-card-section>
				</q-card>
			</div>
		</div>
		<div class="col-9">
			<div class="col-12 text-center text-h5 q-pb-sm">
				{{ $t('titles.welcome') }} {{ $t('titles.application') }}
			</div>
		</div>
	</div>
</template>

<script>
import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

import base from '@/library_vue/components/base';

import News from '@/components/News';

const DelayMs = 0; // 250

export default {
	name: 'Home',
	setup(props) {
		return Object.assign(base.setup(props), {
		});
	},
	components: {
		News
	},
	extends: base,
	data: () => ({
		initializeCompleted: false,
		sortKeys: [
			{ id: 'name', name: 'Name' },
			{ id: 'faction', name: 'Faction' }
		]
	}),
	computed: {
		isLoggedIn() {
			return this.$store.state.user && this.$store.state.user.isLoggedIn;
		},
		newsCount() {
			if (!this.$store.state.news.latest)
				return 0;

			const news = this.$store.state.news.latest.slice(0);
			return news.length;
		},
		user() {
			return this.$store.state.user.user;
		},
		userDisplayName() {
			const user = this.$store.state.user.user;
			const settings = user.settings ? user.settings : AppUtility.initializeSettingsUser();
			const userName = settings && settings.gamerTag ? settings.gamerTag : user.external && user.external.name ? user.external.name : '******';
			return userName;
		}
	},
	created() {
		const self = this;
		GlobalUtility.$EventBus.on('initialize-completed', (value) => {
			self.initializeCompleted = value;
		});
	},
	methods: {
		getSettingsUserTab(correlationId, user, funcAttribute) {
			if (!user || !user.settings)
				return null;

			const settings = user.settings ? user.settings : AppUtility.initializeSettingsUser();
			return funcAttribute(settings.home);
		},
		updateSettingsUserTab(correlationId, user, newVal, func) {
			const settings = user.settings ? user.settings : AppUtility.initializeSettingsUser();
			func(settings.home, newVal);
			this.$store.dispatcher.user.setUserSettings(correlationId, settings);
		}
	},
	// eslint-disable-next-line
	async beforeRouteEnter (to, from, next) {
		// called before the route that renders this component is confirmed.
		// does NOT have access to `this` component instance,
		// because it has not been created yet when this guard is called!
		(async () => {
			try {
				GlobalUtility.$EventBus.emit('initialize-completed', false);

				const correlationId = LibraryUtility.generateId();

				await Promise.all([
					GlobalUtility.$store.dispatcher.news.getLatest(correlationId)
				]);
			}
			finally {
				const timeout = setTimeout(function () {
					GlobalUtility.$EventBus.emit('initialize-completed', true);
					clearTimeout(timeout);
				}, DelayMs);
			}
		})().catch(err => {
			// eslint-disable-next-line
			console.error(err);
		});
		next();
	},
	// eslint-disable-next-line
	async beforeRouteUpdate (to, from, next) {
		// called when the route that renders this component has changed,
		// but this component is reused in the new route.
		// For example, for a route with dynamic params `/foo/:id`, when we
		// navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
		// will be reused, and this hook will be called when that happens.
		// has access to `this` component instance.
		(async () => {
			const self = this;
			try {
				this.initializeCompleted = false;

				const correlationId = this.correlationId();

				await Promise.all([
					this.$store.dispatcher.news.getLatest(correlationId)
				]);
			}
			finally {
				const timeout = setTimeout(function () {
					self.initializeCompleted = true;
					clearTimeout(timeout);
				}, DelayMs);
			}
		})().catch(err => {
			// eslint-disable-next-line
			console.error(err);
		});
		next();
	}
};
</script>

<style scoped>
</style>
