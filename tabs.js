var app = angular.module('Tabs', ['duScroll']);

app.controller('tabsController', function ($scope, $document, $timeout, $interval) {


	$scope.types = {
		comentario: '#B7B7B7',
		coro: '#FF0000',
		verso_1: '#0000FF',
		verso_2: '#33AAFF',
		fill_1: '#00FF00',
		fill_2: '#B6FF00',
		fill_3: '#EAFEB7',
	}

	$scope.song = [
		{
			type: 'coro',
			text: 'Slowride, take it easy\nSlowride, take it easy\nSlowride, take it easy'
		},
		{
			type: 'verso_1',
			text: 'I\'m in the mood\nThe rhythm is right\nMove to the music\nWe can roll all night'
		},
		{
			type: 'fill_1',
			text: 'Oooh\nSlowride\nOooh'
		},
		{
			type: 'coro',
			text: 'Slowride, take it easy\nSlowride, take it easy\nSlowride, take it easy'
		},
		{
			type: 'verso_2',
			text: 'Slow down, go down, got to get your lovin\' one more time\nHold me, roll me, slow ridin\' woman you\'re so fine'
		},
		{
			type: 'fill_2',
			text: 'Oooh'
		},
		{
			type: 'coro',
			text: 'Slowride, take it easy\nSlowride, take it easy\nSlowride, take it easy'
		},
		{
			type: 'verso_2',
			text: 'Slow down, go down, got to get your lovin\' one more time\nHold me, roll me, slow ridin\' woman you\'re so fine'
		},
		{
			type: 'fill_3',
			text: '[Silencio]'
		},
		{
			type: 'coro',
			text: 'Slow ride, easy, slow ride, sleazy\nSlow ride, easy, slow ride, sleazy'
		},
		{
			type: 'verso_2',
			text: 'Slow down, go down, got to get your lovin\' one more time\nHold me, roll me, slow ridin\' woman you\'re so fine'
		},
		{
			type: 'comentario',
			text: '[FIN VERSION]'
		},
	]

	$scope.cut_lyrics = function () {
		angular.forEach($scope.song, function(section) {
			var lines = section.text.split('\n');
			section.lines = lines;
		});
	}
	$scope.cut_lyrics();



	var seconds = 240;
	var lapse = seconds / $scope.song.length;
	var current_section = 0;
	console.log('lapse', lapse)

	var scroller = $interval(function() {
		var element = angular.element(document.querySelectorAll("[data-index='"+current_section+"']"));
		console.log(element)
		$document.scrollToElement(element, 0, 4000);
		console.log('scroller', current_section);
		current_section += 1;
	}, lapse*1000, $scope.song.length)


	console.log($scope.song)	

})




