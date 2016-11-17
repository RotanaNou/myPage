/*
    Name: Rotana Nou
    Course: GUI Programming I
    Assignment7: Interactive a Dynamic Table extension
    Date: 11/15/16
    email: Rotana_Nou@student.uml.edu
    Descrioption: For this file, it contains two important functions.
    First function is using the jQery validation plugin to create a rules form
    to messages direct the user to fill out the correct way.
    Second function is to do the calculation and fill out in table and get called
    to first function.
    Reference: http://www.w3schools.com/js/js_number_methods.asp
    https://jqueryvalidation.org/reference/
    http://www.javascript-coder.com/form-validation/jquery-form-validation-guide.phtml
    bakcgroun-image for error messageis from professor class examples.
*/
//checkValidation() is a function that using the jQuery validation plugin
//to creating the rules form and condition to direct the user and error messages
//if encounter.
function checkValidation() {
    //select the form id and use validate function to create the rules form
    //http://www.javascript-coder.com/form-validation/jquery-form-validation-guide.phtml
    $("#form_table").validate( {
    //creating the rule form properties
    rules: {
        start_hor: {
            required: true,
            number: true,
            range: [-25,25]
        },
        end_hor: {
            required: true,
            number: true,
            range: [-25,25]
        },
        start_ver: {
            required: true,
            number: true,
            range: [-25,25]
        },
        end_ver: {
            required: true,
            number: true,
            range: [-25,25]
        }
    },
    //Creating messages to direct users for form properties.
    messages: {
        start_hor: {
            required: "Please enter a number. *Number Only*",
            number: "No number is provided",
            range: "Number is out of range. Please enter number from [-25 to 25].",
        },
        end_hor: {
            required: "Please enter a number. *Number Only*.",
            number: "No number is provided",
            range: "Number is out of range. Please enter number from [-25 to 25].",
        },
        start_ver: {
            required: "Please enter a number. *Number Only*.",
            number: "No number is provided.",
            range: "Number is out of range. Please enter number from [-25 to 25].",
        },
        end_ver: {
            required: "Please enter a number. *Number Only*.",
            number: "No number is provided.",
            range: "Number is out of range. Please enter number from [-25 to 25].",
        }
    },
    //When the form is valid for all the fields
    //submitHandler comes to the job.
    submitHandler: function() {
        tabContent();
        return false;
    },
    //When the form is invlid or require fields need to
    //fill invalidHandler wiill empty table.
    //table doesn't appear on the screen.
    invalidHandler: function() {
        $("#mul_table").empty();
    },
    //This part is the part where to control the error messages group take placed.
    //https://jqueryvalidation.org/validate/
    errorElement: "div",
    errorPlacement: function(invalid, item) {
        invalid.insertAfter(item);
    }
    });
}
//This function is to do the mathematic of multiplication and fill the tables.
function tabContent() {
    //innitialize vars for horizontal start, end. everical start end
    var st_hort;
    var end_hort;
    var st_vert;
    var end_vert;
    //do a conversion
    st_hort = Number(document.getElementById('start_hor').value);
    end_hort = Number(document.getElementById('end_hor').value);
    st_vert = Number(document.getElementById('start_ver').value);
    end_vert = Number(document.getElementById('end_ver').value);
    //checking if the user enter starting greater than ending than swap between the two
    if (st_hort > end_hort) {
        var temp = st_hort;
        st_hort = end_hort;
        end_hort = temp;
    }
    //checking vertical and swap
    if (st_vert > end_vert) {
        var temp = st_vert;
        st_vert = end_vert;
        end_vert = temp;
    }
    var number = {};
    //swap user ending input to start if start is greater than ending
    var hor_row = Math.abs(end_hort - st_hort);
    var ver_col = Math.abs(end_vert - st_vert);
    //st_hort becomes new_hor and st_vert becomes vert
    var new_hor = st_hort;
    var vert = st_vert;
    //creating objects
    var i;
    var j;
    var arrTemp;
    var doMath;
    //using arrays and object number to calculate in dynamic table
    for (i = 0; i <= ver_col; i++) {
        arrTemp = [];
        for (j = 0; j <= hor_row; j++) {
            doMath = new_hor * vert; //perform math for input in table
            arrTemp[j] = doMath;
            new_hor++;
        }
        //get the recent result into object
        number["divRow" + i] = arrTemp;
        new_hor = st_hort;
        vert++;
    }
    //table containing
    var tableCon = "";
    tableCon += "<table>"; //table tag
    tableCon += "<tr><td></td>"; //add an empty row on left most top coner
    //get all the inputs to first row
    var z;
    for (z = st_hort; z <= end_hort; z++) {
        tableCon += "<td>" + z + "</td>";
    }
    //close table row
    tableCon += "</tr>";
    var vert = st_vert;
    //get the number to each row in table
    var i;
    var j;
    for (i = 0; i <= ver_col; i++) {
        tableCon += "<tr><td>" + vert + "</td>"; //get the first row
        // set for all the spot in multiplication row
        for (j = 0; j <= hor_row; j++) {
            tableCon += "<td>" + number["divRow" + i][j] + "</td>";
        }
        vert++;
        tableCon += "</tr>"; // close row
    }
    tableCon += "</table>"; //close table
    // display to page
    $("#mul_table").html(tableCon);
    return false; //prevent refresh
}
