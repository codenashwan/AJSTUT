var myApp = angular.module('myApp', ['ngRoute' , 'ngAnimate']);

myApp.config(function ($routeProvider , $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/index', {
            templateUrl: 'view/home.html',
            controller: 'con'
        })
        .when('/about', {
            templateUrl: 'view/about.html'
        })
        .when('/contact', {
            templateUrl: 'view/contact.html'
        })
        .when('/random', {
            templateUrl: 'view/random.html',
            controller: 'con'
        })
        .otherwise({
            redirectTo: '/index'
        })
})



myApp.directive('randomEmployee', function () {

    return {
        restrict: 'E',
        scope: {
            employees: '='
        },
        transclude : true,
        replace : true,
        templateUrl: 'view/randomproccess.html',
        controller: function ($scope) {
            $scope.random = Math.floor(Math.random() * 4);
        }
    }



})

myApp.controller('con', ['$scope', '$http', function ($scope, $http) {

    $scope.remove = function (employee) {
        var removed = $scope.employees.indexOf(employee);
        $scope.employees.splice(removed, 1);
    }

    $scope.addemployee = function () {

        $scope.employees.push({
            name: $scope.newemployee.name,
            age: $scope.newemployee.age,
            city: $scope.newemployee.city,
            salary: $scope.newemployee.salary,
            image: "assets/img/guest.svg",
            is_active: true
        });

        $scope.newemployee.name = "",
            $scope.newemployee.age = "",
            $scope.newemployee.city = "",
            $scope.newemployee.salary = ""
    }



    $http.get('data/employees.json').then(function (response) {
        $scope.employees = response.data;
    })


}])