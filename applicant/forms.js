function openForm(evt, formName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(formName).style.display = "block";
    evt.currentTarget.className += " active";
}

function saveFormJS() {
    var formID, formName, formText, func;

    func = 'save';
    formID = document.getElementsByClassName("active")[1].id;
    formName = document.getElementById(formID).value;
    formText = document.getElementsByName(formName)[0].value;

    var formData = {formID, formName, formText, func};

    $.ajax({
        url: 'forms_functions.php',
        type: 'post',
        data: {"data" : JSON.stringify(formData)},
        success: function(data) {
            alert("Saved form: "+formData.formName);
        }
    });
}

function deleteFormJS() {
    var formID, formName, formText, func;

    func = 'delete';
    formID = document.getElementsByClassName("active")[1].id;
    formName = document.getElementById(formID).value;
    formText = document.getElementsByName(formName)[0].value;

    var formData = {formID, formName, formText, func};
    if(confirm(formName+" will be deleted, are you sure?")) {
        $.ajax({
            url: 'forms_functions.php',
            type: 'post',
            data: {"data": JSON.stringify(formData)},
            success: function (data) {
                alert("Deleted form: " + formData.formName);
            }
        });
    } else {
        alert(formName + " was not deleted.")
    }
}

function createFormPageJS() {
    // Declare all variables
    var i, tabcontent, tablinks, formID, formName, formText, func, button;
    func = 'create';
    formID = 99;
    formName = 'new';
    formText = 'test';

    var formData = {formID, formName, formText, func};

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    button = document.getElementsByTagName("button");
    for(i = 0; i < button.length; i++){
        button[i].style.display = "none";
    }

    $.ajax({
        url: 'forms_functions.php',
        type: 'post',
        data: {"data": JSON.stringify(formData)},
        success: function (data) {
            alert("Creating new form.");
        }
    });
}

function saveNewFormJS() {
    var formName, formText, func;

    func = 'saveNew';
    formName = document.getElementById("newFormName").value;
    formText = document.getElementById("newText").value;

    var formData = {formName, formText, func};

    $.ajax({
        url: 'forms_functions.php',
        type: 'post',
        data: {"data" : JSON.stringify(formData)},
        success: function(data) {
            alert("Saved new form: "+formData.formName);
        }
    });
}