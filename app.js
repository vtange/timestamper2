(function() {
    //start of function
  var app = angular.module('timestamper', []);

app.controller('MainCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){
	$scope.lastResult;
	$scope.input = {};
	$scope.arrTimes = [];
	$scope.getJSON = function(){
		$scope.lastResult = $scope.result;
		$scope.arrTimes = [];

		var query = $scope.input.userInputTime;
		var allNums = /^\d+$/;
		var regMonths = /(January|February|March|April|May|June|July|August|September|October|November|December)/i;
		var json = null;
		if(allNums.test(query)){									//query is all numbers
			var date = new Date(query*1000);
			while(date.getFullYear() > 2050) {
				query = query.substring(0,query.length-1);
				date = new Date(query*1000);
			}
			json = {
				"unix":parseInt(query,10),
				"natural":date.toUTCString()
			}
		}
		else if(query.search(regMonths)!==-1){						//query has a month
			var date = new Date(query)/1000;
			json = {
				"unix":date,
				"natural":query
			}
		}
		if(!json.unix||!json.natural) {
			$scope.result = {natural:"Bad input on search."};
		} else {
			$scope.result = json;
			$scope.input.userInputTime = json.unix;
			var time = moment(json.natural);
			var tzs = [
				"US/Alaska",
				"America/Los_Angeles",
				"US/Central",
				"America/New_York",
				"America/Buenos_Aires",
				"America/Sao_Paulo",
				"Europe/London",
				"Europe/Warsaw",
				"Europe/Kiev",
				"Europe/Moscow",
				"Asia/Dhaka",
				"Asia/Hong_Kong",
				"Asia/Tokyo",
				"Australia/Sydney",
				"US/Hawaii"
			];
			tzs.forEach(function(tzName){
				$scope.arrTimes.push({timezoneName:tzName,date:time.tz(tzName).format()})
			});
		}
	}

}]);//end of controller
  //end of function
})();