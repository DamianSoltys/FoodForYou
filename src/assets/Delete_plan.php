<?php
    include 'Crud.php';

    $crud=new Crud();
    $data=$crud->delete_plan($_GET['id_plan'],$crud,$_GET['token']);
    echo $data;
?>