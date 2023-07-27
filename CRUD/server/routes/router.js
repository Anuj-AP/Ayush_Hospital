const express = require('express');
const route = express.Router()

const services = require('../services/render')
const controller = require('../controller/controller')

// Root Route - GET/
route.get('/', services.homeRoutes);
route.get('/client', services.clienthomeRoutes);
route.get('/staff', services.staffhomeRoutes);


// For add user - GET/add-user
route.get('/add-user', services.add_user);

// For update user - GET/update-user
route.get('/update-user', services.update_user);
route.get('/update-user-dev', services.update_user_dev);

//API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports = route