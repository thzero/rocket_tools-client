<template>
	<v-row
		wrap
	>
		<v-col
			cols="12"
			pb-2
		>
			<v-card>
				<v-card-text>
					<div class="support">
						<h1>Support</h1>
						<br>
						<h2>Lost? Need some help?</h2>
					</div>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import baseSupport from '@/library_vue/components/baseSupport';

export default {
	name: 'Support',
	extends: baseSupport,
	setup(props) {
		return Object.assign(baseSupport.setup(props), {
		});
	},
};
</script>

<style scoped>
</style>
