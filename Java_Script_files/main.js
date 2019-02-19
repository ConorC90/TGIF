//document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);

var url;

var senateMembers;


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

function loadPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loaderDiv").style.display = "block";
}

//stateDrop() //call your functions
