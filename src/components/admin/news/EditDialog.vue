<template>
	<VNewsAdminFormDialog
		:label="label"
		:signal="signal"
		:pre-complete-ok="preComplete"
		max-width="750px"
		@cancel="cancel"
		@ok="ok"
	>
		<VTextFieldWithValidation
			ref="title"
			v-model="innerValue.title"
			vid="title"
			rules="required|min:3|max:30|"
			:label="$t('forms.title')"
			:counter="30"
		/>

		<VMarkdownEditor
			:key="randomKey"
			ref="article"
			v-model="innerValue.article"
			vid="article"
			:options="editorOptions"
		/>

		<VCheckboxWithValidation
			ref="sticky"
			v-model="innerValue.sticky"
			vid="sticky"
			:label="$t('forms.news.sticky')"
		/>

		<VCheckboxWithValidation
			ref="requiresAuth"
			v-model="innerValue.requiresAuth"
			vid="requiresAuth"
			:label="$t('forms.news.requiresAuth')"
		/>

		<VDateTimeFieldWithValidation
			ref="timestamp"
			v-model="innerValue.timestamp"
			vid="timestamp"
			rules="required"
			:output-type="outputType"
			:date-format="dateFormat"
			:time-format="timeFormat"
			:label="$t('forms.news.publishDate')"
		/>
	</VNewsAdminFormDialog>
</template>

<script>
import VNewsAdminFormDialog from '@/library_vue/components/admin/news/VNewsAdminFormDialog';

export default {
	name: 'AdminNewsEditDialog',
	components: {
		VNewsAdminFormDialog
	},
	extends: VNewsAdminFormDialog,
	computed: {
	}
};
</script>

<style scoped>
</style>
