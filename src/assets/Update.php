<?php
    session_start();
    include 'Crud.php';
    $crud=new Crud();
    $Change_data=json_decode(file_get_contents("php://input"));

    if(isset($_SESSION['user'])){
        $data=$crud->Update($Change_data,$crud);
        echo json_encode($data);
    }else{
        echo json_encode(false);
    }
?>