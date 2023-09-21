const urlprefix = subdomain_prefix
// Dont forget to use the "urlprefix" while fetching, example :
// .src = `${urlprefix}/sprites/cloud`

//#region - PRELOAD FUNCTIONS - ( They need to be created before html elements who use them )
function toggleDarkMode(element) {
	if (element.checked) {
		document.body.classList.add('dark-mode');
	} else {
		document.body.classList.remove('dark-mode');
	}
}
//#endregion

window.addEventListener('load', async function () {

//#region - CLASSES
//#endregion

//#region - HTML-ELEMENTS
const modal = document.getElementById('modal');
//#endregion

//#region - VARIABLES
//#endregion

//#region - SIMPLE FUNCTIONS
function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }
//#endregion

//#region - EVENT LISTENERS
document.getElementById("dark-mode-toggle").addEventListener('change', (event) => {
	// save dark-mode state
	localStorage.setItem('dark-mode', event.target.checked);
});
//#endregion

//#region - SET SETTINGS FROM LOCALSTORAGE
if (localStorage.getItem('dark-mode') === "false") {
	document.getElementById('dark-mode-toggle').checked = false;
	toggleDarkMode(document.getElementById('dark-mode-toggle'));
}
//#endregion ----------------------------------------------

//#region - WEBSOCKET
const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
const ws = new WebSocket(protocol + window.location.host);

ws.onmessage = async (message) => {
	if (message.data == "pong") { return; }
    const data = JSON.parse(message.data);
	const d_ = data.data;
	if (d_ == undefined) { console.log(`${data.type} not contain proper "data: {}"`); return false; }

	switch (data.type) {
		case 'log_msg':
			console.log(d_);
			break;
		default:
			break;
	}
};
ws.onopen = async () => {
	console.log('Socket opened');
	let last_msg_timestamp = new Date().getTime();

	// EXAMPLE OF SENDING DATA TO SERVER
	ws.send(JSON.stringify({ type: 'log_msg', data: 'Hello from client' }));
	
	// start ping loop
	while(true) {
		const current_timestamp = new Date().getTime()
		// if last_ws_msg is more than 27 sec old, send 'ping' to keep the connection alive
		if (last_msg_timestamp + 27000 < current_timestamp) {
			ws.send('ping');
			last_msg_timestamp = current_timestamp;
		}
		await new Promise(r => setTimeout(r, 1000));
	}
};
ws.onclose = async () => {
	console.log('Socket closed');
	// wait 1 sec
	await new Promise(r => setTimeout(r, 1000));
	// refresh webpage;
	location.reload();
};
//#endregion ----------------------------------------------

});
