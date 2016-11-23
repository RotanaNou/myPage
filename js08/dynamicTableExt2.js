/*
    Name: Rotana Nou
    Course: GUI Programming I
    Assignment8: Interactive a Dynamic Table extension
    Date: 11/22/16
    email: Rotana_Nou@student.uml.edu
    Descrioption: For this file, it contains two important functions.
    First function is to automatically calculate the form into a table
    using .valid and .submit function. Other functions are to create slider
    and tabs that basically get a copy of the original table.
    A function is using the jQery validation plugin to create a rules form
    to messages direct the user to fill out the correct way.
    Last function is to do the calculation and fill out in table and get called
    to first function.
    Reference: http://www.w3schools.com/js/js_number_methods.asp
    https://jqueryvalidation.org/reference/
    http://www.javascript-coder.com/form-validation/jquery-form-validation-guide.phtml
    https://www.tutorialspoint.com/jqueryui/jqueryui_slider.htm
    https://www.tutorialspoint.com/jqueryui/jqueryui_tabs.htm
    bakcgroun-image for error messageis from professor class examples.
*/
//This function is responsible for submitting the form automatically
//using the given default value in the form.
function submitAuto() {
    //check if the table is valid
    if($("form#form_table").valid() == true) {
        //submit the default given value into table
        $("form#form_table").submit();
    }
}
//This function is responsible for creating the slider
function createSlider() {
    //create the start horizontal slider
    $("#sh_slider").slider({
        min: -25,
        max: 25,
        slide: function(event, ui) {
            $("#start_hor").val(ui.value);
            submitAuto();
        }
    });
    //create the end horizontal slider
    $("#eh_slider").slider({
        min: -25,
        max: 25,
        slide: function(event, ui) {
            $("#end_hor").val(ui.value);
            submitAuto();
        }
    });
    //create the start vertical slider
    $("#sv_slider").slider({
        min: -25,
        max: 25,
        slide: function(event, ui) {
            $("#start_ver").val(ui.value);
             submitAuto();
        }
    });
    //create the end vertical slider
    $("#ev_slider").slider({
        min: -25,
        max: 25,
        slide: function(event, ui) {
            $("#end_ver").val(ui.value);
            submitAuto();
        }
    });
}
//a global vairable
var tabToken = 1;
//This function is responsible for creating tab widget
function createTab() {
    //check if table is not valid then display nothing for tab
    if (!$("#form_table").valid()) {
        return false;
    }
    //initialize tabNum
    var tabNum = $("#tabWidget li").length + 1;
    //check if the user is save more table then 10 in tab widget
    if(tabNum > 10) {
        alert("No more than 10 tab tables.");
        return false;
    }
    //initialize tabTitle
    var tabTitle;
    //make the delete tab
    if($("#tabWidget li").length == 0) {
        tabTitle = "<li class='tab'><a href='#tab0' class='tab0' title='Remove All Tabs'>Remove All Tabs</a></li>";
        $("div#tabWidget ul").append(tabTitle);
    }
    //tabWidget get initialize
    $( "#tabWidget" ).tabs();
    //initialize new objects
    var st_hort;
    var end_hort;
    var st_hort;
    var end_hort;
    // get the value of the recent table
    st_hort = Number(document.getElementById('start_hor').value);
    end_hort = Number(document.getElementById('end_hor').value);
    st_vert = Number(document.getElementById('start_ver').value);
    end_vert = Number(document.getElementById('end_ver').value);
    //do the tab increment everytime new tab is added
    tabToken++;
    //create the second tab which is the first of the table display tab
    tabTitle = "<li class='tab'><a href='#tab-" + tabToken + "'>" + st_hort + " to " + end_hort + " by " + st_vert + " to " + end_vert + "</a>" + "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";
    //using .append to add new tab
    $( "div#tabWidget ul" ).append(tabTitle);
    //using .append to add the table in that tab
    $( "div#tabWidget" ).append('<div id="tab-' + tabToken + '">' + $("#mul_table").html() + '</div>');
    //reload and display new tab
    $( "#tabWidget" ).tabs("refresh");
    //do the update to new tab make tab active
    $( "#tabWidget" ).tabs("option", "active", -1);
    //crate the delete button for each tab
    $( "#tabWidget" ).delegate( "span.ui-icon-close", "click", function() {
        var panelID = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelID ).remove();
        //throwing exception try and catch for refresh
        try {
            $( "#tabWidget" ).tabs("refresh");
        }
        catch (e) {
        }
        //check if there is only 1 tab and remove all is excluded then delete button
        // tab is hitted then destroy all tabs
        if( $('div#tabWidget ul li.tab').length == 1) {
            try {
                $("#tabWidget").tabs("destroy");
                $('div#tabWidget div').remove();
                $('div#tabWidget ul li').remove();
            }
            catch (e) {
            }
            return false;
        }
    });
    //if the remove all button is hitted remove all tabs
    $("#tabWidget").delegate("a.tab0", "click", function() {
        $("#tabWidget").tabs("destroy");
        $('div#tabWidget div').remove();
        $('div#tabWidget ul li').remove();
    });
}
//checkValidation() is a function that using the jQuery validation plugin
//to creating the rules form and condition to direct the user and error messages
//if encounter.
function checkValidation() {
    //select the form id and use validate function to create the rules form
    //http://www.javascript-coder.com/form-validation/jquery-form-validation-guide.phtml
    $("#form_table").validate({
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
