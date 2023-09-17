|-PLEASE READ THIS SHORT DOCUMENTATION CARREFULLY-|
|---This is a ready to use nodejs - ejs project---|

--------------------------------------------------------------------

[ Step 1 - SETUP]
- Create your new project on github website.
- Copy the content of this folder to your cloned github empty project,
- Make a "git push" ... you are already done !

[ Step 2 - RUN ]
Run the server using :
nohup node server.js > output.log 2>&1 &

--------------------------------------------------------------------

Args list :
-p [Number]     = Set a server PORT (default : 4321)
-m              = Enable Minifying public scripts
-ar             = Enable auto-restart
-da             = Disable admin token usage
-token [String] = Set admin command token -> recommended for security reason : use at least 40 chars !
----------------- default token : NzQxNzQ2NjEwNjQ0NjQwMzg4XyOg3Q5fJ9v5Kj6Y9o8z0j7z3QJYv6K3c

You can use arguments when starting, place them after "server.js " :
nohup node server.js -p 4321 -ar > output.log 2>&1 &
*The server would start with "port : 4321" and "auto-restart enabled"

Note : All arguments will be preserved when using the admin cmd to restart the server.

--------------------------------------------------------------------

Admin cmd :
restart         = Restart the server
gitpull         = Exec "git pull origin main" and restart the server

To use the admin commands, open navigator and access the associated url :
localhost:4321/restart/${token}
mywebsite/mysubdomain/restart/${token}

note : Never use these commands in debug mode, ex: visual code !
------ That can involve unexpected behavior...

--------------------------------------------------------------------