
function init(){
    var gamerun = true; // control variable for the game over window
    var gameDisplayed; // control variable for the reload sequance after game over
    var nbJumps = 0;
    var score = 0;
    var bestScore = 0;
    var canvas = document.getElementById("myCanvas"); // html reference for the cenvas
    var ctx = canvas.getContext("2d"); // html reference for the drawing tool
    var obstacles = [];
    var player = {x:canvas.width/6, y:canvas.height-5 - 16, height:20, width:10};

    function getObstacle(randomizer, array){
        if(randomizer < 0.005){
            var newObstacle = { x:canvas.width, y:canvas.height-5 - 16 , height:16, width:8};
            array.push(newObstacle);
        }
    }

    getObstacle(0,obstacles); // first obstacle

    function draw(){ // display faunction
        document.getElementById("score").innerHTML = "SCORE : " + score.toString();
        document.getElementById("bestScore").innerHTML = "BEST SCORE : " + bestScore.toString();
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
            ctx.rect(0, canvas.height-5, canvas.width, 1);
            ctx.fillStyle = "#666666";
            ctx.fill();
        ctx.closePath();
    }

    //speed and acceleration
    var dx = 0.5;
    var verticalSpeedPlayer = 0;
    var gravity = 0.07;


    function loop() { // the drawing function
        if(gamerun){
            gameDisplayed = true;
            score++;
            if(score > bestScore){
                bestScore = score;
            }
            document.body.onkeydown = function(e){
                if(e.keyCode == 32){
                    if(nbJumps == 0){
                        console.log("Big jump");
                        verticalSpeedPlayer = 2.8;
                        nbJumps++;
                    }else if(nbJumps == 1){
                        console.log("Small jump");
                        verticalSpeedPlayer = 1.4;
                        nbJumps++;
                    }
                }
            }


            if (player.y + player.height >= canvas.height-5 && verticalSpeedPlayer < 0){ //player is walking or felt to the ground
                console.log("walk");
                player.y = canvas.height-5-player.height;
                verticalSpeedPlayer = 0;
                verticalAccelerationPlayer = 0;
                nbJumps=0;
                dx = 0.5;
            }else{ // player is flying or falling
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
                }else if((obstacles[i].x <= player.x + player.width) && (obstacles[i].x >= player.x) && (obstacles[i].y >= player.y) && (obstacles[i].y <= player.y+player.height)){
                    // Check for collision with the player
                    console.log("collision")
                    gamerun = false;
                }

            }

            if (obstacles[obstacles.length-1].x < canvas.width-obstacles[obstacles.length-1].width){ //if the last obstacle is clear of the canvas edge, try to generate  new one
                getObstacle(Math.random(),obstacles);
            }
            draw();

        }else{
            var container = document.getElementById('container');
            if(gameDisplayed){
                console.log(document.body.innerHTML);
                ctx.clearRect(0, 0, canvas.width, canvas.height); // refresh
                container.innerHTML = "<p> GAME OVER </p> <button id='restart'>RESTART</button>";
                score = 0;
                gameDisplayed = false;
            }else{
                document.getElementById("restart").onclick = function(){
                    container.innerHTML = '<canvas id="myCanvas"></canvas>';
                    obstacles = [];
                    getObstacle(0,obstacles);
                    player = {x:canvas.width/6, y:canvas.height-5 - 16, height:20, width:10};
                    canvas = document.getElementById("myCanvas"); // html reference for the cenvas
                    ctx = canvas.getContext("2d"); // html reference for the drawing tool
                    gamerun = true;
                }
            }
        }
    }

    setInterval(loop, 10); // drawing loop set to repeate every 10 ms
}