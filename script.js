
function init(){
    var click = false;
    var canvas = document.getElementById("myCanvas"); // html reference for the cenvas
    var ctx = canvas.getContext("2d"); // html reference for the drawing tool
    var obstacles = [];
    var player = {x:canvas.width/6, y:canvas.height/2 - 16, height:16, width:8}

    function getObstacle(randomizer, array){
        if(randomizer < 0.005){
            var newObstacle = { x:canvas.width, y:canvas.height/2 - 20 , height:20, width:10};
            array.push(newObstacle);
        }
    }

    getObstacle(0,obstacles); // first obstacle

    //speed and acceleration
    var dx = 0.5;
    var verticalSpeedPlayer = 0;
    var gravity = 0.07;


    function draw() { // the drawing function
        ctx.clearRect(0, 0, canvas.width, canvas.height); // refresh
    
        for (var i = 0; i < obstacles.length; i++){ // obstacle drawing
            ctx.beginPath();
            ctx.rect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
            ctx.fillStyle = "#666666";
            ctx.fill();
            ctx.closePath();
        }

        ctx.beginPath(); // player drawing
        ctx.rect(player.x, player.y, player.width, player.height);
        ctx.fillStyle = "#cc0000";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath(); // draws the ground line
            ctx.rect(0, canvas.height/2, canvas.width, 1);
            ctx.fillStyle = "#666666";
            ctx.fill();
        ctx.closePath();

        document.body.onkeyup = function(e){
            if(e.keyCode == 32){
                console.log("jump");
                verticalSpeedPlayer = 3;
            }
        }


        if (player.y + player.height >= canvas.height/2 && verticalSpeedPlayer < 0){
            console.log("walk");
            player.y = canvas.height/2-player.height;
            verticalSpeedPlayer = 0;
            verticalAccelerationPlayer = 0;
            dx = 0.5;
        }else{
            player.y -= verticalSpeedPlayer;
             verticalSpeedPlayer -= gravity; 
            dx = 1;
        }

        for (var i = 0; i < obstacles.length; i++){ // obstacle position update
            obstacles[i].x -= dx;
            if (obstacles[i].x-obstacles[i].width < 0){ // delete the obstacle which passes over the left border of the canvas
                if(obstacles.length <= 1){
                    getObstacle(0,obstacles);
                } 
                obstacles.splice(i,1);
                i--;
            }
        }

        if (obstacles[obstacles.length-1].x < canvas.width-obstacles[obstacles.length-1].width){ //if the last obstacle is clear of the canvas edge, try to generate  new one
            getObstacle(Math.random(),obstacles);
        }
    }

    setInterval(draw, 10); // drawing loop set to repeate every 10 ms
}