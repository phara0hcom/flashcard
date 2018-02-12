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

//Save the username when the user posts the set username form
app.post('/checkSession', function(req, res){
  let Auterized = false
  if ( req.body.Id === "113124134004949333351" )
  {
    Auterized = true
  }
  req.session.Auterized = Auterized;
  req.session.Id = req.body.Id;
  req.session.save();

  res.json({
    session: req.session.Auterized,
    Id: req.body.Id
  })
});

//Return the session value when the client checks
app.get('/checkSession', function(req,res){
  if ( req.session.Auterized === undefined ){
    req.session.Auterized = false
    req.session.save();
  }
  res.json({ session: req.session.Auterized })
});

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)