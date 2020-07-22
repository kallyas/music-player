const BASE_URL = "https://itunes.apple.com/search";

let searchInput = document.querySelector(".search-input");
let albumsContainer = document.querySelector(".albums-container");
let albumCount = document.querySelector(".album-count");
let name = document.querySelector(".name");
let tracksContainer = document.querySelector(".tracks-container");
let songContainer = document.querySelector(".song-container");
let cover = document.querySelector(".cover img");

window.addEventListener("DOMContentLoaded", () => {
  console.log("content loaded");
  searchInput.addEventListener("onkeyup", (e) => {
    query.term = this.value;
    if (e.key == "Enter") {
      showAlbums();
      showTracks();
    }
  });

  let query = {
    term: "ncs",
    limit: "20",
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
        () => {
          location.hash = album.collectionId;
        };
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
      <button class="play"><i class="fas fa-play"></i></button>
      <audio src=${song.previewUrl}></audio>
      </div>
      `;
    });
    tracksContainer.innerHTML = result;
  }

  let playBtn = [...document.querySelectorAll("button")];
  playBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let audio = new Audio(...document.querySelector("audio"));
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
  });
});

let album = {};

async function getAlbum(id) {
  let url = `https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${id}&entity=song`;
  let data = await (await fetch(url)).json();
  console.log(data);
  album = data.results;
  console.log(album);
  // let img = document.createElement('img')
  cover.setAttribute(
    "src",
    album[0].artworkUrl100.replace("100x100", "512x512")
  );
  document.body.appendChild(cover);
  showPlayer();
}

onhashchange = () => {
  if (location.hash) getAlbum(+location.hash.substr(1));
};

if (onhashchange) {
  onhashchange();
}

function showPlayer(d) {
  var trackNum = 1;

  let percent = 5;
  audio.ontimeupdate = (d) => {
    percent = audio.currentTime / audio.duration;
    seekCircle.style.left = `${percent}%`;
    percentBar.style.width = `${percent}%`;

    let mins = Math.floor(audio.currentTime / 60);
    let secs = Math.floor(audio.currentTime);
    currentTime.textContent = `00 ${mins.substr(-2)}:00 ${secs.substr(-2)}`;

    let mLeft = Math.floor(audio.duration - audio.currentTime) / 60;
    let sLeft = Math.floor(audio.duration - sudio.currentTime);
    duration.textContent = `00 ${mLeft.substr(-2)}:00 ${sLeft.substr(-2)}`;
  };

  function setSong(num) {
    audio.src = album[trackNum].previewUrl;
    trackName.content(`${trackNum}.${album[trackNum]}.${trackName}`);
    artistName.content(album[trackNum].artistName);
  }

  audio.onended = (d) => setSong(++trackNum);
}

/*
onclick: function() {
    playing = !playing;
    if(playing) {
        this.content("pause");
        audio.play();
    } else {
        this.content('play');
        audio.pause();
    }
}
*/
