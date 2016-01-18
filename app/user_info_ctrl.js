(function(ng) {

  var app = ng.module('hipster');

  app.controller('UserInfoCtrl', [
    '$scope', 
    'UserInfoSvc', 
    'FlashSvc',
    function($scope, userInfoSvc, flashSvc) {
      userInfoSvc.getInfo('KaziManzurRashid').then(function(response) {
        $scope.user = response.data;
        flashSvc.success('Info loaded successfully');
      }, function() {
        flashSvc.error('Failed to laod info');
      });
    }]);

})(angular);
