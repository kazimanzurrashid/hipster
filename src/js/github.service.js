(function() {

  function github($http) {
    return {
      getUserProfile: function(userName) {
        return $http.jsonp('https://api.github.com/users/' +
          userName +
          '?callback=JSON_CALLBACK');
      }
    };
  }

  angular.module('hipster').factory('github', github);
})();
