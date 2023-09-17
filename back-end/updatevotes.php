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
    $user = 'root';
    $psswd = '';
    $db = 'social';
    $conn = mysqli_connect($host, $user, $psswd, $db);
    $type = $_POST['type'];
    $key = $_POST['feedid'];
    if ($type == 'upvote'){
        $query = "update posts set upvotes=upvotes+1 where postid=$key";
        mysqli_query($conn,$query);

    }
    if ($type == 'downvote'){
        $query = "update posts set downvotes=downvotes+1 where postid=$key";
        mysqli_query($conn,$query);

    }
    if ($type == 'like'){
        $query = "update posts set likes=likes+1 where postid=$key";
        mysqli_query($conn,$query);

    }
    echo json_encode(array(1=>$query));

}