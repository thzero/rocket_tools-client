<template>
	<div>
		<div class="row justify-center">
			<div class="col-xs-12">
				<q-card class="my-card">
					<q-card-section>
						<div class="support">
							<h1>Support</h1>
							<br>
							<h2>Lost? Need some help?</h2>
						</div>
					</q-card-section>
				</q-card>
			</div>
		</div>
	</div>
</template>

<script>
import baseSupport from '@/library_vue/components/baseSupport';

export default {
	name: 'AppSupport',
	extends: baseSupport,
	setup(props) {
		return Object.assign(baseSupport.setup(props), {
		});
	}
};
</script>

<style scoped>
</style>
