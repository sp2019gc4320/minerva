<?php
/**
 * This file is used for the creation of a cadet via the admin panel. The
 * actual form being used is at /admin/site-addcadet/site-addcadet.view.html
 *
 * Created by: Zachary Ross
 */ 

// TODO: Sanitize POST data

require_once 'dbcontroller.php';
$conn = new DBController();

// AngularJS doesn't behave well with PHP by default during POST
// requests. Using file_get_contents gets the POST data 
// https://stackoverflow.com/questions/15485354/angular-http-post-to-php-and-undefined
$postdata = file_get_contents("php://input");

// Convert to associative array so key/value pairs can be accessed
$decoded_postdata = (array)json_decode($postdata);
$people_data = (array)$decoded_postdata["peopleData"];
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

    $valarray = array();

    //prevent sql injection for all input fields
    for($i = 0; $i<sizeOf($values);$i++){
        $values[$i]=str_replace('"', "'", $values[$i]);
        $values[$i]=str_replace("\\", "/", $values[$i]);
        $values[$i]=filter_var($values[$i], FILTER_SANITIZE_ENCODED);
        array_push($valarray,$values[$i]);
    }

    $keys_str = implode(", ", $keys);
    $values_str = "\"".implode("\", \"", $valarray)."\"";
    return "INSERT INTO $table_name ($keys_str) VALUES ($values_str);";
}


// Queries are being chained together since each sequential database
// query relies on the response of the last one. 
//
// MARK: - Add the person to the database
//

$people_insert_query = create_insertion_string("tblPeople", $people_data);
//if($conn->query($people_insert_query) == TRUE) {
if($conn->runQuery($people_insert_query) == TRUE) {
    // 
    // MARK: - Add the person as a cadet
    //

    // Data for inserting into tblCadets
    $people_id = $conn->insert_id;
    $cadets_data = array(
        "fkPersonID" => $people_id
    );
    $cadet_insert_query = create_insertion_string("tblCadets", $cadets_data);
 //   if($conn->query($cadet_insert_query) == TRUE) {
    if($conn->runQuery($cadet_insert_query) == TRUE) {

        // 
        // MARK: - Add a person to the class
        //

        // Data for inserting into tblClassDetails
        $cadet_id = $conn->insert_id;
        $class_detail_data = array(
            "fkClassID" => 1, // TEMPORARY VALUE
            "fkCadetID" => $cadet_id,
            "CadetRosterNumber" => 1 // TEMPORARY VALUE
        );
        $class_detail_insert_query = create_insertion_string("tblClassDetails", $class_detail_data);
//        if($conn->query($class_detail_insert_query) == TRUE) {
        if($conn->runQuery($class_detail_insert_query) == TRUE) {

            echo "Success";
        } else {
            echo "Failed insertion to class details ";
            echo $conn->error;
        }
    } else {
        echo "Failed insertion to cadet ";
        echo $conn->error;
    }

    // 
    // MARK: - Add all the cadets contact information
    //

    // Data for inserting into tblPersonContacts
    foreach($contact_info_data as $value) {
        $value->fkPersonID = $people_id;
        $contact_info_insert_query = create_insertion_string("tblPersonContacts", (array)$value);
//        if($conn->query($contact_info_insert_query) == TRUE) {
        if($conn->runQuery($contact_info_insert_query) == TRUE) {

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
