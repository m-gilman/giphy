$(document).ready(function () {
  // cache DOM SELECTORS....
  var game = {
    buttonsView: $("#buttonsView"),
    gifsView: $("#gifsView")
  }

  var topics = ["Pug", "French Bulldog", "Border Collie", "Boxer Dog", "Great Dane", "Bullmastiff", "German Shepherd", "Siberian Husky", "Chihuahua"];

  //My theory is that this could be set to anything because clicking the gifButton should override this info
  var search = ""

  // Function for displaying buttons
  function renderButtons() {
    // Deleting the gif prior to adding new gifs, otherwise you will have repeat buttons)
    game.buttonsView.empty();
    // Looping through the array of gifs
    for (var i = 0; i < topics.length; i++) {
      // Dynamicaly generate buttons for each item in the array
      var b = $("<button>");
      // Adding a class for CSS formating of button
      b.addClass("gifButton");
      // Adding a data-attribute
      b.attr("data-name", topics[i]);
      // Providing the initial button text
      b.text(topics[i]);
      // Adding the button to the buttonsView div
      game.buttonsView.append(b);
    }
  }

  //When "Add a Gif" Submit button is clicked
  $("#addGif").on('click', function (event) {
    //Stops the page from refreshing
    event.preventDefault()
    //Grabs the input from the textbox
    var newGifButton = $('#gif-input').val().trim();
    //text input added to the array
    topics.push(newGifButton);
    // add buttons
    renderButtons();
  });

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  //When the gifButton is clicked
  $(document).on('click', '.gifButton', function () {
    //Empty so that the list of gifs is replaced and doesn't grow 
    $('#gifsView').empty();

    search = $(this).attr('data-name');
    console.log('search =' + search);

    // var apiKey = "csix2n2pZgMcRONDUumqudawwAPLmBwz";
    // Building the URL needed to query the database
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=csix2n2pZgMcRONDUumqudawwAPLmBwz&limit=10&rating=pg";

    // Run the AJAX call to the Giphy API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var results = response.data;
      console.log(queryURL);


      //Grabbing the 10 images... 
      for (var i = 0; i < results.length; i++) {
        // Storing the rating data
        var rating = results[i].rating;
        // Creates a div to hold each gif & rating... adds a class for bootstrap styling
        var gifDiv = $("<div class='col-md-3'>");
        //append the gifDiv to gifsView (from the HTML)
        game.gifsView.append(gifDiv);

        // Create a <p> element to have the rating displayed
        var p = $("<p>").text("Rating: " + rating);
        // Displaying the rating
        gifDiv.append(p);

        // Creating an element to hold the image
        var image = $("<img>");
        image.addClass("img-fluid theGif");
        image.attr("alt", "gif cannot be displayed");
        image.attr("src", results[i].images.original_still.url);
        image.attr("data-animate", results[i].images.original.url);
        image.attr("data-still", results[i].images.original_still.url);
        image.attr("data-state", "still");

        // Display the gif
        gifDiv.append(image);
      }
      gifDiv.append(image);

    });


  }); // ends button click function
  //Play & Pause when a gif is clicked
  game.gifsView.on("click", ".theGif", function () {
    var state = $(this).attr('data-state');
    console.log(state);

    if (state === "still") {
      $(this).attr("data-state", "still");
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }; //ends if statement
  }); // ends playPause click function 
}); //ends the "document.ready" code