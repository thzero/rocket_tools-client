import VersionService from '@thzero/library_client/service/version';

// eslint-disable-next-line
const { version_major, version_minor, version_patch, version_date } = require('../../package.json');

class AppVersionService extends VersionService {
	async _version(correlationId) {
		// eslint-disable-next-line
		return this._generate(correlationId, version_major, version_minor, version_patch, version_date);
	}
}

export default AppVersionService;
