/**
* send event with thingy namespace
* @returns {undefined}
*/
const sendThingyEvent = function(eventName, detail) {
	const evt = new CustomEvent(eventName, {detail});
	document.body.dispatchEvent(evt);
};

const thingyEvent = {
	sendThingyEvent,
};

export { thingyEvent };