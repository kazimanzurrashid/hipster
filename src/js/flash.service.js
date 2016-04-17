(function() {

  function flash($rootScope) {
    var methods = ['success', 'error', 'information', 'warning'];
    var factory = {};

    angular.forEach(methods, function(method) {
      factory[method] = function(message) {
        $rootScope.$broadcast('show-flash', {
          type: method,
          message: message
        });
      };
    });

    return factory;
  }

  angular.module('hipster').factory('flash', flash);
})();
