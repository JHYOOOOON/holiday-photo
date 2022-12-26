class Device {
	static _instance: Device | null = null;
	static get instance() {
		if (Device._instance === null) {
			Device._instance = new Device();
		}
		return Device._instance;
	}

	constructor(
		private _videoList: MediaDeviceInfo[] = [],
		private _cameraPermission: PermissionState = "prompt"
	) {
		(async () => {
			await this.updateVideoList();
			//@ts-ignore
			navigator.permissions.query({ name: "camera" }).then(async (permissionStatus) => {
				permissionStatus.onchange = async () => {
					await this.updateCameraPermission();
					await this.updateVideoList();
				};
			});
		})();
	}

	public initialize = async () => {
		await this.updateCameraPermission();
		await this.updateVideoList();
	};

	private updateCameraPermission = async () => {
		//@ts-ignore
		const { state } = await navigator.permissions.query({ name: "camera" });
		this._cameraPermission = state;
	};

	private updateVideoList = async () => {
		const devices = await navigator.mediaDevices.enumerateDevices();
		const videoDevices = devices.filter((item) => item.kind === "videoinput");
		this._videoList = videoDevices;
	};

	get videoList() {
		return this._videoList;
	}

	get hasVideo() {
		return this._videoList.length > 0;
	}

	get cameraPermission() {
		return this._cameraPermission;
	}
}

export default Device;
