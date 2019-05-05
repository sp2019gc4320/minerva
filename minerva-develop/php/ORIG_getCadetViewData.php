<?php
// File: getCadetViewData.php
// Receives a [fkCadetID] and returns information about the Cadet
// Used by
//    find-cadet.controller.js
//    cadet-helper.controller

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

echo '{ "data":[';

if(isset($_POST['fkCadetID'])){

    $fkCadetID = filter_input(INPUT_POST, "fkCadetID");

//Create Field List

$fields = "SiteId, SiteName, SiteCode, SiteAddress, SiteCity, SiteState, SiteZip";
$fields = $fields . ", SitePhone, SiteFax, SchoolType, StartingNGB, USDASchoolLunch, StudentGovt";
$fields = $fields . ", BackGroundChkSrc, DefaultTABEVers, UnionsCount, Sec501c3AltFunding, Sec501c3Foundation, RequireSSN";
$fields = $fields . ", SiteLogo, LegislatorLink";

$fields = "PGender, PDOB, PersonFN, PersonLN";

$sql= "SELECT tblClassDetails.fkCadetID, tblMentorPotential.fkClassDetailID, tblMentorPotential.fkMentorID, tblPeople.PersonFN, tblPeople.PersonLN FROM tblClassDetails INNER JOIN ((tblPeople INNER JOIN tblMentors ON tblPeople.PersonID = tblMentors.fkPersonID) INNER JOIN tblMentorPotential ON tblMentors.MentorID = tblMentorPotential.fkMentorID) ON tblClassDetails.ClassDetailID = tblMentorPotential.fkClassDetailID WHERE (((tblClassDetails.fkCadetID)='".$fkCadetID. "'))";

$sql = "SELECT tblCadets.CadetID, tblPeople.PersonID, tblPeople.PersonFN, tblPeople.PersonLN, tblPeople.PDOB, tblPeople.PGender, tblCadets.fkPersonID FROM tblPeople INNER JOIN tblCadets ON tblPeople.[PersonID]=tblCadets.[fkPersonID] WHERE (((tblCadets.CadetID)='".$fkCadetID. "'))";

$sql = "SELECT tblCadets.CadetID, tblPeople.PersonID, tblPeople.PersonFN, tblPeople.PersonLN, tblPeople.PDOB, tblPeople.PGender, tblCadets.fkPersonID
       FROM tblPeople INNER JOIN tblCadets ON tblPeople.PersonID = tblCadets.fkPersonID
       WHERE  (((tblCadets.CadetID)='".$fkCadetID. "'))";
$result = $connection->runSelectQuery($sql);
//print_r($result);
//echo ' here ';

//$result is an array, num_rows provides length of array
if ($result->num_rows > 0){
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
}

echo '] }';
?>



