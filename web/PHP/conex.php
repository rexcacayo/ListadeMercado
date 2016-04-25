<?php
$servidor="localhost"; 
$usuario="root"; 
$clave=""; 
$bd="listamercado";
$conexion=mysql_connect("$servidor","$usuario","$clave");	
if(!$conexion){
	die ('error_conec');
}
$bd_seleccion=mysql_select_db("$bd");
if(!$bd_seleccion){
	die ('error_dbf');
}
//////////////////////servidor internet////////////////
/*
$servidor="localhost"; 
$usuario="ricardoi_listame"; 
$clave="listamercado"; 
$bd="ricardoi_listamercado";
$conexion=mysql_connect("$servidor","$usuario","$clave");	
$error=mysql_errno($conexion) . ": " . mysql_error($conexion);
$bd_seleccion=mysql_select_db("$bd");
if (!$conexion){
	$error=mysql_error();
	echo json_encode($error);
	exit;
}
if (!$bd_seleccion){
	$error=mysql_error();
	echo json_encode($error);
	exit;
}*/
?>