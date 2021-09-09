document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const scoreDisplay = document.querySelector('span');
  const startBtn = document.querySelector('.start');

  const width = 10;
  let currenIndex = 0 // So first div in out grid
  let appleIndex = 0  // So first div in out grid
  let currenSnake = [2, 1, 0] // 2 => snake head and all one => snake tail

  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  // to startm and restart the game
  function startGame() {
    currenSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 500;
    currenSnake = [2, 1, 0];
    currentIndex = 0;
    currenSnake.forEach(index => squares[index].classList.add('snake'));
    interval = setInterval(moveOutcomes, intervalTime);
  }


  // function that deals with all the ove outcomes of the snake
  function moveOutcomes() {
    // deals with snake hitting border and snake hitting self
    if(
      (currenSnake[0] + width >= (width * width) && direction === width) ||
      (currenSnake[0] % width === width -1 && direction === 1) ||
      (currenSnake[0] % width === 0 && direction === -1) ||
      (currenSnake[0] - width < 0 && direction === -width) ||
      squares[currenSnake[0] + direction].classList.contains('snake')
     ){
      return clearInterval(interval)
    }

    const tail = currenSnake.pop();
    squares[tail].classList.remove('snake');
    currenSnake.unshift(currenSnake[0] + direction);


    // deal with snkae getting apple
    if(squares[currenSnake[0]].classList.contains('apple')) {
      squares[currenSnake[0]].classList.remove('apple');
      squares[tail].classList.add('snake');
      currenSnake.push(tail);
      randomApple()
      score++
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }
  squares[currenSnake[0]].classList.add('snake');
  
  
  }
//generate new apple once apple is eaten
function randomApple() {
  do{
    appleIndex = Math.floor(Math.random() * squares.length)
  } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
  squares[appleIndex].classList.add('apple')
}

  // Assign funcitons to keycodes
  function control(e) {
    squares[currenIndex].classList.remove('snake');

    if(e.keyCode === 39) {
      direction = 1;
    }else if(e.keyCode === 38) {
      direction = -width;
    }else if(e.keyCode === 37) {
      direction = -1;
    }else if(e.keyCode === 40) {
      direction = +width;
    }
  }

  document.addEventListener('keyup', control);
  startBtn.addEventListener('click', startGame)
});
