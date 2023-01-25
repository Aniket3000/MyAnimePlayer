let keyword = "";
function getNames(){
  keyword = document.getElementById("inputNameSearch").value;
  searchforanimenames();
}
let numoftimes = 0;
function searchforanimenames(){
  fetch(`https://gogoanime.consumet.org/search?keyw=${keyword}`)
  .then((res) => res.json())
  .then((animelist) => {
    console.log(animelist);
    document.getElementsByClassName("seeyourAnime")[0].innerHTML = (numoftimes++) + " See the anime you want to search about in console!!!";
  });
}

let animeid;
let ep = 1;
function getdetails(){
  animeid = document.getElementById("idselected").value;
  searchforepurl();
}


function searchforepurl(){
  fetch(`https://gogoanime.consumet.org/vidcdn/watch/${animeid}-episode-${ep}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    viewepisode(data.sources_bk[0].file);
  })
}

var video = document.getElementById('video');

function viewepisode(fileurl){
  document.getElementById("epiCntView").innerHTML = `Episode - ${ep}`;
  // document.getElementById("videotoplay").src = `https://aniket3000.github.io/m3u8-player/player/#${fileurl}`;
  playM3u8(fileurl);
  
  $('#epiCntView').on('change', function () {
    $('#video').on('click', function(){this.paused?this.play():this.pause();});
    Mousetrap.bind('space', playPause);
    Mousetrap.bind('up', volumeUp);
    Mousetrap.bind('down', volumeDown);
    Mousetrap.bind('right', seekRight);
    Mousetrap.bind('left', seekLeft);
    Mousetrap.bind('f', vidFullscreen);
  });
}

function prevClicked(){
  ep--;
  document.getElementById("videotoplay").src = "";
  searchforepurl();
}

function nextClicked(){
  ep++;
  document.getElementById("videotoplay").src = "";
  searchforepurl();
}

///////////////////////////////////////////////////////////////




function playM3u8(url){
  if(Hls.isSupported()) {
      video.volume = 0.3;
      var hls = new Hls(lowLatencyMode=true,backBufferLength=90);
      var m3u8Url = decodeURIComponent(url)
      hls.loadSource(m3u8Url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
      });
      document.title = url
    }
	else if (video.canPlayType('application/vnd.apple.mpegurl')) {
		video.src = url;
		video.addEventListener('canplay',function() {
		  video.play();
		});
		video.volume = 0.3;
		document.title = url;
  	}
}

function playPause() {
    video.paused?video.play():video.pause();
}

function volumeUp() {
    if(video.volume <= 0.9) video.volume+=0.1;
}

function volumeDown() {
    if(video.volume >= 0.1) video.volume-=0.1;
}

function seekRight() {
    video.currentTime+=5;
}

function seekLeft() {
    video.currentTime-=5;
}

function vidFullscreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
}

