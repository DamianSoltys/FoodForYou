<?php


include 'Crud.php';
$crud=new Crud();

$Signup_data=json_decode(file_get_contents("php://input"));
$data=$crud->Signup($Signup_data,$crud);
echo json_encode($data);



?>