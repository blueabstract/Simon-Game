let buttonColours=["red", "blue", "green", "yellow"];
let gamePattern=[];
let userClickedPattern=[]
let level=0;
let started=false;


$(document).keydown(function(){
    if (started !=true){
        nextSequence();
        started=true;
    }
});

function nextSequence(){
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColour=buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    level++;
    $("#level-title").html(`Level ${level}`);
}

$(".btn").click(function(event){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function playSound(name){
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play()
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    //check if the most recent answer is correct
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("Correct!");

        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function() {
                userClickedPattern = []; // Reset for next level
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    level=0;
    started=0;
    gamePattern=[];
    userClickedPattern=[];
}