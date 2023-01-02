<script>
import { computed, onMounted, ref } from 'vue';

import { useContentBaseComponent } from '@/components/content/contentBase';

import LibraryConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';

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
	const measurementUnits = ref(null);
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
	const formatNumber = (value) => {
		return value?.toLocaleString();
	};
	const handleListener = (correlationId, type, name, value, setName, symbols) => {
		if (type === symbols.symTypeEvaluate)
			calculationOutput.value.push(`${setName}: ${name}`);
		else if (type === symbols.symTypeSet)
			calculationOutput.value.push(`${setName}: ${name} = ${value}`);
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

	onMounted(async () => {
		settings.value = serviceStore.getters.user.getUserSettings();
		measurementUnits.value = AppUtility.measurementUnits(correlationId, serviceStore);
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
		formatNumber,
		handleListener,
		measurementUnits,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		serviceStore,
		setErrorMessage,
		setErrorTimer,
		setNotify,
		settings
	};
};
</script>
