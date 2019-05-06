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

$applicants = explode(",", $_POST["applicants"]);

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

function get_applicant_data($applicantId) {
    // Give the function access to conn (an outer variable)
    global $conn;
    $applicant_query = "SELECT * FROM tblApplicants WHERE applicantID=$applicantId";
    $applicant_data = $conn->runSelectQueryArray($applicant_query);
    if(sizeof($applicant_data) > 0)
        return $applicant_data[0];
    echo "Error. Applicant ID does not exist: $applicantId";
    return false;
}

function map_people_data($applicant_data) {
    return array(
        "PSalutation" => $applicant_data["PSalutation"],
        "PersonNotes" => $applicant_data["ANotes"],
        "PersonFN" => $applicant_data["fName"],
        "PersonMN" => $applicant_data["mName"],
        "PersonLN" => $applicant_data["lName"],
        "PersonGenQual" => $applicant_data["AGenQual"],
        "PEmail" => $applicant_data["AEmail"],
        "PCounty" => $applicant_data["ACounty"],
        "PZone"  => $applicant_data["AZone"],
        "PRegion" => $applicant_data["ARegion"],
        "PUrbanization" => $applicant_data["AUrbanization"],
        "PDOB" => $applicant_data["ADOB"],
        "PSSN" => $applicant_data["ASSN"],
        "PGender" => $applicant_data["PGender"]
    );
}

foreach($applicants as $i) {
    if($applicant_data = get_applicant_data($i)) {

        // Queries are being chained together since each sequential database
        // query relies on the response of the last one. 
        //
        // MARK: - Add the person to the database
        //

        $people_data = map_people_data($applicant_data);
        $people_insert_query = create_insertion_string("tblPeople", $people_data);
        $people_id = $conn->createRecord($people_insert_query);
        if($people_id != false) {

            // 
            // MARK: - Add the person as a cadet
            //

            // Data for inserting into tblCadets
            $cadets_data = array(
                "fkPersonID" => $people_id
            );
            $cadet_insert_query = create_insertion_string("tblCadets", $cadets_data);
            $cadet_id = $conn->createRecord($cadet_insert_query);
            if($cadet_id != false) {

                // 
                // MARK: - Add a person to the class
                //

                // Data for inserting into tblClassDetails
                $class_detail_data = array(
                    "fkClassID" => 1, // TEMPORARY VALUE
                    "fkCadetID" => $cadet_id,
                    "CadetStatus" => "Enrolled",
                    "CadetRosterNumber" => 1 // TEMPORARY VALUE
                );
                $class_detail_insert_query = create_insertion_string("tblClassDetails", $class_detail_data);
                if($conn->createRecord($class_detail_insert_query) != false) {
                    echo "Success";
                    $delete_query = "DELETE FROM tblApplicants WHERE applicantID=$i";
                    $conn->runDeleteQuery($delete_query);
                } else {
                    echo "Failed insertion to class details ";
                }
            } else {
                echo "Failed insertion to cadet ";
            }

        } else {
            echo "Failed insertion to people ";
        };
    }

}

?>
