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
    if ($type == 'text') {
        $content = $_POST['written'];
        $comment = $_POST['comment'];
        $query1 = "insert into posts(poster,likes,upvotes,downvotes,type,content,comments,timeadded) values('$email','0','0','0','$type','$content','$comment',CURRENT_DATE)";
        mysqli_query($conn, $query1);
        $query2 = "update posttrack set noofpost=(select count(*) from posts where poster='$email') where emailid='$email'";
        mysqli_query($conn, $query2);
        $query3 = "update posttrack set noofupvotes=(select sum(upvotes) from posts where poster='$email') where emailid='$email'";
        mysqli_query($conn, $query3);
        $query4 = "update posttrack set likes=(select sum(likes) from posts where poster='$email') where emailid='$email'";
        mysqli_query($conn, $query4);
        #echo json_encode(array("1" => $query1,2=>$query2,3=>$query3,4=>$query4));
    }
    elseif ($type == 'link'){
        $content = $_POST['linkval'];
        $comment = $_POST['comment'];
        $query1 = "insert into posts(poster,likes,upvotes,downvotes,type,content,comments,timeadded) values('$email','0','0','0','$type','$content','$comment',CURRENT_DATE)";
        mysqli_query($conn, $query1);
        $query2 = "update posttrack set noofpost=(select count(*) from posts where poster='$email') where emailid='$email'";
        mysqli_query($conn, $query2);
        $query3 = "update posttrack set noofupvotes=(select sum(upvotes) from posts where poster='$email') where emailid='$email'";
        mysqli_query($conn, $query3);
        $query4 = "update posttrack set likes=(select sum(likes) from posts where poster='$email') where emailid='$email'";
        mysqli_query($conn, $query4);
    }
}