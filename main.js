//Declaring an empty object
var movieApp = {}; 
movieApp.apiKey = '684e43aa8d235b53cd5724f1f3731870';
genreList = "http://api.themoviedb.org/3/genre/movie/list?api_key=684e43aa8d235b53cd5724f1f3731870";


//Database
var database = {
	notSpicy: {
		title: '3-Ingredient Chicken Chili',
		img: 'images/mild.jpg',
		url: 'http://www.momlovesbaking.com/3-ingredient-chicken-chili/'
	},
	mild: {
		title: 'Quick and easy beef chili',
		img: 'images/notSpicy.jpg',
		url: 'http://www.adashofmegnut.com/quick-and-easy-beef-chili/'
	},
	spicy: {
		title: 'Flatlander Chili',
		img: 'images/spicy.jpg',
		url: 'http://www.tasteandtellblog.com/chili-for-a-chilly-night/'
	},
	bringItOn: {
		title: 'Competition-Style Texas Chili',
		img: 'images/bringItOn.jpg',
		url: 'http://cookingcontestcentral.com/recipes/texas-chili/'
	} 
};

var sarcasm = {
	'28': 'Action huh? Not sure if you will have any tonight...',
	'35': 'Comedy? Chili IS pretty funny.',
	'18': 'Drama? Don\'t',
	'10751': 'Family? Did you invite your mom to watch it with you? Cute.',
	'27': 'Horror? I would be scared to have your love life right now',
	'10749': 'Romance? If you watch it enough, maybe it will come true'
}

var chiliSarcasm = {
	'notSpicy': "You don't like to live life dangerously. Makes sense.",
	'mild': "Mild...hmmm...I feel like that's a good description of you.",
	'spicy': "Picking grumpy cat will probably be the highlight of your night.",
	'bringItOn': "Good attitude. Please translate this to your life."
}


//Creating a method to GET information from the movie using ajax
movieApp.getInfo = function (userchoice){
	$('.alert').removeClass('hidden');
	$('.message').text("").html('<i class="fa fa-cog fa-spin"></i>  ' + sarcasm[userchoice]);
	$.ajax({
		url: 'https://api.themoviedb.org/3/discover/movie?api_key=684e43aa8d235b53cd5724f1f3731870',
		dataType: 'jsonp',
		method: 'GET',
		data: {
			with_genres: userchoice
		}
	}).then(function(res){
		window.setTimeout(function(){
			$('.alert').addClass('hidden');
		},3000);
		var random = res.results[ Math.floor(Math.random() * res.results.length)];
		movieApp.movieName = random.original_title;
		movieApp.movieOverview = random.overview;
		movieApp.moviePoster = "https://image.tmdb.org/t/p/w396" + random.poster_path;
		movieApp.displayPieces();
	});
};

//Writing the results into the HTML
movieApp.displayPieces = function(){
	$('.movieContainer img').attr('src',movieApp.moviePoster);
	$('.movieInfo h3').text(movieApp.movieName);
	$('.movieInfo p').text(movieApp.movieOverview);
}

//Choosing chili
movieApp.Chili = function () {
	$('input[name="chiliLevel"').on('change',function(event){
		event.preventDefault();
		$('.alert').removeClass('hidden');
		$('.message').text('').html('<i class="fa fa-cog fa-spin"></i>  ' + chiliSarcasm[$(this).val()]);
		window.setTimeout(function(){
			$('.alert').addClass('hidden');
		},3000);
		$('section.question2 div').removeClass("selected");
		$(this).parent().addClass("selected");
		var answerTwo = $(this).val();
		movieApp.chiliTitle = database[answerTwo].title;
		movieApp.chiliImg = database[answerTwo].img;
		movieApp.chiliUrl = database[answerTwo].url;
		$('.chiliContainer h3').text(movieApp.chiliTitle);
		$('.chiliContainer a').attr('href',movieApp.chiliUrl);
		$('.chiliContainer img').attr('src',movieApp.chiliImg);
	});
}

//Choosing movie
movieApp.movieChoice = function (){
	$('input[name="genre"').on('change', function(event){
		event.preventDefault();
		console.log($(this).parent());
		$('section.question1 div').removeClass("selected");
		$(this).parent().addClass("selected");
		var answerOne = $(this).val();
		movieApp.getInfo(answerOne);
	});
};

//Method that launches everything
movieApp.init = function () {
	movieApp.movieChoice();
	movieApp.Chili();

	$('.getStarted').click(function(event) {
		event.preventDefault();
		$('div').removeClass('selected');
		$('#question2').addClass('hidden');
		$('#results').addClass('hidden');
		$.smoothScroll({
			scrollTarget: '#question1'
		});
	});

	$('.submitQ1').click(function(event) {
		event.preventDefault();
		$('.question2').removeClass("hidden");
		$.smoothScroll({
			scrollTarget: '#question2'
		});
	});
	
	$('.submitQ2').click(function(event) {
		event.preventDefault();
		$('#results').removeClass("hidden");
		$.smoothScroll({
			scrollTarget: '#results'
		});
	});
};


//Document ready
$(function(){
	movieApp.init();
	$('a.fl').featherlight({
	    targetAttr: 'href'
	});
});











