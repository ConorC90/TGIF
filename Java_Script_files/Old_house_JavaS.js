//document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);


var members = data.results[0].members;
var mName = (data.results[0].members[0].middle_name);
var sName = (data.results[0].members[0].last_name);
var party = (data.results[0].members[0].party);
var state = (data.results[0].members[0].state);
var seniority = (data.results[0].members[0].seniority);
var votes = (data.results[0].members[0].votes_with_party_pct);
var URL = (data.results[0].members[0].url);
var data = (data)
var fName = (data.results[0].members[0].first_name.link(URL));

var linkedNames = (fName.link(URL));








var independentParty = document.getElementById("independent");
var democratParty = document.getElementById("democrat");
var republicanParty = document.getElementById("republican");


//you need to call this function when the dropdown is active not just the buttons --- You added the same attribute as the tick boxes
function boxIsClicked() {
    tickedMembers = []

    for (i = 0; i < members.length; i++) {

        if (members[i].party == "R" && republicanParty.checked && (stateDropDown.value == "All States" || stateDropDown.value == members[i].state)) {
            tickedMembers.push(members[i])
        }
        if (members[i].party == "D" && democratParty.checked && (stateDropDown.value == "All States" || stateDropDown.value == members[i].state)) {
            tickedMembers.push(members[i])
        }
        if (members[i].party == "I" && independentParty.checked && (stateDropDown.value == "All States" || stateDropDown.value == members[i].state)) {
            tickedMembers.push(members[i])
        }
        if (!republicanParty.checked && !democratParty.checked && !independentParty.checked && (stateDropDown.value == "All States" || stateDropDown.value == members[i].state)) {
            tickedMembers.push(members[i])
        }
        if (republicanParty.checked && democratParty.checked && independentParty.checked && (stateDropDown.value == "All States" || stateDropDown.value == members[i].state)) {} //This works but i do not understand why I don´t have to say "var tickedMembers = members" for this line

    }

    console.log(tickedMembers);
 
    stateFilter(tickedMembers)
   
}



function stateFilter(tickedMembers) {
    var StateAndPartyFilter = [];
    for (i = 0; i < tickedMembers.length; i++)
    {
        if (stateDropDown.value == tickedMembers[i].state);
        StateAndPartyFilter.push(tickedMembers[i]);
    }

    createMyTable(StateAndPartyFilter); //this line allows you to use the var tickedMembers in the function createMyTable
}



function createMyTable(filteredMembers) {

    var myTable = document.getElementById("myTbody");
    myTable.innerHTML = "";
    for (var i = 0; i < filteredMembers.length; i++) {

        var row = document.createElement("tr");

        row.insertCell().innerHTML = filteredMembers[i].first_name;

        row.insertCell().innerHTML = filteredMembers[i].middle_name;
        row.insertCell().innerHTML = filteredMembers[i].last_name;
        row.insertCell().innerHTML = filteredMembers[i].party;
        row.insertCell().innerHTML = filteredMembers[i].state;
        row.insertCell().innerHTML = filteredMembers[i].seniority;
        row.insertCell().innerHTML = filteredMembers[i].votes_with_party_pct;

        myTable.append(row); //you need to append in order to stick them together

    }
}

createMyTable(members);



function orderedStates(anArray) {
    var uniqueStates = [];
    for (i = 0; i < members.length; i++) {
        if (!uniqueStates.includes(members[i].state)) {
            uniqueStates.push(members[i].state);
        }
    }
    return uniqueStates.sort();

}
//You don't know how to use the var uniqueStates in a different function. So you cheated and made a seperate var for all the states - shame on you-

var statesInOrder = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"]

function stateDrop(numbers) {

    var stateDropItems = document.getElementById("stateDropDown");

    for (var i = 0; i < statesInOrder.length; i++) {

        var option = document.createElement('option')
        option.setAttribute("value", statesInOrder[i]) // Mireia showed you how to use the setAttribute function, it saves alotof lines of code

        option.append(statesInOrder[i]);

        stateDropItems.append(option)

        //do not forget to call your function and to append

    }

}
stateDrop(statesInOrder) //call your functions
