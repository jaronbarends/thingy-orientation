/*
class for setting up connection with Thingy
*/

// import {constants} from "../../js/util/constants.js";
import {thingyEvent} from "../../js/util/thingy-event.js";

const eventNames = {
	'connect': `connect.thingyConnector`,
	'disconnect': `disconnect.thingyConnector`,
}

const cssClasses = {
	btnDisabled: 'btn--is-disabled',
}

const constants = {
	cssClasses,
	eventNames,
};

const connectBtn = document.getElementById(`connect-btn`);
const disconnectBtn = document.getElementById(`disconnect-btn`);

export default class ThingyConnector {

	constructor(thingy) {
		this.thingy = thingy;
		this._addEventListeners();
		this._initButtons();
	}


	/**
	* start the thingy
	* @returns {undefined}
	*/
	async _start(device) {
		try {
			await device.connect();
			thingyEvent.sendThingyEvent(eventNames.connect, {thingy: this.thingy});
		} catch (error) {
		  console.error(error);
		}
	};
	
	
	/**
	* stop the thingy
	* @returns {undefined}
	*/
	async _stop(device) {
		try {
			await device.disconnect();
			thingyEvent.sendThingyEvent(eventNames.disconnect);
		} catch(error)  {
			console.error(error);
		}
	};


	/**
	* initialize the connect and disconnect buttons
	* @returns {undefined}
	*/
	_initButtons() {
		connectBtn.addEventListener('click', async () => {
			this._start(this.thingy);
		});
		disconnectBtn.addEventListener('click', async () => {
			this._stop(this.thingy);
		});
	};


	/**
	* handle connection being made
	* @returns {undefined}
	*/
	_connectHandler() {
		connectBtn.classList.add(cssClasses.btnDisabled);
		disconnectBtn.classList.remove(cssClasses.btnDisabled);
	};


	/**
	* handle connection being closed
	* @returns {undefined}
	*/
	_disconnectHandler() {
		connectBtn.classList.remove(cssClasses.btnDisabled);
		disconnectBtn.classList.add(cssClasses.btnDisabled);
	};


	/**
	* add listeners
	* @returns {undefined}
	*/
	_addEventListeners() {
		document.body.addEventListener(eventNames.connect, this._connectHandler);
		document.body.addEventListener(eventNames.disconnect, this._disconnectHandler);
	};

	
}