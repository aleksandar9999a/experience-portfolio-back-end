const router = require('express').Router();
const models = require('./../models/');
const { auth } = require('./../modules');

router.post('/contact', (req, res, next) => {
    const { name, email, subject, message } = req.body;
    models.Contacts.create({ name, email, subject, message }).then(contact => res.send(contact)).catch(next);
})

router.get('/contact', auth, (req, res, next) => {
    models.Contacts.find().then(contacts => res.send(contacts)).catch(next);
})

router.delete('/contact', auth, (req, res, next) => {
    const id = req.body.id;
    models.Contacts.deleteOne({ _id: id }).then(contact => res.send(contact)).catch(next)
})

module.exports = router;