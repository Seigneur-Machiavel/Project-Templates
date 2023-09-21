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

});
