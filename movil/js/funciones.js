//cargar lista a pagina
//trabajando en local
//var dir= "http://127.0.0.1/mobile/listamercado/php/";
//trabajando en servidor'
var dir = "http://listamercado.ricardolugaresi.com.ve/app/php/"
////////////////////////////////////////////////////////
function listamercado(){
	$.ajax({
    	type       : "post",
    	url        : dir+"consultar_lista.php",
    	data       : {dato : 'x'},
    	dataType   : 'json',
    	success    : respuesta,
    	error      : error,      
	});     
		function respuesta(data){
			var arrproductos = data;
			var top=arrproductos.length;
			var chk_inp = "";
			var chk_lb = "";
			var titulo_error="";
			var mensaje_error="";
			var producto="";
			var valor_producto="";
			var propiedad_1='value="';
			var propiedad_2='"';
			for (x=0;x<top;x++){
				producto=arrproductos[x].trim();
				valor_producto=propiedad_1 + producto + propiedad_2;
				chk_inp +='<input type="checkbox" name="checkbox" id='+x+' '+valor_producto+'>';
				chk_lb +='<label for='+x+'>'+arrproductos[x]+'</label>';
				$('#carga_chk').html(chk_inp+chk_lb);
			}
			$('#carga_chk').trigger('create');
			$.mobile.changePage("#lista", {transition: "slideup"});
		}

		function error(data){
			var titulo_error="";
			var mensaje_error="";
			$.mobile.changePage("#error", {transition: "slideup"})
			titulo_error +='Lista';
			mensaje_error +='Error de conexion';
			$('#titulo_error').html(titulo_error);
			$('#mensaje_error').html(mensaje_error);
		}
}

function enviar_lista() {
	var checkboxes = document.getElementById("lista_envf").checkbox;
	var listamerc = [];
	var listamerc_proc = [];
	var network="";
	var network1="";
	var net_com=[];
	var net_lbl=[];
	var men_top=8;
	var top_list="";
	var count_und=0;
////cargando array de respuestas//////////
	net_com[0]="'Lista de Compras: ";
	net_com[1]="'Por favor traeme:";
	net_com[2]="'Por favor compra:";
	net_com[3]="'Por favor ve al mercado y trae:";
	net_com[4]="'Por favor ve al mercado y compra la siguiente lista:";
	net_com[5]="'Podrias traer:";
	net_com[6]="'Podrias ir a comprar:";
	net_com[7]="'Podrias ir al mercado y comprar:";
	net_com[8]="'";	
//////////array de label propiedad///////////////////	
	net_lbl[0]="Lista de Compras";
	net_lbl[1]="Por favor traeme";
	net_lbl[2]="Por favor compra";
	net_lbl[3]="Por favor ve al mercado y trae";
	net_lbl[4]="Por favor ve al mercado y compra la siguiente lista";
	net_lbl[5]="Podrias traer";
	net_lbl[6]="Podrias ir a comprar";
	net_lbl[7]="Podrias ir al mercado y comprar";
/////////////////fin de array/////////////////
	for (var x=0; x < checkboxes.length; x++) {
		if (checkboxes[x].checked) {
				listamerc[x]=checkboxes[x].value;
		};
	};
////////////////quitando espacios en blanco dentro del vector de productos////////////
	top_list=listamerc.length;
	count_und=0;
	for (var h=0; h < top_list; h++) {
		if (listamerc[h] != undefined){
			listamerc_proc[count_und]=" " + listamerc[h];
			count_und++;
		}
	}
/////////////////construyendo la plantilla de envio por las redes sociales////////////////
	if (listamerc == "") {
		var titulo_error="";
		var mensaje_error="";
		$.mobile.changePage("#error", {transition: "slideup"})
		titulo_error +='Lista';
		mensaje_error +='Debe seleccionar al menos un articulo de la lista';
		$('#titulo_error').html(titulo_error);
		$('#mensaje_error').html(mensaje_error);
	}else{
		for (x=0;x<men_top;x++){
			network +='<input type="radio" name="platilla" id="radio1_'+x+'" value="" onclick="window.plugins.socialsharing.share('+net_com[x]+''+listamerc_proc+''+net_com[8]+')" />';
			network1 +='<label for="radio1_'+x+'">'+net_lbl[x]+'</label>';		
			$('#text_compartir').html(network+network1);
//////termina proceso de repeticion//
		};
		$('#text_compartir').trigger('create');
		setTimeout("go_home()",30000);
		$.mobile.changePage("#metodo", {transition: "slideup"});
	}
}

function enviar_correo(){
	var correo=document.getElementById("correo_env").email_conc;
	var correojs=correo.value;
	var mensaje=document.getElementById("correo_env").messaje_conc;
	var mensajejs=mensaje.value;
	var filter=/^[A-Za-z][A-Za-z0-9_]*@[A-Za-z0-9_]+\.[A-Za-z0-9_.]+[A-za-z]$/;
	var titulo_error="";
	var mensaje_error="";
	if (correojs.length==0){
		$.mobile.changePage("#error", {transition: "slideup"})
		titulo_error +='Correo';
		mensaje_error +='Debe introducir una direccion de correo';
		$('#titulo_error').html(titulo_error);
		$('#mensaje_error').html(mensaje_error);
		return 0;
	}
	if (mensajejs.length==0){
		$.mobile.changePage("#error", {transition: "slideup"})
		titulo_error +='Mensaje';
		mensaje_error +='Debe introducir un comentario';
		$('#titulo_error').html(titulo_error);
		$('#mensaje_error').html(mensaje_error);
		return 0;
	}
	if (!filter.test(correojs) ){
		$.mobile.changePage("#error", {transition: "slideup"})
		titulo_error +='Error de Correo';
		mensaje_error +='Debe introducir una direccion de correo valida';
		$('#titulo_error').html(titulo_error);
		$('#mensaje_error').html(mensaje_error);
		$('#email_conc').text("refresh");
		document.getElementById("correo_env").email_conc.value="";
		return 0;
	}
	$.ajax({
		type:"POST",
		url: dir+"correo.php",
		data:({email: correojs, comentario: mensajejs}),
		success: Respuesta
	});
	function Respuesta(data){
		var titulo_error="";
		var mensaje_error="";
		if (data=='["enviado"]'){
			$.mobile.changePage("#confirmar", {transition: "slideup"});
			titulo_error ='Correo enviado';
			mensaje_error ='Comentarios enviados correctamente';
			$('#titulo_afirm').html(titulo_error);
			$('#mensaje_afirm').html(mensaje_error);
		}else{
			$.mobile.changePage("#error", {transition: "slideup"})
			titulo_error +='Error de Correo';
			mensaje_error +='Env&iacute;o de correo no exitoso';
			$('#titulo_error').html(titulo_error);
			$('#mensaje_error').html(mensaje_error);
		}
	}
}

function limpieza(){
	document.getElementById("correo_env").email_conc.value="";
	document.getElementById("correo_env").messaje_conc.value="";
}

function go_home(){
	$.mobile.changePage("#home", {transition: "slideup"});
}

	

