describe('github.service', function() {

  var $httpBackend;
  var github;

  beforeEach(angular.mock.module('hipster'));

  beforeEach(angular.mock.inject(function(_$httpBackend_, _github_) {
    $httpBackend = _$httpBackend_;
    github = _github_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('#getUserProfile', function() {
    var expected;
    var actual;

    beforeEach(function(done) {
      expected = {
        name: 'I am nobody'
      };

      var endpoint = 'https://api.github.com/users/i-am-nobody?' +
      'callback=JSON_CALLBACK';

      $httpBackend.expectJSONP(endpoint).respond(expected);

      github.getUserProfile('i-am-nobody').then(function(response) {
        actual = response.data;
        done();
      });

      $httpBackend.flush();
    });

    it('returns user profile', function() {
      expect(actual).to.deep.equal(expected);
    });
  });
});
