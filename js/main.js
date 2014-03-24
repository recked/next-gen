/* 
Project 2 - jQuery
Rapid Application Development - Spring 2014
Arissa Brown
https://github.com/recked/
*/


/* Declaring vars to make JSHint happy
==========================================
*/

var $, console, document, window;

/* Global Vars
================================
*/
var $start = $("#start"), //Console select
    $spin = $("#spin"), //CSS loader
    $back = $("#back"), //Go Back link
    $content = $("#stuff"), //Game info container
    $sidebar = $("#sidebar"); //'nough said

//For math
var window_size = $(window).height() - 100;
var window_width = $(window).width();


/* Events
================================
*/

//Listen for console 
$(".start").click(function () {

    var start = this.id;
    $.ajax({
        url: 'includes/games.php',
        type: "post",
        data: {
            'start': start
        },
        success: function () {
            //Get JSON list of games
            $.getJSON("data/games.json", function (response) {
                //Send response to function
                setData(response);
            });
        }
    });

    $start.css("display", "none");
    $spin.css("display", "block");
    $back.css("display", "block");
});

//Go back link
$("#back").click(function () {

    $("#games").html(" ");
    $start.css("display", "block");
    $("#intro").css("display", "block");
    $content.html(" ");
    $back.css("display", "none");

});

//Menu button
$("#mobile").click(function () {

    if ($sidebar.css("left") == '-1000px') {
        $sidebar.css("left", "0");
    } else if ($sidebar.css("left") == '0px') {
        $sidebar.css("left", "-1000px");
    }

});

/* List games from json file
================================
*/

function setData(data) {
    var result = data;

    var $list = $("<ul>", {
        class: "list"
    });

    //Adding the list (ul) to the sidebar
    $('#games').html($list);

    var games = result.results.length;

    //Loop through the results
    for (var i = 0; i < games; i++) {

        var $name = $("<li>", {
            class: "names",
            id: result.results[i].game.id
        });

        //Adding the name to the list
        $name.html(result.results[i].name);
        $list.append($name);

    }

    // Listen for click of game in the list
    $(".names").click(function () {

        //Remove active class from previous game
        $(".names").removeClass("active");
        //Add active class to this game
        $(this).addClass("active");

        //Get game's unique id
        var id = $(this).attr('id');

        $.ajax({
            url: 'includes/info.php',
            type: "post",
            data: {
                'id': id
            },
            success: function () {
                $.getJSON("data/info.json", function (stuff) {
                    //Send response to function
                    setInfo(stuff);
                });
            }
        });

        //Hide sidebar if its mobile
        if (window_width < 768) {
            $sidebar.css("left", "-1000");
        }

        $("#intro").css("display", "none");

    });

    //Hide loader
    $spin.css("display", "none");
}


/* Content for the game
================================
*/
function setInfo(info) {
    var game = info;

    //Empty Content div
    $content.html(" ");

    //Game Description
    var $game = $("<div>", {
        id: "game"
    });

    var spinner = "<div id=\"spinner\"><span><em></em></span><span><em></em></span></div>";

    $game.css("max-height", window_size);
    $game.html(spinner);


    var $title = $("<h1>", {
        class: "title"
    });

    var $img = $("<img>", {
        src: game.results.image.super_url,
        alt: game.results.name
    });

    var $brief = $("<div>", {
        id: "brief"
    });

    var $about = $("<div>", {
        id: "about"
    });

    $title.html(game.results.name);
    $brief.html(game.results.deck);
    $about.html(game.results.description);

    $game.html($title);
    $game.append($img);
    $game.append($brief);
    $game.append($about);

    $content.append($game);

    // End Game Description


    //Video
    var $videos = $("<div>", {
        id: "videos"
    });

    $videos.css("max-height", window_size);
    $videos.html(spinner);

    var videos = game.results.videos.length;

    if (videos !== 0) { //If there are videos
        $videos.html(" ");

        //Loop through the videos array
        for (var i = 0; i < videos; i++) {

            var $video = $("<div>", {
                class: "video"
            });

            var video = game.results.videos[i].id;

            $video.html("<iframe src=\"http://www.giantbomb.com/videos/embed/" + video + "/\" frameborder=\"0\" allowfullscreen></iframe>");

            $videos.append($video);

        }
    } else if (videos === 0) { //If the game has no videos

        $videos.html(" ");

        var $none = $("<div>", {
            class: "video"
        });

        $none.html("No videos are currently available for this game");
        $videos.append($none);
    }

    $content.append($videos);
}