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

	

});