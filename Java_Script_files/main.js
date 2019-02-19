//document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);

var url;

var senateMembers;

function loadPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loaderDiv").style.display = "block";
}

if (window.location.pathname == "/html_starter_pages/senatePage.html") {
    url =("https://api.propublica.org/congress/v1/113/senate/members.json");
} else {
    url =("https://api.propublica.org/congress/v1/113/house/members.json");
}










fetch(url, {


        headers: {
            "X-API-Key": "OdBROvmQGdjX8RJgLwz3fs3eywG2SGeikvO35mYp"
        }

    })
    .then(function (response) {
        if(response.ok){
            return  response.json();
        }
})
    .then(function(JSON) {
    
    var data = JSON
    
    loadPage();
    senateMembers = data.results[0].members;
//    app.senateMembers = data.results[0].members;
    app.members = senateMembers //you need this to link your data
    console.log(senateMembers)
 
    orderedStates(senateMembers)
    stateDrop(senateMembers)
    boxIsClicked(senateMembers)
    stateFilter(senateMembers)
    
    
    app.filteredMembers = StateAndPartyFilter 
    
    
    })
    
    .catch(function(error){
    console.log(error)
           
           
});



var app = new Vue({  
  el: '#app',  
  data: {    
      members: [],
      filteredMembers: []
      
  }
}); 




//
//var members = data.results[0].members;
//var mName = (data.results[0].members[0].middle_name);
//var sName = (data.results[0].members[0].last_name);
//var party = (data.results[0].members[0].party);
//var state = (data.results[0].members[0].state);
//var seniority = (data.results[0].members[0].seniority);
//var votes = (data.results[0].members[0].votes_with_party_pct);
//var URL = (data.results[0].members[0].url);
//var fName = (data.results[0].members[0].first_name.link(URL));
//
//var linkedNames = (fName.link(URL));

//var tableObject{
//    firstName:
//    
//    
//}








var independentParty = document.getElementById("independent");
var democratParty = document.getElementById("democrat");
var republicanParty = document.getElementById("republican");


//you need to call this function when the dropdown is active not just the buttons --- You added the same attribute as the tick boxes
function boxIsClicked() {
    tickedMembers = []

    for (i = 0; i < senateMembers.length; i++) {

        if (senateMembers[i].party == "R" && republicanParty.checked && (stateDropDown.value == "All States" || stateDropDown.value == senateMembers[i].state)) {
            tickedMembers.push(senateMembers[i])
        }
        if (senateMembers[i].party == "D" && democratParty.checked && (stateDropDown.value == "All States" || stateDropDown.value == senateMembers[i].state)) {
            tickedMembers.push(senateMembers[i])
        }
        if (senateMembers[i].party == "I" && independentParty.checked && (stateDropDown.value == "All States" || stateDropDown.value == senateMembers[i].state)) {
            tickedMembers.push(senateMembers[i])
        }
        if (!republicanParty.checked && !democratParty.checked && !independentParty.checked && (stateDropDown.value == "All States" || stateDropDown.value == senateMembers[i].state)) {
            tickedMembers.push(senateMembers[i])
        }
        if (republicanParty.checked && democratParty.checked && independentParty.checked && (stateDropDown.value == "All States" || stateDropDown.value == senateMembers[i].state)) {} //This works but i do not understand why I don´t have to say "var tickedMembers = members" for this line

    }

//    console.log(tickedMembers);

    stateFilter(tickedMembers)

}



function stateFilter(tickedMembers) {
    var StateAndPartyFilter = [];
    
    for (i = 0; i < tickedMembers.length; i++) {
        if (stateDropDown.value == tickedMembers[i].state);
        StateAndPartyFilter.push(tickedMembers[i]);
    }
        app.filteredMembers=StateAndPartyFilter
//    createMyTable(StateAndPartyFilter); //this line allows you to use the var tickedMembers in the function createMyTable
}


//
//function createMyTable(filteredMembers) {
//
//    var myTable = document.getElementById("myTbody");
//    myTable.innerHTML = "";
//    for (var i = 0; i < filteredMembers.length; i++) {
//
//        var row = document.createElement("tr");
//        
//        //you want to display frist and middel name in one col, but empty middle name vakues return "Null"
//        // you solved this by adding a || if there is no value
//        
//
//        row.insertCell().innerHTML = (filteredMembers[i].first_name + " " + (filteredMembers[i].middle_name || "")).link(filteredMembers[i].url)
//       
//        row.insertCell().innerHTML = (filteredMembers[i].last_name);
//        row.insertCell().innerHTML = filteredMembers[i].party;
//        row.insertCell().innerHTML = filteredMembers[i].state;
//        row.insertCell().innerHTML = filteredMembers[i].seniority;
//        row.insertCell().innerHTML = filteredMembers[i].votes_with_party_pct;
//
//        myTable.append(row); //you need to append in order to stick them together
//
//    }
//}
//
////createMyTable(members);



    var uniqueStates = [];
function orderedStates(anArray) {
    for (var i = 0; i < senateMembers.length; i++) {
        if (!uniqueStates.includes(senateMembers[i].state)) {
            uniqueStates.push(senateMembers[i].state);
        }
    }
    return uniqueStates.sort();
    
    stateDrop(uniqueStates)
}

//orderedStates(members)


function stateDrop() {

    var stateDropItems = document.getElementById("stateDropDown");

    for (var i = 0; i < uniqueStates.length; i++) {

        var option = document.createElement('option')
        option.setAttribute("value", uniqueStates[i]) // Mireia showed you how to use the setAttribute function, it saves alotof lines of code

        option.append(uniqueStates[i]);

        stateDropItems.append(option)

        //do not forget to call your function and to append

    }

}
//stateDrop() //call your functions
