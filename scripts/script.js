let playing_song = false;
let next = document.querySelector('#next_Song')
let previous = document.querySelector('#back_Song')
let play = document.getElementById('#play_btn')
let index_no = 0
let title = document.querySelector('#title')
let artist = document.querySelector('#artist')
let autoplay = 0;
let track = document.createElement('audio');
let starPage = 0;

window.onload = function() {
    load_track(index_no);
  };


var All_song = [
    {
        name: "DIANHO - Flow Podcast #467",  
        path: "/1.mp3",
        singer: "Flow Podcast",
        image_track: "/flow.jpg"
    },
    {
        name: "MD CHEFE & DOMLAIKE - Podpah #269",
        path: "/2.mp3",
        singer: "Podpah",
        image_track: "/podpah.png"
    },
    {
        name: "JAIR BOLSONARO - PÂNICO - 27/10/21",
        path: "/3.mp3",
        singer: "Pânico Jovem Pan",
        image_track: "/panico.png"
    },
    {
        name: "COMO SURGIU O IMPOSTO DE RENDA",
        path: "/4.mp3",
        singer: "Os sócios Podcast",
        image_track: "/os_socios.jpg"
    },
    {
        name: "ESTE É ALGUÉM DE PINHÃO E WINICIUS FOLDA #022",
        path: "/5.mp3",
        singer: "Podize",
        image_track: "/podize.jpg"
    },
    {
        name: "10 ATLETAS MAIS BEM PAGOS DO MUNDO",
        path: "/6.mp3",
        singer: "PodCast Galactico",
        image_track: "/galacticas.jpg"
    }

];

function load_track(index_no){
    track.src = All_song[index_no].path;
    document.querySelector('#title').innerHTML = All_song[index_no].name;
    document.querySelector('#artist').innerHTML = All_song[index_no].singer;
    image_footer.src = All_song[index_no].image_track;
    track.load();

    if (starPage == 0){
        starPage += 1;
    }else{
        tocar();
    }
    timer = setInterval(range_slider ,1000);
}

function volume_change(){
    track.volume = document.querySelector('#volume').value / 100;

}

function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       document.getElementById('auto').style.background = "white";
	}else{
       autoplay = 1;
       document.getElementById('auto').style.background = "rgb(99, 99, 226)";
	}
}


function proxMusica(){
    console.log("click")
    if (index_no < All_song.length - 1){
        index_no += 1;
        load_track(index_no);
        tocar();
    }else{
        index_no = 0;
        load_track(index_no)
        tocar();
    }
}

function AnteriorMusica(){
    if (index_no > 0){
        index_no -= 1;
        load_track(index_no);
        tocar();
    }else if(index_no == 0){
        index_no = 5;
        load_track(index_no)
        tocar();
    }else{
        index_no = All_song.length;
        load_track(index_no)
        tocar();
    }
}



function tocar(){
    track.play()
    playing_song = true;
    document.getElementById('play_btn').innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
       
}

function pause(){
    track.pause()
    playing_song = false;
    document.getElementById('play_btn').innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        
}

function justPlay(){
    if(playing_song==false){
        tocar();
    }else{
        pause();
    }
}

function change_duration(){
	slider_position = track.duration * (document.querySelector('#duration_slider').value / 100);
	track.currentTime = slider_position;

}

function range_slider(){
    let position = 0;

    if(!isNaN(track.duration)){
        position = track.currentTime * (100 / track.duration);
        document.querySelector('#duration_slider').value =  position;
    }

    if(track.ended){
        document.getElementById('play_btn').innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
       if(autoplay==1){
           index_no += 1;
           load_track(index_no);
           tocar();
       }
    }
}


