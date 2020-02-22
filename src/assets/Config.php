<?php
class Db_config{
    private $_host='localhost';
    private $_username='root';
    private $_password='';
    private $_database='users';
    protected $connection;

    public function __construct() {
        if(!isset($this->connection)){
            $this->connection = new mysqli($this->_host,$this->_username,$this->_password,$this->_database);
            if(mysqli_connect_errno($this->connection))
            {
                die("Nie udało się połaczyć z bazą danych:". mysqli_connect_error());

            }
            mysqli_set_charset($this->connection,"utf8");

        }
    }
}
?>