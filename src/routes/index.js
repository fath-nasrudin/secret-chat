const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    res.send('Root Page');
  });

module.exports = router;