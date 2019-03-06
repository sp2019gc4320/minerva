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

//Create connection
$connection = new DBController();

//Create JSON Element with a field named value: that contains an array of JSON objects
echo '{ "data":[';

//Create Field List

//Edit PGender, PDOB added to fields and first sql statement, this gets the gender and dob from the database to be used in the citizenship tab
$fields = "PersonFN, PersonLN, fkClassID, CadetRosterNumber, fkCadetID, fkMentorID, PGender, PDOB";
$sql = "SELECT tblPeople.PersonID, tblPeople.PersonFN, tblPeople.PersonLN, tblClassDetails.fkCadetID, tblClassDetails.ClassDetailID, tblClassDetails.fkClassID, tblClassDetails.CadetRosterNumber, tblMentorPotential.fkMentorID, tblPeople.PGender, tblPeople.PDOB";
$sql =  $sql." FROM tblMentorPotential RIGHT JOIN (tblPeople INNER JOIN (tblCadets INNER JOIN tblClassDetails ON tblCadets.CadetID = tblClassDetails.fkCadetID) ON tblPeople.PersonID = tblCadets.fkPersonID) ON tblMentorPotential.fkClassDetailID = tblClassDetails.ClassDetailID";

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





