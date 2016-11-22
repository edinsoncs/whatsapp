$(document).ready(function(){

	//Panel Register
	
	$(".jsNewAccount").click(function(){
		$(".formLogin, .jsNewAccount").fadeOut('fast');
		$(".formRegister, .jsAccessAccount").fadeIn('fast');
	});

	//Panel Access Account

	$(".jsAccessAccount").click(function(){
		$(".formRegister, .jsAccessAccount").fadeOut('fast');
		$(".formLogin, .jsNewAccount").fadeIn('fast');
	});


	//Function View Register

	var inputRegister = $(".formRegister input[type='text']"),
	inputPassword = $(".formRegister input[name='password']"),
	inputOtherPassword = $(".formRegister input[name='otherpassword']"); 
	submit = $(".formRegister input[type='submit']");

	function fieldsRegister(input, password, otherpassword, submit){
		$(password).keyup(function(e){
			var text = $(this).val();
			if(text.length > 4) {
				$(otherpassword).removeAttr('disabled');
				$(submit).removeAttr('disabled', 'disabled');
				verifyPassword(text);
			} else {
				disable();
			}
		});

		function verifyPassword(data){
			$(otherpassword).keyup(function(e){
				var text = $(this).val();
				
				if(data == text){
					truePassword();
				} else {
					falsePassword();
				}
			});
		}

		function disable(){
			//Desactive input otherpassword
			$(otherpassword).attr('disabled', 'disabled');		
			$(submit).attr('disabled', 'disabled');
		}

		function falsePassword() {
			$(submit).attr('disabled', 'disabled');
			$(password).addClass('inputWarning');
			$(otherpassword).addClass('inputWarning');
		}

		function truePassword(){
			$(submit).removeAttr('disabled', 'disabled');
			$(password).removeClass('inputWarning');
			$(otherpassword).removeClass('inputWarning');
		}
	}

	fieldsRegister(inputRegister, inputPassword, inputOtherPassword, submit);



});