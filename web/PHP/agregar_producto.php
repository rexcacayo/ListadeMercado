<?php
$producto_agregar = array();
$resp_php = array();
$producto_agregar=$_POST['dato'];
$nombre_producto=$producto_agregar[0];
$unidad_producto=$producto_agregar[1];
///////////////conectar base de datos/////////////////////////
include('conex.php');
//////////////sql///////////////////////////////
//verificacion si no hay repetidos//////////////
$sql_agregar_ver=("SELECT * FROM productos WHERE nombrep='$nombre_producto'");
$result_agregar_ver=mysql_query($sql_agregar_ver);
$final_agregar_ver=mysql_fetch_array($result_agregar_ver);

if ($final_agregar_ver==""){
	$sql_agregar_producto=("INSERT INTO productos (id, nombrep, unidad) VALUES (' ','$nombre_producto','$unidad_producto')");  
	mysql_query($sql_agregar_producto) or die(mysql_error());
	$resp_php[0]="AGREGADO";
}else{
	$resp_php[0]="EXISTENTE";
}
//////////////////////////////respueta///////////////////////
echo json_encode($resp_php);
mysql_free_result($result_agregar_ver);
include('desconex.php');
?>