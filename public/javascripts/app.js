var scoutApp = angular.module('scoutApp', [
  'ngRoute',
  'scoutServices',
  'scoutControllers'
  
]);

scoutApp.config(["$routeProvider",function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "partials/home.html",
        controller: "HomeCtrl",
        resolve: {
            auth: function ($q, authSvc) {
                var userInfo = authSvc.getUserInfo();
                if (userInfo) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({ authenticated: false });
                }
            }
        }
    }).when("/login", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl",
        resolve: {
        	notAuth: function($q, $location, authSvc) {
                var userInfo = authSvc.getUserInfo();
                if (userInfo) {
                	$location.path("/");
                }
        	}
        }
    }).when("/newAccount", {
        templateUrl: "partials/NewAccount.html",
        controller: "NewAccountCtrl",
        resolve: {
        	notAuth: function($q, $location, authSvc) {
                var userInfo = authSvc.getUserInfo();
                if (userInfo) {
                	$location.path("/");
                }
        	}
        }
    }).otherwise({
        redirectTo: '/'
      });
}]);

scoutApp.run(["$rootScope", "$location", function ($rootScope, $location) {

    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
        console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/login");
        }
    });
}]);