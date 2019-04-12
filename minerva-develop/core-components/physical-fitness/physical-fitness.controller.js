// physical-fitness.controller.js
// 
// 


// Process error message if call to server returns an exception
function errormsg(jqXHR, exception) {
    var msg = '';
    if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
    } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
        msg = 'Time out error.';
    } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
    } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
    }


}

//This function issues an AJAX request sends data -- it is called when user clicks button in student.html
function getPhysFit() {
    //get value entered in textfield

    var cadetID = JSON.parse($window.localStorage.getItem("CadetID"));
    alert("Test  with Cadet 7 - William Bowles to see sample data");


    //options to format data for ajax command -- these are not used in this example
    // var formData ="name=ravi&age=31";
    //     formdata = "major=CSCI";
    // var formData2 ={name:"ravi", age: "31"};
    $(document).ready(function () {

        $.ajax({
            type: "POST",  //POST is more secure
            url: "./php/retrievePhysFit2.php",

            data: ({cadet: cadetID}),
            dataType: "json",
            success: function (result) {
                showPhysFit(result);
            },

            error: function (jqXHR, exception) {
                errormsg(jqXHR, exception);
            }
        });
    })
}


function showPhysFit(result) {
    if (document.getElementById('PhysicalFitnessMain').rows.length > 1) {
        return;
    }
    console.log(result);

    /*  -- receives an array of OBJECTS
    { "value": [{"name":"Anna Smith", "major":"CSCI", "age":"19"},
                {"name":"Aaron Smith", "major":"CSCI", "age":"20"},
                {"name":"Brad Jones", "major":"MATH", "age":20"},
                {"name":"Bobby Jones", "major":"MATH", "age":"22"}]
   */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //build html code.
    var row;

    for (var i in result.taskTbl) {
        taskNumber = result.taskTbl[i].taskNumber;
        description = result.taskTbl[i].task;
        lastActivity = result.taskTbl[i].date;
        notes = result.taskTbl[i].note;
        row = document.getElementById("PhysicalFitnessMain").insertRow(-1);
        row.insertCell(0);
        row.insertCell(1);
        row.insertCell(2);
        row.insertCell(3);
        row.insertCell(4);
        row.insertCell(5);
        row.cells[0].innerHTML = taskNumber;
        row.cells[1].innerHTML = description;
        row.cells[2].innerHTML = lastActivity;
        row.cells[3].innerHTML = notes;

        if (taskNumber == "2(a)") {
            row.cells[5].innerHTML = `<button class="btn-danger" onclick="addInfo('pfSubContainer1')" >Show Tests</button>`;
        }
        if (taskNumber == "2(b)") {
            row.cells[5].innerHTML = `<button class="btn-danger" onclick="addInfo('pfSubContainer2')" >Show Tests</button>`;
        }
        if (taskNumber == "2(c)") {
            row.cells[5].innerHTML = `<button class="btn-danger" onclick="addInfo('pfSubContainer3')" >Show Tests</button>`;
        }
    }


    for (var j in result.testTblAlways) {
        taskNumber = result.testTblAlways[j].taskNumber;
        description = result.testTblAlways[j].test;


        if (taskNumber == "2(a)") {
            row = document.getElementById("pfSubContainer1").insertRow(-1);
        }
        if (taskNumber == "2(b)") {
            row = document.getElementById("pfSubContainer2").insertRow(-1);
        }
        if (taskNumber == "2(c)") {
            row = document.getElementById("pfSubContainer3").insertRow(-1);
        }
        row.insertCell(0);
        row.insertCell(1);
        row.insertCell(2);
        row.insertCell(3);
        row.insertCell(4);
        row.insertCell(5);
        row.insertCell(6);
        row.insertCell(7);
        row.insertCell(8);
        row.cells[0].innerHTML = taskNumber;
        row.cells[1].innerHTML = description;

        row.cells[3].innerHTML = '<input type="text" name="tsknum" value="">';
        row.cells[4].innerHTML = '<input type="text" name="tsknum" value="">';
        row.cells[5].innerHTML = '<input type="text" name="tsknum" value="">';
        row.cells[6].innerHTML = '<input type="text" name="tsknum" value="">';
        row.cells[7].innerHTML = '<input type="text" name="tsknum" value="">';
        row.cells[8].innerHTML = '<input type="text" name="tsknum" value="">';


    }

    for (var k in result.testTbl) {

        taskNumber = result.testTbl[k].taskNumber;
        description = result.testTbl[k].test;
        score = result.testTbl[k].result;
        lastActivity = result.testTbl[k].date;
        height = result.testTbl[k].height;
        weight = result.testTbl[k].weight;
        bmi = result.testTbl[k].bmi;
        note = result.testTbl[k].note;

        if (taskNumber == "2(a)") {
            for (var p = 1; p < document.getElementById("pfSubContainer1").rows.length; p++) {
                if (description == document.getElementById("pfSubContainer1").rows[p].cells[1].innerHTML) {
                    row = document.getElementById("pfSubContainer1").rows[p];
                }
            }
        }
        if (taskNumber == "2(b)") {
            for (p = 1; p < document.getElementById("pfSubContainer2").rows.length; p++) {
                if (description == document.getElementById("pfSubContainer2").rows[p].cells[1].innerHTML) {
                    row = document.getElementById("pfSubContainer2").rows[p];
                }
            }
        }
        if (taskNumber == "2(c)") {
            for (p = 1; p < document.getElementById("pfSubContainer3").rows.length; p++) {
                if (description == document.getElementById("pfSubContainer3").rows[p].cells[1].innerHTML) {
                    row = document.getElementById("pfSubContainer3").rows[p];
                }
            }
        }


        row.cells[3].innerHTML = '<input type="text" name="' + taskNumber + description + k + '" value="' + score + '">';
        row.cells[4].innerHTML = '<input type="text" name="' + taskNumber + description + k + '" value="' + lastActivity + '">';
        row.cells[5].innerHTML = '<input type="text" name="' + taskNumber + description + k + '" value="' + height + '">';
        row.cells[6].innerHTML = '<input type="text" name="' + taskNumber + description + k + '" value="' + weight + '">';
        row.cells[7].innerHTML = '<input type="text" name="' + taskNumber + description + k + '" value="' + bmi + '">';
        row.cells[8].innerHTML = '<input type="text" name="' + taskNumber + description + k + '" value="' + note + '">';

    }

    //creating drop down menus
    for (var o = 1; o < document.getElementById("pfSubContainer1").rows.length; o++) {

        var str = '<div class="form-group"><select class="form-control" id="sel1">';

        for (var l in result.testTblOptions) {

            if (result.testTblOptions[l].taskTest == document.getElementById("pfSubContainer1").rows[o].cells[1].innerHTML && result.testTblOptions[l].taskNumber == document.getElementById("pfSubContainer1").rows[o].cells[0].innerHTML) {
                str = str + '<option>' + result.testTblOptions[l].testEvent + '</option>';
            }
        }
        str = str + '</select></div>'
        document.getElementById("pfSubContainer1").rows[o].cells[2].innerHTML = str;


    }

    for (var o = 1; o < document.getElementById("pfSubContainer2").rows.length; o++) {

        var str = '<div class="form-group"><select class="form-control" id="sel1">';

        for (var l in result.testTblOptions) {

            if (result.testTblOptions[l].taskTest == document.getElementById("pfSubContainer2").rows[o].cells[1].innerHTML && result.testTblOptions[l].taskNumber == document.getElementById("pfSubContainer2").rows[o].cells[0].innerHTML) {
                str = str + '<option>' + result.testTblOptions[l].testEvent + '</option>';
            }
        }
        str = str + '</select></div>'
        document.getElementById("pfSubContainer2").rows[o].cells[2].innerHTML = str;


    }

    for (var o = 1; o < document.getElementById("pfSubContainer3").rows.length; o++) {

        var str = '<div class="form-group"><select class="form-control" id="sel1">';

        for (var l in result.testTblOptions) {

            if (result.testTblOptions[l].taskTest == document.getElementById("pfSubContainer3").rows[o].cells[1].innerHTML && result.testTblOptions[l].taskNumber == document.getElementById("pfSubContainer3").rows[o].cells[0].innerHTML) {
                str = str + '<option>' + result.testTblOptions[l].testEvent + '</option>';
            }
        }
        str = str + '</select></div>'
        document.getElementById("pfSubContainer3").rows[o].cells[2].innerHTML = str;


    }

    row = document.getElementById("pfSubContainer1").insertRow(-1);
    row.insertCell(0);
    row.cells[0].innerHTML = '<input type="submit" value="Submit">';
    row = document.getElementById("pfSubContainer2").insertRow(-1);
    row.insertCell(0);
    row.cells[0].innerHTML = '<input type="submit" value="Submit">';

    row = document.getElementById("pfSubContainer3").insertRow(-1);

    row.insertCell(0);
    row.cells[0].innerHTML = '<input type="submit" value="Submit">';


}