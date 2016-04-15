angular.module('hipster')
  .factory('FlashSvc',
    function($rootScope) {

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
    });
