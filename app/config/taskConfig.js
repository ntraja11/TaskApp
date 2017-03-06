angular.module("taskApp")
	.config(function($routeProvider){
	$routeProvider
		.when('/', 
		{
			controller: 'taskController',
			templateUrl: 'app/partials/taskTable.html'
		})
		.when('/addTask',
		{
			controller: 'taskController',
			templateUrl: 'app/partials/addTask.html'
		})
		.when('/editTask/:id', 
		{
			controller: 'taskController',
			templateUrl: 'app/partials/editTask.html'
		})
		.when('/showChart', 
		{
			controller: 'taskController',
			templateUrl: 'app/partials/taskChart.html'
		})	
		.otherwise({redirectTo: '/'});
}, function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});