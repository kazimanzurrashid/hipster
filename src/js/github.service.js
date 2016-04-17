(function() {

  function gitHub($http) {
    return {
      getUserProfile: function(userName) {
        return $http.jsonp('https://api.github.com/users/' +
          userName +
          '?callback=JSON_CALLBACK');
      }
    };
  }

  angular.module('hipster').factory('gitHub', gitHub);
})();
