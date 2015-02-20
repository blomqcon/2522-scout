var mongoose = require('mongoose');


var kittySchema = new mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function () {
	var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name"
  console.log(greeting); 
}

exports.kittySchema = kittySchema;