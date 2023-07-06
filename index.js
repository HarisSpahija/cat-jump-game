var player = document.querySelector(".player");

document.addEventListener("mousemove", function (event) {
  var playerWidth = player.offsetWidth;
  var mouseX = event.clientX;
  var playerX = mouseX - playerWidth / 2; // Calculate the left position with the offset
  player.style.left = playerX + "px";
});
