<?php
    include 'Crud.php';

    $_check=new Crud();
    $tokenData= $_GET['token'];
    $data=$_check->check($tokenData);
    echo json_encode($data);
?>