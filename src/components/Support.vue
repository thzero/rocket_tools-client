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
import { useBaseSupportComponent } from '@thzero/library_client_vue3/components/baseSupport';

export default {
	name: 'Support',
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
			success,
		} = useBaseSupportComponent(props, context);

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
		};
	}
};
</script>

<style scoped>
</style>
