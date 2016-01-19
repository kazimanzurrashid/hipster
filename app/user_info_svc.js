(function(ng) {
  var app = ng.module('hipster');

  app.factory('UserInfoSvc', ['$http', function($http) {
    return {
      getInfo: function(userName) {
        return $http.jsonp('https://api.github.com/users/'+ userName + '?callback=JSON_CALLBACK');
      }
    };
  }]);

})(angular);
