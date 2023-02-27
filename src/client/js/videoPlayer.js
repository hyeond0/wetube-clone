const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (event) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = (event) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volume.value = video.muted ? 0 : volumeValue;
  if (Number(volumeValue) === 0) {
    volume.value = 0.3;
    video.volume = 0.3;
  }
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
  if (Number(volumeValue) === 0) {
    muteBtn.innerText = "Unmute";
    video.muted = true;
  } else {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(11, 19);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeLine.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};

const handleTimeLineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeLine.addEventListener("input", handleTimeLineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
