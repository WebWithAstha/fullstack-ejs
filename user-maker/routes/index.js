var express = require('express');
var router = express.Router();
const userModel = require('./users')

/* GET home page. */
router.get('/', async function (req, res, next) {
  const users = await userModel.find()
  res.render('index', { users });
});

router.post('/create', async function (req, res, next) {
  const user = await userModel.create({
    username: req.body.username,
    email: req.body.email,
    caption: req.body.caption
  })
  res.redirect('/');
});

router.get('/delete/:id', async function (req, res, next) {
  const users = await userModel.findOneAndDelete({ _id: req.params.id })
  res.redirect('/');

});

router.get('/update/:id', async function (req, res, next) {
  const user = await userModel.findOne({ _id: req.params.id })
  res.render('update', { user });
});

router.post('/update/:id', async function (req, res, next) {
  const user = await userModel.findOneAndUpdate({_id:req.params.id},
    {
      username: req.body.username,
      email: req.body.email,
      caption: req.body.caption
    })
  res.redirect('/');
});

router.get('/likes/:id', async function (req, res, next) {
  const user = await userModel.findOne({ _id: req.params.id })
  user.likes++;
  await user.save()
  res.redirect('/');
});

module.exports = router;
