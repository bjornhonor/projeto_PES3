var express = require('express');
var path = require('path'); // Adicione esta linha para incluir o módulo path
var router = express.Router();

// GET users listing.
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/renda/renda.html'));
});

module.exports = router;
