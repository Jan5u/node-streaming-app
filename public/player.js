let config = {
  startPosition: 0,
  startLevel: 0,
  // debug: true,
  subtitleDisplay: true,
};

function loadVideo() {
  let hls = new Hls(config);
  let video = document.getElementById("video");
  hls.subtitleTrack = 0;
  hls.loadSource("./videos/master.m3u8");
  hls.attachMedia(video);
}

const ws = new WebSocket("wss://localhost/ws");

dataReceived = false;

video.addEventListener("play", function () {
  if (!dataReceived) ws.send(`play ${video.currentTime}`);
  dataReceived = false;
});

video.addEventListener("pause", function () {
  if (!dataReceived) ws.send(`pause ${video.currentTime}`);
  dataReceived = false;
});

ws.onmessage = function (event) {
  if (dataReceived) return;
  dataReceived = true;

  const blob = new Blob([event.data], { type: "application/octet-stream" });
  const reader = new FileReader();
  reader.onload = function () {
    // example data: "play 2.000000"
    const data = reader.result.split(" ");
    if (data[0] === "play") {
      video.currentTime = data[1];
      if (!video.paused) {
        dataReceived = false;
        return;
      }
      video.play();
    } else if (data[0] === "pause") {
      video.currentTime = data[1];
      if (video.paused) {
        dataReceived = false;
        return;
      }
      video.pause();
    }
  };
  reader.readAsText(blob);
};

ws.onerror = function (err) {
  console.log(err);
};
