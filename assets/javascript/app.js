// our original list of animals to help display buttons
var animalArray = ["cat", "dog", "bird", "hamster", "elephant", "giraffe", "wolf", "lion", "cheetah", "whale"];

function populateButton() {
    for (let i = 0; i < animalArray.length; i++) {
        var button = $("<button>")
        button.text(animalArray[i]);
        button.attr("id", "animalButton");
        $("#buttonRow").append(button)
    }
}
// this populates the original buttons on the page but not the new ones
populateButton(animalArray)

function populateNewButton(string) {
    var buttonNew = $("<button>")
    buttonNew.text(string);
    buttonNew.attr("id", "animalButton");
    $("#buttonRow").append(buttonNew)
}

function populatePictures() {
    var searchTerm = $(this)[0].innerHTML;

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + searchTerm
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var responseArray = response.data;

        for (let i = 0; i < responseArray.length; i++) {

            var imageContainer = $("<div>")

            var image = $("<img>");

            image.attr("stillImage", responseArray[i].images.fixed_height_still.url);
            image.attr("gif", responseArray[i].images.fixed_height.url);

            image.attr("src", responseArray[i].images.fixed_height_still.url);

            image.attr("id", "img")
            image.attr("class", "still");

            var imageRating = $("<p>");
            imageRating.text(responseArray[i].rating)

            imageContainer.append(image, imageRating);
            $("#pictureDisplay").prepend(imageContainer);
        }
    });

};

function animatePictures() {
    var imageState = $(this).attr("class");

    if (imageState === "still") {
        var animatedImage = $(this).attr("gif");
        $(this).attr("class", "animate");
        $(this).attr("src", animatedImage);

    } else if (imageState === "animate") {
        var stillImage = $(this).attr("stillImage");
        $(this).attr("class", "still")
        $(this).attr("src", stillImage);

    }
}

function addAnimals(event) {
    event.preventDefault();
    var animalString = $("#animalInput").val().trim()
    animalArray.push(animalString)
    populateNewButton(animalString);
}

// when a button on top of page is click the populate picture function is ran. This calls the ajax request and builds the images and appends them to the document
$(document).on("click", "#animalButton", populatePictures);
// when an image is clicked it fires the animatePictures function which with a class change and src change the still images become gifs
$(document).on("click", "#img", animatePictures);
// when the "add an animal button" is click the addAnimals function is called that grabs the value of the users input and calls a method with that user info as a paramter for the method - populateNewButton which builds a new button and puts it to the end of the list of pre-existing buttons
$(document).on("click", "#addAnimalButton", addAnimals);