<?php 
    include '../config/conexion.php';

    $post_variables = file_get_contents("php://input");
    $variable = json_decode($post_variables);

    $user = $variable->user;
    $password = $variable->password;

    $respuesta = [];
    
    $obj_db = new DataBase();
    
    $consulta = "SELECT * FROM usuarios WHERE usuario = '$user' AND password = '$password'";
    $obj_db->query($consulta);
    $result = $obj_db->register();
    
    if($obj_db->rowCount() > 0) {
        $respuesta = Array(
            "nombre" => $result->nombre,
            "apellido" => $result->apellido,
            "user" => $result->ususario,
            "estado" => "success"
        );
    } else {
        $respuesta = Array(
            "estado" => "error"
        );
    }
    echo json_encode($respuesta);
?>