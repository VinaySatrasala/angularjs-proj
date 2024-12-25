describe('HomeController', function() {
    var controller;
    var dataService;

    beforeEach(module('myApp'));

    beforeEach(inject(function($controller, _dataService_) {
        dataService = _dataService_;
        controller = $controller('HomeController', {
            dataService: dataService
        });
    }));

    it('should initialize with title', function() {
        expect(controller.title).toBe('Home');
    });
});
