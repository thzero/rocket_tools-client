<template>
	<div>
		<div class="row">
			<div class="col-12 text-center text-h5 q-pb-sm">
				{{ $t('titles.settings') }}
			</div>
			<div class="col-12">
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
							<div class="col-xs-12 col-sm-6 col-md-4">
								<q-card>
									<q-card-section class="text-center text-h6">
										{{ $t('titles.measurementUnits') }}
									</q-card-section>
									<q-card-section>
										<QSelectWithValidation
											class="q-mr-sm full"
											ref="measurementUnit"
											v-model="measurementUnitsId"
											vid="measurementUnit"
											:items="measurementUnitsSelect"
											:validation="validation"
											:dense="true"
											:label="$t('forms.settings.measurementUnits')"
										/>
										<QSelectWithValidation
											class="q-mr-sm"
											ref="measurementUnitAcceleration"
											v-model="measurementUnitAccelerationId"
											vid="measurementUnitAcceleration"
											:items="measurementUnitsAcceleration"
											:validation="validation"
											:dense="true"
											:label="$t('forms.settings.measurementUnitAcceleration')"
										/>
										<QSelectWithValidation
											class="q-mr-sm"
											ref="measurementUnitArea"
											v-model="measurementUnitAreaId"
											vid="measurementUnitArea"
											:items="measurementUnitsArea"
											:validation="validation"
											:dense="true"
											:label="$t('forms.settings.measurementUnitArea')"
										/>
										<QSelectWithValidation
											class="q-mr-sm"
											ref="measurementUnitDistance"
											v-model="measurementUnitDistanceId"
											vid="measurementUnitDistance"
											:items="measurementUnitsDistance"
											:validation="validation"
											:dense="true"
											:label="$t('forms.settings.measurementUnitsDistance')"
										/>
										<QSelectWithValidation
											class="q-mr-sm"
											ref="measurementUnitVelocity"
											v-model="measurementUnitVelocityId"
											vid="measurementUnitDistance"
											:items="measurementUnitsVelocity"
											:validation="validation"
											:dense="true"
											:label="$t('forms.settings.measurementUnitsVelocity')"
										/>
										<QSelectWithValidation
											class="q-mr-sm"
											ref="measurementUnitVolume"
											v-model="measurementUnitVolumeId"
											vid="measurementUnitVolume"
											:items="measurementUnitsVolume"
											:validation="validation"
											:dense="true"
											:label="$t('forms.settings.measurementUnitVolume')"
										/>
										<QSelectWithValidation
											class="q-mr-sm"
											ref="measurementUnitWeight"
											v-model="measurementUnitWeightId"
											vid="measurementUnitWeight"
											:items="measurementUnitsWeight"
											:validation="validation"
											:dense="true"
											:label="$t('forms.settings.measurementUnitWeight')"
										/>
									</q-card-section>
								</q-card>
							</div>
						</div>
					</template>
				</QFormWrapper>
			</div>
		</div>
	</div>
</template>

<script>
import useVuelidate from '@vuelidate/core';

import GlobalUtility from '@thzero/library_client/utility/global';
import AppUtility from '@/utility/app';

