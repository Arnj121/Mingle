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
    $what = $_POST['what'];
    if ($what == 1){
        $unfollower = $_POST['name'];
        $query = "delete from followers where follower='$email' and following='$unfollower'";
        mysqli_query($conn,$query);
        echo json_encode(array(1=>$query));
    }
    else{
        $tofollow = $_POST['name'];
        $query = "insert into followers values('$email','$tofollow')";
        mysqli_query($conn,$query);
        echo json_encode(array(1=>$query));
    }

}