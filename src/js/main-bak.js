import Thingy from "./vendor/thingy/index.js";
import constants from './constants.js';
console.log(constants);

const thingy = new Thingy({logEnabled: true});
const connectBtn = document.getElementById(`connect-btn`);
const disconnectBtn = document.getElementById(`disconnect-btn`);
const disabledBtnClass = 'btn--is-disabled';






/**
* start the thingy
* @returns {undefined}
*/
const start = async function(device) {
	try {
		await device.connect();
		connectBtn.classList.add(disabledBtnClass);
		disconnectBtn.classList.remove(disabledBtnClass);
		initBattery(device);
	} catch (error) {
	  console.error(error);
	}
};


/**
* 
* @returns {undefined}
*/
const stop = async function(device) {
	try {
		await device.disconnect();
		connectBtn.classList.remove(disabledBtnClass);
		disconnectBtn.classList.add(disabledBtnClass);
	} catch(error)  {
		console.error(error);
	}
};



/**
* 
* @returns {undefined}
*/
const initConnectButtons = function() {
	connectBtn.addEventListener('click', async () => {
		start(thingy);
	});
	disconnectBtn.addEventListener('click', async () => {
		stop(thingy);
	});
};

/**
* 
* @returns {undefined}
*/
const updateBatteryStatus = function(status) {
	document.getElementById(`battery-value`).textContent = status;
	document.getElementById(`battery-icon`).setAttribute('style', `--status: ${parseInt(status, 10)/100}`);
};



/**
* show battery level and set up listener
* @returns {undefined}
*/
const initBattery = async function(device) {
	const value = await device.battery.read();
	updateBatteryStatus(value.status);

	device.addEventListener('battery', (e) => {
		updateBatteryStatus(e.detail.status);
	});
	device.battery.start();
};



/**
* initialize all
* @param {string} varname Description
* @returns {undefined}
*/
const init = function() {
	initConnectButtons();
};

// kick of the script when all dom content has loaded
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
