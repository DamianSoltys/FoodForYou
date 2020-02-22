<?php
    session_start();
    include 'Crud.php';
    $crud=new Crud();
    $Plan_data=json_decode(file_get_contents("php://input"));
    
    if(isset($Plan_data)) {
        $data=$crud->Post_Plan($Plan_data,$crud);
    }else {
        $data=$crud->get_Plan($Plan_data,$crud);
    }
    echo json_encode($data);
?>
