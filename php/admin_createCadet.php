<?php
/**
 * This file is used for the creation of a cadet via the admin panel. The
 * actual form being used is at /admin/add-cadet/add-cadet.view.html
 *
 * Created by: Zachary Ross
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

function create_insertion_string($table_name, $data) {
    /**
     * Creates the insertion string given column names, data values, and a table. 
     *
     * - Parameters:
     *   - $table_name: The name of the table the data is being inserted in
     *   - $data: The associative array containing the key value pairs for the
     *   new record being inserted
     */ 
    $keys = array_keys($data);
    $values = array_values($data);
    $keys_str = implode(", ", $keys);
    $values_str = "\"".implode("\", \"", $values)."\"";
    return "INSERT INTO $table_name ($keys_str) VALUES ($values_str);";
}


$people_insert_query = create_insertion_string("tblPeople", $people_data);
echo $people_insert_query;
if($conn->query($people_insert_query) == TRUE) {

    // Data for inserting into tblCadets
    $people_id = $conn->insert_id;
    $cadets_data = array(
        "fkPersonID" => $people_id
    );
    $cadet_insert_query = create_insertion_string("tblCadets", $cadets_data);
    if($conn->query($cadet_insert_query) == TRUE) {

        // Data for inserting into tblClassDetails
        $cadet_id = $conn->insert_id;
        $class_detail_data = array(
            "fkClassID" => 1, // TEMPORARY VALUE
            "fkCadetID" => $cadet_id,
            "CadetRosterNumber" => 1 // TEMPORARY VALUE
        );
        $class_detail_insert_query = create_insertion_string("tblClassDetails", $class_detail_data);
        if($conn->query($class_detail_insert_query) == TRUE) {
            echo "Success";
        } else {
            echo "Failed insertion to class details ";
            echo $conn->error;
        }
    } else {
        echo "Failed insertion to cadet ";
        echo $conn->error;
    }
} else {
    echo "Failed insertion to people ";
    echo $conn->error;
};


?>
