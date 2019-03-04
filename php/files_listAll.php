<?php
// File: files_listAll.php
// echos a JSON  array with all logo images
//


$directory= "datas";
if(isset($_POST['directory'])){
     $directory = filter_input(INPUT_POST, 'directory');
 }
 if(isset($_GET['directory'])){
           $directory =  basename(filter_input(INPUT_GET, "directory"));
         //  echo "$_GET:  $_GET";
 }



$dir    = '..//'. $directory;
$files = scandir($dir);

echo '{ "data":[';

$length = count($files);


// output data on each row
$index = 0;

while($index < $length)
{
    //display comma
     if ($index >0 )
          echo ",";

      //format output as an object -- specify each field along with its value
     //Field names are case sensitive -- make sure they are the same as in the database
     //echo '"' .$files[$index]. '"';

     $filename = $files[$index];

    // $size= round(filesize("../datas/$filename")/1024,1);
      $size = round(filesize("$dir/$filename")/1024,1);

     if ($size > 1000)
       $sizeString = round($size/1024,1) . ' MB';
     else
       $sizeString = $size. ' KB';
     $date = date("Y-m-d", filectime("$dir/$filename"));

     echo '{ '. '"File": "'. $filename.  '", "Size":"'. $sizeString. '",  "DateAdded": "'. $date. '" }';

     //echo=  '{'. '"' .$field. '": "'.  $row[$field]. '" '. '"' .$field. '": "'.  $row[$field]. '" '. '"' .$field. '": "'.  $row[$field]. '"} ';

    ++$index;
}

echo '] }';

?>
