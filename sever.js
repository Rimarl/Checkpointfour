const express = require("express");
const mongoose = require("mongoose");
const { disconnect } = require("process");

require("dotenv").config();
require("./config/db").connect();
const app = express();

const PORT = process.env.PORT || 4000;

         /* Create a Model */ 
var personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFoods: [String]
  });


/* create and save a person  */

var Person = mongoose.model('Person ' , personSchema);
var createAndSavePerson = function(done) {
    let p = new Person({name: "AZERT", age: 17 , favoriteFoods: ['eggs', 'fish', 'SUDHI']});
  
    p.save((err, data)=> {
      if (err) return console.log(err);
      done(null, data);
    });
  };

/* create and save many people */ 
var ArrayOfPeople = [ 
{ name : "hdgf" , age : 12 , favoriteFoods : ["potato" , " tacos"]},
{ name : "qss" , age : 15 , favoriteFoods : ["chiken" , " appel"]},
{ name :" jjj" , age : 16 , favoriteFoods : ["pizza" , "rize"]} 

]; 

var createmanypersons = function(ArrayOfPeople , done) { 
    Person.create(ArrayOfPeople , function(err , data){
        if(err) return console.log(err);
        done(nul , data);
        
    } );
};

// Find all the people having a given name, using `Model.find() -> [Person]`
const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, personFound) => {
      if (err) return console.log(err);
      done(null, personFound);
    });
  };
//Find just one person which has a certain food in the person's favorites
const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
  };
// Finding by id 
const findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) =>{
      if (err) console.log(err) 
      else  done(null, data)
});
  };
//Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById(personId, (err, data) => {
      if (err) return console.log(err);
      data.favoriteFoods.push(foodToAdd);
      data.save((err, dataNext) =>{
       if ( err)
           console.error("error saving data: ", err.message)
        else done(null, dataNext)
       } );
    });
  };

    //Perform New Updates on a Document Using model.findOneAndUpdate()

    const findAndUpdate = (personName, done) => {
        const ageToSet = 20;
      
        Person.findOneAndUpdate(
          { name: personName },
          { $set: { age: ageToSet } },
          { new: true },
          (err , data) => {
            if(err) return console.log(err);
            done(null , data);
          }
       
        );
      };

// Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, data) =>{ 
        if (err) return console.log(err)
        done(null ,data);
    }
     
    );
  };
//Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
    const nameToRemove = "AZERT";
    Person.remove({ name: nameToRemove }, (err, data) =>{ 
        if (err) return console.log(err);
        done(null ,data);
    }
    );
  };

// Find people who like "burrito". Sort them alphabetically by name,
// Limit the results to two documents, and hide their age.
// Chain `.find()`, `.sort()`, `.limit()`, `.select()`, and then `.exec()`,
// passing the `done(err, data)` callback to it.

const queryChain = (done) => {
    const foodToSearch = "burrito";
    Person.find({ favoriteFoods: foodToSearch })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 })
      .exec((err, dataNext) => { if (err) { console.error("error getting data: ", err.message);}
    
    else donne (null , dataNext);
    }
       
      );
  };
  




app.listen(PORT, () => console.log(`app started on port ${PORT}`));