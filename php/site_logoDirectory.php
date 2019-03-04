<?php
// File: site_logoDirectory.php
// echos a JSON  array with all logo images
//  Used by:
//  site-setup.component.js


$dir    = '..//images//logos';
$files = scandir($dir);

echo '{ "data":[';

$length = count($files);


function endsWith($haystack, $needle)
{
    $length = strlen($needle);
    if ($length == 0) {
        return true;
    }

    $start  = $length * -1; //negative
    return (substr($haystack, $start) === $needle);
}

// output data on each row
$count = -1;
$index = 0;

while($index < $length)
{
    $imgFile = $files[$index];

    if (endsWith($imgFile,".png") || endsWith($imgFile,".jpg") || endsWith($imgFile, ".jpeg"))
    {
          ++$count;

          //display comma
           if ($count >0 )
                echo ",";

          //format output as an object -- specify each field along with its value
          //Field names are case sensitive -- make sure they are the same as in the database
           echo '"' .$files[$index]. '"';
    }
    ++$index;
}

echo '] }';

?>


