angular.module('nba-hackathon', 
	['chart.js', 
	'ngMaterial',
	'ngAria',
	'ngAnimate',
	'ngResource',]
)

.config(function(ChartJsProvider){
	ChartJsProvider.setOptions({ colors : [ '#803690', '#D71F55', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
})

.constant("TeamNames", {
	all: [
		"Atlanta Hawks",
		"Boston Celtics",
		"Brooklyn Nets",
		"Charlotte Hornets",
		"Chicago Bulls",
		"Cleveland Cavaliers",
		"Dallas Mavericks",
		"Denver Nuggets",
		"Detroit Pistons",
		"Golden State Warriors",
		"Houston Rockets",
		"Indiana Pacers",
		"Los Angeles Clippers",
		"Los Angeles Lakers",
		"Memphis Grizzlies",
		"Miami Heat",
		"Milwaukee Bucks",
		"Minnesota Timberwolves",
		"New Orleans Pelicans",
		"New York Knicks",
		"Oklahoma City Thunder",
		"Orlando Magic",
		"Philadelphia 76ers",
		"Phoenix Suns",
		"Portland Trailblazers",
		"Sacramento Kings",
		"San Antonio Spurs",
		"Toronto Raptors",
		"Utah Jazz",
		"Washington Wizards"
	],

	east: [
		"Atlanta Hawks",
		"Boston Celtics",
		"Brooklyn Nets",
		"Charlotte Hornets",
		"Chicago Bulls",
		"Cleveland Cavaliers",
		"Detroit Pistons",
		"Indiana Pacers",
		"Miami Heat",
		"Milwaukee Bucks",
		"New York Knicks",
		"Orlando Magic",
		"Philadelphia 76ers",
		"Toronto Raptors",
		"Washington Wizards"
	],

	west: [
		"Dallas Mavericks",
		"Denver Nuggets",
		"Golden State Warriors",
		"Houston Rockets",
		"Los Angeles Clippers",
		"Los Angeles Lakers",
		"Memphis Grizzlies",
		"Minnesota Timberwolves",
		"New Orleans Pelicans",
		"Oklahoma City Thunder",
		"Phoenix Suns",
		"Portland Trailblazers",
		"Sacramento Kings",
		"San Antonio Spurs",
		"Utah Jazz"
	]
})

//from http://jim-nielsen.com/teamcolors/index.html
.constant("TeamColors", {
	Atlanta: {
		primary: "#E13A3E",
		secondary: "#C4D600"
	},
	Boston: {
		primary: "#008348",
		secondary: "#BB9753"
	},
	Brooklyn: {
		primary: "#061922",
		secondary: "#C4CED3"
	},
	Charlotte: {
		primary: "#1D1160",
		secondary: "#008CA8"
	},
	Chicago: {
		primary: "#CE1141",
		secondary: "#061922"
	},
	Cleveland: {
		primary: "#860038",
		secondary: "#FDBB30"
	},
	Dallas: {
		primary: "#007DC5",
		secondary: "#C4CED3"
	},
	Denver: {
		primary: "#4D90CD",
		secondary: "#FDB927"
	},
	Detroit: {
		primary: "#ED174C",
		secondary: "#006BB6"
	},
	Golden_State: {
		primary: "#FDB927",
		secondary: "#006BB6"
	},
	Houston: {
		primary: "#CE1141",
		secondary: "#C4CED3"
	},
	Indiana: {
		primary: "#FFC633",
		secondary: "#00275D"
	},
	Los_Angeles_Clippers: {
		primary: "#ED174C",
		secondary: "#006BB6"
	},
	Los_Angeles_Lakers: {
		primary: "#FDB927",
		secondary: "#552582"
	},
	Memphis: {
		primary: "#0F586C",
		secondary: "#7399C6"
	},
	Miami: {
		primary: "#98002E",
		secondary: "#F9A01B"
	},
	Milwaukee: {
		primary: "#00471B",
		secondary: "#F0EBD2"
	},
	Minnesota: {
		primary: "#005083",
		secondary: "#00A94F"
	},
	New_Orleans: {
		primary: "#002B5C",
		secondary: "#E31837"
	},
	New_York: {
		primary: "#006BB6",
		secondary: "#F58426"
	},
	Oklahoma_City: {
		primary: "#007DC3",
		secondary: "#F05133"
	},
	Orlando: {
		primary: "#007DC5",
		secondary: "#C4CED3"
	},
	Philadelphia: {
		primary: "#ED174C",
		secondary: "#006BB6"
	},
	Phoenix: {
		primary: "#E56020",
		secondary: "#1D1160"
	},
	Portland: {
		primary: "#E03A3E",
		secondary: "#BAC3C9"
	},
	Sacramento: {
		primary: "#724C9F",
		secondary: "#8E9090"
	},
	San_Antonio: {
		primary: "#BAC3C9",
		secondary: "#061922"
	},
	Toronto: {
		primary: "#CE1141",
		secondary: "#061922"
	},
	Utah: {
		primary: "#002B5C",
		secondary: "#F9A01B"
	},
	Washington: {
		primary: "#002B5C",
		secondary: "#E31837"
	}
})

.constant("LeagueColors", {
	blue: "#006AB8",
	red: "#D71F55"
})

.controller("MainCtrl", function($scope, $resource, $q, TeamNames, TeamColors) {

	//Resource to get our data from the api route
	var Data = $resource('/getData', {}, {
		get: {
			method: "GET",
			params: {}
		}
	});

	var SpeedData = $resource('/getSpeedData', {}, {
		get: {
			method: "GET",
			params: {}
		}
	});

	//Boolean to check if we've loaded
	$scope.isLoading = true;

	var setupSpeed = function(){
		$scope.speed = {};
		$scope.speed.labels = [];
		_.forEach($scope.speedData, function(datum) {
			var xVal = parseFloat(datum["x"]) * 10;
			$scope.speed.labels.push(Math.round(xVal) / 10 ); 
		});

	  	var speedYData = _.map($scope.speedData, "y");
	  	$scope.speed.data = [
	    	speedYData
	  	];
	  	
	  	$scope.speed.datasetOverride = [{ yAxisID: 'y-axis-1' }];
	  	$scope.speed.options = {
	    	scales: {
		      	yAxes: [{
			          	id: 'y-axis-1',
			          	type: 'linear',
			          	display: true,
			          	position: 'left',
			          	scaleLabel: {
					        display: true,
				        	labelString: 'Speed (some units)'
				      	}
		        	}
		      	],
		      	xAxes: [{
		          	scaleLabel: {
				        display: true,
			        	labelString: 'Time since entering game'
			      	}
		      	}]
	    	}
	  	};
	};

	var setupMain = function() {
		$scope.labels = _.map($scope.newData, "x")
	  	var yData = _.map($scope.newData, function(datum){
	  		return parseFloat(datum["FG"]);
	  	});

	  	var inPlayData = [];

	  	$scope.data = [ yData , ];
	  	
	  	$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
	  	$scope.options = {
	    	scales: {
		      	yAxes: [{
			          	id: 'y-axis-1',
			          	type: 'linear',
			          	display: true,
			          	position: 'left',
			          	scaleLabel: {
					        display: true,
				        	labelString: 'Field Goal Percentage'
				      	}
		        	}
		      	],
		      	xAxes: [{
		          	scaleLabel: {
				        display: true,
			        	labelString: 'Play Number'
			      	}
		      	}]
	    	}
	  	};
	};

	//Get all the speed data from the server
	var speedPromise = SpeedData.get({}, function(result){
		$scope.speedData = result;
		setupSpeed();
	}).$promise;

		

	//Get all the data from the server
	var allPromise = Data.get({}, function(result){
		$scope.newData = result;
		setupMain();
	}).$promise;


	$q.all([allPromise, speedPromise]).then(function(){
		$scope.isLoading = false;
	});

	
	
});