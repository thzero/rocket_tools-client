<template>
	<VFormDialog
		:label="label"
		:signal="signal"
		:pre-complete-ok="preComplete"
		max-width="750px"
		@cancel="cancel"
		@ok="ok"
	>
		<v-layout>
			<v-flex xs6>
				<VTextFieldWithValidation
					ref="id"
					v-model="id"
					vid="id"
					:label="$t('forms.id')"
					:readonly="true"
				/>
			</v-flex>
			<v-flex xs6>
				<VTextFieldWithValidation
					ref="externalId"
					v-model="externalId"
					vid="externalId"
					:label="$t('forms.externalId')"
					:readonly="true"
				/>
			</v-flex>
		</v-layout>

		<VTextFieldWithValidation
			ref="name"
			v-model="name"
			vid="name"
			:label="$t('forms.name')"
			:readonly="true"
		/>

		<VSelectWithValidation
			ref="roles"
			v-model="innerValue.roles"
			vid="roles"
			:items="roles"
			:multiple="true"
			:label="$t('forms.roles')"
		/>
	</VFormDialog>
</template>

<script>
import VUsersAdminFormDialog from '@/library_vue_vuetify/components/admin/users/VUsersAdminFormDialog';

export default {
	name: 'AdminUsersEditDialog',
	extends: VUsersAdminFormDialog
};
</script>

<style scoped>
</style>
