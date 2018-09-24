$(document).ready(function (){

    // populate initial list of games to search gifs for
    let games = [
        "mario kart", 
        "final fantasy", 
        "monkey island", 
        "super mario bros", 
        "mortal kombat", 
        "pac man", 
        "zelda",
        "double dragon II",
        "lego star wars",
        "contra",
        "zero horizon dawn",
        "assasin's creed",
    ];

    // declare global variables
    const btnView = $("#btn-view");
    const gameInput = $("#game-input");
    let indexPos = 0;

    // run create button function at page load
    createBtns();

    function createBtns () {

        // empty btn-view div of all buttons and reset index position counter to 0
        $("#btn-view").empty();
        indexPos = 0;

        // for every item in the games array
        for (let i in games) {
            // sort games alphabetically
            games = games.sort();
            // add button to screen
            btnView.append(`<button class="btn btn-info mt-2 mr-2 shadow term-btn">${games[indexPos]}</button>`);
            // increment number of index position number in array
            indexPos++;
        }
    }
    
    // on click of submit button
    $("#submit-btn").on("click", function() {

        // if input is null, log statement in console
        if (gameInput.val() === "" ) {
            console.log("empty input");
        
        // otherwise, trim and push lowercase string of value into games array and launch function to create buttons
        } else {
            games.push(gameInput.val().trim().toLowerCase());
            createBtns();
        }
    });
});

// on click of a dynamically created button
$(document).on("click", ".term-btn", function(){

    // set term to equal the text on the button
    let term = $(this).text();

    // define queryURL
    const queryURL = `https://api.giphy.com/v1/gifs/search?q=${term}&api_key=d2owZB648qOVga3aNLKfn3RhLhTHYVo2&limit=30`;

    // run ajax query to get gif from gipgy
    $.ajax({
        url: queryURL,
        method: "GET"

    // after receiving response, for each item in response object, create an image tile with a static picture in still state
    }).then(function(response){
        console.log(response);
        let i = 0;
        for (var j = 0; j < 30; j++) {
            const width = parseInt(response.data[j].images.fixed_height_still.width);
            if (width > 230 && width < 375 && i < 10) {
                const stillURL = response.data[j].images.fixed_height_still.url;
                const animateURL = response.data[j].images.fixed_height.url;
                const title = response.data[j].title.replace(" GIF","").toUpperCase();
                const rating = response.data[j].rating.toUpperCase();
                
                $("#gif-view").prepend(
                    `
                        <div class="d-inline-block border border-dark rounded mt-2 ml-2 shadow">
                            <img class="gif-tile" img-state="still" 
                                src="${stillURL}"
                                img-still="${stillURL}"
                                img-animate="${animateURL}">
                            <span class="d-block text-center bg-dark rating">${title}<br>RATING: ${rating}</span>
                        </div>
                    `
                );
                i++;
            }
        }
    });
});

$(document).on("click", "img", function() {
    let imgState = $(this).attr("img-state");
    console.log($(this).attr("src"));
    console.log($(this).attr("img-state"));
    if (imgState === "still") {
        const imgAnimate = $(this).attr("img-animate");
        $(this).attr("src", imgAnimate); 
        $(this).attr("img-state", "animate");
    } else {
        const imgStill = $(this).attr("img-still");
        $(this).attr("src", imgStill);
        $(this).attr("img-state", "still");
    }
});