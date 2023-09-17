<?php
header("Access-Control-Allow-Origin: *");
error_reporting(0);
$ackno = $_POST['ackno'];
$session = mysqli_connect('localhost','root','','sessions');
$query = "delete from social where ackno='$ackno'";
mysqli_query($session,$query);
$query = "select emailid from social where ackno='$ackno'";
$result = mysqli_query($session,$query);
if (mysqli_num_rows($result) == 0){
    echo json_encode(array("status" => 1));
}
else{
    echo json_encode(array("status" => 0));
}