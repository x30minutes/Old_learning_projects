$(function(){
    //variables
        var mode = false;//App mode
        var timeCounter = 0;//time counter
        var lapCounter = 0;//lap counter
        var action;//variable for setInterval
        var lapNumber = 0;//number of laps
        var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;//minutes, seconds, centiseconds for time and lap        
    
    //On App load show start and lap buttons
    hideshowButtons("#startButton","#lapButton");
    //click on startButton
    $("#startButton").click(function(){
        //mode: on
        mode = true;
        //show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        //start counter
        startAction();
    });
    
    //click on stopButton
    $("#stopButton").click(function(){
        //show resume and reset buttons
        hideshowButtons("#resumeButton", "#resetButton");
        //stop counter
        clearInterval(action);
    });
    
    //click on resumeButton
    $("#resumeButton").click(function(){
        //show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        //start action
        startAction();
    });
        
    //click on resetButton
    $("#resetButton").click(function(){
       //reload the page
        location.reload();
    });
    
    //click on lapButton
    $("#lapButton").click(function(){
        //if mode is On
        if(mode){
            //stop action
            clearInterval(action);
            //resetLap and print lap details
            lapCounter = 0;
            addLap();
            //start action
            startAction();
        }
    });
        
    //functions
        //hideshowButtons function shows two chosen buttons
    function hideshowButtons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
    //start the counter
    function startAction(){
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 100*60*100){
                timeCounter = 0;
            }
            lapCounter++;
            if(lapCounter == 100*60*100){
                lapCounter = 0;
            }
            updateTime();
        },10);
    }
    
    //updateTime: converts counters to min, sec, centisec
    function updateTime(){
        //1min=60*100centisecond=6000centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
        //1sec=100centiseconds
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeCentiseconds = (timeCounter%6000)%100;
        $("#timeMinute").text(format(timeMinutes));
        $("#timeSecond").text(format(timeSeconds));
        $("#timeCentisecond").text(format(timeCentiseconds));
        
        //1min=60*100centisecond=6000centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
        //1sec=100centiseconds
        lapSeconds = Math.floor((lapCounter%6000)/100);
        lapCentiseconds = (lapCounter%6000)%100;
        $("#lapMinute").text(format(lapMinutes));
        $("#lapSecond").text(format(lapSeconds));
        $("#lapCentisecond").text(format(lapCentiseconds));
    }
    
    //format numbers
    function format(number){
        if(number<10){
            return '0'+number;
        }else{
            return number;
        }
    }
    
    //addLap function: print lap details inside lapTable
    function addLap(){
        lapNumber++;
        var myLapDetails = 
            '<div class="lap">'+
                '<div class="lapTimeTitle">'+
                    'Lap'+ lapNumber +
                '</div>'+
                '<div class="lapTime">'+
                    '<span>'+ format(lapMinutes) + '</span>'+
                    ':<span>'+ format(lapSeconds) + '</span>'+
                    ':<span>'+ format(lapCentiseconds) + '</span>'+
                '</div>'+
            '</div>';
        $(myLapDetails).prependTo("#lapsTable");
    }
});