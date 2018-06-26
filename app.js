var bodyParser			= require("body-parser"),
	methodOverride		= require("method-override"),
	expressSanitizer	= require("express-sanitizer"),
	mongoose			= requre("mongoose"),
	express				= require("express"),
	app					= express();


//Require Routes
var blogRoutes = require("./routes/blog");

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
mongoose.set('debug', true);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// RESTFUL ROUTES
app.get("/", function(req, res){
	res.redirect("/blogs");
});

app.use("/blogs", blogRoutes);

app.listen(3000, function(){
	console.log("Blog app server is up and running!");
});

//nodemon app.js
//npm install -g nodemon
//Start the MongoDB environment
//"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath "C:\Users\Mike\Documents\Alpha-Code\Adv WebDev\SPA Todo App\data"


//Start MongoDB
//"C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe"
