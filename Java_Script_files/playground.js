function indexText(){
    document.getElementById("indexButton").style.display = "none";
    document.getElementById("showTextOnClick").style.display ="block";
    document.getElementById("indexButton2").style.display ="block";
}

function indexText2(){
    document.getElementById("indexButton").style.display = "block";
    document.getElementById("showTextOnClick").style.display ="none";
    document.getElementById("indexButton2").style.display ="none";
    document.getElementById("indexButton").className="animate-bottom btn btn-info"
}