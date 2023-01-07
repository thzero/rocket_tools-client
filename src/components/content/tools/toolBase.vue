<script>
import { computed, onMounted, ref } from 'vue';

import { useContentBaseComponent } from '@/components/content/contentBase';

import LibraryConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
import Utility from '@thzero/library_common/utility';
import Constants from '@/constants';

export function useToolsBaseComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success
	} = useContentBaseComponent(props, context, options);

	const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);

	const calculationOutput = ref([]);
	const errors = ref(null);
	const errorMessage = ref(null);
	const errorTimer = ref(null);
	const measurementUnitsId = ref(null);
	const measurementUnitsAcceleration = ref(null);
	const measurementUnitsArea = ref(null);
	const measurementUnitsFluid = ref(null);
	const measurementUnitsDistance = ref(null);
	const measurementUnitsLength = ref(null);
	const measurementUnitsVelocity = ref(null);
	const measurementUnitsVolume = ref(null);
	const measurementUnitsWeight = ref(null);
	const notifyColor = ref(null);
	const notifyMessage = ref(null);
	const notifySignal = ref(false);
	const notifyTimeout = ref(3000);
	const settings = ref(null);

	const dateFormat = computed(() => {
		return GlobalUtility.dateFormat();
	});
	const dateFormatMask = computed(() => {
		return GlobalUtility.dateFormat().replace(/[a-zA-Z0-9]/g, '#');
	});

	const calculateI = async (correlationId, calculationResults, func) => {
		try {
			initCalculationOutput(correlationId);
			calculationResults.value = initCalculationResults(correlationId, calculationResults);

			if (func) {
				if (!(await func(correlationId, calculationResults)))
					return;
			}

			calculationResults.value.calculated = true;
		}
		catch(err) {
			logger.exception('useToolsBaseComponent', 'calculateI', err, correlationId);
		}
	};
	const formatNumber = (value) => {
		return value?.toLocaleString();
	};
	const handleListener = (correlationId, type, name, value, setName, symbols) => {
		const prefix = !String.isNullOrEmpty(setName) ? `${setName}: ` : '';
		if (type === symbols.symTypeEvaluate)
			calculationOutput.value.push(`${prefix}${name}`);
		else if (type === symbols.symTypeSet)
			calculationOutput.value.push(`${prefix}${name} = ${value}`);
	};
	const initCalculationOutput = (correlationId) => {
		calculationOutput.value = [];
	};
	const initCalculationResults = (correlationId, results) => {
		if (!results)
			return;

		results.value = {};
		results.value.calculated = false;
		return results;
	};
	const resetFormI = (correlationId, calculationResults, func) => {
		initCalculationOutput(correlationId);
		initCalculationResults(correlationId, calculationResults);

		if (func)
			func(correlationId);
	};
	const setErrorMessage = (error) => {
		errorMessage.value = error;
		
		if (String.isNullOrEmpty(error))
			return;
		
		notifyColor.value = 'error';
		notifyMessage.value = error;
		notify.value = true;
	};
	const setErrorTimer = (timer) => {
		if (errorTimer.value) 
			clearTimeout(errorTimer.value);
		errorTimer.value = timer;
	};
	const setNotify = (correlationId, message, transformed) => {
		if (String.isNullOrEmpty(message))
			return;

		message = (!transformed ? GlobalUtility.$trans.t(message) : message);
		if (String.isNullOrEmpty(message))
			return;

		notifyColor.value = null;
		notifyMessage.value = (!transformed ? GlobalUtility.$trans.t(message) : message);
		notifySignal.value = true;
	};
	const toFixed = (value) => {
		if (!value)
			return '';

		if (Utility.isString(value))
			return value.toFixed(2);
		
		return value;
	};

	onMounted(async () => {
		settings.value = serviceStore.getters.user.getUserSettings();
		measurementUnitsId.value = AppUtility.measurementUnitsId(correlationId, settings.value);
		measurementUnitsAcceleration.value = AppUtility.measurementUnitsAcceleration(correlationId, settings.value);
		measurementUnitsArea.value = AppUtility.measurementUnitArea(correlationId, settings.value);
		measurementUnitsDistance.value = AppUtility.measurementUnitDistance(correlationId, settings.value);
		measurementUnitsFluid.value = AppUtility.measurementUnitFluid(correlationId, settings.value);
		measurementUnitsLength.value = AppUtility.measurementUnitLength(correlationId, settings.value);
		measurementUnitsVelocity.value = AppUtility.measurementUnitVelocity(correlationId, settings.value);
		measurementUnitsVolume.value = AppUtility.measurementUnitVolume(correlationId, settings.value);
		measurementUnitsWeight.value = AppUtility.measurementUnitWeight(correlationId, settings.value);
	});

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
		calculationOutput,
		dateFormat,
		dateFormatMask,
		errorMessage,
		errors,
		errorTimer,
		calculateI,
		formatNumber,
		handleListener,
		initCalculationOutput,
		initCalculationResults,
		measurementUnitsId,
		measurementUnitsAcceleration,
		measurementUnitsArea,
		measurementUnitsFluid,
		measurementUnitsDistance,
		measurementUnitsLength,
		measurementUnitsVelocity,
		measurementUnitsVolume,
		measurementUnitsWeight,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		resetFormI,
		serviceStore,
		setErrorMessage,
		setErrorTimer,
		setNotify,
		toFixed,
		settings
	};
};
</script>
