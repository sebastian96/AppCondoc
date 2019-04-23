<?php
    include 'config.php';
    
	//clase para conectarse a la base de datos y ejecutar consultas
	class DataBase{
		private $dbh; //database handler
		private $stmt; //stament
		private $error;

		public function __construct(){  
			//configurar conexion
			$dsn = 'mysql:host='.HOST.'; dbname='.DATABASE;
			// ATTR_PERSISTENT Las conexiones persistentes no son cerradas al final del script, sino que son almacenadas en caché y reutilizadas cuando otro script requiera conexion
			$options = array(
				PDO::ATTR_PERSISTENT => true,
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
			);

			//crear una instancia de PDO 
			
			try{
				$this->dbh = new PDO($dsn, USER, PASSWORD, $options);
				$this->dbh->exec("set names utf8");
			}catch(PDOException $e) {
				$this->error = $e->getMessage();
				echo $this->error; 
			}
		}
		//preparemaos la consulta
		public function query($sql){
			$this->stmt = $this->dbh->prepare($sql);

		}
		//vinculamos la consulta con bind
		public function bind($param, $value, $type = null){
			if(is_null($type)){
				switch (true) {
					case is_int($value):
						$type = PDO::PARAM_INT;
					break;
					case is_bool($value):
						$type = PDO::PARAM_BOOL;
					break;
					case is_null($value):
						$type = PDO::PARAM_NULL;
					break;
					default:
						$type = PDO::PARAM_STR;
						break;
				}
			}
			$this->stmt->bindValue($param, $value, $type);
		}
		//Ejecuta la consulta sin devolder registros
		public function execute(){
			return $this->stmt->execute();
		}
		//obterner registros
		public function registers(){
			$this->execute();
			return $this->stmt->fetchAll(PDO::FETCH_OBJ);
		}
		//Obterner un solo registro
		public function register(){
			$this->execute();
			return $this->stmt->fetch(PDO::FETCH_OBJ);
		}
		//Obterner cantidad de filas con el metodo rowcoun
		
		public function rowCount(){
			return $this->stmt->rowcount();
		}
	}
?>
