$(document).ready(function (){

    // populate initial list of games to search gifs for
    let games = [
        "mario kart", 
        "final fantasy", 
        "donkey kong", 
        "super mario bros", 
        "mortal kombat", 
        "pac man", 
        "zelda",
        "double dragon II",
        "lego star wars",
        "contra",
    ];

    // declare global variables
    const btnView = $("#btn-view");
    const animalInput = $("#game-input");
    let indexPos = 0;

    createBtns();

    function createBtns () {

        $("#btn-view").empty();
        indexPos = 0;

        for (var i in games) {
            // populate screen with buttons
            games = games.sort();
            // add button to screen
            btnView.append(`<button class="btn btn-info mt-2 mr-2 shadow term-btn">${games[indexPos]}</button>`);
            // increment number of index position number in array
            indexPos++;
        }
    }
    

    $("#submit-btn").on("click", function() {

        if (gameInput.val() === "" ) {
            console.log("empty input");
        } else {
            games.push(gameInput.val().trim().toLowerCase());
            createBtns();
        }
    });

});

$(document).on("click", ".term-btn", function(){
    let term = $(this).text();

    // define queryURL
    const queryURL = `https://api.giphy.com/v1/gifs/search?q=${term}&api_key=d2owZB648qOVga3aNLKfn3RhLhTHYVo2&limit=10`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        let j = 0;
        for (var i = 0; i < 10; i++) {
            $("#gif-view").prepend(
                `
                    <div class="d-inline-block border border-dark rounded">
                        <img class="gif-tile" img-state="still" 
                            src="${response.data[j].images.fixed_height_still.url}"
                            img-still="${response.data[j].images.fixed_height_still.url}"
                            img-animate="${response.data[j].images.fixed_height.url}">
                        <span class="d-block text-center bg-dark rating">RATING: ${response.data[j].rating.toUpperCase()}</span>

                    </div>
                `
            );
            j++;
        };
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