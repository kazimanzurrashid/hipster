(function(ng) {

  var app = ng.module('hipster');

  app.factory('FlashSvc', [
    '$rootScope',
    function($rootScope) {
      var methods = ['success', 'error', 'information', 'warning'];
      var factory = {};

      ng.forEach(methods, function(method) {
        factory[method] = function(message) {
         $rootScope.$broadcast('showFlashBar', {
            type: method,
            message: message
          });
        }
      });

      return factory;

    }]);

})(angular);
