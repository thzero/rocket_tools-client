<template>
	<div>
		<div class="row justify-center">
			<div class="col-xs-12">
				<q-card class="my-card">
					<q-card-section>
						<div class="support">
							Forthcoming...
						</div>
					</q-card-section>
				</q-card>
			</div>
		</div>
	</div>
</template>

<script>
// import VConfirmationDialog from '@/library_vue/components/VConfirmationDialog';
// import VFormControl from '@/library_vue/components/form/VFormControl';
// import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

// import baseSettings from '@/library_vue/components/baseSettings';
import baseSettings from '@/library_vue/components/base'; // TODO

export default {
	name: 'AppSettings',
	// components: {
	// 	VConfirmationDialog,
	// 	VFormControl,
	// 	VTextFieldWithValidation
	// },
	extends: baseSettings,
	setup(props) {
		return Object.assign(baseSettings.setup(props), {
		});
	}
};
</script>

<style scoped>
</style>
