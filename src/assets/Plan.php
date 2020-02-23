<?php
    include 'Crud.php';

    $crud=new Crud();
    $Plan_data=json_decode(file_get_contents("php://input"));
    
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data=$crud->post_Plan($Plan_data, $crud, $Plan_data->token);
    }else {
        $data=$crud->get_Plan($Plan_data, $crud, $_GET['token']);
    }
    echo json_encode($data);
?>
