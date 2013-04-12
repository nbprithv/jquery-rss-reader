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
		$().rssReader({url:"http://feeds.huffingtonpost.com/huffingtonpost/raw_feed",target:"feeds"});
	});
</script>

```
