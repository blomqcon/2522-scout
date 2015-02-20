module.exports = function(app, express, db, mongoose, jwt, _) {
	var api = express.Router();
	var tokens = [];
    
    api.post('/login', function(request, response) {
        var userName = request.body.userName;
        var password = request.body.password;

        if (userName === "Connor" && password === "Blomquist") {
            var expires = new Date();
            expires.setDate((new Date()).getDate() + 5);
            var token = jwt.encode({
                userName: userName,
                expires: expires
            }, app.get('jwtTokenSecret'));
            
            tokens.push(token);
            
            console.log(userName + " logging in");
            response.send(200, { access_token: token, userName: userName });
        } else {
        	console.log("Failed login : " + userName + " - " + password);
            response.send(401, "Invalid credentials");
        }
    });
    
    api.post('/logout', function(request, response) {
        //requiresAuthentication(request, response);
        var token = request.headers.access_token;
        var decodedToken = jwt.decode(token, app.get('jwtTokenSecret'));
        console.log(decodedToken.userName + " logging out");
        removeFromTokens(token);
        response.send(200);
    });
    
    api.post('/createAccount', function(request, response) {
    	var email = request.body.emailAddress;
    	var password = request.body.password;
    	db.once('open', function (callback) {
    		var userSchema = require('../models/user.js').userSchema;
    		var User = mongoose.model('User', userSchema);
    		
    		var newUser = new User({ email: email, password: password });
    		
    		newUser.save(function (err, silence) {
    			if (err) return console.error(err);
    		});
    	});
    	
        console.log(email + " created an account");
        response.send(200);
    });

    function removeFromTokens(token) {
        for (var counter = 0; counter < tokens.length; counter++) {
            if (tokens[counter] === token) {
                tokens.splice(counter, 1);
                break;
            }
        }
    }

    function requiresAuthentication(request, response, next) {
        if (request.headers.access_token) {
            var token = request.headers.access_token;
            if (_.where(tokens, token).length > 0) {
                var decodedToken = jwt.decode(token, app.get('jwtTokenSecret'));
                if (new Date(decodedToken.expires) > new Date()) {
                    //next();
                    return;
                } else {
                    removeFromTokens(token);
                    response.end(401, "Your session is expired");
                }
            }
        } else {
        	response.end(401, "No access token found in the request");
        }
    }
    
    // init api route. all api routes will begin with /api
    app.use('/api', api);
};