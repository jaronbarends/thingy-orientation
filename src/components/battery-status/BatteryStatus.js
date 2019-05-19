/*
Battery status - shows status of the battery

Requires ThingyConnector.js to be present in the page
*/

export default class BatteryStatus {

	constructor() {
		this.thingy = null;
		this.isInitiated = false;
		this._addEventListeners();
	}
	

	/**
	* 
	* @returns {undefined}
	*/
	_updateBatteryStatus(status) {
		document.getElementById(`battery-value`).textContent = status;
		document.getElementById(`battery-icon`).setAttribute('style', `--status: ${parseInt(status, 10)/100}`);
	};


	/**
	* show battery level and set up listener
	* @returns {undefined}
	*/
	async _initBattery() {
		const value = await this.thingy.battery.read();
		this._updateBatteryStatus(value.status);

		if (!this.isInitiated) {
			this.thingy.addEventListener('battery', (e) => {
				this._updateBatteryStatus(e.detail.status);
			});
		}
		this.thingy.battery.start();
		this.isInitiated = true;
	};


	/**
	* handle connection being made
	* @returns {undefined}
	*/
	_connectHandler(e) {
		this.thingy = e.detail.thingy;
		this._initBattery();
	};


	/**
	* handle connection being closed
	* @returns {undefined}
	*/
	_disconnectHandler(e) {
		this.thingy.battery.stop();
	};


	/**
	* add listeners
	* @returns {undefined}
	*/
	_addEventListeners() {
		document.body.addEventListener('connect.thingyConnector', e => this._connectHandler(e));
		document.body.addEventListener('disconnect.thingyConnector', e => this._disconnectHandler(e));
	};

	
}