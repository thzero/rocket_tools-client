<template>
    <VSelectWithValidation
        ref="measurementUnitRef"
        vid="innerValue"
		v-model="innerValue"
		:items="measurementUnits"
		:label="$attrs.label"
        :validation="validation"
		@update:modelValue="innerValueUpdate"
    />
</template>

<script>
import { computed } from 'vue';

import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import VSelectWithValidation from '@/library_vue_vuetify/components/form//VSelectWithValidation';

import { useBaseControlEditComponent } from '@/library_vue/components/baseControlEdit';
import { useBaseControlEditProps } from '@/library_vue/components/baseControlEditProps';

export default {
	name: 'MeasurementSelect',
	components: {
		VSelectWithValidation
	},
    props: {
        ...useBaseControlEditProps,
        measurementUnitsId: {
            type: String,
            default: Constants.MeasurementUnits.english.id
        },
        measurementUnitsType: {
            type: String,
            default: null
        }
    },
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
			isSaving,
			serverErrors,
			setErrors,
			convertValue,
			errorI,
			errorsI,
			hideDetails,
			innerValue,
			initValue,
			innerValueUpdate
		} = useBaseControlEditComponent(props, context);

		const measurementUnits = computed(() => {
			if (props.measurementUnitsId === Constants.MeasurementUnits.english.id)
				return measurementUnitTrans(Constants.MeasurementUnits.english[props.measurementUnitsType], 'english', props.measurementUnitsType);
			return measurementUnitTrans(Constants.MeasurementUnits.metrics[props.measurementUnitsType], 'metrics', props.measurementUnitsType);
		});
		
		const measurementUnitTrans = (object, key, subKey) => {
			return object ? Object.getOwnPropertyNames(object).filter(l => l !== 'default').map((item) => { return { id: item, name: GlobalUtility.$trans.t('measurementUnits.' + key + '.' + subKey + '.' + item + 'Abbr') }; }) : {};
		};

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
			isSaving,
			serverErrors,
			setErrors,
			convertValue,
			errorI,
			errorsI,
			hideDetails,
			innerValue,
			initValue,
			innerValueUpdate,
			measurementUnitTrans,
			measurementUnits
		};
	}
};
</script>

<style scoped>
</style>
