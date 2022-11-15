<template>
	<v-layout
		wrap
	>
		<v-flex
			xs12
			pb-2
		>
			<v-card>
				<v-card-text>
					<span class="headline">{{ $t('titles.settings') }}</span>
				</v-card-text>
			</v-card>
		</v-flex>
		<v-flex
			xs12
		>
			<v-card
				class="mx-auto mb-4"
			>
				<v-card-text>
					<v-layout
						wrap
					>
						<v-flex
							xs12
							pb-2
							pr-2
							pt-2
						>
							<v-layout
								wrap
							>
								<v-flex
									xs9
								>
									<v-card-title
										class="title mb-1 pt-1"
									>
										{{ name }}
									</v-card-title>
								</v-flex>
								<v-flex
									xs3
									style="text-align: right;"
								>
									<v-avatar
										tile
										size="80"
										color="grey"
									>
										<img
											v-if="hasPicture"
											:src="picture"
											class="responsive"
										>
									</v-avatar>
								</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
				</v-card-text>
			</v-card>
		</v-flex>
		<v-flex
			xs12
		>
			<VFormControl
				:pre-complete-ok="preComplete"
				@close="close"
				@cancel="cancel"
				@ok="ok"
				@open="open"
			>
				<v-layout
					wrap
				>
					<v-flex
						xs12
					>
						<v-card
							class="mb-3"
						>
							<v-card-text>
								<VTextFieldWithValidation
									ref="gamerTag"
									v-model="user.settings.gamerTag"
									rules="min:3|max:30|"
									vid="gamerTag"
									:label="$t('forms.gamerTag')"
									:counter="30"
								/>
							</v-card-text>
						</v-card>
					</v-flex>
				</v-layout>
			</VFormControl>
		</v-flex>

		<VConfirmationDialog
			:non-recoverable="true"
			:signal="dialogLocationDeleteSignal.signal"
			:pre-complete-ok="dialogLocationDeletePreCompleteOk"
			@cancel="dialogLocationDeleteCancel"
			@ok="dialogLocationDeleteOk"
		/>
		<v-snackbar
			ref="snackbar"
			v-model="snackbar"
			:timeout="timeout"
		>
			{{ $t('messages.saved') }}
		</v-snackbar>
	</v-layout>
</template>

<script>
import VConfirmationDialog from '@/library_vue/components/VConfirmationDialog';
import VFormControl from '@/library_vue/components/form/VFormControl';
import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

import baseSettings from '@/library_vue/components/baseSettings';

export default {
	name: 'Settings',
	components: {
		VConfirmationDialog,
		VFormControl,
		VTextFieldWithValidation
	},
	extends: baseSettings
};
</script>

<style scoped>
</style>
