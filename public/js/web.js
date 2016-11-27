$(document).ready(function(){
	var inputSearchGiphy = '';
	var txtarea = 0;
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

			if($(".containerviewIMG")) {
				$(".containerviewIMG").remove();
			}
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

	function viewIMG(input) {
		if(input.files && input.files[0]){
			var leer = new FileReader();

			leer.onload = function(e){
				$(".isAvatarImg").attr('src', e.target.result);
			}

			leer.readAsDataURL(input.files[0]);

			viewBtnSave();
		}
	}


	$("#photo").change(function(){
		viewIMG(this);
	});

	function viewBtnSave(){
		$("label[for='photo']").hide();
		$(".isFormImage").append('<div class="saveButton"><input class="selectConfirm" type="submit" value="CONFIRMAR"/></div>')
	}

	//Edit Status
	$(".jsEditStatus").click(function(){
		$(".complet--Description .description").hide();
		$(".editStatusForm").show('fast');

		textarea($(".editStatusForm textarea"));
	});

	function textarea(txt){
		$(txt).keyup(function(){
			var isL = $(txt).val();
			if(isL.length < 61){
				var formula = isL.length - 60;
				$(".jsCant").text(formula);
				$(".jsEditStatus").hide();
				$(".islabel").show('fast');
			} else {
				return true;
			}

			txtarea = txtarea + 1;
		});
	}
	



});