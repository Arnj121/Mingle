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
    $query3 = "update posttrack set noofupvotes=(select sum(upvotes) from posts where poster='$email') where emailid='$email'";
    mysqli_query($conn,$query3);
    $query4 = "update posttrack set likes=(select sum(likes) from posts where poster='$email') where emailid='$email'";
    mysqli_query($conn,$query4);
    echo json_encode(array(3=>$query3,4=>$query4));
}