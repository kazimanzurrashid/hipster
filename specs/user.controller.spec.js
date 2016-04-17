describe('user.controller', function() {

  var userProfile = {
    name: 'Kazi'
  };

  var $rootScope;
  var $q;
  var $controller;
  var gitHub;
  var flash;

  beforeEach(angular.mock.module('hipster'));

  beforeEach(angular.mock.inject(function(_$rootScope_, _$q_, _$controller_,
                                          _gitHub_, _flash_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    $controller = _$controller_;
    gitHub = _gitHub_;
    flash = _flash_;
  }));

  describe('on successful user profile get', function() {

    var getUserProfileStub;
    var successStub;
    var controller;

    beforeEach(function() {
      getUserProfileStub = sinon.stub(gitHub, 'getUserProfile', function() {
        return $q.resolve({
          data: userProfile
        });
      });

      successStub = sinon.stub(flash, 'success');

      controller = $controller('UserController', {
        gitHub: gitHub,
        flash: flash
      });

      $rootScope.$digest();
    });

    it('sets user profile', function() {
      expect(controller.profile).to.deep.equal(userProfile);
    });

    it('flashes success', function() {
      expect(successStub).to
        .have.been.calledWith('User profile loaded successfully');
    });

    afterEach(function() {
      getUserProfileStub.reset();
      successStub.reset();
    });
  });

  describe('on failed user profile get', function() {

    var getUserProfileStub;
    var errorStub;
    var controller;

    beforeEach(function() {
      getUserProfileStub = sinon.stub(gitHub, 'getUserProfile', function() {
        return $q.reject();
      });

      errorStub = sinon.stub(flash, 'error');

      controller = $controller('UserController', {
        gitHub: gitHub,
        flash: flash
      });

      $rootScope.$digest();
    });

    it('does not set user profile', function() {
      expect(controller.profile).to.be.an('undefined');
    });

    it('flashes error', function() {
      expect(errorStub).to.have.been.calledWith('Failed to load user profile');
    });

    afterEach(function() {
      getUserProfileStub.reset();
      errorStub.reset();
    });
  });
});
