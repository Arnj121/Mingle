<?php
header("Access-Control-Allow-Origin: *");
error_reporting(0);
$ackno = $_POST['ackno'];
$request = $_POST['request'];
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
    if ($request == 'Load'){
        $query = "select * from settings where emailid='$email'";
        $result = mysqli_query($conn, $query);
        if (mysqli_num_rows($result) == 1) {
            $row = mysqli_fetch_array($result);
            $themes = $row[1];
            $fonts = $row[2];
            $showrecent = $row[3];
            $showfollow = $row[4];
            $twostep = $row[5];
            echo json_encode(array("themes" => $themes,"fonts" => $fonts,"showrecent" => $showrecent,"showfollow" => $showfollow,"twostep" => $twostep));
        }
    }
    elseif ($request == 'save'){
        $themes = $_POST['themes'];
        $fonts = $_POST['fonts'];
        $showrecent = $_POST['showrecent'];
        $showfollow = $_POST['showfollow'];
        $twostep = $_POST['twostep'];
        $query = "update settings set themes='$themes',fonts='$fonts',showrecent='$showrecent',showfollow='$showfollow',twostep='$twostep' where emailid='$email'";
        mysqli_query($conn,$query);
        echo json_encode(array("status" => $query));
    }
}
