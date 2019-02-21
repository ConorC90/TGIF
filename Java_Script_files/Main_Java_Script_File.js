var members;
var url;

var numberOfDems = []
var numberOfRep = []
var totalMembers = []
var numberOfIndi = []

var independentParty = document.getElementById("independent");
var democratParty = document.getElementById("democrat");
var republicanParty = document.getElementById("republican");




if (location.pathname.includes("senate")){
    url = ("https://api.propublica.org/congress/v1/113/senate/members.json");
} else {
    url = ("https://api.propublica.org/congress/v1/113/house/members.json");}


    






fetch(url, {

        headers: {
            "X-API-Key": "OdBROvmQGdjX8RJgLwz3fs3eywG2SGeikvO35mYp"
        }

    })
    .then(function (response) {
        return response.json();
    })
    .then(function (JSON) {
        var data = JSON
        loadPage();
        members = data.results[0].members;

        pickTheFunction()







        //insert all functions that need this data into the fetch. You can only call the functions when data is retrived(feched)





    })
    .catch(function (error) {
        console.log(error)
    });



var app = new Vue({
    el: '#app1',
    data: {
        party: {
            Democrat: {
                membersCount: 0,
                membersAverage: 0,
            },
            Republican: {
                membersCount: 0,
                membersAverage: 0,
            },
            Independent: {
                membersCount: 0,
                membersAverage: 0,
            },
            Total: {
                membersCount: 0,
                membersAverage: 0,

            },

        },
        theBottomTenVoters: [],
        theTopTenVoters: [],
        bottomTenLoyal: [],
        topTenLoyal: [],
        members: [],
        filteredMembers: []
    }
});



function pickTheFunction() {
    //functions for Loyalty pages
    if (location.pathname.includes("attendance")){
        
        membersSum(members);
        app.theTopTenVoters = getTopTenVoters(members);
        app.theBottomTenVoters = getBottomTenVoters(members);


        //functions for congress113 pages
    }
    if (location.pathname.includes("loyalty")){
        membersSum(members)
        app.bottomTenLoyal = getBottomTenLoyal(members);
        app.topTenLoyal = getTopTenLoyal(members);

        //functions for attendance pages
    }
    if (location.pathname.includes("Page")) {
        orderedStates(members)
        stateDrop(members)
        boxIsClicked(members)
        stateFilter(members)


        // functions for home_page
    }
    if (location.pathname == "/html_starter_pages/Index.html") {
        indexText()
        indexText2()

    }


}


function membersSum() {

    for (i = 0; i < members.length; i++) {
        if (members[i].party == "D") {
            numberOfDems.push(members[i])

        }
        if (members[i].party == "R") {
            numberOfRep.push(members[i])

        }
        if (members[i].party == "I") {
            numberOfIndi.push(members[i])
        }
        if (members[i].push == "D" || "R" || "I") {
            totalMembers.push(members[i])
        }
    }
    app.party.Democrat.membersAverage = averageAnArray(numberOfDems);
    app.party.Republican.membersAverage = averageAnArray(numberOfRep);
    app.party.Independent.membersAverage = averageAnArray(numberOfIndi);
    app.party.Total.membersAverage = averageAnArray(totalMembers);


    app.party.Democrat.membersCount = numberOfDems.length
    app.party.Republican.membersCount = numberOfRep.length
    app.party.Independent.membersCount = numberOfIndi.length
    app.party.Total.membersCount = totalMembers.length
    

}




function loadPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loaderDiv").style.display = "block";
}

function averageAnArray(anArray) {
    var sum = 0
    for (var i = 0; i < anArray.length; i++) {
        sum += anArray[i].votes_with_party_pct
    }
    if (isNaN(sum / anArray.length)) {
        return "0"
    } else {
        return (sum / anArray.length).toFixed(2)

    }

}





//-----------------------sort and filter the top/bottom precent of voters of all partys






