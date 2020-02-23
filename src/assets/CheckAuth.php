<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    include 'Crud.php';
    $_check=new Crud();
    $tokenData=json_decode(file_get_contents("php://input"));

    if(!$tokenData) {
        echo json_encode(false);
    } else {
        $data=$_check->check($tokenData->token);
        echo json_encode($data); 
    }

    
?>