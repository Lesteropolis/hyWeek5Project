var foodApp = {};
foodApp.foodKey = "93974ac6ec333274dbe8cd3ae5a0c9fb";
foodApp.foodID = "7c738f77";

foodApp.getInfo = function (userchoice) {
	$.ajax({
		url: 'http://api.yummly.com/v1/api/recipes',
		dataType: 'jsonp',
		method: 'GET',
		data: {
			_app_id: foodApp.foodID,
			_app_key: foodApp.foodKey,
			q: 'chili',
			maxResult: 10,
			"flavor.piquant.min": +(userchoice) + 0.2
		}
	}).then(function(res){
		var foodRandom = res.matches[ Math.floor(Math.random() * res.matches.length)];
		foodApp.recipeName = foodRandom.recipeName;
		// foodApp.recipeName = random.
		// console.log(res.matches[0].imageUrlsBySize[90].replace(/s90/g,'s300'));
		// console.log(res);
		foodApp.foodImage = foodRandom.imageUrlsBySize[90].replace(/s90/g,'s300');
		foodApp.recipeName = foodRandom.recipeName;
		// console.log(foodRandom);
		console.log(foodApp.recipeName);
		console.log(foodApp.foodImage);



	});
};

foodApp.init = function () {
	$('input[name=chiliLevel').on('change',function(event){
		event.preventDefault();
		var answerTwo = $(this).val();
		foodApp.getInfo (answerTwo);
	});
};

$(function(){
	foodApp.init();
});

	// var image = $('<img>').attr('src',movieApp.moviePoster);
	// var title = $('<h3>').text(movieApp.movieName);
	// var description = $('<p>').text(movieApp.movieOverview);
	// var movieContainer = $('<div>').append(image, title, description);
	// $('#movieResults').addClass("movieContainer").html(movieContainer);





	// var chiliDatabase = {
// 	notSpicy: {
// 		title:
// 		img: 
// 		instructions: 
// 	},
// 	mild: {
// 		title:
// 		img: 
// 		instructions:
// 	},
// 	spicy: {
// 		title:
// 		img:
// 		instructions:
// 	},
// 	bringItOn: {
// 		title:
// 		img: 
// 		instructions:
// 	} 
// };