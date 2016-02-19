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

			//$("#achievementWindow").html(listAchievements[0].title);
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
    	div.html(achiev.title);
    	
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
	
	var this_ = this;
	MyBlocklyApps.showDialog(document.getElementById("achievementWindow"), null, false, true, true, 
			BlocklyApps.getMsg("Achievement_Title"), {width: "800px", height: "600px"}, 
			function() {this_.dispose();});
			
};

AchievementWindow.prototype.dispose = function() {
	$("#achievementContentWindow").empty();
};

AchievementWindow.prototype.closeButtonClick = function() {
    $('#achievementCloseButton').unbind("click");
	MyBlocklyApps.hideDialog(true); 
};
