$(window).load(function(){

	if (StackMob.getLoggedInUser() == null){
	        window.location.href = 'logout.html';
	}
});