<?php
/**
 * This file is used for the creation of an applicant via the recruiter panel.
 *
 */

// TODO: Sanitize POST data

require_once 'dbcontroller.php';
$db = new DBController();
$conn = $db->connectDB();

// AngularJS doesn't behave well with PHP by default during POST
// requests. Using file_get_contents gets the POST data
// https://stackoverflow.com/questions/15485354/angular-http-post-to-php-and-undefined
$postdata = file_get_contents("php://input");

// Convert to associative array so key/value pairs can be accessed
$decoded_postdata = (array)json_decode($postdata);
$people_data = (array)$decoded_postdata["peopleData"];
$applicants_data = (array)$decoded_postdata["applicantsData"];
$contact_info_data = (array)$decoded_postdata["contactInformationData"];

/**
 * Creates the insertion string given column names, data values, and a table.
 *
 * - Parameters:
 *   - $table_name: The name of the table the data is being inserted in
 *   - $data: The associative array containing the key value pairs for the
 *   new record being inserted
 */
function create_insertion_string($table_name, $data) {
    $keys = array_keys($data);
    $values = array_values($data);
    $keys_str = implode(", ", $keys);
    $values_str = "\"".implode("\", \"", $values)."\"";
    return "INSERT INTO $table_name ($keys_str) VALUES ($values_str);";
}


// Queries are being chained together since each sequential database
// query relies on the response of the last one.
//
// MARK: - Add the person to the database
//

$people_insert_query = create_insertion_string("tblPeople", $people_data);
if($conn->query($people_insert_query) == TRUE) {

    //
    // MARK: - Add the person as a applicant
    //

    // Data for inserting into tblApplicants
    $people_id = $conn->insert_id;
    $applicants_data = array(
        "fkPersonID" => $people_id
    );
    $applicant_insert_query = create_insertion_string("tblApplicants", $applicants_data);
    if($conn->query($applicant_insert_query) == TRUE) {

    } else {
        echo "Failed insertion to applicant ";
        echo $conn->error;
    }

    //
    // MARK: - Add all the Applicants contact information
    //

    // Data for inserting into tblPersonContacts
    foreach($contact_info_data as $value) {
        $value->fkPersonID = $people_id;
        $contact_info_insert_query = create_insertion_string("tblPersonContacts", (array)$value);
        if($conn->query($contact_info_insert_query) == TRUE) {
            echo "Success";
        } else {
            echo "Failed to insert contact info ";
            echo $conn->error;
        }
    }

} else {
    echo "Failed insertion to people ";
    echo $conn->error;
};

?>
