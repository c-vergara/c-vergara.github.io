var app = angular.module('Tabs', ['duScroll']);

app.controller('tabsController', function ($scope, $document, $timeout, $interval) {

	$scope.options = {
		run_autoscroll: false
	}

	$scope.types = {
		text: 'default',
		coro: 'car_1',
		verso_1: 'car_2',
		verso_2: 'car_3',
		fill_1: 'car_4',
		fill_2: 'car_5',
		fill_3: 'car_6',
		intro: 'car_7',
		solo: 'delorean',
	}

	$scope.song = [
		{
			type: 'intro',
			text: '[Silencio]'
		},
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
			type: 'solo',
			text: 'Oooh'
		},
		{
			type: 'verso_1',
			text: 'I\'m in the mood\nThe rhythm is right\nMove to the music\nWe can roll all night'
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
			type: 'text',
			text: '[FIN VERSION -> improvisacion]'
		},
	]

	$scope.cut_lyrics = function () {
		angular.forEach($scope.song, function(section) {
			var lines = section.text.split('\n');
			section.lines = lines;
		});
	}
	$scope.cut_lyrics();



	$scope.scroller = {
		total_seconds: 240,
		elapsed_ms: 0,
		lapse: null,
		current_section: -1,
		current_section_progress: 0,
		interval: null,
		progress_interval: null,
		progress_refresh: 100
		
	}
	$scope.scroller.lapse = $scope.scroller.total_seconds / $scope.song.length;
	// console.log('lapse', $scope.scroller.lapse)


	function work() {
		if (!$scope.options.run_autoscroll) {
			// console.warn('not running');
			return;
		}
		if ($scope.scroller.current_section > $scope.song.length) {
			// console.warn('end');
			return;
		}
		// reset progress bar
		$scope.scroller.elapsed_ms = 0;
		if ($scope.scroller.progress_interval) {
			// console.warn('killing progress_interval');
			$interval.cancel($scope.scroller.progress_interval);			
		}

		// advance to  next section
		$scope.scroller.current_section += 1;
		$scope.move_to_current_section();
		// run progress bar
		$scope.scroller.progress_interval = $interval(function() {
			$scope.scroller.elapsed_ms += $scope.scroller.progress_refresh;
			// console.warn('progressing');
		}, $scope.scroller.progress_refresh)

		// rinse and repeat
		$timeout(work, $scope.scroller.lapse*1000)
	}
	work();

	$scope.$watch('options.run_autoscroll', function(_new, _old) {
		if (_new) {
			if ($scope.scroller.current_section >= 0) {
				$scope.scroller.current_section -= 1;
			}
			work();
		} else {
			$interval.cancel($scope.scroller.progress_interval)
			$scope.scroller.elapsed_ms = 0;

		}
	})

	$scope.move_to_current_section = function(time_ms) {
		var element = angular.element(document.querySelectorAll("[data-index='"+$scope.scroller.current_section+"']"));
		if (element) {
			$document.scrollToElement(element, 100, time_ms);
			// console.log('scroller', $scope.scroller.current_section);
		} else {
			console.log('no more elements');
		}
	}

	$scope.change_section = function (step) {
		$scope.scroller.current_section += step;
		$scope.scroller.elapsed_ms = 0;
		$scope.move_to_current_section(2000);
	}

	// console.log($scope.song)	

})
