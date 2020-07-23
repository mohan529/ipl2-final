const extraRunsByEachTeam = require("./ipl/extraRunsByEachTeam");
const csv = require("csvtojson");
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let Port = process.env.Port || 3000;
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, resp) => {
    resp.render("index.html", {
        root: _dirname + "/public",
    });
});


app.get("/matches-played", (req, res) => {
    let year = req.query.season;
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then((matches) => {
            csv()
                .fromFile(DELIVERIES_FILE_PATH)
                .then((deleveries) => {
                    let extraRunsResult = extraRunsByEachTeam(
                        matches, deleveries, year);
                    res.json({
                        extraRunsResult,
                    });
                });
        });
});

app.listen(Port, () => {
    console.log("server started");
});