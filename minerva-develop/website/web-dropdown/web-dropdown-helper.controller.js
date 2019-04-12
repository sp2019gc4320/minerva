//dropdown_Ctrl2.js This is the file that will retrieve options for a specific dropdown menu -tblLookup -
//  - loads the options for the table specified in the localSetting Tablename


'use strict';

angular.module('website.webDropdown').
controller("dropdownCtrl", function($scope, $http, $window){

    $scope.getNumber = function(num, start) {
        var x =  [];
        for (var i=0; i<num; ++i)
            x.push((i+start));
        return x;

    };

    //{  structure: [{fiieldName: name, type:"VarChar", size:34}, { field structure record} ],
    //    values = [{ fieldName: val1, fieldName: val2, FieldName:Val3} , {next row}]

    var data1 = "one;two;three;four;five";
    var data2 = "apple;pear;banana;grapes;peach";
    $scope.numFields =[0,1];
    $scope.numValues = 5;

    $scope.lookupOptions=[];
    $scope.lookupOptions[0]= {};
    $scope.lookupOptions[0].value = data1.split(";");
    $scope.lookupOptions[0].id = [1,2,3,4,5];
    $scope.lookupOptions[1]= {};
    $scope.lookupOptions[1].value = data2.split(";");
    $scope.lookupOptions[1].id = [1,2,3,4,5];

    $scope.lookupFields=[];
    $scope.lookupFields[0]= {};
    $scope.lookupFields[0].fieldName="numbers";
    $scope.lookupFields[1]= {};
    $scope.lookupFields[1].fieldName="fruit";

    $scope.postUpdate = function( )
    {
        var str ="";

        for (var fNum = 0; fNum < $scope.lookupFields.length; ++fNum)
        {
            if(fNum != 0)
                str = str + "#";

            if ($scope.lookupOptions[fNum].value.length >0)
                str =  str+ $scope.lookupOptions[fNum].value[0];

            for(var i=1; i<$scope.lookupOptions[fNum].value.length; ++i)
            {
                str = str + ";"+ $scope.lookupOptions[fNum].value[i];
            }

        }

        // if($scope.lookupTable.length >0) {
        var myInfo = {TableName: $scope.lookupTable, data: str, updateRecord: true};

        $http({
            method: 'POST',
            url: "./php/lookup_update.php",
            data: Object.toparams(myInfo),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //SUCCESS
            function (result) {

                $scope.editOption = null;
                $scope.listOptions();
            },
            //ERROR
            function (result) {
                alert("error: " + result.data);
            }
        );
        // }
    };


    $scope.listOptions = function(){
        // $scope.lookupTable = "tlkpWorkStatus";
        //$scope.lookupTable = "tlkpUrbanization";
        // $scope.lookupTable = "tlkpTestSizeD";
        // $scope.lookupTable = "tlkpGrade";
        var one =  $window.localStorage.getItem("lookupTable");

        var two =  $window.sessionStorage.getItem("lookupTable");

        $scope.lookupTable =  $window.localStorage.getItem("lookupTable");

        var myRequest = {TableName: $scope.lookupTable};

        $http({
            method: 'POST',
            url: "./php/lookup.php",
            data: Object.toparams(myRequest),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            //SUCCESS function
            function(result) {
                //on success, the result has a data field "one;two;three"
                //split on semicolon
                var values = result.data.data;
                var structure = result.data.structure;

                //numbers;varchar;5#fruit;varchar;6

                $scope.lookupFields=[];
                $scope.editFields=[];
                var fieldsArray = structure.split("#");

                for(var fNum=0; fNum < fieldsArray.length; ++fNum)
                {
                    var tempArray2 = fieldsArray[fNum].split(";");
                    $scope.lookupFields[fNum] ={};
                    $scope.lookupFields[fNum].fieldName= tempArray2[0];
                    $scope.lookupFields[fNum].datatype = tempArray2[1];
                    $scope.lookupFields[fNum].size = tempArray2[2];

                    $scope.editFields.push({id:(fNum+1), value:""});

                }
                $scope.numFields = $scope.getNumber(fieldsArray.length,0);


                //one;two;three#apple;pear;grapes
                $scope.lookupOptions = [];
                $scope.myModel=[];
                var dataArray = values.split("#");
                for(var fNum = 0; fNum <dataArray.length; ++fNum) {
                    var tempArray = dataArray[fNum].split(";");
                    $scope.myModel[fNum]={};
                    $scope.myModel[fNum].value= new Array(tempArray.length);

                    $scope.lookupOptions[fNum]= {};
                    $scope.lookupOptions[fNum].value = tempArray;
                    $scope.lookupOptions[fNum].id = $scope.getNumber(tempArray.length,1);
                    $scope.numValues = tempArray.length;
                }


            },
            //ERROR function
            function(result){
                //on error, the result has a lot of different fields including status, statusText and config
                $scope.lookupError = result;
            }
        );

    };

    $scope.deleteOption = function(vNum){

        var response =  $window.confirm("Are you sure you want to delete?");
        if ((response)) {
            //remove option from lookup;
            // $scope.lookupOptions.splice($scope.lookupOptions.indexOf(option), 1);

            for (var fNum=0; fNum< $scope.lookupFields.length; ++fNum)
            {

                $scope.lookupOptions[fNum].value.splice(vNum,1);
                $scope.lookupOptions[fNum].id.splice(vNum,1);

                //$scope.lookupOptions[fNum].value = values;
            }

            $scope.numValues = $scope.numValues-1;

            $scope.postUpdate();
        }

    };

    $scope.createOption = function(option){

        //add the new option to the string
        //  $scope.lookupOptions.push({id: 1, value: option.value});
        var len = $scope.lookupOptions[0].id.length;
        var newID;
        if (len==0)
            newID = 1;
        else
            newID= $scope.lookupOptions[0].id[len-1]+1;

        for (var fNum=0; fNum< $scope.lookupFields.length; ++fNum) {
            $scope.lookupOptions[fNum].value.push($scope.editFields[fNum].value);


            $scope.lookupOptions[fNum].id.push(newID);
        }
        $scope.postUpdate();
    };
    $scope.updateOption = function(option){
        //update the value for the edited option
        for (var fNum=0; fNum< $scope.lookupFields.length; ++fNum)
        {
            $scope.lookupOptions[fNum].value[$scope.editOption.vNum] = $scope.editFields[fNum].value;
        }

        //update the data string
        $scope.postUpdate();
    };
    $scope.startEdit = function(vNum){

        $scope.editOption= {};
        $scope.editOption.id= $scope.lookupOptions[0].id[vNum];
        $scope.editOption.value = [];
        $scope.editOption.vNum = vNum;

        for (var fNum=0; fNum< $scope.lookupFields.length; ++fNum) {
            $scope.editOption.value.push($scope.lookupOptions[fNum].value[vNum]);
            $scope.editFields[fNum].value=$scope.lookupOptions[fNum].value[vNum];
        }
    };

    $scope.cancelEdit = function(){
        $scope.editOption = null;
        for (var fNum=0; fNum< $scope.lookupFields.length; ++fNum) {

            $scope.editFields[fNum].value="";

        }
    };

    $scope.emptyInput = function(){
        var isEmpty=true;
        var count=0;

        if($scope.editFields)
            for (var fNum = 0; fNum < $scope.lookupFields.length; ++fNum) {
                if ($scope.editFields[fNum].value.length == 0)
                    count++;
            }
        isEmpty = count>0;
        return isEmpty;
    };

    $scope.listOptions();
    $scope.linkEditOption=function(inputfield,fNum,vIndex)
    {
        alert("value"+ inputfield + "fnum: "+fNum + "vIndex" +vIndex);

    }


});