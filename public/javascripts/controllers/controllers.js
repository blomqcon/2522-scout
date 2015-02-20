var scoutControllers = angular.module('scoutControllers', []);

scoutControllers.controller("LoginCtrl", ["$scope", "$location", "$window", "authSvc",function ($scope, $location, $window, authSvc) {
    $scope.userInfo = null;
    $scope.login = function () {
        authSvc.login($scope.userName, $scope.password)
            .then(function (result) {
                $scope.userInfo = result;
                $location.path("/");
            }, function (error) {
                $window.alert("Invalid credentials");
                console.log(error);
            });
    };

    $scope.cancel = function () {
        $scope.userName = "";
        $scope.password = "";
    };
    $scope.new_account = function() {
      $location.path("/newAccount");
    }
}]);

scoutControllers.controller("NewAccountCtrl", ["$scope", "$location", "$window", "newAccSvc", function ($scope, $location, $window, newAccSvc) {
	$scope.userInfo = null;
	$scope.cancel = function() {
        $scope.emailAddress = "";
        $scope.password = "";
        $scope.confirmPassword = "";
    };
    $scope.create = function() {
      newAccSvc.createAccount($scope.emailAddress, $scope.password)
          .then(function(result) {	
              $scope.userInfo = result;
              $location.path("/");
           }, function(error) {
              console.log(error);
           });
    }
}]);

scoutControllers.controller("HomeCtrl", ["$scope", "$location", "authSvc", "auth",function ($scope, $location, authSvc, auth) {
    $scope.userInfo = auth;

    $scope.logout = function () {

        authSvc.logout()
            .then(function (result) {
                $scope.userInfo = null;
                $location.path("/login");
            }, function (error) {
                console.log(error);
            });
    };
}]);