
// ==UserScript==
// @name       Perception Extended
// @namespace  http://hibbard.eu/
// @version    0.1
// @description  blah
// @include    http*
// @include    www*
// @exclude    https://google.*
// @copyright  2012+, hibbard.eu
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {
    var hrefs = new Array();
    var hrefForum = new Array();
    var hrefDiversity = new Array();
    var hrefIssue = new Array();
    var link = "https://www.google.ca";

    // all paragraphs
    var elements = $("p");

    var kw1=""; var kw2=""; var kw3="";var kw="";
    var fn = ["financial need","welfare","pension", "hobo", "poor", "thug", "childcare", 
    "hick","employ","dependent","malnutrition","education","corrupt","homeless","insecur","violen",
    "starv","epidemic","debt","drug","pover","emancipat", "addict","equity","equality","fairness",
    "justi","bias","stereotyp","prejudice","individual","awareness","social","politic","victim","global",
    "rights","constrovers","ghetto"]; 
    var eq= ["equity", "sex", "rape", "inappropriat", "religion","harass", "bully", "masculi","femini","gender",
    "identity","queer","binary","gay","objectif","orienta","lesbian","whore","slut","prostitute","education",
    "patriarc","ethnic","minorit","xenophobia","foreign","racial","racis","marginaliz","hostil","discrimina",
    "prejudice","lgbt", "equity","equality","fairness","justi","bias","stereotyp","prejudice","individual",
    "awareness","social","politic","victim","global","rights","constrovers","homophobia","bitch","tranny","pussy",
    "cunt","nigga","nigger","redneck","gyp","ninny","chink"]; 
    var dis = ["disabilit","impair","handicap","wheelchair","blindness","accessib","pension","autism","mental",
    "health","dyslexia","retard","illness","welfare","disease","treatment","prosthe","sick","hospital","disturb",
    "prejudice","individual","neglect","disease","abandon","treatment","sick","hospital","dement","disorder","drug",
    "violen","abuse","mental", "worthless", "equity","equality","fairness","justi","bias","stereotyp","prejudice",
    "individual","awareness","social","politic","victim","global","rights","constrovers"]; 

    var fnCount = Array.apply(null, Array(40)).map(Number.prototype.valueOf,0);
    var eqCount = Array.apply(null, Array(60)).map(Number.prototype.valueOf,0);
    var disCount = Array.apply(null, Array(51)).map(Number.prototype.valueOf,0);

    var ar = [fn, eq, dis];
    var arCount = [fnCount, eqCount, disCount];

    function find_largest(largest){    
        var kwCount1=0; var kwCount2=0; var kwCount3=0;
        var len = arCount[largest].length;
        for(var m=1; m<len; m++){
            if(arCount[largest][m]>kwCount1){
                kw3=kw2;
                kwCount3 = kwCount2;
                kw2=kw1;
                kwCount2=kwCount1;
                kw1 = ar[largest][m-1];
                kwCount1 = arCount[largest][m];
            }else if (arCount[largest][m]>kwCount2){
                kw3=kw2;
                kwCount3 = kwCount2;
                kw2 = ar[largest][m-1];
                kwCount2 = arCount[largest][m];
            }else if (arCount[largest][m]>kwCount3){
                kw3 = ar[largest][m-1];
                kwCount3 = arCount[largest][m];
            }
        }
    }
    var findSubString = function(word , ar){
        var len = ar.length;
        for(var i=0; i<len; i++){
            if(word.includes(ar[i])){
                return i;
            }
        }
    };

    function countText(text){
        var tlen = text.length;
        for(var r=0; r<tlen; r++){
            for(var n=0; n<3; n++){
                var pos = findSubString(text[r].toLowerCase(), ar[n]);
                if(pos>0){
                  arCount[n][0]++;
                  arCount[n][pos+1]++;
                }else if(pos===0){
                  arCount[n][0]++;
                }
            }
        }
    
        var topic=0;
        var count=arCount[0][0];
        for(var i=0; i<3; i++){
            if(arCount[i][0]>count){
                count = arCount[i][0];
                topic = i;
            }
        }
        if(arCount[topic][0]!=0){
            kw = ar[topic][0];
        }
        find_largest(topic);
        if(arCount[topic][0]<=10){
            return [""];
        }else {
            return [kw,kw1,kw2,kw3];
        }
    }
    //confirm(countText(["hi","right", "equity","financial need", "disabilit", "parent"]))


    var allWords = new Array();
    elements.each(function() { 

        // split each word
        var paragraph = $(this).text();
        var wordsArray = paragraph.split(" ");
        allWords = allWords.concat(wordsArray);

        //paragraph.css({ background: "#ccc", color: "blue" });

        //$.each(wordsArray,function(index,word){
        // connect each paragraph to a link
        // $(word).wrap('<a href='+link+'#q='+key1+'+'+key2+'/>');
        // });

    });

    //parse
    var keywords = countText(allWords);
    if(keywords[0]!=="" && confirm("Learn more about: "+keywords + "?")){


    // change each paragraph colour to blue
    //$("*").css({ background: "#ccc", color: "blue" });
       
    $('body').append('<input type="button" value="Search for Forums/Discussions" id="CP1">');
    $("#CP1").css("position", "fixed").css("top", 10).css("left", 3)
        .css("width", "30px");
        $("#CP1").css({ fontFamily: "Trebuchet MS, Helvetica, sans-serif", background: "#f4511e", boxShadow: "0 15px 12px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)", border: "2px solid #e7e7e7", display: "block", borderRadius: "50px", margin: "5px", textAlign: "center", fontSize: "16px", padding: "2px", width: "280px", transition: "all 0.5s", cursor: "pointer"});

    $('body').append('<input type="button" value="Search for Diversity" id="CP2">');
    $("#CP2").css("position", "fixed").css("top", 10).css("left", 290);
        $("#CP2").css({ fontFamily: "Trebuchet MS, Helvetica, sans-serif", background: "#f4511e", boxShadow: "0 15px 12px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)", border: "2px solid #e7e7e7", display: "block", borderRadius: "50px", margin: "5px", textAlign: "center", fontSize: "16px", padding: "2px", width: "190px", transition: "all 0.5s", cursor: "pointer"});

    $('body').append('<input type="button" value="Search for Issues/Problems" id="CP3">');
    $("#CP3").css("position", "fixed").css("top", 10).css("left", 488);
        $("#CP3").css({ fontFamily: "Trebuchet MS, Helvetica, sans-serif", background: "#f4511e", boxShadow: "0 15px 12px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)", border: "2px solid #e7e7e7", display: "block", borderRadius: "50px", margin: "5px", textAlign: "center", fontSize: "16px", padding: "2px", width: "250px", transition: "all 0.5s", cursor: "pointer"});


    var forumLink = link+'#q='+keywords[1]+'+'+ 'forums and discussions' +'+'+keywords[2]+'+'+keywords[3]+'+'+keywords[0];
    hrefForum.push(forumLink);

    var diversityLink = link+'#q='+keywords[1]+'+'+ 'diversity' +'+'+keywords[2]+'+'+keywords[3]+'+'+keywords[0];
    hrefDiversity.push(diversityLink);

    var issueLink = link+'#q='+keywords[1]+'+'+ 'issues and problems' +'+'+keywords[2]+'+'+keywords[3]+'+'+keywords[0];
    hrefIssue.push(issueLink);

    $('#CP1').click(function(){
        $.each(hrefForum, function(index, value) {
            setTimeout(function(){
                window.open(value);
            },1000);
        });
    });
    $('#CP2').click(function(){
        $.each(hrefDiversity, function(index, value) {
            setTimeout(function(){
                window.open(value);
            },1000);
        });
    });
    $('#CP3').click(function(){
        $.each(hrefIssue, function(index, value) {
            setTimeout(function(){
                window.open(value);
            },1000);
        });
    });

}
});
Contact GitHub API Training Shop Blog About
© 2017 GitHub, Inc. Terms Privacy Security Status Help