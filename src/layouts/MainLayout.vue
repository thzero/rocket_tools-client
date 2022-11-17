<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar class="text-white">
				<q-btn
					:class="`${$q.screen.gt.sm ? 'hidden': ''}`"
					flat
					dense
					round
					@click="toggleDrawer"
					aria-label="Menu"
					icon="menu"
				>
					<q-menu auto-close>
						<q-list style="min-width: 100px">
							<q-item clickable to="/flightInfo">
								<q-item-section>{{ $t('menu.tools.flightInfo') }}</q-item-section>
							</q-item>
							<q-item clickable to="/flightPath">
								<q-item-section>{{ $t('menu.tools.flightPath') }}</q-item-section>
							</q-item>
							<q-item clickable to="/thrust2Weight">
								<q-item-section>{{ $t('menu.tools.thrust2Weight') }}</q-item-section>
							</q-item>
							<q-item href="https://www.thrustcurve.org" target="_blank">
								<q-item-section>{{ $t('menu.thrustcurve') }}</q-item-section>
							</q-item>
						</q-list>
					</q-menu>
				</q-btn>

				<q-toolbar-title class="text-left">
					<router-link
						to="/"
						class="toolbar-title"
					>
						{{ $t('titles.application') }}
					</router-link>
				</q-toolbar-title>

				<q-space />

				<q-btn
					:class="`q-mr-sm ${$q.screen.lt.md ? 'hidden': ''}`"
					color="secondary"
					clickable
					to="/flightInfo"
					:label="$t('menu.tools.flightInfo')"
				/>
				<q-btn
					:class="`q-mr-sm ${$q.screen.lt.md ? 'hidden': ''}`"
					class="q-mr-sm"
					color="secondary"
					clickable
					to="/flightPath"
					:label="$t('menu.tools.flightPath')"
				/>
				<q-btn
					:class="`q-mr-sm ${$q.screen.lt.md ? 'hidden': ''}`"
					class="q-mr-sm"
					color="secondary"
					clickable
					to="/thrust2Weight"
					:label="$t('menu.tools.thrust2Weight')"
				/>
				<q-btn
					:class="`q-mr-sm ${$q.screen.lt.md ? 'hidden': ''}`"
					color="secondary"
					href="https://www.thrustcurve.org"
					target="_blank"
					:label="$t('menu.thrustcurve')"
				/>

				<q-btn
					flat
					dense
					round
					@click="toggleDrawer"
					aria-label="Menu"
					icon="more_vert"
				>
					<q-menu auto-close>
						<q-list style="min-width: 100px">
							<!-- <q-item clickable to="/settings">
								<q-item-section avatar>
									<q-avatar text-color="black" icon="settings" />
								</q-item-section>
								<q-item-section>{{ $t('titles.settings') }}</q-item-section>
							</q-item> -->
							<!-- <q-item clickable to="/support">
								<q-item-section avatar>
									<q-avatar text-color="black" icon="help" />
								</q-item-section>
								<q-item-section>{{ $t('titles.support') }}</q-item-section>
							</q-item> -->
							<q-item clickable to="/openSource">
								<q-item-section avatar>
									<q-avatar text-color="black" icon="mdi-open-source-initiative" />
								</q-item-section>
								<q-item-section>{{ $t('titles.openSource') }}</q-item-section>
							</q-item>
							<q-separator />
							<q-item
								v-if="!isLoggedIn"
								clickable
								v-ripple
								@click="clickSignIn">
								<q-item-section avatar>
									<q-avatar text-color="green" icon="power_settings_new" />
								</q-item-section>
								<q-item-section>{{ $t('titles.signIn') }}</q-item-section>
							</q-item>
							<q-item
								v-if="isLoggedIn"
								clickable
								v-ripple
								@click="dialogSignOut.open()">
								<q-item-section avatar>
									<q-avatar text-color="red" icon="power_settings_new" />
								</q-item-section>
								<q-item-section>{{ $t('titles.signOut') }}</q-item-section>
							</q-item>
						</q-list>
					</q-menu>
				</q-btn>
			</q-toolbar>
		</q-header>

		<!-- <q-drawer
			v-model="drawerOpen"
			show-if-above
			bordered
			class="bg-grey-2"
		>
			<q-list>
				<q-item-label header>Essential Links</q-item-label>
				<q-item clickable tag="a" target="_blank" href="https://quasar.dev">
					<q-item-section avatar>
						<q-icon name="school" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Docs</q-item-label>
						<q-item-label caption>quasar.dev</q-item-label>
					</q-item-section>
				</q-item>
				<q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
					<q-item-section avatar>
						<q-icon name="code" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Github</q-item-label>
						<q-item-label caption>github.com/quasarframework</q-item-label>
					</q-item-section>
				</q-item>
				<q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
					<q-item-section avatar>
						<q-icon name="chat" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Discord Chat Channel</q-item-label>
						<q-item-label caption>chat.quasar.dev</q-item-label>
					</q-item-section>
				</q-item>
				<q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
					<q-item-section avatar>
						<q-icon name="forum" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Forum</q-item-label>
						<q-item-label caption>forum.quasar.dev</q-item-label>
					</q-item-section>
				</q-item>
				<q-item clickable tag="a" target="_blank" href="https://twitter.com/quasarframework">
					<q-item-section avatar>
						<q-icon name="rss_feed" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Twitter</q-item-label>
						<q-item-label caption>@quasarframework</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-drawer> -->

		<QLayoutFooter />

		<q-page-container>
			<q-page class="q-pa-md">
				<router-view />
			</q-page>
		</q-page-container>

		<QLoadingOverlay
			:signal="isAuthCompleted"
		/>

		<QConfirmationDialog
			:non-recoverable="false"
			:signal="dialogSignOut.signal"
			@cancel="dialogSignOut.cancel()"
			@ok="dialogSignOutOk"
		/>
	</q-layout>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';

