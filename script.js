let canvas = document.querySelector('canvas');
canvas.style.backgroundColor = "#302c2c";

// getting the paintbrush
let ctx = canvas.getContext('2d');

// The DOM of the start and the restart buttons
let startBtn = document.querySelector('#start');
let restartBtn = document.querySelector('#restart');
let gameOver = false;
let intervalId = null;
let circleX = 100, circleY = 80, radius = 20;
let incrX = 1, incrY = 1;
let paddleX = 200, paddleHeight = 20, paddleWidth = 150;
let isLeft = false, isRight = false;
let score = 0;
let startAudio = new Audio('./media/Horizon_Zero_Dawn_OST_-_Years_Of_Training_badkhk.mp3')
let gameOverAudio = new Audio('./media/home_bhfqfk.mp3')

function drawPaddle() {
    ctx.beginPath();
    ctx.fillStyle = '#adf538';
    ctx.fillRect(paddleX, canvas.height - (paddleHeight + 10), paddleWidth, paddleHeight);
    ctx.closePath();
};

function drawCircle() { 
    ctx.beginPath();
    ctx.fillStyle = '#4af0bb'
    ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
};

function collision() {
    //right
    if (circleX + radius > canvas.width) {
        incrX = -incrX;
    }
    //left
    if (circleX - radius < 0) {
        incrX = -incrX; //making it positive again!!!
    }
    //bottom
    if (circleY + radius > (canvas.height - (paddleHeight + 10))) {
        if (circleX >= paddleX && circleX <= (paddleX + paddleWidth)) {
            incrY = -incrY;
            score++;
        } else {
            gameOver = true;
        }
    }
    //top
    if (circleY - radius < 0) {
        incrY = -incrY; //making it positive again!!!
    }
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.font = '22px Verdana'
    ctx.fillText(`Score: ${score}`, 30, 30);
    ctx.closePath();

    // Draw Circle
    drawCircle();
    
    // Draw Paddle
    drawPaddle();

    circleX = circleX + incrX;
    circleY = circleY + incrY;

    // Collision
    collision();

    if (gameOver) {
        cancelAnimationFrame(intervalId);
        canvas.style.display = 'none';
        restartBtn.style.display = 'block';
        startAudio.pause();
        gameOverAudio.play();
    } else {
        requestAnimationFrame(animate);
    }

    if(isRight && paddleX + paddleWidth < canvas.width) {
        paddleX += 5;
    }
    if(isLeft && paddleX > 0) {
        paddleX -= 5;
    }
};

function start() {
    canvas.style.display = 'block';
    restartBtn.style.display = 'none';
    startBtn.style.display = 'none';
    animate();
    startAudio.play();
};

 //Everything begins here
window.addEventListener('load', () => {
    canvas.style.display = 'none';
    restartBtn.style.display = 'none';
    // just to that we can build the game faster
    // you won't need to click the button everytime

    document.addEventListener('keydown', (event) => {
        if (event.code === 'ArrowRight') {
            isRight = true;
            isLeft = false;
        }
        if (event.code === 'ArrowLeft') {
            isLeft = true;
            isRight = false;  
        }
    });

    document.addEventListener('keyup', (event) => {
            isLeft = false;
            isRight = false;  
    });

    startBtn.addEventListener('click', () => {
        start();
    })

    restartBtn.addEventListener('click', () => {
        gameOver = false;
        circleX = 50;
        circleY = 50;
        score = 0;
        start();
        // do something when the user clicks the restart button
    })
});