
/*
 * GET users listing.
 */

exports.show = function(req, res){
  res.render('rss', { title: 'RSS Reader' });
};
