<div class="table minerva-table">
    <style>
        h2 {color:white; background-color: #000080}
    </style>
    <form name="viewS2C" class="form-inline" id="adminViewS2C">
        <div>
            <table class="table minerva-table">
                <thead>
                <tr>
                    <th>Service to Community</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tr>
                    <th>AutoID</th>
                    <th>Service Site</th>
                    <th>Description</th>
                    <th>Reporting Code</th>
                    <th>Status</th>
                    <th>Site ID</th>
                </tr>
                <tbody>
                <?php
                require_once("../../php/dbcontroller.php");

                $conn = new DBController();

                $query = "SELECT `AutoID`, `ServiceSite`, `ServiceSiteDesc`, `ReportingCode`, `IsActive`, `fkSiteID` FROM `tlkpservicesite` WHERE 1";

                $result = $conn->runSelectQuery($query);
                if(!$result)die("Fatal error from query");

                while($row = $result->fetch_assoc())
                {
                    ?>
                    <tr>
                        <td><?php echo $row['AutoID']?></td>
                        <td><?php echo $row['ServiceSite']?></td>
                        <td><?php echo $row['ServiceSiteDesc']?></td>
                        <td><?php echo $row['ReportingCode']?></td>
                        <td><?php echo $row['IsActive']?></td>
                        <td><?php echo $row['fkSiteID'] ?><br></td>
                    </tr>
                    <?php
                }
                ?>
                </tbody>
            </table>
        </div>
    </form>

    <form  action="../../php/admin_addS2C.php">
        <table class="table minerva-table">
            <thead>
            <tr>
                <th>Add Service to Community</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tr>
                <th>Service Site</th>
                <th>Site Description</th>
                <th>Reporting Group</th>
                <th>Active</th>
                <th>Site ID</th>
            </tr>
            <tr>
                <td><input type="text"  name="serviceSite" required></td>
                <td><input type="text" name="siteDescript"></td>
                <td><input type="text" name="reportGroup"></td>
                <td><input type="checkbox" name="isActive" value="1" align="middle"></td>
                <td><input type="number" name="siteID"</td>

            </tr>
        </table>
        <input type="submit" value="Submit">
    </form>
</div>
