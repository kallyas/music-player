const BASE_URL = "https://itunes.apple.com/search";

let searchInput = document.querySelector(".search-input");
let albumsContainer = document.querySelector(".albums-container");
let albumCount = document.querySelector(".album-count");
let name = document.querySelector(".name");
let tracksContainer = document.querySelector(".tracks-container");
let songContainer = document.querySelector(".song-container");

window.addEventListener("DOMContentLoaded", () => {
  let playBtn = [...document.querySelectorAll("button")];
  playBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let audio = new Audio(document.querySelector("audio"));
      if (audio.src != song.previewUrl) {
        audio.src = song.previewUrl;
        audio.play();
        this.textContent("pause");

        if (audio.currentSong) audio.currentSong.textContent("Play");
        audio.currentSong = this;
      } else {
        if (!audio.paused) {
          this.textContent("play");
          audio.pause();
        }
      }
    });
  });
});

searchInput.addEventListener("onkeyup", (e) => {
  query.term = this.value;
  if (e.key == "Enter") {
    showAlbums();
    showTracks();
  }
});

let query = {
  term: "ncs",
  limit: "10",
  entity: "album",
};

async function getMusic() {
  let url = new URL(BASE_URL);

  Object.keys(query).forEach((k) => {
    url.searchParams.append(k, query[k]);
  });

  return await (await fetch(url.href)).json();
}

getMusic().then(console.log);
showAlbums();
function showAlbums() {
  query.entity = "album";
  getMusic().then((data) => {
    data.results.forEach((album) => {
      let img = album.artworkUrl100.replace("100x100", "200x200");
      albumCount.style.backgroundImage = `url(${img}`;
      name.textContent = album.collectionName;
    });
  });
}

showTracks();

async function showTracks() {
  let result = "";
  query.entity = "song";

  let songs = await getMusic();

  songs.results.forEach((song) => {
    songContainer.style.backgroundColor = "#444";
    result += `
    <div class="song-container">
      <img src="${song.artworkUrl60}" alt="song cover">
      <div class="info">
      <h1>${song.trackName}</h1>
      <h2>${song.artistName}</h2>
      </div>
      <button class="play"><i class="fas fa-play"></i><audio src=${song.previewUrl}></audio></button>
      </div>
      `;
  });
  tracksContainer.innerHTML = result;
}
