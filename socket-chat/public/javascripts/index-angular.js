(function(){
	
	var app = angular.module('chatRoom',[]);
	app.controller('chatController', function($scope, $http){
		var socket = io();
		$scope.messages = [];

		$http.get('/userlist').success(function(data, status, headers, config){
			$scope.userlist = data;
		});

		$scope.setNickName = function(){
			if($scope.nickname !== ''){
				socket.emit('new user', $scope.nickname);
			}
		};

		$scope.newMessage = function(){
			var msg = {
				'sendTime': parseDateTime(Date.now()),
				'content': $scope.message,
				'from': $scope.nickname
			};
			socket.emit('new message', msg);
			$scope.message = '';
		};

		socket.on('new user', function(userlist){
			console.log(userlist);
			$scope.userlist = userlist;
			$scope.$apply();
		});

		socket.on('new message', function(msg){
			$scope.messages.push(msg);
			console.log($scope.messages);
			$scope.$apply();
		});

		function parseDateTime(millisec){
			var datetime = new Date(millisec);
			var year = 1900 + datetime.getYear();
			var month = 1 + datetime.getMonth();
			var day = datetime.getDate();
			var hour = datetime.getHours();
			var min = datetime.getMinutes();
			var sec = datetime.getSeconds();
			return year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec;
		}
	});
}());