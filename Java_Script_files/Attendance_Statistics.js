var attendanceMembers;
var url;




if (window.location.pathname == "/html_starter_pages/senate_attendance.html") {
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
        loadPage();
        attendanceMembers = data.results[0].members;
    

        membersCount(attendanceMembers)
        //        averageAnArray()
        app.theTopTenVoters = getTopTenVoters(attendanceMembers)

        app.theBottomTenVoters = getBottomTenVoters(attendanceMembers)

        app.attendanceMembers = data.results[0].members





        //insert all functions that need this data into the fetch. You can only call the functions when data is retrived(feched)





    })
    .catch(function (error) {
        console.log(error)
    });



var app = new Vue({
    el: '#app1',
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
        theBottomTenVoters: [],
        theTopTenVoters: [],

    }
});




var numberOfDems = []
var numberOfRep = []
var totalMembers = []
var numberOfIndi = []

function membersCount(attendanceMembers) {

    for (i = 0; i < attendanceMembers.length; i++) {
        if (attendanceMembers[i].party == "D") {
            numberOfDems.push(attendanceMembers[i])

        }
        if (attendanceMembers[i].party == "R") {
            numberOfRep.push(attendanceMembers[i])

        }
        if (attendanceMembers[i].party == "I") {
            numberOfIndi.push(attendanceMembers[i])
        }
        if (attendanceMembers[i].push == "D" || "R" || "I") {
            totalMembers.push(attendanceMembers[i])
        }
    }
   app.party.Democrat.membersAverage = averageAnArray(numberOfDems);
        app.party.Republican.membersAverage = averageAnArray(numberOfRep);
        app.party.Independent.membersAverage = averageAnArray(numberOfIndi)||"0";
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
    return (sum / anArray.length).toFixed(1)


}








//-----------------------sort and filter the top/bottom precent of voters of all partys
function getTopTenVoters(attendanceMembers) {

    var sortedMostEngaged = attendanceMembers.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
    });



    var topTenValue = Math.round(sortedMostEngaged.length * 0.1);

    var topTenVoters = [];

    for (var i = 0; i < topTenValue; i++) {
        topTenVoters.push(sortedMostEngaged[i]);
    }
    for (var j = topTenVoters.length; j < sortedMostEngaged.length; j++) {

        if (sortedMostEngaged[j].missed_votes_pct == sortedMostEngaged[topTenValue - 1].missed_votes_pct)
            topTenVoters.push(sortedMostEngaged[j])
    }

    return topTenVoters

}





function getBottomTenVoters(attendanceMembers) {

    var sortedLeastEngaged = attendanceMembers.sort(function (a, b) {
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
    return bottomTenVoters
}