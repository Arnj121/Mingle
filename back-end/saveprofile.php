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
    $username=$_POST['username'];
    $emailid = $_POST['email'];
    $psswd = $_POST['psswd'];
    $phno = $_POST['phno'];
    $gender = $_POST['gender'];
    $prof = $_POST['prof'];
    $birth = $_POST['birth'];
    $birth = date("Y-m-d",strtotime($birth));
    $query = "update people set username='$username',psswd='$psswd',emailid='$emailid',phone=$phno,gender='$gender',profession='$prof',birthdate='$birth' where emailid='$email'";
    mysqli_query($conn,$query);
    echo json_encode(array(1=>$query));
}

"update people set age = substring((select CURRENT_DATE-birthdate as diff from people where emailid='lucifer@gmail.com'),1,2) 
where emailid='lucifer@gmail.com' and 
substring((select CURRENT_DATE-birthdate as diff from people where emailid='lucifer@gmail.com'),1,2) > 1";