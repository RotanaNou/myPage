/*
    Name: Rotana Nou
    Course: GUI Programming I
    Assignment: Creating a Dynamic Table
    Date: 11/03/16
    Descrioption: For this file it has two different functins. First function
    is to do the calculation, second function got called into this function.
    Second function is to create the table and fill the numbers into corresponding spot.
    Reference: http://www.w3schools.com/js/js_number_methods.asp
*/
// myCal() is a function that do the calculation of the multiplication
function myCal() {
    //innitialize vars for horizontal start, end. everical start end
    var st_hort;
    var end_hort;
    var st_vert;
    var end_vert;
    var temp;
    var hor_row;
    var ver_col;
    //typecasting string of value input to number
    st_hort = Number(document.getElementById('start_hor').value);
    end_hort = Number(document.getElementById('end_hor').value);
    st_vert = Number(document.getElementById('start_ver').value);
    end_vert = Number(document.getElementById('end_ver').value);
    //checking if the user enter starting greater than ending than swap between the two
    if (st_hort > end_hort) {
        temp = st_hort;
        st_hort = end_hort;
        end_hort = temp;
    }
    //checking vertical and swap
    if (st_vert > end_vert) {
        temp = st_vert;
        st_vert = end_vert;
        end_vert = temp;
    }
    //checking if user enter the proper number between -999 and 999
    if (st_hort < -999 || end_hort > 999) {
        alert("Invalid Number, Please try again!");
        return;
    }
    if (st_vert < -999 || end_vert > 999) {
        alert("Invalid Number, Please try again!");
        return;
    }
    //checking if user enter string then promt error
    if (st_hort == "" || end_hort == "" || st_vert == "" || end_vert == "") {
        alert("Starting and Ending of Horizontal and Vertical must be number(s).\nPlease try again.");
        return;
    }
    //creating object
    var number = {};
    hor_row = Math.abs(end_hort - st_hort);
    ver_col = Math.abs(end_vert - st_vert);
    var new_hor = st_hort;
    var vert = st_vert;
    var i ;
    var j;
    var arrTemp;
    var doMath
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
    //call function
    tabContent(number);
    return false;
}
//Create a funtion to handle for number contaning in table
function tabContent(number) {
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
    //swap user ending input to start if start is greater than ending
    var hor_row = Math.abs(end_hort - st_hort);
    var ver_col = Math.abs(end_vert - st_vert);
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
}
