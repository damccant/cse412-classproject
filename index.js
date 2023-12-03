const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser  = require('cookie-parser')
const app = express()
const port = 8080

app.use(express.static(path.join(__dirname, "public")));

// for parsing cookies
app.use(cookieParser())
// for parsing JSON
app.use(bodyParser.json())
// for parsing application/xwww-form-urlencoded
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)
// for parsing multipart/form-data
//app.use(upload.array())
app.set("view engine", "ejs");




const login = require('./login.js');
app.locals.login = login; // made this module available to all EJS views
// this is needed because all session management functions are in this module
// and need to be accessed by a lot of different pages
app.post('/login', login.doLogin);
app.get('/login', login.displayLogin);
app.post('/logout', login.doLogout);
app.post('/delete_user', login.doDelete);
app.get('/register', (request, response) => {
	response.render("register");
});
app.post('/register', login.registerUser);

app.get('/', (request, response) => {
	var session = request.cookies.session;
	var redir_url = '/';
	response.render("index", {session, redir_url});
})

const company = require('./company.js');
app.get('/company', company.listCompanies);
app.get('/company/:id', company.specificCompany);

const search = require('./search.js');
app.get('/search', search.specificJob);

const job = require('./job.js');
app.get('/job/:id', job.printJob);

const apply = require('./apply.js');
app.get('/apply/:id', apply.jobApply);

app.listen(port, () => {
	console.log('Listening on port ' + port);
})
