import Thingy from "./vendor/thingy/index.js";
import ThingyConnector from  "../components/thingy-connector/ThingyConnector.js";
import BatteryStatus from  "../components/battery-status/BatteryStatus.js";
import pickupWatcher from "../components/pickup-watcher/pickup-watcher.js";

const thingy = new Thingy({logEnabled: true});



/**
* initialize all
* @param {string} varname Description
* @returns {undefined}
*/
const init = function() {
	new ThingyConnector(thingy);
	new BatteryStatus();
	new pickupWatcher();
};

// kick of the script when all dom content has loaded
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
