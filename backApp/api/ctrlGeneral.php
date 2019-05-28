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

        if ($nameFoto !== '') {
            $directorioDb = '/assets/img/users/' . $userName . '/foto.png';
            list(, $imgUser) = explode(';', $imgUser);
            list(, $imgUser) = explode(',', $imgUser);
        } else {
            $directorioDb = '/assets/img/user.png';
        }
        $decodeImage = base64_decode($imgUser);
        
        $directorio = $_SERVER["DOCUMENT_ROOT"] . '/AppCondocc/assets/img/users/' . $userName;
                
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
            "usuario" => $userName,
        );
        
        return json_encode($response);
        
    });

    $app->post('/userUpdate', function(Request $request, Response $response, array $args) use($obj_db){
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
        $cargo = $data['cargo'];
        $usuId = $data['idUsuario'];

        
        if ($nameFoto !== '') {
            $directorioDb = '/assets/img/users/' . $userName . '/foto.png';
            list(, $imgUser) = explode(';', $imgUser);
            list(, $imgUser) = explode(',', $imgUser);
        } else {
            $directorioDb = '/assets/img/user.png';
        }
        
        $decodeImage = base64_decode($imgUser);
        
        $directorio = $_SERVER["DOCUMENT_ROOT"] . '/AppCondocc/assets/img/users/' . $userName;
                
        if(!file_exists($directorio)) {
            mkdir($directorio, 0777, true);
            file_put_contents($directorio . '/foto.png', $decodeImage);
        } else {
            file_put_contents($directorio . '/foto.png', $decodeImage);
        }

        $updateUsuario = "UPDATE tb_usuarios SET Usuario = '$userName' WHERE IdUsuario = $usuId";
        $obj_db->query($updateUsuario);
        $obj_db->execute();

        $selectCol = "SELECT IdColaborador FROM tb_usuarios WHERE IdUsuario = $usuId";
        $obj_db->query($selectCol);
        $idColaborador = $obj_db->register();

        $updateColaborador = "UPDATE tb_colaboradores 
                            SET 
                                NomColaborador = '$nombres',
                                ApeColaborador = '$apellidos',
                                CorreoColaborador = '$correo',
                                TipDocColaborador = '$tipDoc',
                                DocumentoColaborador = '$documento',
                                FotoColaborador = '$directorioDb'
                            WHERE
                                IdColaborador = $idColaborador->IdColaborador";

        $obj_db->query($updateColaborador);
        $obj_db->execute();


        $response = Array (
            "estado" => 'success',
            "usuario" => $userName,
        );

        return json_encode($response);
       
        
    });

    $app->post('/deleteUser', function(Request $request, Response $response, array $args) use($obj_db){
        $data = $request->getParsedBody();
        $usuId = $data['userId'];
        $response = [];
        
        $selectCol = "SELECT IdColaborador FROM tb_usuarios WHERE IdUsuario = $usuId";
        $obj_db->query($selectCol);
        $idColaborador = $obj_db->register();
        
        // return json_encode($idColaborador->IdColaborador);
        $deleteUser = "DELETE FROM tb_usuarios WHERE IdUsuario = $usuId";
        $obj_db->query($deleteUser);
        $obj_db->execute();
        
        
        $deleteCola = "DELETE FROM tb_colaboradores WHERE IdColaborador = $idColaborador->IdColaborador";
        $obj_db->query($deleteCola);
        $obj_db->execute();

        $response = Array (
            "estado" => 'success'
        );

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
                            tbUsu.IdRol NOT IN (4)
                        ORDER BY tbCol.NomColaborador ASC";
        $obj_db->query($selectUsers);
        $users = $obj_db->registers();
        return json_encode($users);
    });

    $app->run();
?>