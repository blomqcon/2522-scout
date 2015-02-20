var mongoose = require('mongoose');


var teamSchema = new mongoose.Schema({
    website: String,
    name: String,
    locality: String,
    rookie_year: int,
    region: String,
    team_number: int,
    location: String,
    key: String,
    country_name: String,
    nickname: String
});

exports.teamSchema = teamSchema;