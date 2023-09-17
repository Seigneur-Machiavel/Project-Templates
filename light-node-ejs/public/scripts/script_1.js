const urlprefix = "light-node-ejs"
// Dont forget to use the "urlprefix" while fetching, example:
// .src = `${urlprefix}/sprites/cloud`

function toggleDarkMode(element) {
	if (element.checked) {
		document.body.classList.add('dark-mode');
	} else {
		document.body.classList.remove('dark-mode');
	}
}

window.addEventListener('load', async function () {

//#region - Classes
//#endregion

//#region - HTML-Elements
const modal = document.getElementById('modal');
//#endregion

//#region - Variables
//#endregion

//#region - Simple-Functions
function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }
//#endregion

//#region - Event-Listeners
//#endregion

});
