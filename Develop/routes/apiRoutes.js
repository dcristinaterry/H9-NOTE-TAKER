// ==================================================================
// import packages
// ==================================================================
let fs = require("fs");
let path = require("path");

let dbPath = __dirname + "/db/db.json";
// ==================================================================
// CREATE - READ - DELETE 
// ==================================================================



module.exports = function (app) {

    // ===============================================================
    //  READ 
    // ===============================================================

    function getData(cb) {

        // console.log("1.inside getdata")

        fs.readFile(dbPath, function (error, data) {
            if (error) throw error;
            // console.log("getting raw data")

            let txt = JSON.parse(data);
            // console.log(txt);

            cb(txt);
        })

    }

    function writeData(jsonString){
        fs.writeFileSync(dbPath, jsonString, function(err, data){
            if(err) throw err;
            console.log("wrote to db");
        });
    }

    app.get("/api/notes", function (req, res) {

        getData(function (data) {
            // console.log("2. I'm the callback");
            // console.log(data);
            res.json(data);
        });

    })

    // ===============================================================
    // CREATE
    // ===============================================================

    app.post("/api/notes", function (req, resp) {
        let notes = req.body;

        getData(function(data){

            let arrayofData = data;
            arrayofData.push(notes);

            let jsonString = JSON.stringify(arrayofData);

            writeData(arrayofData);
            // fs.writeFileSync(dbPath, jsonString, function(err, data){
            //     if(err) throw err;
            //     console.log("wrote to db");
            // });

        })
    })


    // app.delete("api/notes/:id", function (req, res) {

    //     let myId = req.params.id;

    // });




};

