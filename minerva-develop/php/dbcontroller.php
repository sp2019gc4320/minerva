<?php
// File: dbcontroller.php
// Use by all php files to access database
//
class DBController {

     ///Needs to be changed based on hosting conditions.
	private $host = "localhost";
	private $user = "root";
	private $password = "";
	private $database = "minerva";
	private $conn; 

    /*
	private $host = "localhost";
	private $user = "s93gccodec";
	private $password = "CSCI4320_A";
	private $database = "s93gccodec_minerva_sp2019";
     */

	/*
		///Needs to be changed based on hosting conditions.
    	private $host = "localhost";
    	private $user = "s92gccodec";
    	private $password = "CSCI4320";
    	private $database = "s92gccodec_minerva3";
    	private $conn;
	*/
	function __construct() {
		$this->conn = $this->connectDB();
	}
	
	function connectDB() { //Used to establish the connection between the client and server.
		$conn = mysqli_connect($this->host,$this->user,$this->password,$this->database);
		return $conn;
	}
	
	function createRecord($query) //Used to create a record - display object with id of value inserted
	{
		$conn = mysqli_connect($this->host,$this->user,$this->password,$this->database);
		if($conn->query($query) == TRUE) {

            $last_id = $conn->insert_id;
            //show the id of the record
			echo '{ "id":'. $last_id. ', "status":"New record(s) created successfully"}';
			return $last_id;
		} 
		else {
		    echo '{"status": "error", "statusText":"Error: ' . $query. ' - ' . $conn->error.'"}';
		    return false;
		}
	}

    function runSelectQuery($query) //Used to run a select query
    {
         $result = mysqli_query($this->conn,$query);
         return $result;
    }

    function sanitize($str) // used to sanitize string
    {
       $safe_str =  mysqli_real_escape_string($this->conn, $str);

      // $safe_str = $mysqli->real_escape_string($str);

       return $safe_str;
    }

   function runSelectQueryArray($query) //Used to run a select query and return array of rows
    {
        //echo $query;
         $result = mysqli_query($this->conn,$query);
         $result_array = array();

         if ($result->num_rows > 0) {
           $count = 0;
           while ($row = $result->fetch_assoc()) {
               $temp = $row;

               //convert escape sequences to proper html code.
               //foreach field convert to html code  htmlentities($str, ENT_QUOTES, "UTF-8");
               foreach($temp as $key=> $value)
               {
                   $temp[$key] = $this->sanitize($value);
                   $temp[$key] = htmlentities($value, ENT_QUOTES, "UTF-8");
               }
                $result_array[] = $temp;
              }
           }

         return $result_array;  //returns an empty array if error
     }

     //does not convert to html code
    function runSelectQueryArrayNotEncoded($query) //Used to run a select query and return array of rows
    {
        $result = mysqli_query($this->conn,$query);
        $result_array = array();

        if ($result->num_rows > 0) {
            $count = 0;
            while ($row = $result->fetch_assoc()) {
                $temp = $row;

                //convert escape sequences to proper html code.
                //foreach field convert to html code  htmlentities($str, ENT_QUOTES, "UTF-8");
                foreach($temp as $key=> $value)
                {
                    //$temp[$key] = $this->sanitize($value);
                    //$temp[$key] = htmlentities($value, ENT_QUOTES, "UTF-8");

                    $temp[$key] = $value;
                }
                $result_array[] = $temp;
            }
        }

        return $result_array;  //returns an empty array if error
    }

    function runDeleteQuery($query) //Used to run a select query
     {
           $result = mysqli_query($this->conn,$query);

            if ($result === TRUE) {
                echo '{"status": "ok", "statusText": "Record deleted successfully"}';
                return true;
            } else {
                echo '{"status": "error", "statusText":"Error deleting record: ' . $conn->error.'"}';
                return false;
            }
       }

	function runQuery($query) { //Used to run an inserted query to the server
		$result = mysqli_query($this->conn,$query);
		if($result == false) {
			return false;
		}
		if($result === true) {
			return true;
		}
		while($row=mysqli_fetch_assoc($result)) {
			$resultset[] = $row;
		}		
		if(!empty($resultset))
			return $resultset;
	}
	
	function numRows($query) { //Checks to see if there are any records that meet the query inputted
		$result  = mysqli_query($this->conn,$query);
		if ($result)
		{
			$rowcount = mysqli_num_rows($result);
		}
		else
		{
			$rowcount = false;
		}
		return $rowcount;	
	}

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


    function display($result, $fields)
    {
        //$result is an array, num_rows provides length of array
        if ($result->num_rows > 0)
        {
             $count=0;

            //Create JSON object
            while($row = $result->fetch_assoc()) {
                //display comma
                if ($count >0 )
                    echo ",";
                echo  $this->makeObject($row, $fields);
                $count = $count+1;
            }
        }
    }
}
// in prap_gettCadetClassDetails.php originally would print an empty string because not all of the data
// was utf8 encoded. This fixes an array to have utf8 encoding.
// https://stackoverflow.com/questions/19361282/why-would-json-encode-return-an-empty-string
// This code is placed in app.config, a more global file, in case other files encounter the
// same issue.
function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        return utf8_encode($d);
    }
    return $d;
}

?>
