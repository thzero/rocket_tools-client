<template>
	<VFormControl
		ref="form"
		:validation="validation"
		:resetForm="resetForm"
		buttonClearName="buttons.reset"
		buttonOkName="buttons.save"
		:pre-complete-ok="preCompleteOk"
	>
		<v-container fluid>
			<v-row dense>
				<v-col
					cols="12"
				>
					<div class="text-center text-h5">
						<span>{{ $t('titles.settings') }}</span>
					</div>
				</v-col>
				<v-col
					cols="12"
					sm="6"
					:class="'pl-0 pr-' + ($vuetify.display.mdAndUp ? '2' : '0')"
				>
					<v-card>
						<v-card-text>
							<v-row
								align="center"
								dense
							>
								<v-col
									cols="9"
									class="text-h4 mb-1 pt-1"
								>
									{{ name }}
								</v-col>
								<v-col
									cols="3"
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
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col
					cols="12"
					sm="6"
					class="pl-0 pr-0"
				>
					<v-card>
						<v-card-text>
							<VTextFieldWithValidation
								ref="gamerTagRef"
								vid="gamerTag"
								v-model="gamerTag"
								:counter="30"
								:validation="validation"
								:label="$t('forms.gamerTag')"
							/>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col
					cols="12"
					class="pl-0 pr-0"
				>
					<v-card>
						<v-card-item>
							<v-card-title class="text-center text-h6">{{ $t('titles.measurementUnits') }}</v-card-title>
						</v-card-item>
						<v-card-text>
							<v-row dense>
								<v-col
									cols="12"
									sm="6"
									md="3"
								>
									<VSelectWithValidation
										ref="measurementUnit"
										vid="measurementUnit"
										v-model="measurementUnitsId"
										:items="measurementUnitsSelect"
										:validation="validation"
										:label="$t('forms.settings.measurementUnits.title')"
									/>
								</v-col>
								<v-col
									cols="12"
									sm="6"
									md="3"
								>
									<VSelectWithValidation
										ref="measurementUnitAcceleration"
										vid="measurementUnitAcceleration"
										v-model="measurementUnitAccelerationId"
										:items="measurementUnitsAcceleration"
										:validation="validation"
										:label="$t('forms.settings.measurementUnits.acceleration')"
									/>
								</v-col>
								<v-col
									cols="12"
									sm="6"
									md="3"
								>
									<VSelectWithValidation
										ref="measurementUnitArea"
										vid="measurementUnitArea"
										v-model="measurementUnitAreaId"
										:items="measurementUnitsArea"
										:validation="validation"
										:label="$t('forms.settings.measurementUnits.area')"
									/>
								</v-col>
								<v-col
									cols="12"
									sm="6"
									md="3"
								>
									<VSelectWithValidation
										ref="measurementUnitDistance"
										vid="measurementUnitDistance"
										v-model="measurementUnitDistanceId"
										:items="measurementUnitsDistance"
										:validation="validation"
										:label="$t('forms.settings.measurementUnits.distance')"
									/>
								</v-col>
								<v-col
									cols="12"
									sm="6"
									md="3"
								>
									<VSelectWithValidation
										ref="measurementUnitVelocity"
										vid="measurementUnitVelocity"
										v-model="measurementUnitVelocityId"
										:items="measurementUnitsVelocity"
										:validation="validation"
										:label="$t('forms.settings.measurementUnits.velocity')"
									/>
								</v-col>
								<v-col
									cols="12"
									sm="6"
									md="3"
								>
									<VSelectWithValidation
										ref="measurementUnitVolume"
										vid="measurementUnitVolume"
										v-model="measurementUnitVolumeId"
										:items="measurementUnitsVolume"
										:validation="validation"
										:label="$t('forms.settings.measurementUnits.volume')"
									/>
								</v-col>
								<v-col
									cols="12"
									sm="6"
									md="3"
								>
									<VSelectWithValidation
										ref="measurementUnitWeight"
										vid="measurementUnitWeight"
										v-model="measurementUnitWeightId"
										:items="measurementUnitsVolume"
										:validation="validation"
										:label="$t('forms.settings.measurementUnits.weight')"
									/>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
			<!-- <VConfirmationDialog
				:non-recoverable="true"
				:signal="dialogLocationDeleteSignal.signal"
				:pre-complete-ok="dialogLocationDeletePreCompleteOk"
				@cancel="dialogLocationDeleteCancel"
				@ok="dialogLocationDeleteOk"
			/> -->
			<!-- <v-snackbar
				ref="snackbar"
				v-model="snackbar"
				:timeout="timeout"
			>
				{{ $t('messages.saved') }}
			</v-snackbar> -->
		</v-container>
	</VFormControl>
