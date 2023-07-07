// var player = document.querySelector(".player");

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");

  // Game state
  let isGameOver = false;

  // Player Init
  const player = document.createElement("div");
  let startPoint = 150;
  let playerBottomSpace = startPoint;
  let upTimerId;
  let downTimerId;
  let score = 0;

  // Comets
  let cometCount = 6;
  let comets = [];

  const spawnOffset = window.innerWidth * 0.1;
  const maxLeftCometSpawn = window.innerWidth - spawnOffset;
  const minLeftCometSpawn = spawnOffset;

  class Comet {
    constructor(newCometBottom) {
      this.id = Math.random();
      this.bottom = newCometBottom;
      this.left = Math.random() * window.innerWidth;
      this.visual = document.createElement("div");

      const visual = this.visual;
      visual.classList.add("comet");
      if (this.left < minLeftCometSpawn) {
        this.left = minLeftCometSpawn;
      }
      if (this.left > maxLeftCometSpawn) {
        this.left = maxLeftCometSpawn;
      }
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      grid.appendChild(visual);
    }
  }

  function createComets() {
    for (let i = 0; i < cometCount; i++) {
      let cometGap = window.innerHeight / cometCount;
      let newCometBottom = 100 + i * cometGap;
      let newComet = new Comet(newCometBottom);
      comets.push(newComet);
    }
  }

  function moveComets() {
    if (playerBottomSpace > 250) {
      comets.forEach((comet) => {
        comet.bottom -= 4;
        let visual = comet.visual;
        visual.style.bottom = comet.bottom + "px";

        if (comet.bottom < 10) {
          let firstComet = comets[0].visual;
          firstComet.classList.remove("comet");
          comets.shift();
          scorePoint();
          if (score % 20 === 0 && cometCount > 1) {
            cometCount--;
          }
          if (comets.length < cometCount) {
            // TODO: Reduce comet count as score increases
          }
          generateNewComet();
        }
      });
    }
  }

  function createPlayer() {
    grid.appendChild(player);
    player.classList.add("player");

    document.addEventListener("mousemove", function (event) {
      const playerWidth = player.offsetWidth;
      const mouseX = event.clientX;
      const playerX = mouseX - playerWidth / 2; // Calculate the left position with the offset
      player.style.left = playerX + "px";
    });
  }

  function jump() {
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(function () {
      playerBottomSpace += 20;
      player.style.bottom = playerBottomSpace + "px";
      if (playerBottomSpace > startPoint + 250) {
        fall();
        isJumping = false;
      }
    }, 20);
  }

  function fall() {
    isJumping = false;
    clearInterval(upTimerId);
    downTimerId = setInterval(function () {
      playerBottomSpace -= 8;
      player.style.bottom = playerBottomSpace + "px";
      if (playerBottomSpace <= 0) {
        gameOver();
      }
      comets.forEach((comet) => {
        currentPlayerLeftSpace = player.offsetLeft;

        if (
          playerBottomSpace >= comet.bottom &&
          playerBottomSpace <= comet.bottom + 15 &&
          currentPlayerLeftSpace + 20 >= comet.left &&
          currentPlayerLeftSpace <= comet.left + 50 &&
          !isJumping
        ) {
          startPoint = playerBottomSpace;
          explodeComet(comet);
          jump();
          isJumping = true;
        }
      });
    }, 20);
  }

  function scorePoint() {
    score++;
    let scoreDiv = document.getElementById("score");
    // add score-vibrate to div classlists
    let scoreParentDiv = document.getElementById("score-container");
    scoreParentDiv.classList.add("score-vibrate");
    scoreDiv.innerHTML = score;
    // remove score-vibrate from div classlists
    setTimeout(function () {
      scoreParentDiv.classList.remove("score-vibrate");
    }, 250);
  }

  function explodeComet(comet) {
    comet.visual.classList.add("explode");
    // increase score and remove the comet\
    scorePoint();
    comets = comets.filter((cometInArray) => {
      return cometInArray.id !== comet.id;
    });
    generateNewComet();

    setTimeout(function () {
      comet.visual.classList.remove("explode");
      comet.visual.remove();
      // remove comet from array where cometInArray.left === comet.left
    }, 250);

    // remove comet from dom
  }
  // TODO Set falling velocity to include gravity

  function generateNewComet() {
    let newComet = new Comet(600);
    comets.push(newComet);
  }

  function gameOver() {
    isGameOver = true;
    while (grid.firstChild) {
      console.log("remove");
      grid.removeChild(grid.firstChild);
    }
    grid.innerHTML = score;
    isGameOver = true;
    clearInterval(upTimerId);
    clearInterval(downTimerId);

    createStartButton();
  }

  function createStartButton() {
    let startButton = document.createElement("button");
    startButton.innerHTML = "Start";
    startButton.classList.add("start-button");
    startButton.addEventListener("click", function () {
      window.location.reload();
    });
    grid.appendChild(startButton);
  }

  function start() {
    if (!isGameOver) {
      createComets();
      createPlayer();
      setInterval(moveComets, 20);
      jump();
    }
  }

  // attach to button
  start();
});
