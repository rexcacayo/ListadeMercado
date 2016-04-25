//cargar lista a pagina
//trabajando en local
var dir= "http://127.0.0.1/web/lista_mercado_back/php/";
//trabajando en servidor'
//var dir = "http://listamercado.ricardolugaresi.com.ve/php/"
////////////////////////////////////////////////////////
function add_product(){
	var producto=[];
	var nombre_producto=$(add_pro).val();
	var unidad_producto=$(add_unidad).val();
//validadcion de campos///
	if (nombre_producto==""){
		$("#add_pro").val("");
		$("#add_pro").attr("placeholder", "DEBE INGRESAR UN NOMBRE DEL PRODUCTO");
		$("#add_pro").focus();
		return 0;	
	}
	if (unidad_producto==""){
		$("#add_unidad").val("");
		$("#add_unidad").attr("placeholder", "INGRESE UNA UNIDAD PARA ESTE PRODUCTO");
		$("#add_unidad").focus();
		return 0;	
	}
//llenar vector para enviar//////
	producto[0]=nombre_producto;
	producto[1]=unidad_producto;
/////metodo json/////////////////		
	$.ajax({
    	type       : "POST",
    	url        : dir+"agregar_producto.php",
    	data       : {dato : producto},
    	dataType   : 'json',
    	success    : respuesta,
    	error      : error,      
	});
	
		function respuesta(data){
			//alert(data);
			if(data=="AGREGADO"){
				$("#add_pro").val("");
				$("#add_unidad").val("");
				$.mobile.changePage("#confirmar", {transition: "pop"});			
				var mensaje = "Producto Agregado";
				var titulo ="OPERACION REALIZADA";
				$("#mensaje_afirm").html(mensaje);
				$("#titulo_afirm").html(titulo);
			}else{
				$("#add_pro").val("");
				$("#add_unidad").val("");
				$.mobile.changePage("#confirmar", {transition: "pop"});			
				var mensaje = "Producto Existente";
				var titulo ="EXISTENCIA";
				$("#mensaje_afirm").html(mensaje);
				$("#titulo_afirm").html(titulo);
			}
		}
		function error(data){
			var titulo_error="";
			var mensaje_error="";
			$.mobile.changePage("#error", {transition: "flip"})
			titulo_error +='Lista';
			mensaje_error +='Error de conexion';
			$('#titulo_error').html(titulo_error);
			$('#mensaje_error').html(mensaje_error);
		}
}

function enviar_correo(){
	var correo=$("#email_contacto").val();
	var comentario=$("#mensaje_contacto").val();
	var filter=/^[A-Za-z][A-Za-z0-9_]*@[A-Za-z0-9_]+\.[A-Za-z0-9_.]+[A-za-z]$/;
	if (correo==""){
		$("#email_contacto").val("");
		$("#email_contacto").focus();
		return 0;
	}
	if (comentario==""){
		$("#mensaje_contacto").val("");
		$("#mensaje_contacto").focus();
		return 0;
	}
	if (!filter.test(correo) ){
		$.mobile.changePage("#error", {transition: "flip"})
		var encabezado_error="";
		var comentario_error="";
		encabezado_error ="CORREO";
		comentario_error ="Error de direcion de correo electronico";
		$("#titulo_error").html(encabezado_error);
		$("#mensaje_error").html(comentario_error);
		$("#email_contacto").val("");
		return 0;
	}
	$.ajax({
    	type       : "POST",
    	url        : dir+"correo.php",
    	data       : ({email: correo, comentario: comentario}),
    	dataType   : 'json',
    	success    : Respuesta,
    	error      : error,      
	});
	function Respuesta(data){
		if (data=="si"){
			$("#email_contacto").val("");
			$("#mensaje_contacto").val("");			
			$.mobile.changePage("#confirmar", {transition: "flip"});
			titulo_error ='Correo enviado';
			mensaje_error ='Comentarios enviados correctamente, Gracias por su tiempo.';
			$('#titulo_afirm').html(titulo_error);
			$('#mensaje_afirm').html(mensaje_error);
		}else{
			$.mobile.changePage("#error", {transition: "flip"})
			titulo_error +='Error de Correo';
			mensaje_error +='Envio de correo no exitoso';
			$('#titulo_error').html(titulo_error);
			$('#mensaje_error').html(mensaje_error);
		}
	}
}

function limpieza(){
	/*
	document.getElementById("correo_env").email_conc.value="";
	document.getElementById("correo_env").messaje_conc.value="";
	*/
}

function go_home(){
	$.mobile.changePage("#home", {transition: "slideup"});
}

	

