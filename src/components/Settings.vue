<template>
	<div>
		<div>
			<div>
				<div class="row">
					<div class="col-12 text-center text-h5 q-pb-sm">
						{{ $t('titles.settings') }}
					</div>
				</div>
				<div>
					<QFormWrapper
						ref="frm"
						:validation="validation"
						:resetForm="resetForm"
						buttonClearName="buttons.reset"
						buttonOkName="buttons.save"
						@ok="ok"
					>
						<template v-slot:default>
							<div class="row">
								<div class="col-xs-12 col-sm-6">
									<QSelectWithValidation
										class="q-mr-sm"
										ref="measurementUnit"
										v-model="measurementUnitsF"
										vid="measurementUnit"
										:items="measurementUnits"
										:validation="validation"
										:dense="true"
										:label="$t('forms.settings.measurementUnits')"
									/>
								</div>
							</div>
						</template>
					</QFormWrapper>
				</div>
			</div>
		</div>
		<!-- <v-layout
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
				<QFormWrapper
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
									<QTextFieldWithValidation
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
				</QFormWrapper>
			</v-flex>
			<v-snackbar
				ref="snackbar"
				v-model="snackbar"
				:timeout="timeout"
			>
				{{ $t('messages.saved') }}
			</v-snackbar>
		</v-layout> -->
	</div>
</template>

<script>
import useVuelidate from '@vuelidate/core';

import GlobalUtility from '@thzero/library_client/utility/global';
import Contants from '@/constants';

import QFormWrapper from '@/library_vue_quasar/components/form/QFormWrapper';
import QSelectWithValidation from '@/library_vue_quasar/components/form/QSelectWithValidation';
// import QTextFieldWithValidation from '@/library_vue_quasar/components/form/QTextFieldWithValidation';

import baseSettings from '@/library_vue/components/base';

export default {
	name: 'AppSettings',
	components: {
		QFormWrapper,
		QSelectWithValidation //,
		// QTextFieldWithValidation
	},
	extends: baseSettings,
	setup(props) {
		return Object.assign(baseSettings.setup(props), {
			scope: 'AppSettings',
			validation: useVuelidate({ $scope: 'AppSettings' })
		});
	},
	data: () => ({
		measurementUnitsF: null,
		settings: null
	}),
	computed: {
		measurementUnits() {
			return [Contants.MeasurementUnits.English, Contants.MeasurementUnits.Metric].map((item) => { return { id: item, name: GlobalUtility.$trans.t('measurementUnits.' + item) }; });
		}
	},
	mounted() {
		this.reset(this.correlationId(), false);

		this.settings = GlobalUtility.$store.getters.getSettings();
		this.measurementUnitsF = this.settings.measurementUnits;
	},
	methods: {
		async ok() {
			this.settings.measurementUnits = this.measurementUnitsF;
			GlobalUtility.$store.dispatch('setSettings', this.settings);
		},
		reset(correlationId, notify) {
			this.$refs.frm.reset();
			this.errorMessage = null;
			if (this.errorTimer)
				clearTimeout(this.errorTimer);

			notify = (notify !== null && notify !== undefined) ? notify : true;
			if (notify)
				this.notify('messages.reset');
		},
		// eslint-disable-next-line
		async resetForm(correlationId) {
			this.settings.measurementUnitsF = this.settings.measurementUnits;
		}
    }
};
</script>

<style scoped>
</style>
