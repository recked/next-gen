<?php 

/* 
Project 2 - jQuery
Rapid Application Development - Spring 2014
Arissa Brown
https://github.com/recked/
*/



/*
error_reporting(E_ALL);
ini_set('display_errors', '1');
*/


//Getting the var from JavaScript
if (isset($_POST['start'])) {
    
    $system = $_POST["start"];
    
    // PS4
    $ps4 = "http://www.giantbomb.com/api/releases/?api_key=[API_KEY]&format=json&limit=10&filter=platform:146&field_list=name,game&sort=release_date:desc";
    
    // Xbox One
    $xbone = "http://www.giantbomb.com/api/releases/?api_key=[API_KEY]&format=json&limit=10&filter=platform:145&field_list=name,game&sort=release_date:desc";

    //Conditional that checks for conference
    if ($system == "ps4"){
        
        $json = file_get_contents($ps4); 

        $games = fopen('../data/games.json', 'w');
        fwrite($games,$json);
        fclose($games);

    }
    else if ($system == "xbone"){
        
        $json = file_get_contents($xbone); 

        $games = fopen('../data/games.json', 'w');
        fwrite($games,$json);
        fclose($games);

    }
}

?>