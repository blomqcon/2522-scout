var scoutApp = angular.module('scoutApp', [
  'ngRoute',
  'scoutControllers',
  'scoutServices'
]);



scoutApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl',
        resolve: {
            auth: function ($q, authenticationSvc) {
                var userInfo = authenticationSvc.getUserInfo();
                if (userInfo) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({ authenticated: false });
                }
            }
        }
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      otherwise({
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