<template>
	<v-container>
		<v-row justify="center">
			<v-alert type="error">
				{{ $t('errors.notFound') }}
			</v-alert>
		</v-row>
		<v-row
			justify="center"
			class="mb-8"
		>
			<v-img
				src="/icons/notFound.png"
				:width="imageWidth"
				:max-width="imageWidth"
			/>
		</v-row>
		<v-row justify="center">
			<v-btn
				color="primary"
				@click="clickHome"
			>
				{{ $t('titles.home') }}
			</v-btn>
		</v-row>
	</v-container>
</template>

<script>
import baseNotFound from '@/library_vue/components/baseNotFound';

export default {
	name: 'VNotFound',
	extends: baseNotFound,
	setup(props) {
		return Object.assign(baseNotFound.setup(props), {
		});
	},
};
</script>

<style scoped>
</style>
