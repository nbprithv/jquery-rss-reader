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
				expect($('#feeds').children().length).toBeLessThan(0);
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


//  describe("when song has been paused", function() {
//    beforeEach(function() {
//      player.play(song);
//      player.pause();
//    });
//
//    it("should indicate that the song is currently paused", function() {
//      expect(player.isPlaying).toBeFalsy();
//
//      // demonstrates use of 'not' with a custom matcher
//      expect(player).not.toBePlaying(song);
//    });
//
//    it("should be possible to resume", function() {
//      player.resume();
//      expect(player.isPlaying).toBeTruthy();
//      expect(player.currentlyPlayingSong).toEqual(song);
//    });
//  });

  // demonstrates use of spies to intercept and test method calls
//  it("tells the current song if the user has made it a favorite", function() {
//    spyOn(song, 'persistFavoriteStatus');
//
//    player.play(song);
//    player.makeFavorite();
//
//    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
//  });
//
//  //demonstrates use of expected exceptions
//  describe("#resume", function() {
//    it("should throw an exception if song is already playing", function() {
//      player.play(song);
//
//      expect(function() {
//        player.resume();
//      }).toThrow("song is already playing");
//    });
//  });
});
