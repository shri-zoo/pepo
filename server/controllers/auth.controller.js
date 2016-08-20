exports.getLogout = function(req, res){
    req.logout();
    res.redirect('/');
};