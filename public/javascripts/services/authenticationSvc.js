var scoutServices = angular.module('scoutServices', ['ngResource']);

scoutServices.factory('authSvc', ["$http","$q","$window",function ($http, $q, $window) {
    var userInfo;

    function login(userName, password) {
        var deferred = $q.defer();
        $http.post("/api/login", { userName: userName, password: password })
            .then(function (result) {
                userInfo = {
                    accessToken: result.data.access_token,
                    userName: result.data.userName
                };
                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                deferred.resolve(userInfo);
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    function logout() {
        var deferred = $q.defer();

        $http({
            method: "POST",
            url: "/api/logout",
            headers: {
                "access_token": userInfo.accessToken
            }
        }).then(function (result) {
            userInfo = null;
            $window.sessionStorage["userInfo"] = null;
            deferred.resolve(result);
        }, function (error) {
            alert("error");
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function getUserInfo() {
        return userInfo;
    }

    function init() {
        if ($window.sessionStorage["userInfo"]) {
            userInfo = JSON.parse($window.sessionStorage["userInfo"]);
        }
    }
    init();

    return {
        login: login,
        logout: logout,
        getUserInfo: getUserInfo
    };
}]);

scoutServices.factory('newAccSvc', ["$http","$q","$window",function ($http, $q, $window) {
    var userInfo;
    
    function createAccount(emailAddress, password) {
        var deferred = $q.defer();
        $http.post("/api/createAccount", { emailAddress: emailAddress, password: password })
            .then(function (result) {
                userInfo = {
                    accessToken: result.data.access_token,
                    userName: result.data.userName
                };
                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                deferred.resolve(userInfo);
            }, function (error) {
                deferred.reject(error);
                alert("error creating account");
            });

        return deferred.promise;
    }

    function checkAccount(emailAddress) {
        var deferred = $q.defer();

        $http({
            method: "POST",
            url: "/api/checkAccount",
            data: {
                emailAddress: emailAddress
            }
        }).then(function (result) {
        
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function init() {
        if ($window.sessionStorage["userInfo"]) {
            userInfo = JSON.parse($window.sessionStorage["userInfo"]);
        }
    }
    init();

    return {
        createAccount: createAccount,
        checkAccount: checkAccount
    };
}]);