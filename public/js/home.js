$(document).ready(function(){

	$(".jsNewAccount").click(function(){
		$(".formLogin, .jsNewAccount").fadeOut('fast');
		$(".formRegister, .jsAccessAccount").fadeIn('fast');
	});

	$(".jsAccessAccount").click(function(){
		$(".formRegister, .jsAccessAccount").fadeOut('fast');
		$(".formLogin, .jsNewAccount").fadeIn('fast');
	});

});