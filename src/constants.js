const Constants = {
	FlightInfo: {
		Resolution: 1024
	},
	InjectorKeys: {
		SERVICE_API: 'serviceApi',
		SERVICE_DOWNLOAD: 'serviceDownload',
		SERVICE_FLIGHT_INFO_PROCESSOR: 'serviceFlightInfoProcessor',
		SERVICE_FLIGHT_INFO_PROCESSOR_EGGTIMER: 'serviceFlightInfoProcessorEggtimer',
		SERVICE_FLIGHT_PATH_PROCESSOR: 'serviceFlightPathProcessor',
		SERVICE_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT: 'serviceFlightPathProcessorFeatherweight'
	},
	DateTime: {
		DEFAULT_DATE_FORMAT: 'MM/DD/YYYY',
		DEFAULT_TIME_FORMAT: 'HH:mm'
	},
	ErrorCodes: {
		Suffix: 'errors',
		SuffixParams: 'errors.params',
		Default: 'error'
	},
	ExtractTypes: {
		Csv: 'csv',
		Text: 'text'
	},
	Features: {
		Favorites: true,
		RememberMe: false,
		Statistics: false
	}
};

export default Constants;
