const express = require('express');
const router = express.Router();


const mongoose = require ('mongoose') ;
const { update, updateMany } = require('../models/Drone.model');

const Drone = require('../models/Drone.model')

// require the Drone model here

router.get('/drones', (req, res, next) => {
  Drone.find()
  .then(function(drones){
    res.render('drones/list', {drones: drones})
  })
  .catch(function (error) {
    console.log(error);

  } );
  // Iteration #2: List the drones
  // ... your code here
});


router.get('/drones/create', (req, res, next) => {
res.render('drones/create-form')

});



router.post('/drones/create', (req, res, next) => {
  Drone.create({
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  })
    .then(function (createdDrone) {
      res.redirect('/drones')

    })
    .catch(function (error) {
      res.redirect('/')

    });

});

router.get('/drones/:id/edit', (req, res, next) => {
  Drone.findById(req.params.id)
  .then(function(drone){
    res.render('drones/update-form', {drone: drone})
  })
  .catch(function (error) {
    console.log(error);

  } );
});

router.post('/drones/:id/edit', (req, res, next) => {


  Drone.findByIdAndUpdate(req.params.id, {...req.body})
    .then(function () {
      res.redirect("/drones");
    })
    .catch(function (error) {
      res.json(error);
    });
});


router.post('/drones/:id/delete', (req, res, next) => {

  Drone.findByIdAndRemove(req.params.id)
    .then(function () {

      res.redirect("/drones");
    })
    .catch(function (error) {
      res.json(error);
    });
});



module.exports = router;
