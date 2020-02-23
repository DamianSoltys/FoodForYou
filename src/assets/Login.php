<?php
    include 'Crud.php';

    $crud=new Crud();
    $Login_data=json_decode(file_get_contents("php://input"));
    $data=$crud->login($Login_data,$crud);
    echo json_encode($data);
?>