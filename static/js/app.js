// from data.js
var tableData = data;

// YOUR CODE HERE!
// Use D3 to select the table
var table = d3.select("table");

// Use D3 to select the table body
var tbody = d3.select("tbody");

//Loop through the array of data and build the table body from scratch

tableData.forEach((data) => {
    //append one table row per sighting
    var row = tbody.append("tr");
    Object.entries(data).forEach(([key,value]) => {
        var cell = tbody.append("td");
        cell.text(value);
    });
});

console.log(tableData[0]);

//Using date form in html, script code that will listen for //events and search through the date/time column to find rows //that match user input
//select the submit button
var submit = d3.select("#filter-btn");
submit.on("click",function() {
    //prevent the page from refreshing
    d3.event.preventDefault();
    //select the input element and the the raw HTML node
    var inputElement = d3.select("#datetime");
    //get the value property of the input element
    var inputValue = inputElement.property("value");

    //console.log(tableData[0]);
    console.log(inputValue);



    //filter the data
    var filteredData = tableData.filter(tableData => tableData.datetime === inputValue);
    // console.log(filteredData);


    //     // build the new table
    // filteredData.forEach((data) => {
    //     //append one table row per sighting
    //     var row = tbody.append("tr");
    //     Object.entries(data).forEach(([key,value]) => {
    //         var cell = tbody.append("td");
    //         cell.text(value);
    //         });
    // });
});