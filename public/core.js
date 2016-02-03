// public/core.js
var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
	$scope.lightStatus = 'Off';

	// when landing on the page, get all todos and show them
	$http.get('/status')
		.success(function(data) {
			console.log(data);
			if(data.state.on){
				$scope.lightStatus = 'On';
			}
			//$scope.lightStatus = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.switchOn = function() {
		$http.get('/on')
			.success(function(data) {
				$scope.lightStatus = 'On';
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.switchOff = function() {
		$http.get('/off')
			.success(function(data) {
				$scope.lightStatus = 'Off';
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.redTest = function() {
		$http.get('/red')
			.success(function(data) {
				$scope.lightStatus = 'On - Red';
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.greenTest = function() {
		$http.get('/green')
			.success(function(data) {
				$scope.lightStatus = 'On - Green';
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.blueTest = function() {
		$http.get('/blue')
			.success(function(data) {
				$scope.lightStatus = 'On - Blue';
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.alert = function() {
		$http.get('/alert')
			.success(function(data) {
				$scope.lightStatus = 'Alert';
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.colorLoop = function() {
		$http.get('/colorLoop')
			.success(function(data) {
				$scope.lightStatus = 'Color loop';
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}