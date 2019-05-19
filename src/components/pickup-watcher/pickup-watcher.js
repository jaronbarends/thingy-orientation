/* 
class for checking changes in pickup/rest state of thingy

Requires ThingyConnector.js to be present in the page
*/
import {thingyEvent} from '../../js/util/thingy-event.js';

export default class PickupWatcher {
	constructor() {
		this.thingy = null;

		this.roll = null;
		this.pitch = null;
		this.yaw = null;
		this.prevRoll = null;
		this.prevPitch = null;
		this.prevYaw = null;
		
		this.states = {
			UNKNOWN: 'unknown',
			IDLE: 'idle',
			ACTIVE: 'active'
		};
		this.timestamp = null,
		this.state = this.states.UNKNOWN;
		this.isInitiated = false;
		this.checkTimer = null;
		this.checkInterval = 50;
		this.threshold = 1;// threshold for change

		this._addEventListeners();
	}


	/**
	* show listener for euler orientation changes
	* @returns {undefined}
	*/
	async _initEulerOrientation() {
		if (!this.isInitiated) {
			this.thingy.addEventListener('eulerorientation', (e) => {
				this._updateOrientation(e.detail);
			});
		}
		this.thingy.eulerorientation.start();
		this.isInitiated = true;
		this._startChecking();
	};


	/**
	* handle connection being made
	* @returns {undefined}
	*/
	_connectHandler(e) {
		this.thingy = e.detail.thingy;
		this._initEulerOrientation();
	};


	/**
	* handle connection being closed
	* @returns {undefined}
	*/
	_disconnectHandler(e) {
		this.thingy.eulerorientation.stop();
	};

	/**
	* 
	* @returns {undefined}
	*/
	_addEventListeners() {
		document.body.addEventListener('connect.thingyConnector', e => this._connectHandler(e));
		document.body.addEventListener('disconnect.thingyConnector', e => this._disconnectHandler(e));
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
	* start checking for state changes
	* @returns {undefined}
	*/
	_startChecking() {
		this.timer = setTimeout(() => this._checkOrientation(), this.checkInterval);
	};

	_logdiff(a, pa) {
		console.log(Math.round(Math.abs(a - pa)));
	}


	/**
	* check if orientation has changed
	* @returns {undefined}
	*/
	_checkOrientation() {
		let newState  = this.states.UNKNOWN;

		// we can only determine if state is idle or active when both current and previous values are known
		if (this.roll !== null && this.pitch !== null && this.yaw !== null && this.prevRoll !== null && this.prevPitch !== null && this.prevYaw !== null) {
			// console.log(Math.abs(this.roll - this.prevRoll),
			// Math.abs(this.yaw - this.prevPitch),
			// Math.abs(this.roll - this.prevYaw));
			if (
				Math.abs(this.roll - this.prevRoll) >= this.threshold ||
				Math.abs(this.pitch - this.prevPitch) >= this.threshold ||
				Math.abs(this.yaw - this.prevYaw) >= this.threshold
			) {
				newState = this.states.ACTIVE;
			} else {
				newState = this.states.IDLE;
			}

			// this._logdiff(this.roll, this.prevRoll);
			// this._logdiff(this.pitch, this.prevPitch);
			// this._logdiff(this.yaw, this.prevYaw);
		}

		this.prevRoll = this.roll;
		this.prevPitch = this.pitch;
		this.prevYaw = this.yaw;

		// when state has changed, update state and send event
		if (newState !== this.state) {
			this.state = newState;
			thingyEvent.sendThingyEvent('pickupstatechange', {thingy: this.thingy, state: this.state});
		}

		this._startChecking();
	};


	/**
	* update the pickup status of this Thingy
	* @returns {undefined}
	*/
	_updateOrientation(detail) {
		this.roll = detail.roll;
		this.pitch = detail.pitch;
		this.yaw = detail.yaw;
	}


	/**
	* handle connection being made
	* @returns {undefined}
	*/
	_connectHandler(e) {
		this.thingy = e.detail.thingy;
		this._initEulerOrientation();	
	};

}
