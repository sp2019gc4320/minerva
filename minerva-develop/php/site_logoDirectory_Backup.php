<?php
// File: site_logoDirectory.php
// echos a JSON  array with all records in Site Table
//

 function getFileList($dir)
  {
    // array to hold return value
    $retval = [];

    // add trailing slash if missing
    if(substr($dir, -1) != "/") {
      $dir .= "/";
    }

    // open pointer to directory and read list of files
    $d = @dir($dir) or die("getFileList: Failed opening directory {$dir} for reading");
    while(FALSE !== ($entry = $d->read())) {
      // skip hidden files
      if($entry{0} == ".") continue;
      if(is_dir("{$dir}{$entry}")) {
        $retval[] = [
          'name' => "{$dir}{$entry}/",
          'type' => filetype("{$dir}{$entry}"),
          'size' => 0,
          'lastmod' => filemtime("{$dir}{$entry}")
        ];
      } elseif(is_readable("{$dir}{$entry}")) {
        $retval[] = [
          'name' => "{$dir}{$entry}",
          'type' => mime_content_type("{$dir}{$entry}"),
          'size' => filesize("{$dir}{$entry}"),
          'lastmod' => filemtime("{$dir}{$entry}")
        ];
      }
    }
    $d->close();

    return $retval;
  }
/*
$dirlist = getFileList("../images/logos");
echo "<pre>",print_r($dirlist),"</pre>";


*/

$dir    = '..//images//logos';
$files = scandir($dir);

echo '{ "data":[';

$length = count($files);

/*
if ($length >0)
  echo $files[0];

for($count=1; $count< $length; ++$count)
   echo ', "' .$files[$count]. '"';
*/


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


