var AchievementData = {};

AchievementData = function() {
	
};

AchievementData.prototype.getData = function() {
	
};

var AchievementWindow = {};

AchievementWindow = function() {
    $('#achievementCloseButton').click(this.closeButtonClick);
	
	var this_ = this;
	
	UserControl.listAchievements({
	    async:false,
		callback:function(listAchievements) {
			
			var table = this_.populateTable(listAchievements);
			table.ingrid({height: 500, paging: false, resizableCols: false, sorting: false,
				  colClasses: ['achievement-table-col-position', 'achievement-table-col-position'],
				  colWidths: [385, 385]});

			$("#achievementContentWindow .ingrid > div:nth-child(2)").addClass("mCustomScrollbar")
			              .mCustomScrollbar({ theme:"nobug" });
			$("#achievementContentWindow .mCSB_container").css({"margin-right":"0px"});
			$("#achievementWindow .mCSB_scrollTools").css("width", "5px");
		}
	});
};

AchievementWindow.prototype.populateTable = function(data) {

	var tBody = $("<tbody/>");
    var tr = null;
	  
    for (var i = 0; i < data.length; i++) {
    
    	if (i % 2 == 0) {
    		
  		  tr = $("<tr/>");
		  tBody.append(tr);
  		  
    	}
    	
    	var achiev = data[i];
    	var div = $("<div class='achievement'>");
    	
    	var achieved = (achiev.achieved?"":"-webkit-filter: grayscale(1); filter: gray; filter: grayscale(1);");
    	div.append($("<img src='achievementBadge?id=" + achiev.id + "' style='width:128px; float: left; "+achieved+"'/>"));
  
    	var innerDiv = $("<div style='font-weight: bold; margin-bottom: 10px'/>");
    	innerDiv.html(AchievementWindow.fillFields(BlocklyApps.getMsg(achiev.title), achiev.titleFields));
    	div.append(innerDiv);
    	
    	innerDiv = $("<div/>");
    	
    	innerDiv.html(AchievementWindow.fillFields(BlocklyApps.getMsg(achiev.description), achiev.descriptionFields));
    	div.append(innerDiv);
    	
    	if (achiev.rewardCoins) {
    		innerDiv = $("<div style='float:right'/>");
    		innerDiv.html(achiev.rewardCoins + "<img style='vertical-align: middle; padding-left: 3px' src='images/coin2.png'/>");
    		div.append(innerDiv);
    	} else 
    		if (achiev.rewardXP) {
        		innerDiv = $("<div style='float:right'/>");
    			innerDiv.html(achiev.rewardXP + "<img style='vertical-align: middle; padding-left: 3px' src='images/xp.png'/>");
        		div.append(innerDiv);
    		}
    	
    	tr.append($("<td>").html(div));
    };
    
    if (data.length % 2 == 1)
    	tr.append($("<td>"));
    
    var t = $("<table/>");
	var th = $("<tr/>");
	th.append($("<th/>")); th.append($("<th/>"));
	  
	t.append($("<thead/>").append(th));


    t.append(tBody);
    $("#achievementContentWindow").append(t);
    
    return t;
};

AchievementWindow.prototype.show = function() {
	$("#achievementWindow").css("display", "block");
	var this_ = this;
	MyBlocklyApps.showDialog(document.getElementById("achievementWindow"), null, false, true, true, 
			BlocklyApps.getMsg("Achievement_Title"), {width: "800px", height: "600px"}, 
			function() {this_.dispose();});
			
};

AchievementWindow.fillFields = function(baseText, fields) {
	if (fields == null)
		return baseText;
	
	var regExp = new RegExp("\\[%([A-Z])\\w+%\\]");
	
	do {
		
		var f = regExp.exec(baseText);
		if (f == null)
			return baseText;
		
		baseText = baseText.replace(f[0], fields[f[0].substring(2, f[0].length-2)]);
		
	} while (true);
};

AchievementWindow.prototype.dispose = function() {
	$("#achievementContentWindow .ingrid").remove();
	$("#achievementContentWindow").empty();
};

AchievementWindow.prototype.closeButtonClick = function() {
    $('#achievementCloseButton').unbind("click");
	MyBlocklyApps.hideDialog(true); 
};
