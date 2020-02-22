<?php
include_once 'Config.php';
class Crud extends Db_config
{
    public function __construct() {
        parent::__construct();
    }

    public function execute($query)
    {
        $result = $this->connection->query($query);

        if ($result == false) {
            echo $this->connection->error;
            return false;
        } else {
            return true;
        }
    }

    public function Get_data($query) {
        $result = $this->connection->query($query);

        if ($result == false) {
            echo $this->connection->error;
            return false;
        }

        $rows = array();
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        return $rows;
    }

    public function escape_string($value) {
        return $this->connection->real_escape_string($value);
    }

    public function check() {
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            $pass = $_SESSION['pass'];
            $array = array('user' => $user, 'pass' => $pass, 'auth' => 1);
            return $array;
        } else {
            $array = array('user' => "none", 'pass' => "none", 'auth' => 0);
            return $array;
        }
    }

    public function Login($Login_data, $crud) {
        $Login_data->pass = $crud->escape_string($Login_data->pass);
        $Login_data->email = $crud->escape_string($Login_data->email);

        $query = "SELECT email,pass FROM users WHERE email='$Login_data->email'";
        $rows = $crud->Get_data($query);

        if ($rows != null) {
            if ($rows[0]['email'] == $Login_data->email) {
                if (password_verify($Login_data->pass, $rows[0]['pass'])) {
                    $_SESSION['user'] = $Login_data->email;
                    $_SESSION['pass'] = $Login_data->pass;
                    return true;
                } else {
                    return 'badpass';
                }
            }
        } else {
            return '0user';
        }
    }

    public function Logout() {
        session_start();
        session_destroy();
        session_abort();
        return true;
    }

    public function Signup($Signup_data, $crud) {
        if (isset($Signup_data)) {
            $Signup_data->username = $crud->escape_string($Signup_data->username);
            $Signup_data->surname = $crud->escape_string($Signup_data->surname);
            $Signup_data->email = $crud->escape_string($Signup_data->email);
            $Signup_data->pass = $crud->escape_string($Signup_data->pass);
            $regexp = array("options" => array("regexp" => "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/"));

            if (!filter_var($Signup_data->email, FILTER_VALIDATE_REGEXP, $regexp)) {
                return "emailerr";
                exit();
            }
            $regexp = array("options" => array("regexp" => "/^[a-ząćęłńóśżźA-ZĄĆĘŁŃÓŚŻŹ]{3,16}$/"));

            if (!filter_var($Signup_data->username, FILTER_VALIDATE_REGEXP, $regexp)) {
                return "usernameerr";
                exit();
            }

            if (!filter_var($Signup_data->surname, FILTER_VALIDATE_REGEXP, $regexp)) {
                return "surnameerr";
                exit();
            }
            $regexp = array("options" => array("regexp" => "/^[a-ząćęłńóśżźA-ZĄĆĘŁŃÓŚŻŹ0-9]{3,16}$/"));

            if (!filter_var($Signup_data->pass, FILTER_VALIDATE_REGEXP, $regexp)) {
                return "passerr";
                exit();
            }
            $query = "SELECT email FROM users WHERE email='$Signup_data->email'";
            $data = $crud->Get_data($query);

            if ($data) {
                return false;
                exit();
            }

            $Signup_data->pass = password_hash($Signup_data->pass, PASSWORD_DEFAULT);
            $query = "INSERT INTO users(username,surname,email,pass,sex) VALUES('$Signup_data->username','$Signup_data->surname','$Signup_data->email','$Signup_data->pass','$Signup_data->sex')";
            $data = $crud->execute($query);
            return $data;
        }
    }

    public function Update($Change_data, $crud) {
        if (isset($Change_data)) {
            $Change_data->username = $crud->escape_string($Change_data->username);
            $Change_data->surname = $crud->escape_string($Change_data->surname);
            $Change_data->pass = $crud->escape_string($Change_data->pass);
            $regexp = array("options" => array("regexp" => "/^[a-ząćęłńóśżźA-ZĄĆĘŁŃÓŚŻŹ]{3,16}$/"));

            if (!filter_var($Change_data->username, FILTER_VALIDATE_REGEXP, $regexp)) {
                return "usernameerr";
                exit();
            }

            if (!filter_var($Change_data->surname, FILTER_VALIDATE_REGEXP, $regexp)) {
                return "surnameerr";
                exit();
            }
            $regexp = array("options" => array("regexp" => "/^[a-ząćęłńóśżźA-ZĄĆĘŁŃÓŚŻŹ0-9]{3,16}$/"));

            if (!filter_var($Change_data->pass, FILTER_VALIDATE_REGEXP, $regexp)) {
                return "passerr";
                exit();
            }

            $user = $_SESSION['user'];
            $Change_data->pass = password_hash($Change_data->pass, PASSWORD_DEFAULT);
            $query = "UPDATE users SET username='$Change_data->username',surname='$Change_data->surname',pass='$Change_data->pass',sex='$Change_data->sex' WHERE email='$user'";
            $data = $crud->execute($query);

            if ($data) {
                $query = "SELECT * FROM users WHERE email='$user'";
                $data = $crud->Get_data($query);
            }
            return $data;
        } else {
            $user = $_SESSION['user'];
            $query = "SELECT * FROM users WHERE email='$user'";
            $data = $crud->Get_data($query);
            return $data;
        }
    }

    public function Post_Plan($Plan_data, $crud) {
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            $query = "SELECT Id_user FROM users WHERE email='$user'";
            $rows = $crud->Get_data($query);

            if ($rows != null) {
                $id_user = $rows[0]['Id_user'];
                $query = "INSERT INTO plans(id_user,genre,value,fat,cuisine,sex) VALUES('$id_user','$Plan_data->genre','$Plan_data->value','$Plan_data->fat','$Plan_data->cuisine','$Plan_data->sex')";
                $crud->execute($query);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function get_Plan($Plan_data, $crud) {
        if (isset($_SESSION['user'])) {
            $user = $_SESSION['user'];
            $query = "SELECT Id_user FROM users WHERE email='$user'";
            $rows = $crud->Get_data($query);
            $id_user = $rows[0]['Id_user'];
            $query = "SELECT * FROM plans WHERE id_user='$id_user'";
            $data = $crud->Get_data($query);

            if ($data != null) {
                return $data;
            }
            return false;
        } else {
            return false;
        }
    }
    
    public function delete_plan($Plan_data, $crud) {
        if (isset($_SESSION['user'])) {
            $query = "DELETE FROM plans WHERE '$Plan_data->id_plan'=id_plan";
            $data = $crud->execute($query);
            return $data;
        } else {
            return false;
        }
    }
}
?>
