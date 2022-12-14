<template>
	<div>
		<v-row
			dense
			:pt-4="$vuetify.display.smAndDown && newsCount > 0"
			:pt-2="$vuetify.display.mdAndUp || newsCount === 0"
		>
			<v-col
				md="6"
				lg="4"
				xl="4"
				class="pb-4"
				v-if="$vuetify.display.mdAndUp"
			>
				<v-card
					class="mb-2"
				>
					<v-card-item>
						<v-badge :content="newsCount" inline>
 							<p class="text-h5">
								{{ $t('titles.newsLatest') }}&nbsp;&nbsp;
							</p>
						</v-badge>
					</v-card-item>
				</v-card>
				<News />
			</v-col>
			<v-col
				col="12"
				md="6"
				lg="8"
				xl="8"
				:pl-2="$vuetify.display.mdAndUp"
			>
				<v-card
					class="mb-2"
				>	
					<v-card-item>
						<v-row dense>
							<v-col
								cols="12"
							>
								<div class="text-center text-h5">
									{{ $t('strings.welcome') }} {{ $t('titles.application') }} {{ userDisplayName }}
									<!-- <v-chip
										class="float-right"
										color="success"
										outlined
										label
									>
										{{ userDisplayName }}
									</v-chip> -->
								</div>
							</v-col>
							<v-col
								cols="12"
							>
								<p>
									{{ $t('strings.content.welcome') }}
								</p><br/>
								<p>
									{{ $t('strings.content.welcome2') }}
								</p><br/>
							</v-col><v-col
								cols="12"
								class="text-center"
							>
								<hr />
							</v-col>
							<v-col
								v-for="item in tools"
								:key="item.name"
								cols="12"
								md="6"
								lg="4"
								class="text-center"
							>
								<v-card class="mb-2" variant="outlined">
									<v-card-item>
										<v-btn variant="flat" block class="mr-2" color="primary"
											:to="item.link"
										>
											{{ $t(item.title) }}
										</v-btn>
									</v-card-item>
									<v-card-text class="text-left">
										{{ $t(item.description) }}
									</v-card-text>
								</v-card>
							</v-col>
							<v-col
								cols="12"
								class="text-center"
							>
								<hr />
							</v-col>
							<v-col
								v-for="item in info"
								:key="item.name"
								cols="12"
								md="6"
								lg="4"
								class="text-center"
							>
								<v-card class="mb-2" variant="outlined">
									<v-card-item>
										<v-btn variant="flat" block class="mr-2" color="primary"
											:to="item.link"
										>
											{{ $t(item.title) }}
										</v-btn>
									</v-card-item>
									<v-card-text class="text-left">
										{{ $t(item.description) }}
									</v-card-text>
								</v-card>
							</v-col>
							<!-- 
							<v-col
								cols="12"
								class="text-center"
							>
								<hr />
							</v-col>
							<v-col
								cols="12"
							>
								<p>
									{{ $t('strings.content.welcome1a') }}
									<a :href="externalGithub" target="_blank">{{ externalGithub }}</a>
									{{ $t('strings.content.welcome1b') }}
								</p>
							</v-col> 
							-->
						</v-row>
					</v-card-item>
				</v-card>
			</v-col>
			<v-col
				v-if="$vuetify.display.smAndDown"
				id="element"
				cols="12"
				class="pb-4"
			>
				<v-card
					class="mb-2"
				>
					<v-card-text>
						<v-badge :content="newsCount" inline>
 							<p class="text-h5">
								{{ $t('titles.newsLatest') }}&nbsp;&nbsp;
							</p>
						</v-badge>
					</v-card-text>
				</v-card>
				<News />
			</v-col>
		</v-row>
		<VLoadingOverlay
			:signal="initializeCompleted"
		/>
	</div>
</template>

<script>
import { computed, ref } from 'vue';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';

import { useBaseComponent } from '@/library_vue/components/base';

import News from '@/components/News';
import VLoadingOverlay from '@/library_vue_vuetify/components/VLoadingOverlay';

const DelayMs = 0; // 250

export default {
	name: 'AppHome',
	components: {
		News,
		VLoadingOverlay
	},
	setup(props, context) {
		const {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
		} = useBaseComponent(props, context);

		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);

		const externalGithub = ref(Constants.External.github);
		const initializeCompleted = ref(false);

		const info = computed(() => {
			let temp = serviceStore.state.content;
			if (!temp)
				return [];
			if (!temp.info)
				return [];
			return temp.info.sort((a, b) => a.order >= b.order);
		});
		const tools = computed(() => {
			let temp = serviceStore.state.content;
			if (!temp)
				return [];
			if (!temp.tools)
				return [];
			return temp.tools.sort((a, b) => a.order >= b.order);
		});
		const isLoggedIn = computed(() => {
			return serviceStore.user && serviceStore.userAuthIsLoggedIn;
		});
		const newsCount = computed(() => {
			if (!serviceStore.state.news.latest)
				return 0;

			const news = serviceStore.state.news.latest.slice(0);
			return news.length;
		});
		const user = computed(() => {
			return serviceStore.user;
		});
		const userDisplayName = computed(() => {
			return AppUtility.userDisplayName(correlationId(), serviceStore.user);
		});

		GlobalUtility.$EventBus.on('initialize-completed', (value) => {
			initializeCompleted.value = value;
		});

		return {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			externalGithub,
			info,
			initializeCompleted,
			isLoggedIn,
			newsCount,
			serviceStore,
			tools,
			user,
			userDisplayName
		};
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
					GlobalUtility.$store.dispatcher.news.getLatest(correlationId)
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
