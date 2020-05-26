const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.send('qko')
});

module.exports = router;