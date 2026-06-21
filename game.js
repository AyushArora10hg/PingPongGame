const BALL_RADIUS = 10;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const PADDLE_OFFSET = 10;
const PADDLE_SPEED = 3.5;

var framePerSecond = 60;
var canvas;
var canvasContext;
var ballX, ballY, paddle1X, paddle1Y, paddle2X, paddle2Y;
var ballSpeedX = 5;
var ballSpeedY = 3;

var playerScore = 0 , computerScore = 0; 

var playerWon = false;
var computerWon = false;
var gameInterval;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    paddle1X = PADDLE_OFFSET;
    paddle1Y = canvas.height / 2 - PADDLE_HEIGHT / 2;
    paddle2X = canvas.width - PADDLE_OFFSET - PADDLE_WIDTH;
    paddle2Y = canvas.height / 2 - PADDLE_HEIGHT / 2;

    canvas.addEventListener('mousemove', 
        function (evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - PADDLE_HEIGHT / 3;
        });

    gameInterval = setInterval(function () {
        moveElements();
        drawCanvas();

        if (playerWon || computerWon) {
            clearInterval(gameInterval);
            alert(playerWon ? "Player won the game!" : "Computer won the game!");
        }
    }, 1000 / framePerSecond);
};

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}

function computerMovement() {
    if (ballSpeedX < 0 || (ballSpeedX > 0 && ballX < canvas.width / 4)) {
        return;
    }

    let paddleCenter = paddle2Y + PADDLE_HEIGHT / 2;
    let deadZone = 10;

    if (paddleCenter < ballY - deadZone) {
        paddle2Y += PADDLE_SPEED;
    } else if (paddleCenter > ballY + deadZone) {
        paddle2Y -= PADDLE_SPEED;
    }

    if (paddle2Y < 0) {
        paddle2Y = 0;
    }
    if (paddle2Y + PADDLE_HEIGHT > canvas.height) {
        paddle2Y = canvas.height - PADDLE_HEIGHT;
    }
}

function moveElements() {

    computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY - BALL_RADIUS < 0 || ballY + BALL_RADIUS > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballSpeedX < 0 && ballX - BALL_RADIUS <= paddle1X + PADDLE_WIDTH) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
            ballX = paddle1X + PADDLE_WIDTH + BALL_RADIUS;
            ballSpeedX = -ballSpeedX;

            let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.15;
        } else if (ballX - BALL_RADIUS < 0) {
            ballReset();
            computerScore ++;
            if (computerScore == 7){
                computerWon = true;
            }
        }
    }

    if (ballSpeedX > 0 && ballX + BALL_RADIUS >= paddle2X) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
            ballX = paddle2X - BALL_RADIUS;
            ballSpeedX = -ballSpeedX;

            let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.15;
        } else if (ballX + BALL_RADIUS > canvas.width) {
            ballReset();
            playerScore ++ ;
            if (playerScore == 7){
                playerWon = true;
            }
        }
    }
    
}

function drawCanvas() {

    drawRect(0, 0, canvas.width, canvas.height, 'black');
    console.log('Black canvas created');

    drawRect(canvas.width/2 -1, 0, 2, canvas.height, 'white');
    console.log('Centre line created');

    drawRect(paddle1X, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    canvasContext.fillText(playerScore, 100,100);
    console.log('White paddle1 created');

    drawRect(paddle2X, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    canvasContext.fillText(computerScore, canvas.width - 100, 100);
    console.log('White paddle2 created');


    drawCircle(ballX, ballY, BALL_RADIUS, 'red');
    console.log('Red ball created');

}

function drawRect(leftX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);
}

function drawCircle(centerX, centerY, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function ballReset(){
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;

    paddle1X = PADDLE_OFFSET;
    paddle1Y = canvas.height / 2 - PADDLE_HEIGHT / 2;
    paddle2X = canvas.width - PADDLE_OFFSET - PADDLE_WIDTH;
    paddle2Y = canvas.height / 2 - PADDLE_HEIGHT ;
}


