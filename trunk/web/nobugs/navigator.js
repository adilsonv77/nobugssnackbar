var nav = {};

nav.onload = function(e) {
	
	if ((validateIE() || validateOpera()) && (!validateChrome() || !validateFirefox() || !validateSafari())) {
		window.location.href = "error.html";
	}
	
	function validateIE() {
		return navigator.appVersion.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("Trident") > -1;
	}
	function validateChrome() {
		return navigator.appVersion.indexOf("Chrome") > -1;
	}
	function validateFirefox() {
		return navigator.userAgent.indexOf("Firefox") > -1;
	}
	function validateSafari() {
		return navigator.userAgent.indexOf("Safari") > -1;
	}
	function validateOpera() {
		return navigator.userAgent.indexOf("Opera") > -1;
	}
};