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
    $query  = "select following from followers where follower='$email'";
    $result = mysqli_query($conn,$query);
    if (mysqli_num_rows($result) > 0) {
        $subs = array();
        while($row = mysqli_fetch_array($result)){
            array_push($subs,$row[0]);
        }
        echo json_encode(array(1=>$subs));
    }
    else{
        echo json_encode(array(1=>"false"));
    }
}