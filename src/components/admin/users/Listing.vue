<template>
	<v-container pa-0>
		<v-row>
			<v-col>
				<v-data-table
					:headers="headers"
					:items="users"
					multi-sort
					:sort-by="[ 'name' ]"
					:sort-desc="[ true, false, false, false ]"
					class="elevation-1"
				>
					<template #top>
						<v-toolbar
							flat
							color="white"
						>
							<v-toolbar-title>{{ $t('titles.users') }}</v-toolbar-title>
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
					<template #[`item.roles`]="{ item }">
						<span>{{ item && item.roles ? item.roles.join(', ') : '' }}</span>
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
						{{ $t('users.noData') }}
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
import baseAdminUsersList from '@/library_vue/components/admin/users/baseListing';
import EditDialog from '@/components/admin/users/EditDialog';

import UserData from '@/common/data/user';

export default {
	name: 'AdminUsersListing',
	components: {
		EditDialog
	},
	extends: baseAdminUsersList,
	methods: {
		defaultItem() {
			return new UserData();
		}
	}
};
</script>

<style scoped>
</style>
