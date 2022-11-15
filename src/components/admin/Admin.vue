<template>
	<v-container fluid>
		<v-navigation-drawer
			v-model="drawer"
			absolute
			temporary
			style="z-index: 2"
		>
			<v-list
				dense
				class="pt-0"
			>
				<v-list-item @click="clickTab(0)">
					<v-list-item-action>
						<v-icon>new_releases</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ $t('admin.news') }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<div class="flex-container">
			<div
				class="flex-item hidden-sm-and-down"
				style="padding-top: 10px"
			>
				<v-tabs
					v-model="tabSupport.currentTab"
					vertical
					@change="clickTab"
				>
					<v-tab
						v-for="tab of tabSupport.tabs"
						:key="tab.index"
						style="justify-content: start; margin-left: 0px"
						@click="clickTab(tab.index)"
					>
						<v-icon
							v-if="tab.icon"
							left
						>
							{{ tab.icon }}
						</v-icon>
						{{ tab.label }}
					</v-tab>
				</v-tabs>
			</div>
			<div class="flex-item2">
				<!-- // Admin Update -->
				<NewsListing v-if="tabSupport.currentTab === tabNews" />
				<UsersListing v-if="tabSupport.currentTab === tabUsers" />
			</div>
		</div>
	</v-container>
</template>

<script>
import baseAdmin from '@/library_vue/components/baseAdmin';

// Admin Update

export default {
	name: 'Admin',
	components: {
		// Admin Update
	},
	extends: baseAdmin,
	data: () => ({
		// Admin Update
		tabNews: 0,
		tabUsers: 3
	}),
	methods: {
		initializeTabs() {
			// TODO: Depending on security results, only some of these should be displayed...
			// Admin Update
			this.tabSupport.add(this.tabNews, 'new_releases', this.$trans.t('admin.news'));
			this.tabSupport.add(this.tabUsers, 'new_releases', this.$trans.t('admin.users'));
		}
	}
};
</script>

<style scoped>
.flex-container {
	padding: 0;
	margin: 0;
	list-style: none;

	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;

	height: 100%;
}

.flex-item {
	flex-grow: 0;
	margin-right: 10px;
}

.flex-item2 {
	flex-grow: 1;
}

.v-navigation-drawer--temporary {
	z-index: auto;
}
</style>
