<?php
header("Access-Control-Allow-Origin: *");
error_reporting(0);
$authentication = $_POST['authentication'];

if ($authentication == 'login') {
    $email = $_POST['email'];
    $psswd = $_POST['password'];

    $conn = mysqli_connect('localhost','root','','social');
    $query = "select * from people where emailid='$email' and psswd='$psswd'";
    $result = mysqli_query($conn,$query);
    $session = mysqli_connect('localhost','root','','sessions');

    if(mysqli_num_rows($result) == 1) {
        $ackno = (string)rand(1, 9999);

        while (true) {
            $query1 = "select ackno from social where ackno='$ackno'";
            $result2 = mysqli_query($session,$query1);
            if (mysqli_num_rows($result) != 1){
                $ackno = rand(1000, 9999);
            }
            else{
                break;
            }
        }
        $row = mysqli_fetch_array($result);
        $username=$row[1];$email=$row[3];
        $query1 = "insert into social values('$ackno','$email')";
        mysqli_query($session,$query1);
        echo json_encode(array("result" => "true","ackno" => $ackno,"username" => $username, "email" => $email));
    }
    else {
        echo json_encode(array("result" => "false"));

    }
}
elseif ($authentication == 'signup') {
      $username = $_POST['username'];
      $email = $_POST['email'];
      $psswd = $_POST['password'];

      $conn = mysqli_connect('localhost','root','','social');
      $query = "insert into people(username,emailid,psswd) values('$username','$email','$psswd')";
      $result = mysqli_query($conn,$query);
      $query = "select * from people where emailid='$email' and psswd='$psswd'";
      $result = mysqli_query($conn,$query);
      $session = mysqli_connect('localhost','root','','sessions');
      if(mysqli_num_rows($result) == 1){
          $ackno = (string)rand(1, 9999);
          while (true) {
              $query1 = "select ackno from social where ackno='$ackno'";
              $result2 = mysqli_query($session, $query1);
              if (mysqli_num_rows($result) != 1) {
                  $ackno = rand(1000, 9999);
              } else {
                  break;
              }
          }
          $row = mysqli_fetch_array($result);
          $username=$row[1];$email=$row[3];
          $query1 = "insert into social values('$ackno','$email')";
          mysqli_query($session,$query1);
          echo json_encode(array("result" => "true","ackno" => $ackno,"username" => $username,"email" => $email));
      }
      else{
          echo json_encode(array("result" => "false"));

  }
}
