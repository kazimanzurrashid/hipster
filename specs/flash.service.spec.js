describe('flash.service', function() {

  var methods = ['success', 'error', 'information', 'warning'];
  var message = 'i am a test message';

  var $rootScope;
  var flash;

  beforeEach(angular.mock.module('hipster'));

  beforeEach(angular.mock.inject(function(_$rootScope_, _flash_) {
    $rootScope = _$rootScope_;
    flash = _flash_;
  }));

  methods.forEach(function(method) {

    describe('#' + method, function() {

      var spy;

      beforeEach(function() {
        spy = sinon.spy($rootScope, '$broadcast');
        flash[method](message);
      });

      it('broadcasts $rootScope notification', function() {
        expect(spy).to.have.been.calledWith('show-flash', {
          type: method,
          message: message
        });
      });

      afterEach(function() {
        spy.reset();
      });
    });
  });
});
