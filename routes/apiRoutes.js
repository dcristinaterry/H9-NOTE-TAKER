// ==================================================================
// import packages
// ==================================================================
let fs = require("fs");
let path = require("path");

// ==================================================================
// CREATE - READ - DELETE 
// ==================================================================


module.exports = function (app) {


    // ===============================================================
    //  read - write access db
    // ===============================================================


    var dbpath = path.join(__dirname, "../db/db2.json").toString();


    function getData(cb) {

        console.log("1.Reading Data")

        fs.readFile(dbpath, function (error, data) {
            if (error) throw error;
            // console.log("getting raw data")
            let txt = JSON.parse(data);
            // console.log(txt);
            cb(txt);
        })

    }

    function writeDB(res, jsonString) {
        console.log("2. writting do db")
        fs.writeFileSync(dbpath, jsonString, function (err, data) {
            if (err) throw err;
            console.log("Writting  to db");

        });
        res.json(jsonString);
    }

    // ===============================================================
    //  READ-REQUEST
    // ===============================================================

    app.get("/api/notes", function (req, res) {

    
        getData(function (data) {
            res.json(data);
        });

    })

    // ===============================================================
    // CREATE-REQUEST
    // ===============================================================

    app.post("/api/notes", function (req, res) {
        let notes = req.body;

        // get data from db
        getData(function (data) {

            //pushed new object to data array
            data.push(notes);
            let jsonString = JSON.stringify(data);

            // write to db
            writeDB(res, jsonString);
        })
    })

    // ===============================================================
    // DELETE-REQUEST
    // ===============================================================

    app.delete("/api/notes/:id", function (req, res) {
     
        let myId = req.params.id;
 
        getData(function (data) {

            // delete data
            data.splice(myId, 1);
            let jsonString = JSON.stringify(data);
            // write to db
            writeDB(res, jsonString);

        });

    });


};

