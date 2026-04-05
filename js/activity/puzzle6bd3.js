function drawPuzzle() {

  // create alias
  let activityPuzzle = resource.activityArray[activityArrayIndex-1].content.puzzle;

  // create container
  const puzzleContainer = createElement('div',['puzzle-container'],activityModalContentContainerTop);

  // create elements inside container
  for (let i = 0; i < activityPuzzle.piece.length; i++) {
    let activityPuzzlePiece = createElement("div", ["activity-puzzle-piece", "draggable", activityPuzzle.style.material], puzzleContainer);
    if (activityPuzzle.style.arrangement === '3-vertical-rows'){
      activityPuzzlePiece.style.backgroundImage = "url(resource/" + resourceTheme + "/assets/activity/alternate/puzzle/3-vertical-rows/" + activityPuzzle.piece[i].image + ")";
    }
    else {
      activityPuzzlePiece.style.backgroundImage = "url(resource/" + resourceTheme + "/assets/activity/puzzle/" + activityPuzzle.piece[i].image + ")";
    }
    let activityPuzzlePieceText = createElement("p", ["activity-puzzle-piece-text", activityPuzzle.style.text.puzzle], activityPuzzlePiece);
    activityPuzzlePieceText.innerHTML = activityPuzzle.piece[i].text.replace(/\[(\w+)\]/g, '<span class="puzzle-text-highlight">$1</span>');
    
    // save and load user inputs
    if (userInput.puzzlePosition[i]) {
      activityPuzzlePiece.style.left = userInput.puzzlePosition[i].x;
      activityPuzzlePiece.style.top = userInput.puzzlePosition[i].y;
    } else {
      activityPuzzlePiece.style.left = Math.random() * 75 + "%";
      activityPuzzlePiece.style.top = Math.random() * 60 + "%";
    }

    // set drag functionality
    let isDragging = false;
    let currentX = parseFloat(activityPuzzlePiece.style.left) || 0;
    let currentY = parseFloat(activityPuzzlePiece.style.top) || 0;
    let initialX;
    let initialY;

    document.addEventListener("mousedown", dragStart);
    document.addEventListener("mouseup", dragEnd);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseleave", dragEnd);
  
    activityPuzzlePiece.addEventListener("touchstart", dragStart, { passive: false });
    activityPuzzlePiece.addEventListener("touchend", dragEnd, { passive: false });
    activityPuzzlePiece.addEventListener("touchmove", drag, { passive: false });
    activityPuzzlePiece.addEventListener("touchcancel", dragEnd, { passive: false });

    function dragStart(e) {
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - activityPuzzlePiece.getBoundingClientRect().left;
        initialY = e.touches[0].clientY - activityPuzzlePiece.getBoundingClientRect().top;
      } else {
        initialX = e.clientX - activityPuzzlePiece.getBoundingClientRect().left;
        initialY = e.clientY - activityPuzzlePiece.getBoundingClientRect().top;
      }
      if (e.target === activityPuzzlePiece) {
        const draggableElements = document.querySelectorAll('.draggable');
        let maxZIndex = 0;
        draggableElements.forEach(function(el) {
          const zIndex = parseInt(el.style.zIndex);
          if (!isNaN(zIndex) && zIndex > maxZIndex) {
            maxZIndex = zIndex;
          }
        });
        activityPuzzlePiece.style.zIndex = maxZIndex + 1;
        isDragging = true;
      }
    } 
    function dragEnd(e) {
      toggleClass(activityModalWrapper, "overflow-y-hidden", "overflow-y-scroll");
      isDragging = false;
      
      // save user inputs
      userInput.puzzlePosition[i] = { x: currentX + "%", y: currentY + "%" };
      
    }   
    function drag(e) {
      if (isDragging) {
        toggleClass(activityModalWrapper, "overflow-y-scroll", "overflow-y-hidden");
        e.preventDefault();
        if (e.type === "touchmove") {
          currentX = (e.touches[0].clientX - activityModalContentContainerTop.getBoundingClientRect().left - initialX) / activityModalContentContainerTop.offsetWidth * 100;
          currentY = (e.touches[0].clientY - activityModalContentContainerTop.getBoundingClientRect().top - initialY) / activityModalContentContainerTop.offsetHeight * 100;
        } else {
          currentX = (e.clientX - activityModalContentContainerTop.getBoundingClientRect().left - initialX) / activityModalContentContainerTop.offsetWidth * 100;
          currentY = (e.clientY - activityModalContentContainerTop.getBoundingClientRect().top - initialY) / activityModalContentContainerTop.offsetHeight * 100;
        }
        const pieceWidth = activityPuzzlePiece.offsetWidth / activityModalContentContainerTop.offsetWidth * 100;
        const pieceHeight = activityPuzzlePiece.offsetHeight / activityModalContentContainerTop.offsetHeight * 100;
        const minX = 0;
        const minY = 0;
        const maxX = 100 - pieceWidth;
        const maxY = 100 - pieceHeight;
        currentX = Math.max(minX, Math.min(currentX, maxX));
        currentY = Math.max(minY, Math.min(currentY, maxY));
        activityPuzzlePiece.style.left = currentX + "%";
        activityPuzzlePiece.style.top = currentY + "%";
      }
    }

  }
}
 


