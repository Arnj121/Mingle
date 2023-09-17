<?php
header("Access-Control-Allow-Origin: *");
error_reporting(0);
$ackno = $_POST['ackno'];
$session = mysqli_connect('localhost','root','','sessions');
$query1 = "select emailid from social where ackno='$ackno'";
$result1 = mysqli_query($session,$query1);
if (mysqli_num_rows($result1) == 1) {
    $row = mysqli_fetch_array($result1);
    $email = $row[0];
    $host = 'localhost';
    $user='root';
    $psswd='';
    $db='social';
    $conn = mysqli_connect($host, $user, $psswd, $db);
    $query = "select * from posts where poster='$email'";
    $result = mysqli_query($conn,$query);
    $count = 1;
    if (mysqli_num_rows($result) > 0){
        $feeds = array();
        while ($row = mysqli_fetch_array($result)){
            $feedid = $row[0];
            $likes = $row[2];
            $upvotes = $row[3];
            $downvotes = $row[4];
            $type = $row[5];
            $content = $row[7];
            $comments = $row[8];
            $added = $row[9];
            array_push($feeds,json_encode(array("feedid" => $feedid,"likes"=> $likes,"upvotes" => $upvotes, "down" => $downvotes, "type" => $type, "content" => $content,"comments"=>$comments,"mult" => $count,"added" => $added)));
            $count++;
        }
        echo json_encode(array(1 => $feeds));
    }
    else{
      echo  json_encode(array(1 => "false"));
    }
}
