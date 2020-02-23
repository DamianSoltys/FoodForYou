<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    include 'Crud.php';
    $_check=new Crud();
    $data=$_check->check();
    echo json_encode($data);
?>