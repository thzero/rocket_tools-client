const Constants = {
	ExternalKeys: {
		MotorSearch: 'motorSearch'
	},
	FlightInfo: {
		Resolution: 1024
	},
	InjectorKeys: {
		SERVICE_API: 'serviceApi',
		SERVICE_DOWNLOAD: 'serviceDownload',
		SERVICE_FLIGHT_INFO_PROCESSOR: 'serviceFlightInfoProcessor',
		SERVICE_FLIGHT_INFO_PROCESSOR_EGGTIMER: 'serviceFlightInfoProcessorEggtimer',
		SERVICE_FLIGHT_PATH_PROCESSOR: 'serviceFlightPathProcessor',
		SERVICE_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT: 'serviceFlightPathProcessorFeatherweight',
		SERVICE_TOOLS_THRUST2WEIGHT: 'serviceToolsThrust2Weight',
		SERVICE_EXTERNAL_MOTOR_SEARCH: 'serviceExternalMotorSearch'
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
