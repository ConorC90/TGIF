var loyaltyMembers;
 var url;

function loadPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loaderDiv").style.display = "block";
}

if (window.location.pathname == "/html_starter_pages/senate_party-loyalty.html") {
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
        return response.json();
    })
    .then(function (JSON) {
        var data = JSON
loadPage()
        loyaltyMembers = data.results[0].members;
        membersCount(loyaltyMembers)


        app.bottomTenLoyal = getTopTenLoyal(loyaltyMembers)
        app.topTenLoyal = getBottomTenLoyal(loyaltyMembers)



        //insert all functions that need this data into the fetch. You can only call the functions when data is retrived(feched)





    })
    .catch(function (error) {
        console.log(error)
    });



var app = new Vue({
    el: '#app',
    data: {
        party: {
            Democrat:{
                membersCount:0 ,
                membersAverage:0 ,
            },
            Republican:{
                membersCount:0 ,
                membersAverage:0 ,
            },
            Independent:{
                membersCount:0 ,
                membersAverage:0 ,
            },
            Total:{
                membersCount: 0,
                membersAverage: 0,
        
        },
        
        },
        bottomTenLoyal:[] ,
        topTenLoyal:[] ,
    }
});


var numberOfDems = []
var numberOfRep = []
var numberOfIndi = []
var totalMembers = []





function membersCount() {


    for (var i = 0; i < loyaltyMembers.length; i++) {
        if (loyaltyMembers[i].party == "D") {
            numberOfDems.push(loyaltyMembers[i])

        }
        if (loyaltyMembers[i].party == "R") {
            numberOfRep.push(loyaltyMembers[i])

        }
        if (loyaltyMembers[i].party == "I") {
            numberOfIndi.push(loyaltyMembers[i])
        }
        if (loyaltyMembers[i].push == "D" || "R" || "I") {
            totalMembers.push(loyaltyMembers[i])
        }
    }


    app.party.Democrat.membersAverage = averageAnArray(numberOfDems);
        app.party.Republican.membersAverage = averageAnArray(numberOfRep);
        app.party.Independent.membersAverage = averageAnArray(numberOfIndi)||0;
        app.party.Total.membersAverage = averageAnArray(totalMembers);


    app.party.Democrat.membersCount = numberOfDems.length
    app.party.Republican.membersCount = numberOfRep.length
    app.party.Independent.membersCount = numberOfIndi.length
    app.party.Total.membersCount = totalMembers.length




}

//membersCount(loyaltyMembers)

//-------------------------This function returns an average of the amount of votes cast by each party with their party pac

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









var totalAverage = (Math.round(averageAnArray(totalMembers)));
var republicanAverage = (Math.round(averageAnArray(numberOfRep)));
var democratAverage = (Math.round(averageAnArray(numberOfDems)));
var independentAverage = (Math.round(averageAnArray(numberOfIndi)));

//var statistic = {
//    "numberOfDems": numberOfDems,
//    "numberOfRep": numberOfRep,
//    "numberOfIndi": numberOfIndi,
//    "totalMembers": totalMembers,
//    "democratAverage": democratAverage,
//    "republicanAverage": republicanAverage,
//    "independentAverage": independentAverage,
//    "totalAverage": totalAverage,
//
//}






//--------------------------these functions return the top/bottom most loyal members


function getBottomTenLoyal(loyaltyMembers) {
    var bottomTenLoyal = [];

    var sortedLeastLoyal = loyaltyMembers.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });

    var bottomTenValue = Math.round(sortedLeastLoyal.length * 0.1);


    for (var i = 0; i < bottomTenValue; i++) {
        bottomTenLoyal.push(sortedLeastLoyal[i]);
    }


    for (var j = bottomTenLoyal.length; j < sortedLeastLoyal; j++) {

        if (sortedLeastLoyal[j].votes_with_party_pct == sortedLeastLoyal[bottomTenValue - 1].votes_with_party_pct)

            bottomTenLoyal.push(sortedLeastLoyal[j].votes_with_party_pct)
    }

    return bottomTenLoyal

}





function getTopTenLoyal(members) {

    var sortedMostLoyal = loyaltyMembers.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });

    var TopTenValue = Math.round(sortedMostLoyal.length * 0.1);


    var TopTenLoyal = [];

    for (var i = 0; i < TopTenValue; i++) {
        TopTenLoyal.push(sortedMostLoyal[i]);
    }

    for (var j = TopTenLoyal.length; j < sortedMostLoyal; j++) {

        if (sortedMostLoyal[j].votes_with_party_pct == sortedMostLoyal[TopTenValue - 1].votes_with_party_pct)
            TopTenLoyal.push(sortedMostLoyal[j].votes_with_party_pct)
    }

    return TopTenLoyal

}