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
	'28': 'Action huh? Everyone could use some action',
	'35': 'Comedy? Chili IS pretty funny.',
	'18': 'Drama? Don\'t be sad.',
	'10751': 'You should invite your parents to watch with you.',
	'27': 'Horror? Love is kind of scary.',
	'10749': 'Romance is a beautiful thing.'
}

var chiliSarcasm = {
	'notSpicy': "You don't like to live life dangerously. Interesting.",
	'mild': "Not everyone can walk on the wild side",
	'spicy': "Isn't this cat cute?",
	'bringItOn': "Good luck. At least you can enjoy the movie."
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
		},2000);
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
	$('input[name="chiliLevel"]').on('change',function(event){
		event.preventDefault();
		$('.alert').removeClass('hidden');
		$('.message').text('').html('<i class="fa fa-cog fa-spin"></i>  ' + chiliSarcasm[$(this).val()]);
		window.setTimeout(function(){
			$('.alert').addClass('hidden');
		},2000);
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
	$('input[name="genre"]').on('change', function(event){
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

});











