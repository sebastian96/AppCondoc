<?php
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');


    require '../vendor/autoload.php';
    include '../config/conexion.php';
    
    $app = new \Slim\App;
    $obj_db = new DataBase();

    include 'ctrlLogin.php';

    $app->get('/getUsers', function(Request $request, Response $response, array $args) use($obj_db){
        $selectUsers = "SELECT 
                            tb_usuarios.Usuario,
                            tb_col.CorreoColaborador,
                            tb_col.DocumentoColaborador
                        FROM
                            tb_usuarios
                            INNER JOIN
                            tb_colaboradores tb_col ON tb_usuarios.IdColaborador = tb_col.IdColaborador";
        $obj_db->query($selectUsers);
        $users = $obj_db->registers();
        return json_encode($users);
    });

    $app->get('/getRol', function(Request $request, Response $response, array $args) use($obj_db){
        $selectRoles = "SELECT NomRol FROM appcondoc.tb_rol WHERE IdRol > 4";
        $obj_db->query($selectRoles);
        $roles = $obj_db->registers();
        return json_encode($roles);
    });

    $app->post('/userInsert', function(Request $request, Response $response, array $args) use($obj_db){
        $data = $request->getParsedBody();
        $response = [];

        $nombres = $data['nombres'];
        $apellidos = $data['apellidos'];
        $correo = $data['correo'];
        $tipDoc = $data['tipo'];
        $documento = $data['documento'];
        $imgUser = $data['foto'];
        $nameFoto = $data['nameFoto'];
        $userName = $data['usuario'];
        $password = $data['password'];
        $cargo = $data['cargo'];

        if($imgUser !== '' || $nameFoto !== '') {
            list(, $imgUser) = explode(';', $imgUser);
            list(, $imgUser) = explode(',', $imgUser);
    
            // $directorio = $_SERVER["DOCUMENT_ROOT"] . '/AppCondoc/dist/AppCondoc/assets/img/users/' . $userName;
            $decodeImage = base64_decode($imgUser);
            $directorioDb = 'assets/img/users/' . $userName . '/foto.png';
            $directorio = $_SERVER["DOCUMENT_ROOT"] . '/AppCondoc/src/assets/img/users/' . $userName;
            $directorio_img = $directorio . '/foto.png';
                    
            if(!file_exists($directorio)) {
                mkdir($directorio, 0777, true);
                file_put_contents($directorio . '/foto.png', $decodeImage);
            } else {
                file_put_contents($directorio . '/foto.png', $decodeImage);
            }
            $insertColaborador = "INSERT INTO tb_colaboradores (IdColaborador, NomColaborador, ApeColaborador, CorreoColaborador, TipDocColaborador, DocumentoColaborador, HuellaColaborador, FotoColaborador) VALUES (NULL, '$nombres','$apellidos', '$correo', '$tipDoc', '$documento', NULL, '$directorioDb')";
            $obj_db->query($insertColaborador);
            $obj_db->execute();
            $selectColaborador = "SELECT IdColaborador FROM tb_colaboradores WHERE DocumentoColaborador = '$documento'";
            $obj_db->query($selectColaborador);
            $result = $obj_db->register();
            $insertUser = "INSERT INTO tb_usuarios (IdUsuario, Usuario, Password, IdColaborador, IdRol) VALUES (NULL, '$userName', '$password', $result->IdColaborador, $cargo)";
            $obj_db->query($insertUser);
            $obj_db->execute();
            $response = Array (
                "estado" => 'success',
                "usuario" => $userName
            );
        } else {
            $insertColaborador = "INSERT INTO tb_colaboradores (IdColaborador, NomColaborador, ApeColaborador, CorreoColaborador, TipDocColaborador, DocumentoColaborador, HuellaColaborador, FotoColaborador) VALUES (NULL, '$nombres','$apellidos', '$correo', '$tipDoc', '$documento', NULL, 'assets/img/user.png')";
            $obj_db->query($insertColaborador);
            $obj_db->execute();
            $selectColaborador = "SELECT IdColaborador FROM tb_colaboradores WHERE DocumentoColaborador = '$documento'";
            $obj_db->query($selectColaborador);
            $result = $obj_db->register();
            $insertUser = "INSERT INTO tb_usuarios (IdUsuario, Usuario, Password, IdColaborador, IdRol) VALUES (NULL, '$userName', '$password', $result->IdColaborador, $cargo)";
            $obj_db->query($insertUser);
            $obj_db->execute();
            $response = Array (
                "estado" => 'success',
                "usuario" => $userName
            );
        }

        $obj_db->query($insertUser);
        $obj_db->execute();

        return json_encode($response);

    });

    $app->get('/colaboradores', function(Request $request, Response $response, array $args) use($obj_db){
        $selectUsers = "SELECT 
                            tbCol.NomColaborador,
                            tbCol.ApeColaborador,
                            tbCol.CorreoColaborador,
                            tbCol.DocumentoColaborador,
                            tbCol.TipDocColaborador,
                            tbCol.FotoColaborador,
                            tbUsu.IdUsuario,
                            tbUsu.Usuario,
                            rol.IdRol,
                            rol.NomRol
                        FROM
                            tb_colaboradores tbCol
                                INNER JOIN
                            tb_usuarios tbUsu ON tbUsu.IdColaborador = tbCol.IdColaborador
                                INNER JOIN
                            tb_rol rol ON rol.IdRol = tbUsu.IdRol
                        WHERE
                            tbUsu.IdRol NOT IN (4)";
        $obj_db->query($selectUsers);
        $users = $obj_db->registers();
        return json_encode($users);
    });

    $app->run();
?>