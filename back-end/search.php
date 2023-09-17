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
    $char = $_POST['keywords'];
    $query = "select p.username,p.emailid, (
        case when p.emailid in (select p.emailid from people p,followers f where p.emailid != '$email' and p.emailid = f.following and f.follower = '$email') then 1
        ELSE 0
        end) as follow from people p where p.emailid != '$email' and username like '%$char%' limit 5";
    $result = mysqli_query($conn, $query);
    $names = array();
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            array_push($names, json_encode(array("type" => 1, "username" => $row[0], "email" => $row[1], "follow" => $row[2])));
        }
    }
    $query1 = "select comments,postid from posts where comments like '%$char%' limit 5";
    $result = mysqli_query($conn, $query1);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            array_push($names, json_encode(array("type" => 0, "comment" => $row[0], "postid" => $row[1])));
        }
    }
    $query2 = "select comments,postid from posts where comments like '$char%' limit 5";
    $result = mysqli_query($conn, $query2);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            array_push($names, json_encode(array("type" => 0, "comment" => $row[0], "postid" => $row[1])));
        }
    }
    if (sizeof($names) > 0) {
        echo json_encode(array(1 => $names, 2 => $query,3=>$query1,4=>$query2));
    } else {
        echo json_encode(array(1 => "false", 2 => $query,3=>$query1,4=>$query2));
    }
}