function getTopTenVoters(members) {

    var sortedMostEngaged = members.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
    });


    var topTenVoters = [];

    var topTenValue = Math.round(sortedMostEngaged.length * 0.1);


    for (var i = 0; i < topTenValue; i++) {
        topTenVoters.push(sortedMostEngaged[i]);
    }
    for (var j = topTenVoters.length; j < sortedMostEngaged.length; j++) {

        if (sortedMostEngaged[j].missed_votes_pct == sortedMostEngaged[topTenValue - 1].missed_votes_pct)
            topTenVoters.push(sortedMostEngaged[j])
    }

    app.theTopTenVoters = topTenVoters
    return topTenVoters
}





function getBottomTenVoters(members) {

    var sortedLeastEngaged = members.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct;
    });

    var bottomTenValue = Math.round(sortedLeastEngaged.length * 0.1);

    var bottomTenVoters = [];

    for (var i = 0; i < bottomTenValue; i++) {
        bottomTenVoters.push(sortedLeastEngaged[i]);
    }

    for (var j = bottomTenVoters.length; j < sortedLeastEngaged; j++) {

        if (sortedLeastEngaged[j].missed_votes_pct == sortedLeastEngaged[bottomTenValue - 1].missed_votes_pct)
            bottomTenVoters.push(sortedLeastEngaged[j])


    }
    app.theBottomTenVoters = bottomTenVoters
    return bottomTenVoters

}


function getBottomTenLoyal(members) {
    var bottomTenLoyal = [];

    var sortedLeastLoyal = members.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });

    var bottomTenValue = Math.round(sortedLeastLoyal.length * 0.1);


    for (var i = 0; i < bottomTenValue; i++) {
        bottomTenLoyal.push(sortedLeastLoyal[i]);
    }


    for (var j = bottomTenLoyal.length; j < sortedLeastLoyal; j++) {

        if (sortedLeastLoyal[j].votes_with_party_pct == sortedLeastLoyal[bottomTenValue - 1].votes_with_party_pct)

            bottomTenLoyal.push(sortedLeastLoyal[j])
    }

    app.bottomTenLoyal = bottomTenLoyal;
    return bottomTenLoyal;

}






function getTopTenLoyal(members) {

    var sortedMostLoyal = members.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });
    var TopTenValue = Math.round(sortedMostLoyal.length * 0.1);


    var TopTenLoyal = [];

    for (var i = 0; i < TopTenValue; i++) {
        TopTenLoyal.push(sortedMostLoyal[i]);
    }

    for (var j = TopTenLoyal.length; j < sortedMostLoyal; j++); {

        if (sortedMostLoyal[j].votes_with_party_pct == sortedMostLoyal[TopTenValue - 1].votes_with_party_pct)
           
            TopTenLoyal.push(sortedMostLoyal[j])
    }

    app.topTenLoyal = TopTenLoyal;
    return TopTenLoyal;
}


//congress functions

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

    //    console.log(tickedMembers);

    stateFilter(tickedMembers)

}


function stateFilter(tickedMembers) {
    var StateAndPartyFilter = [];

    for (i = 0; i < tickedMembers.length; i++) {
        if (stateDropDown.value == tickedMembers[i].state);
        StateAndPartyFilter.push(tickedMembers[i]);
    }
    app.filteredMembers = StateAndPartyFilter
    //    createMyTable(StateAndPartyFilter); //this line allows you to use the var tickedMembers in the function createMyTable
}




var uniqueStates = [];

function orderedStates(anArray) {
    for (var i = 0; i < members.length; i++) {
        if (!uniqueStates.includes(members[i].state)) {
            uniqueStates.push(members[i].state);
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


//Index functions

function indexText() {
    document.getElementById("indexButton").style.display = "none";
    document.getElementById("showTextOnClick").style.display = "block";
    document.getElementById("indexButton2").style.display = "block";
}

function indexText2() {
    document.getElementById("indexButton").style.display = "block";
    document.getElementById("showTextOnClick").style.display = "none";
    document.getElementById("indexButton2").style.display = "none";
    document.getElementById("indexButton").className = "animate-bottom btn btn-info"
}
