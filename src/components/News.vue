<template>
	<v-container>
		<v-row dense>
			<v-col
				v-for="item in news"
				:key="item.id"
				cols="12"
				class="pl-1 pr-1"
			>
				<v-card
					outlined
				>
					<v-card-item>
						<v-card-title>
							<span class="title text-capitalize">{{ item.title }}</span>
						</v-card-title>
						<v-card-subtitle>
							<v-row
								dense
								align="center"
								justify="end"
								class="mr-1"
							>
								<span class="caption">{{ getDateHuman(item.timestamp) }}</span>
							</v-row>
						</v-card-subtitle>
					</v-card-item>
					<v-card-text class="body-1">
						<VMarkdown v-model="item.article" />
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { computed } from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import CommonUtility from '@thzero/library_common/utility';
import LibraryUtility from '@thzero/library_common/utility';
import GlobalUtility from '@thzero/library_client/utility/global';

import { useBaseComponent } from '@/library_vue/components/base';

import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';

export default {
	name: 'AppNews',
	components: {
		VMarkdown
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
			success
		} = useBaseComponent(props, context);

		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
		
		const getDateHuman = computed(() => {
			return LibraryUtility.getDateHuman(date);
		});
		const news = computed(() => {
			if (!serviceStore.state.news.latest)
				return [];
			const newsS = CommonUtility.sortByTimestamp(serviceStore.state.news.latest.filter(l => l.sticky));
			const news = CommonUtility.sortByTimestamp(serviceStore.state.news.latest.filter(l => !l.sticky));
			return newsS.concat(news);
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
			getDateHuman,
			news
		};
	}
};
</script>

<style scoped>
</style>
