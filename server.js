var express = require("express")
var app = express();
const exphbs = require("express-handlebars");
var session = require("express-session");
const { check, validationResult } = require('express-validator')



var Item = require("./models/item")
var Admin = require("./models/admin")
var Receipt = require("./models/receipt")
var Location = require("./models/location")
var insertItemMod = require("./modules/insertItem")
var insertOwnerMod = require("./modules/registerOwner")
var validateLoginMod = require("./modules/validateLogin")
var insertReceiptMod = require("./modules/addReceipt");
var insertLocationMod = require("./modules/insertLocation")
var checkRegistrationMod = require("./modules/validateRegistration")
var editItemMod = require("./modules/editItem")
var modifyMod = require("./modules/modify")
var testCreateMod = require("./modules/createExample")

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("views"))
app.engine('handlebars', exphbs());
app.set('view-engine', 'handlebars');
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(session({
	resave: false,
	saveUninitialized: false,
	cookieName: "session",
	secret: "secret",
	duration: 24 * 60 * 60 * 1000
}))

function ensureLogin(req, res, next){
	if(!req.session.user){
		res.redirect("/login");
	}else{
		next();
	}
}

function ensureAdmin(req, res, next){
	if(req.session.user.role != "admin"){
		res.send("need Admin Privleges!")
	}
	next()
}

app.get("/", (req, res) => {
	res.render("index.handlebars", {
		layout: false,
		user: req.session.user
	})
})

app.get("/login", async (req, res) => {
	
	res.render("login.handlebars", {
		layout: false
	})
})

app.get("/logout", ensureLogin, (req, res) => {
	req.session.destroy();
	res.redirect("/login");
})

app.get("/dashboard", ensureLogin, (req, res) => {
	res.render("adminDashboard.handlebars", {
		layout: false,
		user: req.session.user
	})
})


app.get("/sale", ensureLogin, async (req, res) => {
	res.render("sale.handlebars", {
		layout: false,
		user: req.session.user
	});
});

app.get("/reports", ensureLogin, async (req, res) => {
	res.render("chart.handlebars", {
		layout: false,
		user: req.session.user
	})
})

app.get("/getItems", ensureLogin, async (req, res) => {
	var itemsArr = await Item.find({locations: req.session.user.chosenLocation._id}).lean();
	res.json({items: itemsArr});
})

app.get("/getReceipts", ensureLogin, async (req, res) => {
	var receiptArr = await Receipt.find({locations: req.session.user.chosenLocation._id})
	.populate({path: 'items', model: Item}).lean();
	res.json({receipts: receiptArr})
})


app.get("/getLocations",ensureLogin, (req, res) => {
	var locationsArr = req.session.user.locations;
	var chosen = req.session.user.chosenLocation;
	res.json({locations: locationsArr, chosenLocation: chosen})
})


app.get("/register", (req, res) => {
	res.render("registration.handlebars", {
		layout: false
	})
})



app.post("/loginUser", async (req, res) => {
	var user = await validateLoginMod.validate(req.body);
	if(user.validData){
		req.session.user = {
			fname: user.fname,
			email: user.email,
			locations: user.locations,
			id: user._id,
			role: user.role,
			chosenLocation: user.locations[0]
		}
		req.session.save;
		res.redirect("/dashboard")
	}else{
		res.redirect("/login")
	}
})

app.post("/registerOwner", async (req, res) => {
	var emailPassword = await checkRegistrationMod.check(req.body.ownerEmail, req.body.ownerPassword)
	if(!emailPassword.badEmail && !emailPassword.badPassword){
		var admin = await insertOwnerMod.addOwner(req.body.streetName, req.body.streetNumber, req.body.postalCode, req.body.city, req.body.province, req.body.country, req.body.companyName, req.body.ownerFname, req.body.ownerLname, req.body.ownerEmail, req.body.ownerPassword)

		req.session.user = {
			fname: admin.fname,
			email: admin.email,
			locations: admin.locations,
			id: admin._id,
			role: admin.role,
			chosenLocation: admin.locations[0]
		}
		
		res.redirect("/dashboard");
	}else{
		res.render("registration.handlebars", {
			layout: false,
			emailError: emailPassword.badEmail,
			passwordError: emailPassword.badPassword
		})
	}
})

app.post("/addItem", ensureLogin, ensureAdmin, async (req, res) => {
	await insertItemMod.insertItem(req.body.itemName, req.body.itemCategory, req.body.itemBrand, req.body.itemSize, req.body.itemPrice, req.body.itemCost, req.body.itemQty, req.session.user.chosenLocation)
	res.redirect("/dashboard");
})

app.post("/addLocation", ensureLogin, ensureAdmin, async (req, res) => {
	var user = await insertLocationMod.addLocation(req.body, req.session.user.id);
	req.session.user.locations = user.locations;
	res.redirect("/dashboard")
})


app.post("/completeSale", ensureLogin, async (req, res) => {
	var receiptArr = JSON.parse(req.body.submitReceiptArr);
	insertReceiptMod.receipt(receiptArr, req.body.receiptDiscount, req.body.receiptSubmitTotal, req.session.user.chosenLocation);

	res.redirect('/sale');
})

app.post('/changeChosenLocation', ensureLogin, async (req, res) => {
	req.session.user.chosenLocation = req.body.data.el;
	res.end()
})

app.post('/testSubmission', ensureLogin, (req, res) => {
	res.redirect("/sale")
})

app.post('/editItem', ensureLogin, ensureAdmin, async(req, res) => {
	var fData = req.body;
	editItemMod.modify(fData.itemId, fData.name, fData.brand, fData.category, fData.size, fData.price, fData.qty)

	res.redirect("/dashboard")
})

app.post('/receiveOrder', ensureLogin, async(req,res) => {
	editItemMod.receiveOrder(req.body.id, req.body.qtyReceived)
	res.redirect("/dashboard")
})



app.listen(HTTP_PORT, function(){
	console.log("server on: " + HTTP_PORT);
});
