// ==================================================================
// import packages
// ==================================================================
let fs = require("fs");
let path = require("path");
// let notes = require("../db/db2.json");





// ==================================================================
// CREATE - READ - DELETE 
// ==================================================================



module.exports = function (app) {
    var dbpath = path.join(__dirname, "../db/db2.json").toString();
    
    // ===============================================================
    //  READ 
    // ===============================================================

    function getData(cb) {

        // console.log("1.inside getdata")

        fs.readFile(dbpath, function (error, data) {
            if (error) throw error;
            // console.log("getting raw data")

            let txt = JSON.parse(data);
            // console.log(txt);

            cb(txt);
        })

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

    function writeDB() {
        fs.writeFileSync(dbpath, jsonString, function (err, data) {
            if (err) throw err;
            console.log("wrote to db");

        });
    }





    app.post("/api/notes", function (req, res) {
        let notes = req.body;


        getData(function (data) {

            let arrayofData = data;
            arrayofData.push(notes);

            let jsonString = JSON.stringify(arrayofData);

            // writeData(arrayofData);

            writeDB().then(function(){
                res.json(jsonString);
            })

            // fs.writeFileSync(dbPath2, jsonString, function (err, data) {
            //     if (err) throw err;
            //     console.log("wrote to db");

            // });
           
        })
    })


    app.delete("/api/notes/:id", function (req, res) {
        // console.log(req)
        let myId = req.params.id;
        console.log(myId);

        getData(function (data) {

            let arrayofData = data;
            arrayofData.splice(myId, 1);

            let jsonString = JSON.stringify(arrayofData);

            // writeData(arrayofData);
            fs.writeFileSync(dbpath, jsonString, function (err, data) {
                if (err) throw err;
                console.log("deleted element db");

            });
            res.json(jsonString);
        });

    });


};

