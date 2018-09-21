$(document).ready(function (){

    // populate initial list of animals to search gifs for
    let animals = [
        "cat", 
        "dog", 
        "monkey", 
        "chipmunk", 
        "dolphin", 
        "manatee", 
        "panda",
        "bear",
        "squirrel",
        "trash panda",
    ];

    // declare global variables
    const btnView = $("#btn-view");
    const animalInput = $("#animal-input");
    let indexPos = 0;

    for (var i in animals) {
        // populate screen with buttons
        createBtn();
    }

    $("#submit-btn").on("click", function() {
        animals.push(animalInput.val().trim().toLowerCase());
        createBtn();
    });

    function createBtn () {
        // add button to screen
        btnView.append(`<button class="btn btn-info mt-2 mr-2 shadow term-btn">${animals[indexPos]}</button>`);
        // increment number of index position number in array
        indexPos++;
    }
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
                    <div class="d-inline-block">
                        <p class="m-2"><strong>Rating: </strong>${response.data[j].rating}</p>
                        <img class="m-2k" img-state="still" src="${response.data[j].images.fixed_height_still.url}"/">
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
});