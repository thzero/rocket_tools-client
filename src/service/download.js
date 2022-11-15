import RestExternalService from '@thzero/library_client/service/externalRest';

class DownloadService extends RestExternalService {
	async download(correlationId, output, name, completed, canncelled, progress) {
		try {
			const response = this._initResponse(correlationId);
			const blob = new Blob([output], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			this._download(url, name);
			return response;
		}
		catch (err) {
			this._logger.exception('DownloadService', 'download', err, correlationId);
		}
		finally {
			completed();
		}

		return this._error('DownloadService', 'download', null, null, null, null, correlationId);
	}

	async downloadUrl(correlationId, output, name, completed, canncelled, progress) {
		try {
			const response = this._initResponse(correlationId);
			this._download(output, name);
			return response;
		}
		catch (err) {
			this._logger.exception('DownloadService', 'downloadUrl', err, correlationId);
		}
		finally {
			completed();
		}

		return this._error('DownloadService', 'downloadUrl', null, null, null, null, correlationId);
	}

	_download(path, filename) {
		const anchor = document.createElement('a');
		anchor.href = path;
		anchor.download = filename;
		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);
	}
}

export default DownloadService;
