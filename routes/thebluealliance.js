
module.exports = function(app, express, db, mongoose, http) {
	var thebluealliance = express.Router();
    
	thebluealliance.get('/updateTeams', function(request, response) {
    	getTeams(0);
    	
		function getTeams(group) {
			var req = http.get({
				  host: 'www.thebluealliance.com',
				  path: '/api/v2/teams/' + group + '?X-TBA-App-Id=frc2522:scouting-system:v0'
				}, function(res) {
				  if(res.statusCode === 200) {
					  // Buffer the body entirely for processing as a whole.
					  var bodyChunks = [];
					  res.on('data', function(chunk) {
					    bodyChunks.push(chunk);
					  }).on('end', function() {
					    var body = Buffer.concat(bodyChunks);
					    processTeams(JSON.parse(body), group);
					  })
				  }
			});

			req.on('error', function(e) {
			  console.log('ERROR: ' + e.message);
			});
		}
		
		function processTeams(teams, group) {
			console.log('Length: ' + teams.length);
			
	    	db.once('open', function (callback) {
	    		var userSchema = require('../models/user.js').userSchema;
	    		var User = mongoose.model('User', userSchema);
	    		
	    		var newUser = new User({ email: "Test", password: "Test2" });
	    		
	    		newUser.save(function (err, silence) {
	    			if (err) return console.error(err);
	    			mongoose.disconnect();
	    		});
	    	});
	    	
	    	
			for(var i = 0; i < teams.length; i++) {
				//console.log(teams[i].team_number);
			}
			
			if(teams.length > 1) {
				getTeams(group + 1);
			} else {
				response.end();
			}
		}        
    });
    
    // init api route. all api routes will begin with /api
    app.use('/thebluealliance', thebluealliance);
};