$(function() {
	$('#forgotPassw').click(function() {
		alert("Maluco");
	});
	
	/*
	$('#sign').tooltip({
		content : $('<div></div>'),
		showEvent : 'click',
		onUpdate : function(content) {
			content.panel({
				width : 380,
				height : 380,
				border : false,
				title : BlocklyApps.getMsg("SignUp_title"),
				href : 'dialog.html'
			});
		},
		onShow : function() {
			var t = $(this);
			t.tooltip('tip').unbind().bind('mouseenter', function() {
				t.tooltip('show');
			}).bind('mouseleave', function() {
				// t.tooltip('hide');
			});
		}
	});
	*/
});

function changeLanguageToPt() {
	BlocklyApps.LANG = BlocklyApps.getLang();
	
	 if (BlocklyApps.LANG = 'en' ) {
		 BlocklyApps.LANGUAGES = ['pt-pt'];
		 window.location.href = 'http://nobugssnackbar.dei.uc.pt/?lang=pt-PT';
	 }
};

function changeLanguageToEn() {
	BlocklyApps.LANG = BlocklyApps.getLang();
	
	 if (BlocklyApps.LANG = 'pt-pt' ) {
		 BlocklyApps.LANGUAGES = ['en'];
		 window.location.href = 'http://nobugssnackbar.dei.uc.pt/?lang=en';
	 }
};