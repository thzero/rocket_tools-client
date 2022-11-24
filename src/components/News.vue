<template>
	<div class="row">
		<div class="col-12">
			<div class="q-pb-md">
				<div class="row"
					v-for="item in news"
					:key="item.id"
				>
					<q-card class="news-card">
						<q-card-section>
							<span class="title text-capitalize">{{ item.title }}</span>
							<div>
								<span class="caption">{{ getDateHuman(item.timestamp) }}</span>
							</div>
						</q-card-section>
						<q-card-section>
							<QMarkdown v-model="item.article" />
						</q-card-section>
					</q-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed } from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import LibraryUtility from '@thzero/library_common/utility';
import GlobalUtility from '@thzero/library_client/utility/global';

import base from '@/library_vue/components/base';
import QMarkdown from '@/library_vue_quasar/components/markup/QMarkdown';

export default {
	name: 'AppNews',
	components: {
		QMarkdown
	},
	extends: base,
	setup(props) {
		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
		const news = computed(() => {
			if (!serviceStore.state.news.latest)
				return [];
			const newsS = LibraryUtility.sortByTimestamp(serviceStore.state.news.latest.filter(l => l.sticky));
			const news = LibraryUtility.sortByTimestamp(serviceStore.state.news.latest.filter(l => !l.sticky));
			return newsS.concat(news);
		});
		return Object.assign(base.setup(props), {
			news
		});
	}
	// computed: {
	// 	news() {
	// 		if (!this.$store.state.news.latest)
	// 			return [];
	// 		const newsS = LibraryUtility.sortByTimestamp(this.$store.state.news.latest.filter(l => l.sticky));
	// 		const news = LibraryUtility.sortByTimestamp(this.$store.state.news.latest.filter(l => !l.sticky));
	// 		return newsS.concat(news);
	// 	}
	// }
};
</script>

<style scoped>
</style>
