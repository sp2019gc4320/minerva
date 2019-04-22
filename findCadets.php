<?php
// File: findCadets.php
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

//Create WHERE clause to restrict records that are returned from seraver
// Currently restricts by fkSiteID, Person Name and fkCadetID
$search = "";
$criteria =[];
if (isset($_POST['fkSiteID'])) {
   $str = filter_input(INPUT_POST,"fkSiteID");
   $criteria[]=("fkSiteID LIKE '$str'");
}
if (isset($_POST['PersonLN'])) {
    $str = filter_var(INPUT_POST, "PersonLN",FILTER_SANITIZE_STRING);
    $criteria[] = ("PersonLN LIKE '%$str%'");
}
if (isset($_POST['PersonFN'])) {
    $str = filter_var(INPUT_POST, "PersonFN",FILTER_SANITIZE_STRING);
    $criteria[] = ("PersonFN LIKE '%$str%'");
}
if (isset($_POST['fkCadetID'])) {
    $str = filter_var(INPUT_POST, "fkCadetID",FILTER_SANITIZE_NUMBER_STRING);
    $criteria[] = ("fkCadetID LIKE '%$str%'");
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
$fields = "PersonFN, PersonLN, fkClassID, CadetRosterNumber, fkCadetID, fkMentorID, PGender, PDOB, fkSiteID";
$sql = "SELECT tblPeople.PersonID, tblPeople.PersonFN, tblPeople.PersonLN, tblPeople.PGender, tblPeople.PDOB,
               tblClasses.fkSiteID, tblClasses.SiteClassNumber,
               tblClassDetails.fkCadetID, tblClassDetails.ClassDetailID, tblClassDetails.fkClassID,
               tblClassDetails.CadetRosterNumber, tblMentorPotential.fkMentorID ";
$sql =  $sql." FROM tblMentorPotential RIGHT JOIN (tblPeople INNER JOIN (tblCadets INNER JOIN (tblClassDetails INNER JOIN tblClasses ON tblClassDetails.fkClassID = tblClasses.ClassID) ON tblCadets.CadetID = tblClassDetails.fkCadetID) ON tblPeople.PersonID = tblCadets.fkPersonID) ON tblMentorPotential.fkClassDetailID = tblClassDetails.ClassDetailID
               $whereClause";

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





