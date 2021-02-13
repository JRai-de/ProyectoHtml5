
//Aqui dejaremos las variables ya declaradas e iniciadas.
var canvas = document.getElementById("myCanvas");//Conecta con el juego en el  archivo HTML
var ctx = canvas.getContext("2d");//Indica si el diseño será en 2D O 3D
var ballRadius = 10;//Bola tamaño
var x = canvas.width / 2;//tamaño
var y = canvas.height - 30;//tamaño
var dx = 2;//tamaño
var dy = -2;//tamaño
var paddleHeight = 10;//tamaño alto
var paddleWidth = 75;//tamaño ancho
var paddleX = (canvas.width - paddleWidth) / 2; //tamaño divido entre dos
var rightPressed = false;//Presion declarado a falso
var leftPressed = false;//Presion declarado a falso
var brickRowCount = 5;//Colisiones
var brickColumnCount = 3;//Columna
var brickWidth = 75;//
var brickHeight = 20;//
var brickPadding = 10;//Relleno
var brickOffsetTop = 30;//
var brickOffsetLeft = 30;//
var score = 0;//Inicio de puntuacion
var lives = 10;//Inicio de vida

var bricks = [];//Variable Bricks
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);//permite movimiento 
document.addEventListener("keyup", keyUpHandler, false);//permite movimiento 
document.addEventListener("mousemove", mouseMoveHandler, false);//permite movimiento  mouse

function keyDownHandler(e) { //permite movimiento abajo
    if (e.code == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.code == 'ArrowLeft') {
        leftPressed = true;
    }
}
function keyUpHandler(e) {//permite movimiento arriba
    if (e.code == 'ArrowRight') {
        rightPressed = false;
    }
    else if (e.code == 'ArrowLeft') {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {//Mouse evento
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
function collisionDetection() {//Detector de colisiones
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATS!");//Evento de ganador
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawBall() {//Bola
    ctx.beginPath();//Comienzo
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);//tamaño
    ctx.fillStyle = "#A411C1";//Color
    ctx.fill();
    ctx.closePath();//Cierre
}
function drawPaddle() {//Rectangulo
    ctx.beginPath();//Comienzo
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);//Tamaño
    ctx.fillStyle = "#A411C1";//Color
    ctx.fill();
    ctx.closePath();//Cierre
}
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);//
                ctx.fillStyle = "#A411C1";//Color
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";//Tamaño y tipografia de letra
    ctx.fillStyle = "#A411C1";//Color
    ctx.fillText("Puntos: " + score, 8, 20);//Puntos
}
function drawLives() {
    ctx.font = "16px Arial";//Tamaño y tipografia de letra
    ctx.fillStyle = "#A411C1";//Color
    ctx.fillText("Vidas: " + lives, canvas.width - 65, 20);//Vidas
}

function draw() {
    //Dibujado de los eventos ya formados anteriormente
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {//Sucesos
        dx = -dx;
    }
    if (y + dy < ballRadius) {////Sucesos
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {//Sucesos
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;//Conteo de vidas
            if (!lives) {
                alert("GAME OVER");//Juego Perdido
                document.location.reload();
            }
            else {//Sucesos
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);//Animacion
}

draw();