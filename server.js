// ==============================================================================
// DEPENDENCIES
// ==============================================================================

var express = require("express");

// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================


var app = express();
app.use(express.static("public"));
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// ================================================================================

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// var apiRoutes = require("./routes/apiRoutes")
// console.log(apiRoutes); //=> [Function]
// apiRoutes(app);

// =============================================================================
// LISTENER
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
