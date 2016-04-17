(function() {

  function UserController(gitHub, flash) {
    var self = this;
    var userName = 'kazimanzurrashid';

    gitHub.getUserProfile(userName).then(function(response) {
      self.profile = response.data;
      flash.success('User profile loaded successfully');
    }, function() {
      flash.error('Failed to load user profile');
    });
  }

  angular.module('hipster').controller('UserController', UserController);
})();
