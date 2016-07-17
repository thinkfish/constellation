function getAstro(month,day){    
    var s="魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    var arr=[20,19,21,21,21,22,23,23,23,23,22,22];
    return s.substr(month*2-(day<arr[month-1]?2:0),2);
}

var sendMessage=function(obj,callback){
	chrome.extension.sendMessage(obj,function(response){
		callback&&callback(response);
	})
};

function returnObj(fun,id){
	fun=fun||'day';
	var url="http://api.uihoo.com/astro/astro.http.php";
	var params={
		"fun":fun,
		"id":id,
		"format":"json"
	};
	return {url:url,params:params};
}

var typeObj={
	"day":"day",
	"tomorrow":"tomorrow",
	"week":"week",
	"month":"month",
	"year":"year",
	"love":"love"
}

+function($){
	var BG=chrome.extension.getBackgroundPage();
	var constellationEl=$('.selectConstellation'),
		conEl=constellationEl.find('li'),
		searchResultEl=$('.search-result'),
		resultTableEl=searchResultEl.find('table'),
		returnListEl=searchResultEl.find('.returnlist'),
		funsEl=searchResultEl.find('.funs');

	var initResult=function(data,type,id){
		var theadHtml=['<tr>'];
		var expried=data.pop(),
			name=data.pop();
		theadHtml.push('<td colspan="2" style="text-align:center;">'+name.cn+': 有效期: '+expried+'</td>');
		theadHtml.push('</tr>');
		if(type=='day'||type=='tomorrow'){
			for(var item in data){
				var model=data[item];
				theadHtml.push('<tr><td>');
				theadHtml.push(model.title);
				theadHtml.push('</td><td>');
				if(parseInt(model.rank)>0&&model.value==""){
					for(var i=0,len=parseInt(model.rank);i<len;i++){
						theadHtml.push('<img src="/images/star.png" alt="" title=""/>');
					}
				}else{
					theadHtml.push(model.value);
				}
				theadHtml.push('</td></tr>');

			}
		}else{
			for(var item in data){
				var model=data[item];
				theadHtml.push('<tr><td>');
				theadHtml.push('<strong>'+model.title+'</strong>');
				if(parseInt(model.rank)>0){
					for(var i=0,len=parseInt(model.rank);i<len;i++){
						theadHtml.push('<img src="/images/star.png" alt="" title=""/>');
					}
				}
				theadHtml.push('<br/>');
				theadHtml.push(model.value);
				theadHtml.push('</td></tr>');
			}
		}
		return theadHtml.join(''); 
	};

	var sendRequest=function(id,type){
		var obj=returnObj(type,id);
		BG.db.set("params",{"type":type,"id":id});
		sendMessage(obj,function(response){
			resultTableEl.html(initResult(response,type,id)).fadeIn();
			searchResultEl.removeClass('hidden');
			constellationEl.addClass('hidden');
		});
	}

	conEl.bind('click',function(){
		var id=$(this).attr('data-value');
		funsEl.find('li').attr('data-value',id);
		funsEl.find('li[data-type="day"]').addClass("hover").siblings().removeClass("hover");
		sendRequest(id,'day');
	});

	returnListEl.bind('click',function(){
		constellationEl.removeClass('hidden');
		searchResultEl.addClass('hidden');
		BG.db.set("params",{});
	});

	funsEl.find("li").click(function(){
		var type=$(this).attr('data-type'),
			id=$(this).attr('data-value');
		$(this).addClass("hover").siblings().removeClass("hover");
		sendRequest(id,type);
	});

	var init=function(){
		var params=BG.db.get('params');
		funsEl.find("li").attr("data-value",params["id"]);
		if(("type" in params) && ("id" in params)){
			var type=params["type"],
				id=params["id"];
			funsEl.find('li[data-type="'+type+'"]').addClass("hover");
			sendRequest(id,type);
		}
	}

	init();

}(jQuery);