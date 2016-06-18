$(document).ready(function(){
	
	var usuariosEnLinea = [];

	var template = "";
	var templateVideo = "";
	var templateHorario = "";
	var video = "";
	var socket = io.connect('http://localhost:3000/');
	

	function isApiGiphy(){
		var API = 'http://api.giphy.com/v1/gifs/';
		var SEARCH = 'search?q=';
		var SEARCHING = 'funny+cat';
		var KEY = '&api_key=dc6zaTOxFJmzC';
		
		$(".formGiphy").submit(function(e){
			var themeGif = '';
			e.preventDefault();
			$(".formGiphy").fadeOut();
			$(".headerForm").fadeIn();
			SEARCHING = $("input[name='jsPrimarySearch']").val();
			$("input[name='jsSecondarySearch']").val(SEARCHING);
			$.getJSON(API+SEARCH+SEARCHING+KEY, giphy, false);
			function giphy(data){
				var dataIMG;
				for(var i = 0; i < data.data.length; i++){
					dataIMG = data.data[i].images.downsized.url;
					themeGif = "<figure class='figureGiphy'>"+
								"<img src='"+dataIMG+"'>" +
								"<div class='iconCont'>"+
								"<i class='fa fa-check-circle'></i>"
								+"</div>"
							   +"</figure>";
					$(".contentGiphy--Figures").append(themeGif);
				}
				function itemSelect(){
						
						$(".figureGiphy").click(function(e){
							var $img = $(this).find('img').attr('src');
							var $a = $(this).find('.iconCont').css('display','block');
							if($($a).is(':visible')){
								//alert('hip hop!!!');
							}
							console.log($(this).parent());
						});


				}
				itemSelect();
			}

		});
		$(".jsFormS").submit(function(e){
			var themeGif = '';
			e.preventDefault();
			$(".contentGiphy--Figures").find('figure').remove();
			SEARCHING = $("input[name='jsSecondarySearch']").val();
			$.getJSON(API+SEARCH+SEARCHING+KEY, giphy, false);
			function giphy(data){
				var dataIMG;
				for(var i = 0; i < data.data.length; i++){
					dataIMG = data.data[i].images.downsized.url;
					themeGif = "<figure class='figureGiphy'>"+
								"<img src='"+dataIMG+"'>"
								"<div class='iconCont'>"+
								"<i class='fa fa-check-circle'></i>"
								+"</div>"
							   +"</figure>";
					$(".contentGiphy--Figures").append(themeGif);
				}
				
			}

		});




	}
	isApiGiphy();


	function showBar(nameClass, show){
		var clase = nameClass;
		var claseShow = show;
		$(clase).click(function(){
			$(claseShow).slideToggle('slow');
		});
	}
	showBar('.jsShow', '.sendIcons');
	function utils(){


		$(".jsYoutube").click(function(){
			video = prompt('Ingresa url de youtube');

			var regExp =  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
			var match = video.match(regExp);

			//console.log(match[2]);
 
			templateVideo = "<iframe frameborder='0' width='350px' height='250px' src='//www.youtube.com/embed/"+match[2]+"'></iframe>"

			$(".formSendMensaje input[type='text']").val(templateVideo);
		});

	}

	utils();


	socket.on('connect', function(data){
		socket.emit('join', 'hola me conecte');

	});

	

	socket.on('mensaje', function(data){
		console.log(socket.nameUsuario);	
	});

	

	socket.on('broad', function(data){
		var datos = new Date();
		var hora = datos.getDay();
		
		var mensaje = data.mensaje;
		var horario = data.hora;
		//var leyendome = data.style;
		if(data.style) {
			template  = "<div class='pContent--Date' style='margin-left:28em;'>"+
					   			"<time class='jsHorario' datetime='"+horario+"'>" +
					   			"</time>"+
					"</div>"+
					"<div class='pContent' style='margin-left:25em;background:white;border:none;box-shadow: 0;'>"+
							"<p>"+
								"<span class='horarioPub'>"+
									'Publicado: ' +
								"</span>" +
								"<span>"+
								mensaje +
								"</span>"+
					   		"</p>" +
					   "</div>";

		 	$(".jsHorario").timeago();

			$("#muestromensaje").append(template);

			function notify(){
		//Activar permisos de notificacion
			Notification.requestPermission(function(status){
				
				//alert(status);

				var url = window.location;

				var notification = new Notification('Chat Vixnet', {
					body: mensaje,
					icon: 'http://www.universobit.com.ar/portal/img/empresas/0/0/1/0/1/1/2/2/6/2/logoMainPic_10112262.jpg',
					dir:'auto'
				});
				//cerrar notificaciones
				setTimeout(function(){
					notification.close();
				}, 5000);


				function chatUrl(esLink) {
					notification.onclick = (function(){
						window.open(esLink);
					})
				}
				chatUrl(url);

			});

		}
		notify();
			
		}
		else {
				template  = "<div class='pContent--Date'>"+
					   			"<time class='jsHorario' datetime='"+horario+"'>" +
					   			"</time>"+
					"</div>"+
					"<div class='pContent'>"+
							"<p>"+
								"<span class='horarioPub'>"+
									'Publicado: ' +
								"</span>" +
								"<span>"+
								mensaje +
								"</span>"+
					   		"</p>" +
					   "</div>";

		 	$(".jsHorario").timeago();

			$("#muestromensaje").append(template);
		}

		

	
		console.log(data);


		//Animacion en nuestro mensaje publicado:

		

		$("#muestromensaje").scrollTop($("#muestromensaje")[0].scrollHeight).show('slow');		

	});


	$(".formSendMensaje").submit(function(e){



	
		//Mensajes antiguos cambiar configuración:
			$(".pContent").css('max-width','40%').fadeIn('slow');
		//Fin mensajes


		e.preventDefault();

		var mensaje = $(".formSendMensaje input[type='text']").val();

		//var find = $(mensaje).find('<script>');
		//console.log(find);

		socket.emit('mensaje', mensaje);


		

		

	});

});


jQuery.timeago.settings.strings = {
			   suffixAgo: "",
			   suffixFromNow: "a partir de ahora",
			   seconds: "Ahora",
			   minute: "Hace un minuto",
			   minutes: "Hace unos %d minutos",
			   hour: "Hace una hora",
			   hours: "Hace %d horas",
			   day: "Hace un día",
			   days: "Hace %d días",
			   month: "Hace un mes atrás",
			   months: "Hace %d meses",
			   year: "Hace un año atrás",
			   years: "Hace %d años atrás"
};
