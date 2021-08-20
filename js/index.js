const database = require('./js/database');

window.onload = function() {

  // Populate the table
  populateTable();

  // Add the add button click event
  document.getElementById('add').addEventListener('click', () => {

    // Retrieve the input fields
    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');
    var author = document.getElementById('author');
    var title = document.getElementById('title');

    // Save the design in the database
    database.addPerson(firstname.value, lastname.value, author.value, title.value);

    // Reset the input fields
    firstname.value = '';
    lastname.value = '';
    author.value = '';
    title.value = '';

    // Repopulate the table
    populateTable();
  });
}

// Populates the designs table
function populateTable() {

  // Retrieve the designs
  database.getPersons(function(designs) {

    // Generate the table body
    var tableBody = '';
    for (i = 0; i < designs.length; i++) {
      tableBody += '<tr>';
      tableBody += '  <td>' + designs[i].firstname + '</td>';
      tableBody += '  <td>' + designs[i].lastname + '</td>';
      tableBody += '  <td>' + designs[i].author + '</td>';
      tableBody += '  <td>' + designs[i].title + '</td>';
      tableBody += '  <td><input type="button" value="Edit" onclick="editPerson(\'' + designs[i]._id + '\')"></td>'
      tableBody += '  <td><input type="button" value="Delete" onclick="deletePerson(\'' + designs[i]._id + '\')"></td>'
      tableBody += '</tr>';
    }

    // Fill the table content
    document.getElementById('tablebody').innerHTML = tableBody;

  });
}

// Deletes a design
function deletePerson(id) {

  // Delete the design from the database
  database.deletePerson(id);

  // Repopulate the table
  populateTable();
}

 // edit against _id
function editPerson(id){
  edit(id);
}  

// create a html form and save it
function edit(id){

 database.getPersons(function(designs){
   var editform='';
  for (i = 0; i < designs.length; i++) {
    editform +='<div>';
    editform +='<input type="text" value="" id="first">';
    editform +='<input type="text" value="" id="last">';
    editform +='<input type="text" value="" id="tit">';
    editform +='<input type="text" value="" id="autr">';
    editform +='<button type="submit" onclick="updatePerson(\'' + designs[i]._id + '\')"';
    editform +='</div>';
  }
  document.getElementById('editform').innerHTML = editform;
 })

}

// update a design 
function updatePerson(id){
  var firstname = document.getElementById('first').value;
  var lastname = document.getElementById('last').value;
  var author = document.getElementById('autr').value;
  var title = document.getElementById('tit').value;
  console.log(firstname,lastname,author,title);
  database.updatePerson(id,{firstname,lastname, title, author});
  populateTable();

}

