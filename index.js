// var player = document.querySelector(".player");

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const player = document.createElement("div");
  let isGameOver = false;
  let cometCount = 5;
  let jumpHeight = 300;
  let maxCometGap = jumpHeight - 50;
  const spawnOffset = window.innerWidth * 0.1;
  const maxLeftCometSpawn = window.innerWidth - spawnOffset;
  const minLeftCometSpawn = spawnOffset;

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

  class Comet {
    constructor(newCometBottom) {
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
      if (cometGap > maxCometGap) {
        cometGap = maxCometGap;
      }
      let newCometBottom = 100 + i * cometGap;
      let newComet = new Comet(newCometBottom);
    }
  }

  function start() {
    if (!isGameOver) {
      createPlayer();
      createComets();
    }
  }

  // attach to button
  start();
});