</template>

<script>
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import useVuelidate from '@vuelidate/core';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';
// import SharedConstants from '@/common/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
// import LibraryUtility from '@thzero/library_common/utility';

// import VConfirmationDialog from '@/library_vue_vuetify/components/VConfirmationDialog';
import VFormControl from '@/library_vue_vuetify/components/form/VFormControl';
import VSelectWithValidation from '@/library_vue_vuetify/components/form//VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

// import DialogSupport from '@/library_vue/components/support/dialog';

import baseSettings from '@/library_vue/components/baseSettings';

import { helpers, minLength, maxLength, required } from '@vuelidate/validators';
// const validatorGamerTag = helpers.regex(/^[a-zA-Z0-9 ,']{3}/, /\d/);

export default {
	name: 'AppSettings',
	components: {
		// VConfirmationDialog,
		VFormControl,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	extends: baseSettings,
	setup(props) {
		const instance = getCurrentInstance();
		
		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
		
		const gamerTag = ref('');
		const measurementUnitsId = ref(null);
		const measurementUnitAccelerationId = ref(null);
		const measurementUnitAreaId = ref(null);
		const measurementUnitDistanceId = ref(null);
		const measurementUnitVelocityId = ref(null);
		const measurementUnitVolumeId = ref(null);
		const measurementUnitWeightId = ref(null);

		const measurementUnits = computed(() => {
			return AppUtility.measurementUnits();
		});
		const measurementUnitsSelect = computed(() => {
			return [Constants.MeasurementUnits.english.id, Constants.MeasurementUnits.metrics.id].map((item) => { return { id: item, name: GlobalUtility.$trans.t('measurementUnits.' + item + '.title') }; });
		});
		const measurementUnitsArea = computed(() => {
			if (measurementUnits === Constants.MeasurementUnits.english.id)
				return instance.ctx.measurementUnitTrans(Constants.MeasurementUnits.english.area, 'english', 'area');
			return instance.ctx.measurementUnitTrans(Constants.MeasurementUnits.metrics.area, 'metrics', 'area');
		});
		const measurementUnitsAcceleration = computed(() => {
			if (instance.ctx.measurementUnits === Constants.MeasurementUnits.english.id)
				return instance.ctx.measurementUnitTrans(Constants.MeasurementUnits.english.acceleration, 'english', 'acceleration');
			return instance.ctx.measurementUnitTrans(Constants.MeasurementUnits.metrics.acceleration, 'metrics', 'acceleration');
		});
		const measurementUnitsDistance = computed(() => {
			if (instance.ctx.measurementUnits === Constants.MeasurementUnits.english.id)
				return instance.ctx.measurementUnitTrans(Constants.MeasurementUnits.english.distance, 'english', 'distance');
			return instance.ctx.measurementUnitTrans(Constants.MeasurementUnits.metrics.distance, 'metrics', 'distance');
		});
		const measurementUnitsVelocity = computed(() => {
			if (instance.ctx.measurementUnits === Constants.MeasurementUnits.english.id)
				return instance.ctx.measurementUnitTrans(Constants.MeasurementUnits.english.velocity, 'english', 'velocity');
			return instance.ctx.measurementUnitTrans(Constants.MeasurementUnits.metrics.velocity, 'metrics', 'velocity');
		});
		const measurementUnitsVolume = computed(() => {
			if (instance.ctx.measurementUnits === Constants.MeasurementUnits.english.id)
				return instance.ctx.measurementUnitTrans(Constants.MeasurementUnits.english.volume, 'english', 'volume');
			return instance.ctx.measurementUnitTrans(Constants.MeasurementUnits.metrics.volume, 'metrics', 'volume');
		});
		const measurementUnitsWeight = computed(() => {
			if (instance.ctx.measurementUnits === Constants.MeasurementUnits.english.id)
				return instance.ctx.measurementUnitTrans(Constants.MeasurementUnits.english.weight, 'english', 'weight');
			return instance.ctx.measurementUnitTrans(Constants.MeasurementUnits.metrics.weight, 'metrics', 'weight');
		});
		
		const measurementUnitTrans = (object, key, subKey) => {
			return Object.getOwnPropertyNames(object).filter(l => l !== 'default').map((item) => { return { id: item, name: GlobalUtility.$trans.t('measurementUnits.' + key + '.' + subKey + '.' + item + 'Abbr') }; });
		};
		const preCompleteOk = async (correlationId) => {
			try {
				const settings = instance.ctx.serviceStore.getters.user.getUserSettings();
				if (!settings.measurementUnits)
					settings.measurementUnits = {};

				settings.gamerTag = gamerTag.value;
				settings.measurementUnits.id = measurementUnitsId.value;
				settings.measurementUnits.acceleration = measurementUnitAccelerationId.value;
				settings.measurementUnits.area = measurementUnitAreaId.value;
				settings.measurementUnits.distance = measurementUnitDistanceId.value;
				settings.measurementUnits.velocity = measurementUnitVelocityId.value;
				settings.measurementUnits.volume = measurementUnitVolumeId.value;
				settings.measurementUnits.weight = measurementUnitWeightId.value;

				return await instance.ctx.serviceStore.dispatcher.user.setUserSettings(correlationId, settings);
			}
			catch (err) {
				instance.ctx.logger.exception('AppSettings', 'preCompleteOk', err, correlationId);
				return instance.ctx.error('AppSettings', 'preCompleteOk', null, err, null, null, correlationId);
			}
		};
		// eslint-disable-next-line
		const resetForm = (correlationId) => {
			const settings = instance.ctx.serviceStore.getters.user.getUserSettings();
			if (!settings.measurementUnits)
				settings.measurementUnits = {};

			gamerTag.value = !String.isNullOrEmpty(settings.gamerTag) ? settings.gamerTag : '';
			// measurementUnitsId.value = settings.measurementUnits.id;
			// measurementUnitAccelerationId.value = settings.measurementUnits.acceleration;
			// measurementUnitAreaId.value = settings.measurementUnits.area;
			// measurementUnitDistanceId.value = settings.measurementUnits.distance;
			// measurementUnitVelocityId.value = settings.measurementUnits.velocity;
			// measurementUnitVolumeId.value = settings.measurementUnits.volume;
			// measurementUnitWeightId.value = settings.measurementUnits.weight;
			measurementUnitsId.value = settings.measurementUnits.id ? settings.measurementUnits.id : Constants.MeasurementUnits.english.id;
			measurementUnitAccelerationId.value = settings.measurementUnits.acceleration ? settings.measurementUnits.acceleration : Constants.MeasurementUnits[measurementUnitsId.value].acceleration.default;
			measurementUnitAreaId.value = settings.measurementUnits.area ? settings.measurementUnits.area : Constants.MeasurementUnits[measurementUnitsId.value].area.default;
			measurementUnitDistanceId.value = settings.measurementUnits.distance ? settings.measurementUnits.distance : Constants.MeasurementUnits[measurementUnitsId.value].distance.default;
			measurementUnitVelocityId.value = settings.measurementUnits.velocity ? settings.measurementUnits.velocity : Constants.MeasurementUnits[measurementUnitsId.value].velocity.default;
			measurementUnitVolumeId.value = settings.measurementUnits.volume ? settings.measurementUnits.volume : Constants.MeasurementUnits[measurementUnitsId.value].volume.default;
			measurementUnitWeightId.value = settings.measurementUnits.weight ? settings.measurementUnits.weight : Constants.MeasurementUnits[measurementUnitsId.value].weight.default;
		};

		return Object.assign(baseSettings.setup(props), {
			gamerTag,
			measurementUnitTrans,
			measurementUnitsId,
			measurementUnitAccelerationId,
			measurementUnitAreaId,
			measurementUnitDistanceId,
			measurementUnitVelocityId,
			measurementUnitVolumeId,
			measurementUnitWeightId,
			measurementUnitsSelect,
			measurementUnitsArea,
			measurementUnitsAcceleration,
			measurementUnitsDistance,
			measurementUnitsVelocity,
			measurementUnitsVolume,
			measurementUnitsWeight,
			preCompleteOk,
			resetForm,
			serviceStore,
			scope: 'AppSettings',
			validation: useVuelidate({ $scope: 'AppSettings' }),
		});
	},
	// data: () => ({
	// 	gamerTag: null
	// }),
	validations () {
		return {
			gamerTag: { 
				// validatorGamerTag,
				minLength: minLength(3),
				 maxLength: maxLength(10),
				$autoDirty: true 
			},
			measurementUnitsId: { required, $autoDirty: true },
			measurementUnitAccelerationId: { required, $autoDirty: true },
			measurementUnitAreaId: { required, $autoDirty: true },
			measurementUnitDistanceId: { required, $autoDirty: true },
			measurementUnitVelocityId: { required, $autoDirty: true },
			measurementUnitVolumeId: { required, $autoDirty: true },
			measurementUnitWeightId: { required, $autoDirty: true },
		};
	}
};
</script>

<style scoped>
</style>
