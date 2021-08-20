// Initialize the database
var Datastore = require('nedb');
db = new Datastore({
  filename: 'db/testdb.db',
  autoload: true
});
db1 = new Datastore({
  filename: 'db/test1db.db',
  autoload: true
});
db2 = new Datastore({
  filename: 'db/designs.db',
  autoload: true
});

// Adds a person
exports.addPerson = function(designid, csample, shade, refcode, percent, gsm, width,  cad) {

  // Create the person object
  var person = [{
    "designid": designid,
    "csample": csample,
    "shade": shade,
    "refcode": refcode,
    "percent": percent,
    "gsm": gsm,
    "width": width,
    "cad": cad
  }];

  // Save the person to the database
  db2.insert(person, function(err, newDoc) {
    // Do nothing
  });
};





// Returns all designs
exports.getPersons = function(fnc) {

  // Get all designs from the database
  db2.find({}, function(err, docs) {

    db2.find({
      _id: fnc
    }, {}, function(err, findUpdate) {

    });


    // Execute the parameter function
    fnc(docs);
  });
}
//Retruns all the books (imp dnd)
exports.getBooks = function(fnc) {

  // Get all designs from the database
  db.find({}, function(err, docs) {

    db.find({
      _id: fnc
    }, {}, function(err, findUpdate) {

    });


    // Execute the parameter function
    fnc(docs);
  });
}

exports.gettest1db = function(fnc) {


  db1.find({}, function(err, docs) {

    db1.find({
      _id: fnc
    }, {}, function(err, findUpdate) {

    });

    //Execute the parameter function
    fnc(docs);
  });

}

// Deletes a person
exports.deletePerson = function(id) {

  db2.remove({
    designid: id
  }, {}, function(err, numRemoved) {
    // Do nothing
  });
}
exports.deleteBook = function(id) {

  db.remove({
    bookid: id
  }, {}, function(err, numRemoved) {



  });

}
exports.deleteIssuedBbook = function(id) {
  db1.remove({
    bookid: id
  }, {}, function(err, numRemoved) {


  });
}

// Updates a person
exports.updateBook = function(id, {
  bookid,
  acnum,
  booktittle,
  authornamee,
  publishername,
  publishplace,
  yearofpublishing,
  pagination,
  remarks,
  issbn,
  bcasenum,
  shelfnum
}) {

  db.update({
    bookid: id
  });

}
exports.updateIssuedBook = function(id, {
  bookid,
  designid,
  csample,
  issued_date,
  renew_date
}) {

  db1.update({
    _id: id
  });
}
// Update a person
exports.updateUser = function(id, {
  designid,
  csample,
  shade,
  refcode,
  percent,
  gsm,
  width,
  cad
}) {
  db2.update({
    designid: id
  }, {
    designid: designid,
    csample: csample,
    shade: shade,
    refcode: refcode,
    percent: percent,
    gsm: gsm,
    width: width,
    cad: cad
  }, {}, function(err, numReplaced) {
    // numReplaced = 1
    // The doc #3 has been replaced by { _id: 'id3', planet: 'Pluton' }
    // Note that the _id is kept unchanged, and the document has been replaced
    // (the 'system' and inhabited fields are not here anymore)
  });
}


exports.bookcount = function(fnc) {

  db.count({}, function(err, count) {

    //console.log(count);
    localStorage.setItem("bookcount", count);




  });




};
exports.usercount = function(fnc) {

  db2.count({}, function(err, count) {

    //console.log(count);
    localStorage.setItem("usercount", count);




  });




};

