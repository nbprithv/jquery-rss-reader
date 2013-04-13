describe("RSS Reader", function() {
	var rssReader;
	
	describe("It shouldn't initiate",function(){
		beforeEach(function(){
			rssReader = $().rssReader({url:"http://news.yahoo.com/rss/topstories",target:"feeds"});
		});
		it("it shouldn't initiate because the 'feeds' div doesn't exist",function(){
			expect(rssReader).toEqual(-1);
		});
	});

	describe("The HTML functions now",function(){
		beforeEach(function(){
			if($('#feeds').length === 0){
				$('body').append('<div id="feeds"></div>');
				rssReader = $().rssReader({url:"http://news.yahoo.com/rss/topstories",target:"feeds"});
			}
		});
		
		it("Feeds should be populated", function(){
			window.setTimeout(function(){
				expect($('#feeds').children().length).toBeGreaterThan(0);
			},4000);	
		});

		it("Title div HTML",function(){
			var titleDiv = rssReader.titleHTML("Some title",10);
			expect(titleDiv).toBe("<h3><a class='jq-rss-title' href='#article-10'>Some title</a></h3>");
		});
		it("Content div HTML",function(){
			var contentDiv = rssReader.contentHTML("Some content");
			expect(contentDiv).toBe("<div class='jq-rss-content'>Some content</div>");
		});
		it("Section div HTML",function(){
			var sectionDiv = rssReader.sectionHTML("Some title","Some content",10);
			expect(sectionDiv).toBe("<div class='jq-rss-section'><h3><a class='jq-rss-title' href='#article-10'>Some title</a></h3><div class='jq-rss-content'>Some content</div></div>");
		});
	});

	describe("Trying out other RSS feeds",function(){
		beforeEach(function(){
			$('#feeds').html('');
			rssReader = $().rssReader({url:"http://feeds.huffingtonpost.com/huffingtonpost/raw_feed",target:"feeds"});
		});
		
		it("Huffington post feeds should be populated", function(){
			window.setTimeout(function(){
				expect($('#feeds').children().length).toBeGreaterThan(0);
			},4000);	
		});
	});


});
