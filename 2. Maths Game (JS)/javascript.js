var playing = false;
var score;
var answer;
var timer;

// if we click on the start/reset button
document.getElementById("startreset").onclick=function(){
    // if we are playing
    if(playing == true){
        //reload the page
        location.reload(true);
    }
    // if we are not playing
    else{
        score = 0;
        playing = true;
        //set score to 0
        document.getElementById("scorevalue").innerHTML = score;
        //change button text to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        //show countdown box
        document.getElementById("timeremaining").style.display = 'block';
        //hide game over box
        document.getElementById("gameover").style.display = "none";
        //reduce time by 1sec every second in loops
        var counter = document.getElementById("timeremainingvalue");
        timer = 60;
        counter.innerHTML = timer;
        var myCounter = setInterval(function(){
            //check if time left
            //yes -> continue
            if(timer>1){
                timer -= 1;
                counter.innerHTML = timer;
            }
             //no -> gameover
            else{
                counter.innerHTML = 0;
                document.getElementById("gameover").innerHTML = '<p>Game Over!</p> <p>Your Score is: ' + score; 
                document.getElementById("gameover").style.display = 'block';
                document.getElementById("timeremaining").style.display = "none"
                playing = false;
                document.getElementById("startreset").innerHTML = "Start Game";
            }
        }, 1000);
        
        generateQnA();
    }
}
// if we click on answer box

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick=function(){
            // if we are playing
       if(playing == true){
          //check if answer is correct?
         //yes
         if(this.innerText == answer){
            //increase score by 1
             score++;
             document.getElementById("scorevalue").innerHTML = score;
             document.getElementById("wrong").style.display = 'none';
             document.getElementById("correct").style.display = 'block';
             setTimeout(function(){
                 document.getElementById("correct").style.display = 'none';
             },1000);
             
             //generate new question
             generateQnA();
         }//no
        else{
            document.getElementById("correct").style.display = 'none';
            document.getElementById("wrong").style.display = 'block';
            setTimeout(function(){
                document.getElementById("wrong").style.display = 'none';
            },1000)
            
        }
    }
}
}

        
        
        


    // if we are playing
        //check if answer is correct?
            //yes 
                //increase score by 1
                //show correct box for 1second
                //generate new question
            //no
                //show tryagain box for 1second

//functions
        
//generate new question & answers
function generateRandomAnswer(){
     var temp = (Math.round(Math.random()*9+1))*(Math.round(Math.random()*9+1));
    return temp;
}

function generateQnA() {
    var x, y, z;
        x = Math.round(Math.random()*9+1);
        y = Math.round(Math.random()*9+1);
        z = Math.round(Math.random()*3);
        answer = x*y;
        document.getElementById("questionbox").innerHTML = x + '*' + y;
        switch(z){
            case 0:
                document.getElementById("box1").innerHTML = answer;
                document.getElementById("box2").innerHTML = generateRandomAnswer();
                document.getElementById("box3").innerHTML = generateRandomAnswer();
                document.getElementById("box4").innerHTML = generateRandomAnswer();
                break;
            case 1:
                document.getElementById("box1").innerHTML = generateRandomAnswer();
                document.getElementById("box2").innerHTML = answer;
                document.getElementById("box3").innerHTML = generateRandomAnswer();
                document.getElementById("box4").innerHTML = generateRandomAnswer(); break;
            case 2:
                document.getElementById("box1").innerHTML = generateRandomAnswer();
                document.getElementById("box2").innerHTML = generateRandomAnswer();
                document.getElementById("box3").innerHTML = answer;
                document.getElementById("box4").innerHTML = generateRandomAnswer();
                break;
            case 3:
                document.getElementById("box1").innerHTML = generateRandomAnswer();
                document.getElementById("box2").innerHTML = generateRandomAnswer();
                document.getElementById("box3").innerHTML = generateRandomAnswer();
                document.getElementById("box4").innerHTML = answer;
                break;
            }
               
        }
