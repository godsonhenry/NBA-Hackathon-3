angular.module('nba-hackathon', 
	['chart.js', 
	'ngMaterial',
	'ngAria',
	'ngAnimate',
	'ngResource']
)

.config(function(ChartJsProvider){
	ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
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

.controller("MainCtrl", function($scope, $resource, TeamNames, TeamColors) {

	var Data = $resource('/getData', {}, {
		get: {
			method: "GET",
			params: {}
		}
	});

	$scope.isLoading = true;
	//Get all the data from the server
	Data.get({}, function(result){
		debugger;
		$scope.newData = result;
		$scope.isLoading = false;

		setupEverything();
	});

	function setupEverything(){
		$scope.allTeams = TeamNames.all;
		$scope.selected = TeamNames.all; //Default to selecting all teams

		$scope.selectAll = function() {
			$scope.selected = TeamNames.all;
			reloadData();
		};

		$scope.selectEast = function(){
			$scope.selected = TeamNames.east;
			reloadData();
		};

		$scope.selectWest = function(){
			$scope.selected = TeamNames.west;
			reloadData();
		};

		var reloadData = function(){

		};

		$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	  	$scope.series = ['Series A', 'Series B'];
	  	$scope.data = [
	    	[65, 59, 80, 81, 56, 55, 40],
	    	[28, 48, 40, 19, 86, 27, 90]
	  	];
	  	
	  	$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
	  	$scope.options = {
	    	scales: {
		      	yAxes: [{
			          	id: 'y-axis-1',
			          	type: 'linear',
			          	display: true,
			          	position: 'left'
		        	},
			        {
			          	id: 'y-axis-2',
			          	type: 'linear',
			          	display: true,
			          	position: 'right'
			        }
		      	]
	    	}
	  	};
	}
	
});