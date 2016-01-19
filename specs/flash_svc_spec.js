describe('FlashSvc', function() {

  var methods = ['success', 'error', 'information', 'warning'];
  var message = 'i am a test message';

  var rootScope, flashSvc, spy;

  beforeEach(angular.mock.module('hipster'));

  beforeEach(angular.mock.inject(function(_$rootScope_, _FlashSvc_) {
    $rootScope = _$rootScope_;
    flashSvc = _FlashSvc_;
    spy = sinon.spy($rootScope, '$broadcast');
  }));

  methods.forEach(function(method) {

    describe('#' + method, function() {

      beforeEach(function() {
        flashSvc[method](message);
      });

      it('triggers $rootScope event', function() {
        expect(spy).to.have.been.calledWith('showFlash', {
          type: method,
          message: message
        });
      });

    });

  });

  afterEach(function() {
    spy.reset();
  });

});
