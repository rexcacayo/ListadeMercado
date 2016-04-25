<?php
header('Content-Type: application/json');
include ('conex.php');
$lista_mdb=mysql_query("SELECT nombrep FROM productos");
$arrlista=array();
while ($result_lista=mysql_fetch_array($lista_mdb)){
	$arrlista[]=$result_lista['nombrep'];
}
echo json_encode($arrlista);
include('desconex.php');
?>