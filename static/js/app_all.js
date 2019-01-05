// from data.js
var tableData = data;
//select the submit button
var submit = d3.select("#filter-btn");

// Use D3 to select the table
var table = d3.select("table");

// Use D3 to select the table body
var tbody = d3.select("tbody");

//Loop through the array of data and build the entire table body from scratch.  This will allow us to see what data is available for searching. 

tableData.forEach((data) => {
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

    // //filter the data
    // var filteredData = tableData.filter(tableData => tableData.datetime === inputValuedate);

    // I found this looping technique at https://github.com/halshing/Playground/blob/master/ArrayOfObjectsFilter/Filter.js and thought it might work well. 

    Array.prototype.flexFilter = function(info) {
  
        // Set our variables
        var matchesFilter, matches = [], count;
        
        // Helper function to loop through the filter criteria to find matching values
        // Each filter criteria is treated as "AND". So each item must match all the filter criteria to be considered a match.
        // Multiple filter values in a filter field are treated as "OR" i.e. ["Blue", "Green"] will yield items matching a value of Blue OR Green.
        matchesFilter = function(item) {
          count = 0
          for (var n = 0; n < info.length; n++) {
            if (info[n]["Values"].indexOf(item[info[n]["Field"]]) > -1) {
              count++;
            }
          }
          // If TRUE, then the current item in the array meets all the filter criteria
          return count == info.length;
        }
      
        // Loop through each item in the array
        for (var i = 0; i < this.length; i++) {
          // Determine if the current item matches the filter criteria
          if (matchesFilter(this[i])) {
            matches.push(this[i]);
          }
        }
      
        // Give us a new array containing the objects matching the filter criteria
        return matches;
      }

    // array with the values to filter
    var criteria = [
        {Field: "datetime", Values: inputValuedate},
        {Field: "city", Values: inputValuecity},
        {Field: "state", Values: inputValuestate},
        {Field: "country", Values: inputValuecountry},
        {Field: "shape", Values: inputValueshape}
    ];
  
    // filter the products array by inputs
    // NOTE:  THIS TECHNIQUE WILL ONLY RETURN A LINE THAT ALL THE ENTRY CRITERIA MATCH

    var filteredData = tableData.flexFilter(criteria);
    
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

});


//Using multiple input tags and/or select dropdowns, write JavaScript code so the user can to set multiple filters and search for UFO sightings using the following criteria based on the table columns:

//city
//state
//country
//shape