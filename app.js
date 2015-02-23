//1. we create an object to act as a namespace .. this is our one and only global variable
//namespaces help us keep the global object space clean and prevent collisions between variable names
var artApp = {};

//2. every app needs an init function to start and kick off our app, later we'll be able to run it with artApp.init();
//mostly click handlers / listeners go in your init function
//we create an init
//init is like starting a car, you can have your car, but it won't be used until you turn the key
artApp.init = function() {
	//this is a listener for events in order for it to do something
	//when we submit the form with the class of search...
	$('.search').on('submit',function(e) {
		//...run this code
		e.preventDefault();
		//grab the value out of the input and store in variable
		//.val(); grabs the value out of it
		var q = $('.q').val();
		console.log("we should search rijks for " + q);
		//pass the value of q to getPieces so that it now knows to pick up the q search query parameter
		artApp.getPieces(q);
	})
}

//5. define a function that will go and get the pieces from the API
//when we want to get pieces, we will call artApp.getPieces();

//**this is the first ajax call, if you also want to call .getPieces by month or something, you can copy this and repeat it and just change the ajax call details within (Kate's project idea)
//10. add q into the function(q) so that it is now linking to the above, "artApp.getPieces(q);"
artApp.getPieces = function(q) {
	//6. in here we do the ajax request
	//ajax takes 1 argument but that 1 argument takes a list of objects
	$.ajax({
		url : 'https://www.rijksmuseum.nl/api/en/collection/',
		//this tells jquery
		dataType : 'jsonp',
		type : 'GET',
		//in the following data property, we provide all of the parameters that need to go along with the request
		//you get this from the documentation that the API provides you (http://rijksmuseum.github.io)
		data : {
			key : artApp.key,
			//the type of format you're looking for the results to be returned in
			format : 'jsonp',
			//this was q : 'monkey' but we don't want to hardcode monkey so you set q to equal q which is the search parameter
			q : q
		},
		success : function(result) {
			console.log("Success function called");
			// console.log(result);
			//now that the data has come back, lets display it with another function
			//the below tells artApp.displayPieces to take over and deal with the results that were returned from the artApp.getPieces
			artApp.displayPieces(result);
		}
	});
} //end getPieces()

//7. now that getPieces function is complete, and it works and gets the pieces for us, we will now define the function to display
//define a function that will be used to display the pieces in the html
//whatever you call it within the function, it's the bag of results from (result) from above. You can call it the same thing or you can call it something different, doesn't matter
artApp.displayPieces = function(result) {
	//11.we need to clear out any old artworks to make way for the new ones
	$('#artwork').html('');
	console.log("Ready to display the pieces with this data: ", result);
		//set a variable so that you don't have to constantly call it every time as object > artObject2
		var pieces = result.artObjects;
		//we now have an array of artObjects, we need to loop through each one, and display them
		//var = 0, pieces.lenth is the length of the array, it loops and adds 1 every time until it gets to i < pieces.length
		for (var i = 0; i < pieces.length; i++){
			console.log(pieces[i]);
			//create the div for your html with jquery methods
				//$('div') selects an element
				//$('<div>') creates an element
			//each piece of artwork needs it's own div to display the pieces
			var div = $('<div>').addClass('piece');
			//.title because it's one of the objects
			//create an h2 element, and set the text to be the current piece title
			var h2 = $('<h2>').text(pieces[i].title);


			// * create a p with the class of artist and set the text to be the artist
			var p = $('<p>').addClass('artist').text(pieces[i].principalOrFirstMaker);

			

			//we have to put the h2 inside the div that we created
			//take the div we created, and add the h2 we created
			div.append(h2,p);
			//12.check if there is an image first, 
			if(pieces[i].webImage){
				// * create an image and set the src to be the webimage of the current piece
				// var img = $('<img src= "' + pieces[i].webImage.url + '">');
				//OR
			var img = $('<img>').attr('src',pieces[i].webImage.url);
			}
			div.append(img);
			//grab the artwork div and append our newly created div
			$('#artwork').append(div);

		} // end for loop
} // end artApp.displayPieces

//4. set a variable 'key' to store the api number, so that if it ever changes, you don't have to go back to find it in every line
artApp.key = "jzX6kd7A";

//3. document ready
$(function() {
	//place this here so that when the page is ready, init is ready as well to load
	artApp.init();
	//this makes it run getPieces on pageload since it's within the document ready portion of code
	artApp.getPieces('dog');
});