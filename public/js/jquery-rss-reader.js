/**
 * jQuery RSS Reader Plugin
 *
 * @module $().rssReader({feedlink:"http://feeds.huffingtonpost.com/huffingtonpost/raw_feed",target:"feeds"});
 */
(function($){
	var _config = {},
	_createElement = function(elementType, attr) {
		var newEl = document.createElement(elementType);
		if(typeof attr === 'undefined') return newEl;

		if(attr.id) newEl.id = attr.id;
		if(attr.className) newEl.className = attr.className;
		if(attr.title) newEl.title = attr.title;

		if(attr.colSpan) newEl.colSpan = attr.colSpan;
		if(attr.rel) newEl.setAttribute('rel',attr.value);
		if(attr.href) newEl.setAttribute('href', attr.href);
		if(attr.type) newEl.setAttribute('type', attr.type);
		if(attr.value) newEl.setAttribute('value', attr.value);		
		if(attr.src) newEl.setAttribute('src', attr.src);
		if(attr.alt) newEl.setAttribute('alt', attr.alt);
		if(attr.border) newEl.setAttribute('border', attr.border);
		if(attr.text) newEl.innerHTML = attr.text;
		if(attr.onclick) newEl.onclick = attr.onclick;

		if(attr.parent && attr.insertBefore) attr.parent.insertBefore(newEl, attr.insertBefore);
		else if(attr.parent) attr.parent.appendChild(newEl);
		return newEl;
	},
	_getContent = function(cb){
		$.ajax({
			url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q='+_config.url,
			dataType: 'json',
			success: function(data) {
				cb(data);
			}
		});
	},
	_buildHTML = function(data){
		var entries = data.responseData.feed.entries,
		entriesHTML = [];
		for(var i=0,l=entries.length;i<l;i++){
			entriesHTML.push(_getSectionHTML(entries[i].title,entries[i].content,i));
			entriesHTML.push('<br>');
		}
		$('#'+_config.target).html(entriesHTML.join(''));	
	},
	_getTitleHTML = function(title,index){
		var h = [];
		h.push("<h3><a class='jq-rss-title' href='#"+index+"'>");
		h.push(title);
		h.push("</a></h3>");	
		return h.join('');
	},
	_getContentHTML = function(content){
		var h = [];
		h.push("<div class='jq-rss-content'>");
		h.push(content);
		h.push("</div>");
		return h.join('');
	},
	_getSectionHTML = function(title,content,index){
		var t = _getTitleHTML(title,index),
		c = _getContentHTML(content),
		h = [];
		h.push("<div class='jq-rss-section'>");
		h.push(t);
		h.push(c);
		h.push("</div>");
		return h.join('');
	},
	_putCSS = function(){
		var css = [];
		css.push('.jq-rss-content{display:none;}');
		css.push('.jq-rss-title{text-decuration:none;color:#000000;}');
		css.push('.jq-rss-title:hover{color:#0769AD;text-decoration:none;}');	
		css.push('.jq-rss-section:after{content:".";display:block;height:0;clear:both;visibility:hidden;}');
		_createElement('style',{
			text:css.join(''),
			parent:document.getElementsByTagName("head")[0]
		});
	},
	_clickTitle = function(e){
		var t = $(e.target);
		if(t.hasClass('jq-rss-title')){
			$('.jq-rss-content').css('display','none');
			var sectionDiv = t.closest(".jq-rss-section");//.css('display','block');	
			sectionDiv.find('.jq-rss-content').css('display','block');
		}
	};
	$.fn.rssReader = function(config){
		if(!config.url && !config.target && $('#'+config.target).length === 0){
			console.log('The RSS Feed URL or target div is missing');
			return -1;
		}
		_config = config;
		if(_config.url){
			_putCSS();
			_getContent(_buildHTML);
			$('#'+_config.target).click(_clickTitle);
		}
	};
})(jQuery);
