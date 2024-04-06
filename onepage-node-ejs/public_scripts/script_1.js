const urlprefix = subdomain_prefix
// Dont forget to use the "urlprefix" while fetching, example :
// .src = `${urlprefix}/sprites/cloud`
/*const env_= 'dev'; // 'prod' or 'dev'
if (env_ == 'dev') { // THIS IS FOR DEV ONLY ( to get better code completion)
    console.log('dev mode');
    // const sf = require('./simple_functions.js');
} else {
    // sf = window.sf;
}*/

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
const toggleDarkModeButton = document.getElementById('dark-mode-toggle');
//#endregion

//#region - VARIABLES
//#endregion

//#region - SIMPLE FUNCTIONS
function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }
//#endregion

//#region - EVENT LISTENERS
document.getElementById("dark-mode-toggle").addEventListener('change', (event) => {
	toggleDarkMode(toggleDarkModeButton)
	// save dark-mode state
	localStorage.setItem('dark-mode', event.target.checked);
});
//#endregion

//#region - SET SETTINGS FROM LOCALSTORAGE
if (localStorage.getItem('dark-mode') === "false") {
	toggleDarkModeButton.checked = false;
	toggleDarkMode(toggleDarkModeButton);
}
//#endregion ----------------------------------------------

});
