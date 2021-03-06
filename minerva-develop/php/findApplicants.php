<?php
// File: findAoolicants.php
// echos a JSON  array with all records in Site Table
//




require_once 'dbcontroller.php';


function makeObject($row, $fieldNames)
{
   //Create array of field names
   $fieldArray = explode(", ", $fieldNames);
   $length = count($fieldArray);
   $count = 0;
   $str = "{";

   while($count < $length)
   {
       $field = $fieldArray[$count];

        //display comma
         if ($count >0 )
             $str = $str .  ",";

             //format output as an object -- specify each field along with its value
         $str=  $str . '"' .$field. '": "'.  $row[$field]. '" ';

       ++$count;
   }
   $str = $str .  '}';

   return $str;

}

//Create WHERE clause to restrict records that are returned from server
// Currently restricts by fkSiteID, Person Name and ApplicantID
$search = "";
$criteria =[];
if (isset($_POST['PersonLN'])) {
    $str = filter_input(INPUT_POST, "PersonLN");
    $criteria[] = ("PersonLN LIKE '%$str%'");
}
if (isset($_POST['PersonFN'])) {
    $str = filter_input(INPUT_POST, "PersonFN");
    $criteria[] = ("PersonFN LIKE '%$str%'");
}
if (isset($_POST['ApplicantID'])) {
    $str = filter_input(INPUT_POST, "ApplicantID");
    $strVal = intval($str);
    $criteria[] = ("ApplicantID = %$strVal%");
}

$whereClause = "";

if ( count($criteria) >0) {
    $whereClause = "WHERE " . $criteria[0];
}
$index = 1;
while ($index < count($criteria)) {
    $whereClause =  $whereClause . " AND " . $criteria[$index];
    ++$index;
}


//Create connection
$connection = new DBController();

//Create JSON Element with a field named value: that contains an array of JSON objects
echo '{ "data":[';

//Create Field List

//Edit PGender, PDOB added to fields and first sql statement, this gets the gender and dob from the database to be used in the citizenship tab
$fields = "PersonID, PersonFN, PersonLN, ApplicantID";
$sql = "SELECT tblPeople2.PersonID, tblPeople2.PersonFN, tblPeople2.PersonLN,
               tblApplicants.ApplicantID FROM tblPeople2 INNER JOIN tblApplicants ON tblPeople2.PersonID = tblApplicants.fkPersonID $whereClause;";

$result = $connection->runSelectQuery($sql);

//$result is an array, num_rows provides length of array
if ($result->num_rows > 0)
{
    $count=0;

    //Create JSON object
    while($row = $result->fetch_assoc()) {


        //display comma
        if ($count >0 )
            echo ",";

             echo  makeObject($row, $fields);

         $count = $count+1;
    }


}

echo '] }';
?>





