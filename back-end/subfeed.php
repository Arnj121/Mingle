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
    $subemail = $_POST['sub'];
    $text = $_POST['text'];
    $image = $_POST['image'];
    $video = $_POST['video'];
    $link = $_POST['link'];
    $orderby = " order by p.prectime desc";
    $query = "select p.*,pp.username from posts p ,people pp ,followers f where f.follower='$email' and f.following = p.poster and pp.emailid=p.poster and f.following='$subemail'";
    if (($link == 'true') or ($text == 'true') or ($image == 'true') or ($video == 'true')) {
        $query .= " and (";
    }
    if ($text == 'true'){
        $query.=" or type='text'";
    }
    if ($image == 'true'){
        $query.=" or type='image'";
    }
    if ($video == 'true'){
        $query.=" or type='video";
    }
    if ($link == 'true'){
        $query.=" or type='link";
    }
    if (($link == 'true') or ($text == 'true') or ($image == 'true') or ($video == 'true')) {
        $query .= ")";
    }
    $query.=$orderby;
    $result = mysqli_query($conn,$query);
    $count = 1;
    if (mysqli_num_rows($result) > 0){
        $feeds = array();
        while ($row = mysqli_fetch_array($result)){
            $feedid = $row[0];
            $emailid = $row[1];
            $likes = $row[2];
            $upvotes = $row[3];
            $downvotes = $row[4];
            $type = $row[5];
            $content = $row[7];
            $comments = $row[8];
            $added = $row[9];
            $username= $row[11];
            array_push($feeds,json_encode(array("feedid" => $feedid,"emailid"=>$emailid,"likes"=> $likes,"upvotes" => $upvotes, "down" => $downvotes, "type" => $type, "content" => $content,"comments"=>$comments,"following"=>1,"mult" => $count,"added" => $added,"username" => $username)));
            $count++;
        }
        echo json_encode(array(1 => $feeds,2=>$query));
    }
    else{
        echo json_encode(array(1=>"false",2=>$query));
    }
}
