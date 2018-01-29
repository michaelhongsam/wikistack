

const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res){
    Page.findAll({})
    .then(allPageinstances => {
        res.render('index', {
            pages: allPageinstances
        });
    })
});

router.post('/', function(req, res, next){

    // console.log(req.body);

    // var page = Page.build({
    //     title: req.body.title,
    //     content: req.body.content,
    //     status: req.body.status,
    // })

    // var user = User.build({
    //     name: req.body.name,
    //     email: req.body.email,
    // })
    // Promise.all([user.save(),page.save()])
    // .then(function(userAndPage){
    //     res.redirect(userAndPage[1].route);
    //     //res.json({page, user})
    // })
    User.findOrCreate({
        where: {
          name: req.body.name,
          email: req.body.email
        }
      })
      .then(function (values) {
      
        var user = values[0];
      
        var page = Page.build({
          title: req.body.title,
          content: req.body.content
        });
      
        return page.save().then(function (page) {
          return page.setAuthor(user);
        });
      
      })
      .then(function (page) {
        res.redirect(page.route);
      })
      .catch(next);
});

router.get('/add', function(req, res){
    res.render('addpage');
});

router.get('/:url', function(req,res){
    Page.findOne({
        where: {
            urlTitle: req.params.url,
        }
    }).then(function(page){
        console.log(page);
        res.render('wikipage', { pageTitle: page.title, pageContent: page.content})
        //res.json(page);
    })
    //.catch(next);
    // var q = `SELECT * FROM pages WHERE urlTitle=${req.params.url}`;
    // Page.query(q).then(function(page){
    //     res.json(page);
    // })
})


module.exports = router;