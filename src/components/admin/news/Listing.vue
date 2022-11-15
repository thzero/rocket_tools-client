<template>
	<v-container pa-0>
		<v-row>
			<v-col>
				<v-data-table
					:headers="headers"
					:items="news"
					sort-by="timestamp"
					:sort-desc="false"
					class="elevation-1"
				>
					<template #top>
						<v-toolbar
							flat
							color="white"
						>
							<v-toolbar-title>{{ $t('titles.news') }}</v-toolbar-title>
							<v-divider
								class="mx-4"
								inset
								vertical
							/>
							<v-spacer />
							<v-btn
								color="primary"
								dark
								class="mb-2"
								@click="dialogEditOpen(null, true)"
							>
								{{ $t('titles.new') }}
							</v-btn>
						</v-toolbar>
					</template>
					<template #[`item.article`]="{ item }">
						<VMarkdown v-model="item.article" />
					</template>
					<template #[`item.sticky`]="{ item }">
						<span>{{ item.sticky ? $t('strings.yes') : $t('strings.no') }}</span>
					</template>
					<template #[`item.requiresAuth`]="{ item }">
						<span>{{ item.requiresAuth ? $t('strings.yes') : $t('strings.no') }}</span>
					</template>
					<template #[`item.status`]="{ item }">
						<span>{{ $t(`news.status.${item.status}`) }}</span>
					</template>
					<template #[`item.timestamp`]="{ item }">
						<span>{{ getDateHuman(item.timestamp) }}</span>
					</template>
					<template #[`item.action`]="{ item }">
						<v-icon
							small
							class="mr-2"
							@click="dialogEditOpen(item, false)"
						>
							edit
						</v-icon>
						<v-icon
							small
							@click="dialogDeleteOpen(item)"
						>
							delete
						</v-icon>
					</template>
					<template #no-data>
						{{ $t('news.noData') }}
					</template>
				</v-data-table>
				<EditDialog
					ref="editDialog"
					:label="dialogEditItemTitle"
					:signal="dialogEditSignal.signal"
					@cancel="dialogEditCancel"
					@ok="dialogEditOk"
				/>
				<VConfirmationDialog
					:non-recoverable="true"
					:signal="dialogDeleteSignal.signal"
					:pre-complete-ok="dialogDeletePreCompleteOk"
					@cancel="dialogDeleteCancel"
					@ok="dialogDeleteOk"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import LibraryUtility from '@thzero/library_common/utility';

import baseListing from '@/library_vue/components/admin/news/baseListing';
import EditDialog from '@/components/admin/news/EditDialog';
import VMarkdown from '@/library_vue/components/markup/VMarkdown';

import NewsData from '@/common/data/news';

export default {
	name: 'AdminNewsListing',
	components: {
		EditDialog,
		VMarkdown
	},
	extends: baseListing,
	methods: {
		defaultItem() {
			return LibraryUtility.instantiate(new NewsData());
		},
		initializeHeaders() {
			return [
				{ text: this.$trans.t('news.name'), align: 'left', value: 'title', },
				{ text: this.$trans.t('news.article'), align: 'left', sortable: false, value: 'article' },
				{ text: this.$trans.t('news.sticky'), align: 'left', value: 'sticky' },
				{ text: this.$trans.t('news.requiresAuth'), align: 'left', value: 'requiresAuth' },
				{ text: this.$trans.t('news.publishDate'), align: 'left', value: 'timestamp' },
				{ text: this.$trans.t('news.statusName'), align: 'left', value: 'status' },
				{ text: this.$trans.t('news.actions'), align: 'right', value: 'action', sortable: false }
			];
		}
	}
};
</script>

<style scoped>
</style>
