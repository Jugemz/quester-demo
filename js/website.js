const text = "Check out the video to see how it works!";
const video__p = document.querySelector('.video__p');
const video__buttonPlay = document.querySelector('.video__button-play');
const video__close = document.querySelector('.video__close');
const video__dialogueContainer = document.querySelector('.video__dialogue-container');
const video__youtubeWrapper = document.querySelector('.video__youtube-wrapper');
const video__blackout = document.querySelector('.video__blackout');
const iframe = document.querySelector('iframe');
let isTextIn = false;

function addText(text, element){
    for (let i = 0; i < text.length; i++) {
      const characterSpan = document.createElement('span');
      characterSpan.innerText = text[i]; 
      characterSpan.style.opacity = 0;       
      setTimeout(addText,0);
      function addText(){
          setTimeout(() => {
              characterSpan.style.opacity = 1;
          }, i * 20);
      }
      element.appendChild(characterSpan);
    }
}

function handleScroll() {
    if (isTextIn == false){
        const targetPosition = video__dialogueContainer.getBoundingClientRect().top;
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const textDelay = 200;
        if (scrollPosition > targetPosition) {
            toggleClass(video__dialogueContainer,"video__dialogue-container--hidden","video__dialogue-container--visible");
            setTimeout(toggleClass,(text.length * 20 + textDelay) + 100,video__buttonPlay,"video__button-play--static","video__button-play--animated");
            setTimeout(addText,textDelay,text,video__p);
            isTextIn = true;
        }
    }    
}

function toggleClass(element, classToRemove, classToAdd){
    if (element){
        element.classList.remove(classToRemove);
        element.classList.add(classToAdd);
    }
}

window.addEventListener('scroll', handleScroll);




const landingAssets = [

    // priority 0 ... load on window load
    [
      'assets/website/link-etsy-active.png',
      'assets/website/link-etsy-hover.png',
      'assets/website/link-purchased-active.png',
      'assets/website/link-purchased-hover.png',
      'assets/website/link-tpt-active.png',
      'assets/website/link-tpt-hover.png',
      'assets/website/play-button-active.png',
      'assets/website/play-button-hover.png',
      'assets/website/play-button-hover.gif',
      'assets/website/close-default.png',
      'assets/website/close-hover.png',
      'assets/website/close-active.png',
    ],
  
];
  
  function createPreloadLink(imagePath) {
    var link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imagePath;
    document.head.appendChild(link);
  }
  
  function preloadImages(imagePaths, callback) {
    var loadedImages = 0;
    var totalImages = imagePaths.length;
  
    function imageLoaded() {
      loadedImages++;
      if (loadedImages === totalImages) {
        callback();
      }
    }
  
    for (var i = 0; i < totalImages; i++) {
      createPreloadLink(imagePaths[i]);
      var img = new Image();
      img.onload = imageLoaded;
      img.onerror = imageLoaded;
      img.src = imagePaths[i];
    }
  }
  
  // onload, preload images with priority-0
 preloadImages(landingAssets[0], function() {});




function updateElementHeight() {
 
  const elements = [    
    ['.video__dialogue-container', 0.3],
    ['.links__item', 0.24],
    ['.info__img-divider', 0.17],
    ['.video__img', 0.585],
  ];

  elements.forEach(([selector, height]) => {
    heightElements(selector, height);
  });

  function heightElements(elementSelector, heightFactor) {
    document.querySelectorAll(elementSelector).forEach(element => {
      const parentWidth = element.parentNode.offsetWidth;
      element.style.height = `${parentWidth * heightFactor}px`;
    });
  }
}

document.addEventListener('DOMContentLoaded', updateElementHeight);
window.addEventListener('resize', updateElementHeight);
window.addEventListener('click', updateElementHeight);


const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.setAttribute('ontouchstart', '');
});


// Declare a variable to hold the YouTube player instance
let youtubePlayer;

// Function to initialize the YouTube player
function onYouTubePlayerAPIReady() {
  youtubePlayer = new YT.Player('video__youtubeIframe', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

// Function to handle YouTube player state changes
function onPlayerStateChange(event) {
  // When the video ends, stop the video playback
  if (event.data === YT.PlayerState.ENDED) {
    youtubePlayer.stopVideo();
  }
}

video__buttonPlay.addEventListener('click', (event) => {
  iframe.src = 'https://www.youtube.com/embed/UgrDPLhUM0U';
  toggleClass(video__youtubeWrapper, 'display--none', 'display--block');
  toggleClass(video__blackout, 'display--none', 'display--block');
  setTimeout(toggleClass,10,video__youtubeWrapper, 'video__youtube-wrapper--hidden', 'video__youtube-wrapper--visible');
  setTimeout(toggleClass,10,video__blackout, 'video__blackout--hidden', 'video__blackout--visible');
});

video__close.addEventListener('click', (event) => {
  iframe.src = '';
  toggleClass(video__youtubeWrapper, 'video__youtube-wrapper--visible', 'video__youtube-wrapper--hidden');
  toggleClass(video__blackout, 'video__blackout--visible', 'video__blackout--hidden');
  setTimeout(toggleClass,200,video__youtubeWrapper, 'display--block', 'display--none');
  setTimeout(toggleClass,200,video__blackout, 'display--block', 'display--none');
});
