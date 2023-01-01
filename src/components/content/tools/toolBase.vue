<script>
import { computed, ref } from 'vue';

import { useContentBaseComponent } from '@/components/content/contentBase';

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

	const errors = ref(null);
	const errorMessage = ref(null);
	const errorTimer = ref(null);
	const notifyColor = ref(null);
	const notifyMessage = ref(null);
	const notifySignal = ref(false);
	const notifyTimeout = ref(3000);

	const dateFormat = computed(() => {
		return GlobalUtility.dateFormat();
	});
	const dateFormatMask = computed(() => {
		return GlobalUtility.dateFormat().replace(/[a-zA-Z0-9]/g, '#');
	});
	const formatNumber = (value) => {
		return value?.toLocaleString();
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
		dateFormat,
		dateFormatMask,
		errorMessage,
		errors,
		errorTimer,
		formatNumber,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setErrorMessage,
		setErrorTimer,
		setNotify
	};
};
</script>
