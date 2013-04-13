/**
 * jQuery RSS Reader Plugin
 *
 * @module $().rssReader({feedlink:"http://feeds.huffingtonpost.com/huffingtonpost/raw_feed",target:"feeds",height:"400px",width:"600px"});
 */
var $ = jQuery;
$.fn.rssReader = function(config){
	
	/**
	 * Private Variables 
	*/
	var HEIGHT = "100%",
	WIDTH = "100%",

	_utils = {
		/**
		 * Create a new DOM element
		 * @param {Object} Specify the element type and attributes
		 * @return {HTMLElement} Inserts the new element into the DOM and returns an HTMLElement Object
		*/
		createElement : function(elementType, attr) {
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

		/**
		 * Get the RSS feed as JSON from the specified RSS Feed URL
		 * @param {function} Call back function to call once the RSS feed is sucessfully obtained
		*/
		getContent : function(cb){
			$.ajax({
				url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q='+config.url,
				dataType: 'json',
				success: function(data) {
					cb(data);
				}
			});
		},

		/**
		 * Build the markup from the RSS feed data
		 * @param {Object} JSON data of the RSS feed content
		*/
		buildHTML : function(data){
			var entries = data.responseData.feed.entries,
			entriesHTML = [];
			for(var i=0,l=entries.length;i<l;i++){
				entriesHTML.push(_utils.getSectionHTML(entries[i].title,entries[i].content,i));
			}
			_utils.addOptionalStyles();
			$('#'+config.target).html(entriesHTML.join(''));	
		},

		/**
		 * One way to start adding custom styling to the widget
		 * @param {Object} JSON data of the RSS feed content
		*/
		addOptionalStyles : function(){
			if(config.height && config.width){
				HEIGHT = config.height;
				WIDTH = config.width;
				$('#'+config.target).css('overflow','auto');
			}
			$('#'+config.target).css('height',HEIGHT);
			$('#'+config.target).css('width',WIDTH);
		},

		/**
		 * Build the markup for displaying an article in the RSS feed.
		 * @param {String,String,int} The Title text, Content text and a numeric index to uniquely identify this article
		 * @returns {String} Returns markup string of the Ttile and Content of each article. 
		*/
		getSectionHTML : function(title,content,index){
			var t = _utils.getTitleHTML(title,index),
			c = _utils.getContentHTML(content),
			h = [];
			h.push("<div class='jq-rss-section'>");
			h.push(t);
			h.push(c);
			h.push("</div>");
			return h.join('');
		},

		/**
		 * Build the markup for displaying the Title of the articles in the RSS feed.
		 * @param {String,int} The Title text and a numeric index to uniquely identify this article
		 * @returns {String} Returns HTML string of the Title
		*/
		getTitleHTML : function(title,index){
			var h = [];
			h.push("<h3><a class='jq-rss-title' href='#article-"+index+"'>");
			h.push(title);
			h.push("</a></h3>");	
			return h.join('');
		},

		/**
		 * Build the markup for displaying the Content of the articles in the RSS feed.
		 * @param {String} The Content text
		 * @returns {String} Returns markup string of the Content
		*/
		getContentHTML : function(content){
			var h = [];
			h.push("<div class='jq-rss-content'>");
			h.push(content);
			h.push("</div>");
			return h.join('');
		},

		/**
		 * Some CSS for the each article
		 * Adds CSS to the HEAD of the document. This can be expanded or even parameterized. 
		*/
		putCSS : function(){
			var css = [];
			css.push('.jq-rss-content{display:none;}');
			css.push('.jq-rss-title{text-decuration:none;color:#000000;font-size:16px;}');
			css.push('.jq-rss-title:hover{color:#0769AD;text-decoration:none;}');	
			css.push('.jq-rss-section:after{content:".";display:block;height:0;clear:both;visibility:hidden;}');
			_utils.createElement('style',{
				text:css.join(''),
				parent:document.getElementsByTagName("head")[0]
			});
		},

		/**
		 * The click handler for each Header/Title from the RSS feed.
		*/
		clickTitle : function(e){
			var t = $(e.target);
			if(t.hasClass('jq-rss-title') && !t.hasClass('jq-rss-section-active')){
				$('.jq-rss-content').slideUp("slow");
				$('.jq-rss-title').removeClass('jq-rss-section-active');
				var sectionDiv = t.closest(".jq-rss-section");
				sectionDiv.find('.jq-rss-content').slideDown("slow");
				t.addClass('jq-rss-section-active');
			}else if(t.hasClass('jq-rss-title') && t.hasClass('jq-rss-section-active')){
				$('.jq-rss-content').slideUp("slow");
				$('.jq-rss-title').removeClass('jq-rss-section-active');
				var sectionDiv = t.closest(".jq-rss-section");
				sectionDiv.find('.jq-rss-content').slideUp("slow");
				t.removeClass('jq-rss-section-active');
			}
		}
	};

	if((!config.url && !config.target) || $('#'+config.target).length === 0){
		console.log('The RSS Feed URL or target div is missing');
		return -1;
	}else{
		if(config.url){
			_utils.putCSS();
			_utils.getContent(_utils.buildHTML);
			$('#'+config.target).click(_utils.clickTitle);
		}
	}

	/**
	 * Exposing some functions for testing purposes.
   * Doesn't cause any harm if these functions are exposed.
	*/
	return {
		sectionHTML : _utils.getSectionHTML,
		titleHTML : _utils.getTitleHTML,
		contentHTML : _utils.getContentHTML 
	};
};