// import LibraryConstants from '@thzero/library_client/constants';

// import LibraryUtility from '@thzero/library_common/utility/index';
import GlobalUtility from '@thzero/library_client/utility/global';

// import Constants from '@/constants';

import baseMainLayout from '@/library_vue/layouts/baseMainLayout';

import QLayoutFooter from '@/library_vue_quasar/components/QLayoutFooter';
import QLoadingOverlay from '@/library_vue_quasar/components/QLoadingOverlay';

import QConfirmationDialog from '@/library_vue_quasar/components/QConfirmationDialog';
// import VDisplayDialog from '@/library_vue/components/VDisplayDialog';

import DialogSupport from '@/library_vue/components/support/dialog';

export default {
	name: 'MainLayout',
	components: {
		QConfirmationDialog,
		QLayoutFooter,
		QLoadingOverlay
		// VConfirmationDialog,
		// VDisplayDialog
	},
	extends: baseMainLayout,
	setup() {
		const $q = useQuasar();

		$q.loading.show({
			delay: 400 // ms
		});

		$q.loading.hide();

		const drawerOpen = ref(false);
		const version = ref(null);

		const dialogNewGame = ref(new DialogSupport());

		const store = useStore();
		const instance = getCurrentInstance();

		const getVersion = async () => {
			await store.dispatcher.root.getVersion(instance.ctx.correlationId());
			version.value = store.state.version;
		};

		GlobalUtility.$EventBus.on('main-menu-toggle-drawer', () => {
			drawerOpen.value = !drawerOpen.value;
		});

		onMounted(() => {
			getVersion();
		});

		return Object.assign(baseMainLayout.setup(), {
			dialogNewGame,
			drawerOpen,
			// markup,
			version,
			getVersion
		});
	}
};
</script>

<style scoped>
.toolbar-title {
	color: white;
	text-decoration: none;
}
</style>
