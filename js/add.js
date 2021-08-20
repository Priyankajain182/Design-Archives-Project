const database = require('./js/databases');

window.onload = function() {

  // Populate the table
  //populateTable();

  // Add the add button click event
  document.getElementById('useradd').addEventListener('click', () => {

    // Retrieve the input fields
    var designid =document.getElementById('did').value;
   // console.log(typeof(designid1));
    //var designid=parseInt(designid1);
    //var regexp= new RegExp("^\d*\.?\*$");
    var csample = document.getElementById('csample');
    var shade = document.getElementById('shade');
    var refcode = document.getElementById('refcode');
    var percent = document.getElementById('percent');
    var gsm = document.getElementById('gsm');
    var width = document.getElementById('width');
    var cad = document.getElementById('cad');
    var count = 0;
     //check designid is listed already or not
     database.getPersons(function(designs){
      for(i=0;i<designs.length;i++){
        if(designs[i].designid!=designid){
          count++;
        }
        else{

        }
      }
     // console.log(typeof(NaN));
      
        if (designid!== "" && csample.value !== "" && count==designs.length) {
          console.log(typeof(designid));
          
          
          var uvalue = csample.value;
          var imagename = uvalue.replace(/^.*\\/, "");
          console.log(imagename);
          var path = "images/";
          var imagepath = path.concat(imagename);
          
          
          database.addPerson(designid, imagepath, shade.value, refcode.value, percent.value, gsm.value, width.value, cad.value);
          var successMsg = document.getElementById("msg");
          successMsg.innerHTML = "SUCCESS: Design Added Successfully";
          successMsg.style.color = "green";
        } else {
          
          if(count!=designs.length){
            var errorMsg = document.getElementById("msg");
            errorMsg.innerHTML = "ERROR: Design Id is already listed";
            errorMsg.style.color = "Red";
          }
          else{
            var errorMsg = document.getElementById("msg");
            errorMsg.innerHTML = "ERROR: Please Fill Up All Fields";
            errorMsg.style.color = "Red";
          }
         
        }  
      // Reset the input fields
      designid.value = '';
      csample.value = '';
      shade.value = '';
      refcode.value='';
      percent.value='';
      gsm.value = '';
      width.value = '';
      cad.value = '';
  
      // Repopulate the table
      // populateTable();



     })
    // Save the person in the database if form value is not blank
    
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
      tableBody += '  <td>' + designs[i].designid + '</td>';
      tableBody += '  <td>' + designs[i].csample + '</td>';
      tableBody += '  <td>' + designs[i].shade + '</td>';
      tableBody += '  <td>' + designs[i].refcode + '</td>';
      tableBody += '  <td>' + designs[i].percent + '</td>';
      tableBody += '  <td>' + designs[i].gsm + '</td>';
      tableBody += '  <td>' + designs[i].width + '</td>';
      tableBody += '  <td>' + designs[i].cad + '</td>';

      tableBody += '  <td><input type="button" value="Update" onclick="editPerson(\'' + designs[i]._id + '\')"></td>'
      tableBody += '  <td><input type="button" value="Delete" onclick="deletePerson(\'' + designs[i]._id + '\')"></td>'
      tableBody += '</tr>';
    }
    // Fill the table content
    document.getElementById('tablebody').innerHTML = tableBody;
    $(document).ready(function() {
      var t = $('#bootstrap-data-table').DataTable({});
    });

  });
}

// Deletes a person
function deletePerson(id) {

  // Delete the person from the database
  database.deletePerson(id);

  // Repopulate the table
  populateTable();
}

// edit against _id
function editPerson(id) {
  edit(id);
}

// create a html form and save it
function edit(id) {
  var div = document.createElement("div");
  div.style.width = "100px";
  div.innerHTML = '<input type="button" class="btn btn-outline-primary" onclick="updatePerson(\'' + id + '\')">';
}
