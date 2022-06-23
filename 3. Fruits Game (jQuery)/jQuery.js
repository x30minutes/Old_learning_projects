var playing = false;
var score = 0;
var trialsLeft;
var step;
var interval = 10;
var action; //used for setInterval
var fruits = ['apple', 'blackberry', 'orange', 'pear', 'pineapple'];


$(function(){
    //click on start/reset button
   $("#startreset").click(function(){
       //check if we are playing
       if(playing == true){
            //reload page
           location.reload();
        }else{
            //hide gameOver box after reset
            $("#gameOver").hide();
            //we are not playing
            playing = true; //game initiated
            //set score to 0
            score = 0;
            $("#scorevalue").html(score);
            //change button text to "reset game"
            $("#startreset").html("Reset Game");
             //show trialsleft box
            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts();
            //1.create random fruit
            startAction();
        }
   });
    
    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score); //update score
//        document.getElementById("sliceSound").play();
        $("#sliceSound")[0].play(); //play sound
        //stop fruit
        clearInterval(action);
        
        //hide fruit through animation
        $("#fruit1").hide("explode", 500); //slicing the fruit
        
        //send new fruit
        setTimeout(startAction, 500);
    });
    


    

//slice a fruit
    //play sound
    // score+=1

    function addHearts(){
        $("#trialsLeft").empty();
        for(i = 0; i < trialsLeft; i++){
            $("#trialsLeft").append('<img src="images/heart.png" class="life">');
        }
    }

    function startAction(){
        //generate a fruit
        generateFruit();

        action = setInterval(function(){
             //move fruit down by one step every 10ms
            $("#fruit1").css('top', $("#fruit1").position().top + step);

            //check if fruit is too low
            if($("#fruit1").position().top > $("#fruitsContainer").height()){
                //check if we have any trials left
                if(trialsLeft > 1){
                    //generate a fruit
                   generateFruit();
                    //reduce trials by one
                    trialsLeft--;
                    //change trials left box
                    addHearts();
                }else{ //game over
                    playing = false; //end of the game
                    $("#startreset").html("Start Game"); //change button to start game
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }
        }, interval);

    }
    //generate a random fruit

    function chooseFruit(){
        $("#fruit1").attr('src', 'images/' + fruits[Math.floor(5*Math.random())] +'.png');
    }

    function generateFruit(){
        //generate a fruit
        $("#fruit1").show();
        chooseFruit(); //choose a random fruit
        $("#fruit1").css({'left' : Math.round(650*Math.random()), 'top' : -50}); //random position

        //generate a random step
        step = 1+ Math.round(5*Math.random())
    }

    //stop dropping fruits
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
    
    
});