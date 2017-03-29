var express = require('express');
var router = express.Router();

router.get('/signup', function (req, res, next) {
    res.send('Birds home page')
});

module.exports = router;
