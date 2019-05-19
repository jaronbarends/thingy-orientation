
let thingy;
const stateElm = document.getElementById(`pickupState`);
const rollElm = document.getElementById(`roll`);
const pitchElm = document.getElementById(`pitch`);
const yawElm = document.getElementById(`yaw`);

const headingElm = document.getElementById(`heading`);

const gravityXElm = document.getElementById(`gravity-x`);
const gravityYElm = document.getElementById(`gravity-y`);
const gravityZElm = document.getElementById(`gravity-z`);

const quaternionWElm = document.getElementById(`quaternion-w`);
const quaternionXElm = document.getElementById(`quaternion-x`);
const quaternionYElm = document.getElementById(`quaternion-y`);
const quaternionZElm = document.getElementById(`quaternion-z`);

const r1c1 = document.getElementById(`r1c1`);
const r1c2 = document.getElementById(`r1c2`);
const r1c3 = document.getElementById(`r1c3`);
const r2c1 = document.getElementById(`r2c1`);
const r2c2 = document.getElementById(`r2c2`);
const r2c3 = document.getElementById(`r2c3`);
const r3c1 = document.getElementById(`r3c1`);
const r3c2 = document.getElementById(`r3c2`);
const r3c3 = document.getElementById(`r3c3`);


const logEuler = function(detail) {
	rollElm.textContent = Math.round(detail.roll);
	pitchElm.textContent = Math.round(detail.pitch);
	yawElm.textContent = Math.round(detail.yaw);
};

const logGravity = function(detail) {
	const value = detail.value;
	gravityXElm.textContent = value.x.toFixed(2);
	gravityZElm.textContent = value.y.toFixed(2);
	gravityYElm.textContent = value.z.toFixed(2);
};

const logQuaternion = function(detail) {
	quaternionWElm.textContent = detail.w.toFixed(2);
	quaternionXElm.textContent = detail.x.toFixed(2);
	quaternionZElm.textContent = detail.y.toFixed(2);
	quaternionYElm.textContent = detail.z.toFixed(2);
};


const logHeading = function(detail) {
	headingElm.textContent = Math.round(detail.heading);
};

const logMatrix = function(detail) {
	r1c1.textContent = Math.round(detail.row1[0]);
	r1c2.textContent = Math.round(detail.row1[1]);
	r1c3.textContent = Math.round(detail.row1[2]);
	r2c1.textContent = Math.round(detail.row2[0]);
	r2c2.textContent = Math.round(detail.row2[1]);
	r2c3.textContent = Math.round(detail.row2[2]);
	r3c1.textContent = Math.round(detail.row3[0]);
	r3c2.textContent = Math.round(detail.row3[1]);
	r3c3.textContent = Math.round(detail.row3[2]);
}

const logPickupState = function(detail) {
	if (detail.thingy === thingy) {
		stateElm.textContent = detail.state;
	} else {
		console.log('pickup state change for other Thingy');
	}
}



/**
* 
* @returns {undefined}
*/
const initTurnaround = function(e) {
	thingy = e.detail.thingy;

	thingy.addEventListener('eulerorientation', e => logEuler(e.detail));
	thingy.eulerorientation.start();

	thingy.addEventListener('heading', e => logHeading(e.detail));
	thingy.heading.start();

	thingy.addEventListener('gravityvector', e => logGravity(e.detail));
	thingy.gravityvector.start();

	thingy.addEventListener('quaternionorientation', e => logQuaternion(e.detail));
	thingy.quaternionorientation.start();

	thingy.addEventListener('rotationmatrixorientation', e => logMatrix(e.detail));
	thingy.rotationmatrixorientation.start();

	document.body.addEventListener('pickupstatechange', e => logPickupState(e.detail));

	// const method = "rotationmatrixorientation";
	// thingy[method].start()
	// thingy.addEventListener(method, e => console.log(e.detail));
};


/**
* initialize all
* @returns {undefined}
*/
const init = function() {
	document.body.addEventListener('connect.thingyConnector', initTurnaround);
};

// kick of the script when all dom content has loaded
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
