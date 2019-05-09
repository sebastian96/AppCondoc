<?php
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;
    use \Firebase\JWT\JWT;
    require '../vendor/autoload.php';
    include '../config/conexion.php';

    $app = new \Slim\App;

    $app->post('/login', function(Request $request, Response $response, array $args){
        $data = $request->getParsedBody();

$privateKey = <<<EOD
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQC8kGa1pSjbSYZVebtTRBLxBz5H4i2p/llLCrEeQhta5kaQu/Rn
vuER4W8oDH3+3iuIYW4VQAzyqFpwuzjkDI+17t5t0tyazyZ8JXw+KgXTxldMPEL9
5+qVhgXvwtihXC1c5oGbRlEDvDF6Sa53rcFVsYJ4ehde/zUxo6UvS7UrBQIDAQAB
AoGAb/MXV46XxCFRxNuB8LyAtmLDgi/xRnTAlMHjSACddwkyKem8//8eZtw9fzxz
bWZ/1/doQOuHBGYZU8aDzzj59FZ78dyzNFoF91hbvZKkg+6wGyd/LrGVEB+Xre0J
Nil0GReM2AHDNZUYRv+HYJPIOrB0CRczLQsgFJ8K6aAD6F0CQQDzbpjYdx10qgK1
cP59UHiHjPZYC0loEsk7s+hUmT3QHerAQJMZWC11Qrn2N+ybwwNblDKv+s5qgMQ5
5tNoQ9IfAkEAxkyffU6ythpg/H0Ixe1I2rd0GbF05biIzO/i77Det3n4YsJVlDck
ZkcvY3SK2iRIL4c9yY6hlIhs+K9wXTtGWwJBAO9Dskl48mO7woPR9uD22jDpNSwe
k90OMepTjzSvlhjbfuPN1IdhqvSJTDychRwn1kIJ7LQZgQ8fVz9OCFZ/6qMCQGOb
qaGwHmUK6xzpUbbacnYrIM6nLSkXgOAwv7XXCojvY614ILTK3iXiLBOxPu5Eu13k
eUz9sHyD6vkgZzjtxXECQAkp4Xerf5TGfQXGXhxIX52yH+N2LtujCdkQZjXAsGdm
B2zNzvrlgRmgBrklMTrMYgm1NPcW+bRLGcwgW2PTvNM=
-----END RSA PRIVATE KEY-----
EOD;
$publicKey = <<<EOD
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8kGa1pSjbSYZVebtTRBLxBz5H
4i2p/llLCrEeQhta5kaQu/RnvuER4W8oDH3+3iuIYW4VQAzyqFpwuzjkDI+17t5t
0tyazyZ8JXw+KgXTxldMPEL95+qVhgXvwtihXC1c5oGbRlEDvDF6Sa53rcFVsYJ4
ehde/zUxo6UvS7UrBQIDAQAB
-----END PUBLIC KEY-----
EOD;

        $user = $data['user'];
        $password = $data['password'];

        $obj_db = new DataBase();

        $consultaUser = "SELECT 
                            tb_usuarios.IdRol,
                            tb_usuarios.IdUsuario,
                            tb_usuarios.Usuario,
                            tb_col.NomColaborador,
                            tb_col.ApeColaborador,
                            tb_col.CorreoColaborador,
                            tb_col.TipDocColaborador,
                            tb_col.DocumentoColaborador
                        FROM
                            tb_usuarios
                                INNER JOIN
                            tb_colaboradores tb_col ON tb_usuarios.IdUsuario = tb_col.IdColaborador
                                WHERE
                            tb_usuarios.Usuario = '$user' AND tb_usuarios.Password = '$password'";

        $obj_db->query($consultaUser);
        $result = $obj_db->register();
        $user_rows = $obj_db->rowCount();

        if($user_rows > 0) { 
            $consultaMenu ="SELECT 
                                TituloMenu, ClaseMenu, UrlMenu
                            FROM
                                tb_menu
                            WHERE
                                RolId = $result->IdRol";
                                
            $obj_db->query($consultaMenu);
            $items = $obj_db->registers();
            
            $token = Array(
                "nombre" => $result->NomColaborador,
                "apellido" => $result->ApeColaborador,
                "user" => $result->Usuario,
                "tipoDoc" => $result->TipDocColaborador,
                "documento" => $result->DocumentoColaborador,
                "correo" => $result->CorreoColaborador,
                "rol_id" => $result->IdRol,
                "usu_id" => $result->IdUsuario,
                "estado" => "success",
                "menu" => $items
            );
        } else {
            $token = Array(
                "estado" => "error"
            );
        }
        
        $jwt = JWT::encode($token, $privateKey, 'RS256');
        return json_encode($jwt);

    });

    $app->get('/listarUsuarios', function(Request $request, Response $response, array $args){
        $data = $request->getParsedBody();
        $obj_db = new DataBase();

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

    $app->run();
?>