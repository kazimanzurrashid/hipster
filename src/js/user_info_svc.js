angular.module('hipster')
  .factory('UserInfoSvc',
    function($http) {

      return {
        getInfo: function(userName) {
          return $http.jsonp('https://api.github.com/users/' +
            userName +
            '?callback=JSON_CALLBACK');
        }
      };
    });
