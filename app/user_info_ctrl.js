(function(ng) {

  var app = ng.module('hipster');

  app.controller('UserInfoCtrl', [
    '$scope', 
    'UserInfoSvc', 
    'FlashSvc',
    function($scope, userInfoSvc, flashSvc) {

      var userName = 'kazimanzurrashid';

      userInfoSvc.getInfo(userName).then(function(response) {
        $scope.user = response.data;
        flashSvc.success('Info loaded successfully');
      }, function() {
        flashSvc.error('Failed to load info');
      });
    }]);

})(angular);
