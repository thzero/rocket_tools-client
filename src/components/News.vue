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
import LibraryUtility from '@thzero/library_common/utility';

import base from '@/library_vue/components/base';
import QMarkdown from '@/library_vue_quasar/components/markup/QMarkdown';

export default {
	name: 'AppNews',
	components: {
		QMarkdown
	},
	extends: base,
	setup(props) {
		return Object.assign(base.setup(props), {
		});
	},
	computed: {
		news() {
			if (!this.$store.state.news.latest)
				return [];
			const newsS = LibraryUtility.sortByTimestamp(this.$store.state.news.latest.filter(l => l.sticky));
			const news = LibraryUtility.sortByTimestamp(this.$store.state.news.latest.filter(l => !l.sticky));
			return newsS.concat(news);
		}
	}
};
</script>

<style scoped>
</style>
