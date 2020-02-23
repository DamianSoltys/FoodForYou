<?php
    include 'Crud.php';

    $crud=new Crud();
    $Change_data=json_decode(file_get_contents("php://input"));

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $data=$crud->update($Change_data, $crud, $Change_data->token);
        echo json_encode($data);
    }

    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        $data=$crud->update($Change_data, $crud, $_GET['token']);
        echo json_encode($data);
    }
?>