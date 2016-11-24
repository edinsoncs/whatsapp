$(document).ready(function(){
	var inputSearchGiphy = '';
	function inDeleteMessages() {

			$(".formSendMensaje").keypress(function(e){
				if(e.which == 13) {
					setTimeout(function(){
						$(".formSendMensaje input[type='text']").val('').show('slow');
					}, 150);
				}
			});
	}
	inDeleteMessages();
	function inShowPanelGiphy() {
		$(".jsGiphy").click(function(){

			$(".panelGiphy").fadeIn();

			$(document).keyup(function(e){
				if(e.keyCode == 27) {
					$(".panelGiphy").fadeOut();
				}
			});
		});

	}
	inShowPanelGiphy();


	//Perfil
	$(".jsHideProfile").click(function(){
		$(".panel--User--Complet").animate({
			'margin-left': '-20em'
		});
	})

	$(".jsShowProfile").click(function(){
		$(".panel--User--Complet").animate({
			'margin-left': '0'
		});
	});

});