import Constants from '@/constants';

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
		measurementUnitsId: null,
		measurementUnitAccelerationId: null,
		measurementUnitAreaId: null,
		measurementUnitDistanceId: null,
		measurementUnitVelocityId: null,
		measurementUnitVolumeId: null,
		measurementUnitWeightId: null,
		settings: null
	}),
	watch: {
		measurementUnitsId: function (value, prev) {
			if ((prev != null) && (value !== prev)) {
				this.measurementUnitAccelerationId = Constants.MeasurementUnits[value].acceleration.default;
				this.measurementUnitAreaId = Constants.MeasurementUnits[value].area.default;
				this.measurementUnitDistanceId = Constants.MeasurementUnits[value].distance.default;
				this.measurementUnitVelocityId = Constants.MeasurementUnits[value].velocity.default;
				this.measurementUnitVolumeId = Constants.MeasurementUnits[value].volume.default;
				this.measurementUnitWeightId = Constants.MeasurementUnits[value].weight.default;
			}
		}
	},
	computed: {
		measurementUnits() {
			return AppUtility.measurementUnits();
		},
		measurementUnitsSelect() {
			return [Constants.MeasurementUnits.english.id, Constants.MeasurementUnits.metrics.id].map((item) => { return { id: item, name: GlobalUtility.$trans.t('measurementUnits.' + item + '.title') }; });
		},
		measurementUnitsArea() {
			if (this.measurementUnits === Constants.MeasurementUnits.english.id)
				return this.measurementUnitTrans(Constants.MeasurementUnits.english.area, 'english', 'area');
			return this.measurementUnitTrans(Constants.MeasurementUnits.metrics.area, 'metrics', 'area');
		},
		measurementUnitsAcceleration() {
			if (this.measurementUnits === Constants.MeasurementUnits.english.id)
				return this.measurementUnitTrans(Constants.MeasurementUnits.english.acceleration, 'english', 'acceleration');
			return this.measurementUnitTrans(Constants.MeasurementUnits.metrics.acceleration, 'metrics', 'acceleration');
		},
		measurementUnitsDistance() {
			if (this.measurementUnits === Constants.MeasurementUnits.english.id)
				return this.measurementUnitTrans(Constants.MeasurementUnits.english.distance, 'english', 'distance');
			return this.measurementUnitTrans(Constants.MeasurementUnits.metrics.distance, 'metrics', 'distance');
		},
		measurementUnitsVelocity() {
			if (this.measurementUnits === Constants.MeasurementUnits.english.id)
				return this.measurementUnitTrans(Constants.MeasurementUnits.english.velocity, 'english', 'velocity');
			return this.measurementUnitTrans(Constants.MeasurementUnits.metrics.velocity, 'metrics', 'velocity');
		},
		measurementUnitsVolume() {
			if (this.measurementUnits === Constants.MeasurementUnits.english.id)
				return this.measurementUnitTrans(Constants.MeasurementUnits.english.volume, 'english', 'volume');
			return this.measurementUnitTrans(Constants.MeasurementUnits.metrics.volume, 'metrics', 'volume');
		},
		measurementUnitsWeight() {
			if (this.measurementUnits === Constants.MeasurementUnits.english.id)
				return this.measurementUnitTrans(Constants.MeasurementUnits.english.weight, 'english', 'weight');
			return this.measurementUnitTrans(Constants.MeasurementUnits.metrics.weight, 'metrics', 'weight');
		}
	},
	mounted() {
		this.reset(this.correlationId(), false);
	},
	methods: {
		measurementUnitTrans(object, key, subKey) {
			return Object.getOwnPropertyNames(object).map((item) => { return { id: item, name: GlobalUtility.$trans.t('measurementUnits.' + key + '.' + subKey + '.' + item + 'Abbr') }; });
		},
		async ok() {
			const settings = GlobalUtility.$store.getters.getSettings();
			if (!settings.measurementUnits)
				settings.measurementUnits = {};

			settings.measurementUnits.id = this.measurementUnitsId;
			settings.measurementUnits.acceleration = this.measurementUnitAccelerationId;
			settings.measurementUnits.area = this.measurementUnitAreaId;
			settings.measurementUnits.distance = this.measurementUnitDistanceId;
			settings.measurementUnits.velocity = this.measurementUnitVelocityId;
			settings.measurementUnits.volume = this.measurementUnitVolumeId;
			settings.measurementUnits.weight = this.measurementUnitWeightId;

			GlobalUtility.$store.dispatch('setSettings', settings);
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
			const settings = GlobalUtility.$store.getters.getSettings();
			if (!settings.measurementUnits)
				settings.measurementUnits = {};

			this.measurementUnitsId = settings.measurementUnits.id;
			this.measurementUnitAccelerationId = settings.measurementUnits.acceleration;
			this.measurementUnitAreaId = settings.measurementUnits.area;
			this.measurementUnitDistanceId = settings.measurementUnits.distance;
			this.measurementUnitVelocityId = settings.measurementUnits.velocity;
			this.measurementUnitVolumeId = settings.measurementUnits.volume;
			this.measurementUnitWeightId = settings.measurementUnits.weight;
			// this.measurementUnitsId = settings.measurementUnits.id ? settings.measurementUnits.id : Constants.MeasurementUnits.English;
			// this.measurementUnitAccelerationId = settings.measurementUnits.acceleration ? settings.measurementUnits.acceleration : Constants.MeasurementUnits[this.measurementUnitsId].acceleration.default;
			// this.measurementUnitAreaId = settings.measurementUnits.area ? settings.measurementUnits.acceleration : Constants.MeasurementUnits[this.measurementUnitsId].area.default;
			// this.measurementUnitDistanceId = settings.measurementUnits.distance ? settings.measurementUnits.acceleration : Constants.MeasurementUnits[this.measurementUnitsId].distance.default;
			// this.measurementUnitVelocityId = settings.measurementUnits.velocity ? settings.measurementUnits.acceleration : Constants.MeasurementUnits[this.measurementUnitsId].velocity.default;
			// this.measurementUnitVolumeId = settings.measurementUnits.volume ? settings.measurementUnits.acceleration : Constants.MeasurementUnits[this.measurementUnitsId].volume.default;
			// this.measurementUnitWeightId = settings.measurementUnits.weight ? settings.measurementUnits.acceleration : Constants.MeasurementUnits[this.measurementUnitsId].weight.default;
		}
    }
};
</script>

<style scoped>
</style>
