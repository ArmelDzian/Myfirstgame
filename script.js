

function init(){
    var canvas = document.getElementById("myCanvas"); // html reference for the cenvas
    var ctx = canvas.getContext("2d"); // html reference for the drawing tool
    var obstacles = [];

    function getObstacle(randomizer, array){
        if(randomizer < 0.005){
            var newObstacle = { x:canvas.width, y:canvas.height/2 - 20 , height:20, width:10};
            array.push(newObstacle);
        }
    }

    getObstacle(0,obstacles);

    

    //acceleration = position change 
    var dx = 0.5;
    var playerYchange = 0;

    function draw() { // the drawing function
        ctx.clearRect(0, 0, canvas.width, canvas.height); // refresh
    
        for (var i = 0; i < obstacles.length; i++){ // obstacle drawing
            ctx.beginPath();
            ctx.rect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
            ctx.fillStyle = "#666666";
            ctx.fill();
            ctx.closePath();
        }

        ctx.beginPath(); // draws the ground line
            ctx.rect(0, canvas.height/2, canvas.width, 1);
            ctx.fillStyle = "#666666";
            ctx.fill();
        ctx.closePath();

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
        if (obstacles[obstacles.length-1].x < canvas.width-obstacles[obstacles.length-1].width){
            getObstacle(Math.random(),obstacles);
        }
    }

    setInterval(draw, 10); // drawing loop set to repeate every 10 ms
}