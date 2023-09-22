# Project-Templates : "hello world" in 60 sec
-------------------
```sh
Instant setup NODEJS / EJS project templates
Ready to use on VPS with rev-proxy like Nginx
```
-------------------
### *PLEASE READ THIS SHORT DOCUMENTATION CARREFULLY*
-------------------
## NPM PACKAGE BUILT IN
These packages are included in any of the template's folders
```sh
+-- child_process@1.0.2
+-- ejs@3.1.9
+-- express@4.18.2
+-- fs@0.0.1
+-- path@0.12.7
+-- uglify-js@3.17.4
`-- util@0.12.5
```

WebSocket template also include :
```sh

```
## SETUP
1. Create your new project on github website
2. Copy the content of one template folder to your empty cloned github project
3. Make a "git push"
4. ... you are already done !

## RUN
- Simple launch :
node server.js
- Detached launch + log in "output.log" file :
nohup node server.js > output.log 2>&1 &
-------------------
## ARGUMENTS
> You can use arguments when starting, place them after "server.js " :
> Example : nohup node server.js -p 4321 -ar > output.log 2>&1 &

**Default server config :**
- **port : 4321** 
- **auto-restart : enabled**

| Argument | Effect | Example |
| ------ | ------ | ------ |
| -p | Set a server PORT (default : 4321) | node server.js -p 3000 |
| -m | Enable Minifying public scripts | node server.js -m |
| -ar | Enable auto-restart | node server.js -ar |
| -da | Disable admin token usage | node server.js -da |
| -lr | Log server routes at startup (default : true) | node server.js -lr |
| -rd | Root domain = Don't use "subdomain" (default : false) | node server.js -rd |
| -t [String] | Set admin cmd token -> at least 40 chars for security ! | node server.js -t mytoken |
**Default admin token :**
*NzQxNzQ2NjEwNjQ0NjQwMzg4XyOg3Q5fJ9v5Kj6Y9o8z0j7z3QJYv6K3c*

**SubDomain management**
Usefull while using reverse proxy like Nginx, server and files automatically adapted to open
- https://mywebsite/mysubdomain ( mysubdomain = project folderName )
If not using subdomain :
- Use [-rd] to not use this functionnality
-------------------
## ADMIN CMD
> To use the admin commands, open navigator and access the associated url :

**Example of usable url :**
- localhost:4321/restart/${token}
- https://mywebsite/mysubdomain/restart/mytoken

| Command | Effect |
| ------ | ------ |
| restart | restart the server
| gitpull | Exec "git pull origin main" and restart the server |

Note : **NEVER USE THESE COMMANDS IN DEBUG MODE !** *ex : VISUAL CODE*
{ ! Can involve unexpected behavior... ! }

Tip : Save the [**ADMIN CMD URLs**] in your **browser's favorites**