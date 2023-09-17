<?php
header("Access-Control-Allow-Origin: *");
error_reporting(0);
$ackno = $_POST['ackno'];
$session = mysqli_connect('localhost','root','','sessions');
$query1 = "select emailid from social where ackno='$ackno'";
$result1 = mysqli_query($session,$query1);

if (mysqli_num_rows($result1) == 1){
    $row = mysqli_fetch_array($result1);
    $email = $row[0];
    $host='localhost';$user='root';$psswd='';$db='social';
    $conn = mysqli_connect($host,$user,$psswd,$db);
    $query  ="update people set age = substring((select CURRENT_DATE-birthdate as diff from people where emailid='$email'),1,2) 
            where emailid='$email' and 
            substring((select CURRENT_DATE-birthdate as diff from people where emailid='$email'),1,2) > 1";
    $result = mysqli_query($conn,$query);
    $query = "select * from people where emailid='$email'";
    $result = mysqli_query($conn,$query);
    if (mysqli_num_rows($result) == 1){
        $row = mysqli_fetch_array($result);
        $username = $row[1];
        $emailid=$row[3];
        $psswd = $row[4];
        $followers = $row[5];
        $birth = $row[7];
        $gender = $row[8];
        $prof = $row[9];
        $phone = $row[10];
        $query = "select * from posttrack where emailid='$emailid'";
        $result = mysqli_query($conn,$query);
        if (mysqli_num_rows($result) == 1){
            $row = mysqli_fetch_array($result);
            $upvotes = $row[2];
            $likes = $row[3];
            $noofpost = $row[1];
            echo json_encode(array("username" => $username,"psswd" => $psswd,"email" => $emailid,"phno" => $phone,"followers" => $followers,"upvotes" => $upvotes ,"likes" => $likes,"posts" =>$noofpost,
            "birth" => $birth,"gender" => $gender,"prof" => $prof));
        }




    }

}