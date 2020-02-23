<?php
    include 'Crud.php';
    
    $crud=new Crud();
    $data=$crud->Logout();
    echo json_encode($data);
?>