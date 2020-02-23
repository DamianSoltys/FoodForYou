<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    include 'Crud.php';
    $crud=new Crud();
    $Plan_data=json_decode(file_get_contents("php://input"));
    $data=$crud->delete_plan($Plan_data,$crud);
    echo $data;
?>