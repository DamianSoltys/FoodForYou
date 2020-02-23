<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    include 'Crud.php';
    $crud=new Crud();
    $Login_data=json_decode(file_get_contents("php://input"));
    $data=$crud->Login($Login_data,$crud);
    echo json_encode($data);
?>