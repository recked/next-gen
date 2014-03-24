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
if (isset($_POST['id'])) {


    $game = $_POST["id"];
    
    
    $data = "http://www.giantbomb.com/api/game/3030-".$game."/?api_key=[API_KEY]&format=json&field_list=name,image,deck,description,videos";
    
    
        $json = file_get_contents($data); 

        $info = fopen('../data/info.json', 'w');
        fwrite($info,$json);
        fclose($info);
        
        }

?>