// WELCOME IN MY CONCEPTION OF A SIMPLE NODEJS - EJS PROJECT
// IN VISUAL CODE YOU CAN USE Ctrl+K Ctrl+0 TO FOLD ALL CODE
// THAT CAN BE USEFUL TO FOLD THE #REGION OF CODE

const settings = {
  p: 4321, // Port
  m: false, // Minify scripts
  ar: false, // Auto restart
  token: "NzQxNzQ2NjEwNjQ0NjQwMzg4XyOg3Q5fJ9v5Kj6Y9o8z0j7z3QJYv6K3c", // admin Token
  da: false, // Disable admin token usage
}
let exit_task = ""

// LAUNCH ARGUMENTS
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  // Check if the argument starts with "-"
  if (arg.startsWith("-")) {
      // Get the key by removing the "-"
      const key = arg.slice(1);
      if (key == "m") { settings.m = true; continue; }
      if (key == "ar") { settings.ar = true; continue; }

      // Move to the next argument
      i++;
      const value = args[i];

      // if string value is valid number
      if (key == "p" && !isNaN(value)) {settings[key] = Number(value); continue;}

      // Add the key and value to the launchArguments object
      settings[key] = value;
  }
}

const launch_folder = __dirname.split('\\').pop().split('/').pop();
const fs = require('fs');
const path = require('path');
const express = require('express');
const UglifyJS = require('uglify-js');
const { exec } = require('child_process');

function create_public_version_of_script(filePath, varName = false) {
  // Lire le contenu du fichier
  let fileContent = fs.readFileSync(filePath, 'utf8');

  // Remplacer "module.exports" par "window.${var_name}"
  if (varName) { fileContent = fileContent.replace(/module\.exports/g, `window.${varName}`); }

  fileContent = fileContent.replace(/subdomain_prefix|env_ = 'dev'/g, (match) => {
    if (match === 'subdomain_prefix') {
        return `"${launch_folder}"`;
    } else if (match === "env_ = 'dev'") {
        return "env_ = 'prod'";
    }
  });

  // Minimiser le contenu modifié
  if (settings.m) { fileContent = UglifyJS.minify(fileContent).code; }

  // Obtenir le nom de fichier sans le chemin
  const fileName = path.basename(filePath);

  // Chemin de destination pour la copie
  const destinationPath = path.join(__dirname, 'public/scripts', fileName);

  // Créer le dossier de destination s'il n'existe pas
  const destinationDir = path.join(__dirname, 'public/scripts');
  if (!fs.existsSync(destinationDir)) { fs.mkdirSync(destinationDir); }

  // Écrire le contenu modifié dans le nouveau fichier
  fs.writeFileSync(destinationPath, fileContent, 'utf8');

  console.log(`File copy success : ${destinationPath}`);
}
function executeServerManagerScript(exec_args = "") {
  const arg_ = exec_args ? ` ${exec_args}` : ""
  exec(`node ServerManager.js${arg_}`, (error, stdout, stderr) => {
    if (error) { console.error(`Error executing the script ServerManager.js: ${error}`); return; }
    console.log('The script ServerManager.js has been executed');
  });
}
// Make public version of scripts
fs.readdirSync('./public_scripts').forEach(file => {
  if (file.endsWith('.js')) { create_public_version_of_script(`./public_scripts/${file}`); }
});

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
// Route to listen subdomain (ex: localhost:4321/launch_folder)
app.use(`/${launch_folder}`, express.static('public'));

// Route to listen root domain (ex: localhost:4321) & replace "launch_folder" by the name of the folder
app.get('/', (req, res) => { res.render('index', {"launch_folder": launch_folder}); });
// Route to restart the server
if (!settings.da) {
  app.get(`/restart/${settings.token}`, (req, res) => { exit_task = "restart"; res.render('simple_msg', {"launch_folder": launch_folder, "message": "Server is restarting..."}); process.exit(0) });
  app.get(`/gitpull/${settings.token}`, (req, res) => { exit_task = "gitpull"; res.render('simple_msg', {"launch_folder": launch_folder, "message": "Server is restarting after 'git pull origin main'..."}); process.exit(0) });
  app.get(`/${launch_folder}/restart/${settings.token}`, (req, res) => { exit_task = "restart"; res.render('simple_msg', {"launch_folder": launch_folder, "message": "Server is restarting..."}); process.exit(0) });
  app.get(`/${launch_folder}/gitpull/${settings.token}`, (req, res) => { exit_task = "gitpull"; res.render('simple_msg', {"launch_folder": launch_folder, "message": "Server is restarting after 'git pull origin main'..."}); process.exit(0) });
  
  console.log("Admin routes are enabled: /restart, /gitpull");
}

app.listen(settings.p, () => {
  console.log(`Server running on port ${settings.p}`);
});

process.on('exit', () => {
  // If no exit task, and auto restart is enabled, set the exit task to "restart"
  if (exit_task === "" && settings.ar) { exit_task = "restart" }
  if (exit_task === "") { return; } // If no exit task, exit the process

  // Add the arguments to the exit task
  args.forEach(arg => { exit_task += " "+ arg })

  // Execute the ServerManager.js script with the exit task as argument
  executeServerManagerScript(exit_task);
  console.log(`exit_task: ${exit_task}`);
});