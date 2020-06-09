const router = require('express').Router();
const models = require('./../models/');
const { auth } = require('./../modules');

router.post('/contact', (req, res, next) => {
    const { name, email, subject, message, isAnswered = false } = req.body;
    models.Contacts.create({ name, email, subject, message, isAnswered }).then(contact => res.send(contact)).catch(next);
})

router.put('/contact', auth(true), (req, res, next) => {
    const { _id, name, email, subject, message, isAnswered } = req.body;
    models.Contacts.updateOne({ _id }, { name, email, subject, message, isAnswered }).then(contact => res.send(contact)).catch(next);
})

router.get('/contact', auth(true), (req, res, next) => {
    models.Contacts.find().then(contacts => res.send(contacts)).catch(next);
})

router.delete('/contact', auth(true), (req, res, next) => {
    const id = req.body.id;
    models.Contacts.deleteOne({ _id: id }).then(contact => res.send(contact)).catch(next)
})

module.exports = router;