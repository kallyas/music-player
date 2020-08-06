window.addEventListener("DOMContentLoaded", getBtns());

function getBtns() {
  let playBtn = [...document.querySelectorAll(".play")];
  console.log(playBtn);
  for (let i = 0; i < playBtn.length; i++) {
    playBtn[i].addEventListener("click", () => {
      let audio = new Audio(...document.querySelector(".song-audio"));
      audio.forEach((aud) => {
        if (aud.src != song.previewUrl) {
          aud.src = song.previewUrl;
          aud.play();
          this.textContent("pause");

          if (aud.currentSong) aud.currentSong.textContent("Play");
          aud.currentSong = this;
        } else {
          if (!aud.paused) {
            this.textContent("play");
            aud.pause();
          }
        }
      });
    });
  }
}
