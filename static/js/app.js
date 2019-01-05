// from data.js
var tableData = data;
//select the submit button
var submit = d3.select("#filter-btn");

// Use D3 to select the table
var table = d3.select("table");

// Use D3 to select the table body
var tbody = d3.select("tbody");

//Loop through the array of data and build the entire table body from scratch.  This will allow us to see what data is available for searching. 

var allData = tableData.forEach((data) => {
    //append one table row per sighting
    var row = tbody.append("tr");
    Object.entries(data).forEach(([key,value]) => {
        var cell = tbody.append("td");
        cell.text(value);
    });
});

//Using date form in html, script code that will listen for //events and search through the date/time column to find rows //that match user input
 
submit.on("click",function() {
    //prevent the page from refreshing
    d3.event.preventDefault();
    // what does this do?
    d3.selectAll("td").remove();

    //select the input elements and the the raw HTML nodes
    var inputElementdate = d3.select("#datetime");
    var inputElementcity = d3.select("#city");
    var inputElementstate = d3.select("#state");
    var inputElementcountry = d3.select("#country");
    var inputElementshape = d3.select("#shape");

    //get the value properties of the input elements
    var inputValuedate = inputElementdate.property("value");
    var inputValuecity = inputElementcity.property("value");
    var inputValuestate = inputElementstate.property("value");
    var inputValuecountry = inputElementcountry.property("value");
    var inputValueshape = inputElementshape.property("value");

    // console.log(filteredData);
    console.log(inputValuedate);
    console.log(inputValuecity);
    console.log(inputValuestate);
    console.log(inputValuecountry);
    console.log(inputValueshape);

    // The following filters are table additive.  As users input information in the input fields, rows containing that attribute will be returned.  It is possible for the table to contain duplicates if they input more than one attribute at a time. 
    
    //filter the data for date
    var filteredData = tableData.filter(tableData => tableData.datetime === inputValuedate);
    
        //Function to create filtered table
        function filter(filteredData) {
            console.log("Search Results:",filteredData);
            //build the new table
            // Use D3 to select the table body
            var tbody = d3.select("tbody");
            filteredData.forEach((filteredTable) => {
            //append one table row per sighting
                var row = tbody.append("tr");
            Object.entries(filteredTable).forEach(([key,value]) => {
                var cell = tbody.append("td");
                cell.text(value);
                });
            });
        }
    
    filter(filteredData);

    //filter the data for city
    var filteredData = tableData.filter(tableData => tableData.city === inputValuecity);
    filter(filteredData);
    //filter the data for state
    var filteredData = tableData.filter(tableData => tableData.state === inputValuestate);
    filter(filteredData);
    //filter the data for country
    var filteredData = tableData.filter(tableData => tableData.country === inputValuecountry);
    filter(filteredData);
    //filter the data for shape
    var filteredData = tableData.filter(tableData => tableData.shape === inputValueshape);
    filter(filteredData);

});