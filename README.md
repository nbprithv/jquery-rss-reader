jQuery RSS Reader
=================

A jQuery plugin to fetch and display RSS feeds

jQuery Plugin usage
-------------------

```
<h1>RSS Reader</h1>
<div id="feeds"></div>
<script type="text/javascript" src="https://raw.github.com/nbprithv/jquery-rss-reader/gh-pages/public/js/jquery-min.js"></script>
<script type="text/javascript" src="https://raw.github.com/nbprithv/jquery-rss-reader/gh-pages/public/js/jquery-rss-reader.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		/**
		 * url: RSS feed URL
		 * target: div id where the widget should appear
     * height: height of the widget (optional)
     * widthL width of the widget (optional). Both height and width need to be given and not just one.
		*/
		$().rssReader({url:"http://feeds.huffingtonpost.com/huffingtonpost/raw_feed",target:"feeds",height:"600px",width:"800px"});
	});
</script>

```
