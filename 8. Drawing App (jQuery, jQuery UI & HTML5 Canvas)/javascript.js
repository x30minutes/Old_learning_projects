$(function(){
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
        },
    });
    
    //declare variables
    var paint = false;//paintingerasing boolean
    var paint_erase = "paint";//painting or erasing
    var canvas = document.getElementById("paint"); //get the canvas
    var context = canvas.getContext("2d"); //get the context
    var container = $("#container");//get the canvas container
    var mouse = {x:0, y:0};//mouse position
    //onload load saved work from localStorage
    if(localStorage.getItem("imgCanvas") != null){
        var img =  new Image();
        img.onload = function(){
            context.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imgCanvas");
    };
    //set drawing parameters (lineWidth, lineJoin, lineCap)
    context.lineWidth = 3;
    context.lineJoin = "round";
    context.lineCap = "round";
    //click inside container
    container.mousedown(function(event){
        paint = true;
        context.beginPath();
        mouse.x = event.pageX - this.offsetLeft;
        mouse.y = event.pageY - this.offsetTop;
        context.moveTo(mouse.x,mouse.y);
    });
    //move the mouse while holding mouse key
    container.mousemove(function(event){
        mouse.x = event.pageX - this.offsetLeft;
        mouse.y = event.pageY - this.offsetTop;
        if(paint){
            if(paint_erase == "paint"){
                //get color input
                context.strokeStyle = $("#paintColor").val();
            }else{
                //white color
                context.strokeStyle = "white";
            }
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
        }
    });
    //mouse up -> we are not paintingerasing anymore
    container.mouseup(function(){
        paint = false;
    })
    //if we leave the container we are not paintingerasing anymore
    container.mouseleave(function(){
        paint = false;
    })
    //click on the reset button
    $("#reset").click(function(){
        context.clearRect(0,0,canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    //click on save button
    $("#save").click(function(){
       if(typeof(localStorage) != null){
           localStorage.setItem("imgCanvas", canvas.toDataURL());
//           window.alert(localStorage.getItem("imgCanvas"));
       }else{
           window.alert("Your browser does not support local storage!")
    } 
    });
    //click on the erase button
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";
        }else{
            paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");
    });
    //change color input
    $("#paintColor").change(function(){
        $("#circle").css("background-color", $(this).val());
    });
    //change lineWidth using slider
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            context.lineWidth = ui.value;
        },
    });
});