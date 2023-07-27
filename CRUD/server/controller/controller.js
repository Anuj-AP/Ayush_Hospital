var UserDB = require('../model/model');

// create and save new Hospital
exports.create = (req, res) => {
  //validate request
  if(!req.body) {
    res.status(400).send({ message : "Content can not be Empty!"});
    return;
  }

  //New User
  const user = new UserDB({
    name : req.body.name,
    location : req.body.location,
    covid_beds : req.body.covid_beds,
    oxygen_cylinders : req.body.oxygen_cylinders,
    rates : req.body.rates,
    cashless_insurance : req.body.cashless_insurance,
    surgeon : req.body.surgeon,
  })

  // save user in the database
  user
    .save(user)
    .then(data => {
      //res.send(data)
      res.redirect('/add-user')
    })
    .catch(err => {
      res.status(500).send({
        message : err.message || "Some error occured while creating a create operation"
      });
    });
}

// retrieve and return all Hospitals / single Hospital
exports.find = (req, res) => {

  if(req.query.id) {
    const id = req.query.id;

    UserDB.findById(id)
      .then(data => {
        if(!data) {
          res.status(404).send({ message : "Not found Hospital with id " + id})
        }
        else {
          res.send(data);
        }
      })
      .catch(err => {
        res.status(500).send({ message : "Error Retriving with id " + id})
      })
  }
  else {
    UserDB.find()
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      res.status(500).send({ message : err.message || "Error occured while retriving Hospital Info"})
    })
  }
  
}



// Update a new identified Hospital by Hospital Id
exports.update = (req, res) => {
  if(!req.body) {
    return res
      .status(400)
      .send({ message : "Content to Update can not be Empty!"});
    return;
  }

  const id = req.params.id;
  UserDB.findByIdAndUpdate(id, req.body)
  .then(data => {
    if(!data) {
      res.status(404).send({ message : `Cannot Update Hospital with ${id}`})
    }
    else {
      res.send(data)
    }
  })
  .catch(err => {
    res.status(500).send({ message : "Error Update user Information"})
  })
}

//delete a Hospital with specified Hospital Id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  UserDB.findByIdAndDelete(id)
    .then(data => {
      if(!data) {
        res.status(404).send({ message : `Cannot Delete with id ${id}`})
      }
      else {
        res.send({
          message : "User was Deleted Successfully!"
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message : "Could Not Delete User with id=" + id
      });
    });
}