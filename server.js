import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import path from 'path'


const port = 3010
const app = express()

// serve static assets normally
app.use(express.static(__dirname + '/public'))

//use sessions for tracking logins
app.use(session({
  secret: "SuperSecret Session",
  resave: true,
  saveUninitialized: false
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)