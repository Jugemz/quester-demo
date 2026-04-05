function drawDynamic(challengeIndex) {

  if (gameMode === "preview" && dragAndDropEdit === false){
    machineContainer.classList.add("state-pointer-events-none");
  }

  // creation functions
  let activity = resource.challengeArray[activityArrayIndex].activity;
  let activityContainer = createElement("div", ["activity-container"], activityModalContentContainerTop);
  if (activity.style.container){
    activityContainer.classList.add(style.dimension.width[activity.style.container.dimension.width]);
    activityContainer.classList.add(style.dimension.height[activity.style.container.dimension.height]);
  }

  if (activity.info.columnArray){
    let activitySortColumnContainer = createElement("div", ["activity-sort__column__container"], activityContainer);
    activitySortColumnContainer.style.zIndex = 0;
  }
  
  for (let i = 0; i < activity.blockArray.length; i++) {

    ////////
    // block
    ////////
    let activityBlock = createElement("div", ["activity-block"], activityContainer);
    if (activity.style) { 
      activityBlock.classList.add(style.dimension.width[activity.style.block.dimension.width]);
      activityBlock.classList.add(style.dimension.height[activity.style.block.dimension.height]);
      if (activity.style.block.misc){
        activityBlock.classList.add(style.misc.material[activity.style.block.misc.material]);
        activityBlock.classList.add(style.misc.padding[activity.style.block.misc.padding]);
      } 
      activityBlock.classList.add(style.flexbox.justifyContent[activity.style.block.flexbox.justifyContent]);
      activityBlock.classList.add(style.flexbox.alignItems[activity.style.block.flexbox.alignItems]);
      activityBlock.classList.add(style.flexbox.alignContent[activity.style.block.flexbox.alignContent]);
      if (activity.blockArray[i].style){
        transformElement(activityBlock, activity.blockArray[i].style.transform.translateX, activity.blockArray[i].style.transform.translateY, activity.blockArray[i].style.transform.rotate); 
      }

      // add drag-and-drop + column sort functionality
      if (activity.info.functionality === "drag-and-drop"){

        let dragAndDropType;

        if (activity.info.columnArray){

          let activitySortColumnContainer = createElement("div", ["activity-sort__column__container"], activityContainer);
          activitySortColumnContainer.style.zIndex = 0;
          for (let c = 0; c < activity.info.columnArray.length; c++){
            
            let activitySortColumn = createElement("div", ["activity-sort__column"], activitySortColumnContainer);
            let activitySortColumnText = createElement("div", ["activity-sort__column__text", "style-font--size__small", "style-border--default"], activitySortColumn);
            activitySortColumnText.innerHTML = styleText(activity.info.columnArray[c]); 

            if (activity.info.columHeader) {
              if (activity.info.columHeader === "color-pink-light"){
                activitySortColumnText.classList.add("activity-sort__column__text--pink-light");
              }
            }
            else {
              activitySortColumnText.classList.add("activity-sort__column__text--default");
            }
            
            if (c === 0){
              activitySortColumnText.style.transform = "rotate(-2deg)"
            }
            if (c === 1){
              activitySortColumnText.style.transform = "rotate(2deg)"
            }
            if (c === 2){
              activitySortColumnText.style.transform = "rotate(3deg)"
            }


            if (activity.info.columnArray.length === 3){
              activitySortColumn.classList.add(style.dimension.width.column3Width);
              dragAndDropType = "column3";
            }
            if (activity.info.columnArray.length === 2){
              activitySortColumn.classList.add(style.dimension.width.column2Width);
              dragAndDropType = "column2"
            }
            if (activity.info.columnArray.length === 1){
              activitySortColumn.classList.add(style.dimension.width.column1Width);
              dragAndDropType = "column1"
            }

          }
        }
        else {
          dragAndDropType = "puzzle"
        }

        activityBlock.classList.add('drag-and-drop');

          // create elements inside container

            // save and load user inputs
            let hasBeenRandomized = false;

            // answer key: puzzle
            if (dragAndDropType === "puzzle" && gameMode === "preview"){

              const draggableElements = document.querySelectorAll('.drag-and-drop');
              if (gameMode === "preview" && dragAndDropEdit === false){
                draggableElements.forEach(function(el) {
                    el.classList.add('state-pointer-events-none');
                });
              }
              
              switch(i){
                case 0: 
                  activityBlock.style.left = 15 + "%";
                  activityBlock.style.top = 14 + "%";
                  break;
                case 1: 
                  activityBlock.style.left = 37.25 + "%";
                  activityBlock.style.top = 14 + "%";
                  break;
                case 2: 
                  activityBlock.style.left = 59.5 + "%";
                  activityBlock.style.top = 14 + "%";
                  break;
                case 3: 
                  activityBlock.style.left = 15 + "%";
                  activityBlock.style.top = 34.25 + "%";
                  break;
                case 4: 
                  activityBlock.style.left = 37.25 + "%";
                  activityBlock.style.top = 34.25 + "%";
                  break;
                case 5: 
                  activityBlock.style.left = 59.5 + "%";
                  activityBlock.style.top = 34.25 + "%";
                  break;
                case 6: 
                  activityBlock.style.left = 15 + "%";
                  activityBlock.style.top = 54.5 + "%";
                  break;
                case 7: 
                  activityBlock.style.left = 37.25 + "%";
                  activityBlock.style.top = 54.5 + "%";
                  break;
                case 8: 
                  activityBlock.style.left = 59.5 + "%";
                  activityBlock.style.top = 54.5 + "%";
                  break;
              }
            }

            // answer key: column1
            else if (dragAndDropType === "column1" && gameMode === "preview") {

              const draggableElements = document.querySelectorAll('.drag-and-drop');
            
              if (gameMode === "preview" && dragAndDropEdit === false){
                draggableElements.forEach(function(el) {
                  el.classList.add('state-pointer-events-none');
                });
              }
            
              function positionElements() {
                let currentTop = 0; // Adjust as needed for your starting point
                const spacing = 1; // Adjust as needed for your desired spacing
            
                draggableElements.forEach(function(activityBlock) {
                  activityBlock.style.left = "25.7%";
                  activityBlock.style.top = `calc(${currentTop}px + 17%)`;
                  const blockHeight = activityBlock.offsetHeight; // Get dynamic height
                  currentTop += blockHeight + spacing;
                });
              }
            
              // Initial positioning
              setTimeout(positionElements,200);
            
              // Recalculate positions on window resize
              window.addEventListener('resize', positionElements);

            }

            // answer key: column2
            else if (dragAndDropType === "column2" && gameMode === "preview") {

              const draggableElements = document.querySelectorAll('.drag-and-drop');
            
              if (gameMode === "preview" && dragAndDropEdit === false){
                draggableElements.forEach(function(el) {
                  el.classList.add('state-pointer-events-none');
                });
              }
            
              function positionElements() {
                let currentTop0 = 0;
                let currentTop1 = 0;
                const spacing = 1;
                draggableElements.forEach(function(activityBlock, i) {
                    const correctIndex = activity.blockArray[i].correctIndex;
                    if (correctIndex === 0) {
                        activityBlock.style.left = "19.1%";
                        activityBlock.style.top = `calc(${currentTop0}px + 16%)`;
                        const blockHeight = activityBlock.offsetHeight;
                        currentTop0 += blockHeight + spacing;
                    } else if (correctIndex === 1) {
                        activityBlock.style.left = "52.1%";
                        activityBlock.style.top = `calc(${currentTop1}px + 16%)`;
                        const blockHeight = activityBlock.offsetHeight;
                        currentTop1 += blockHeight + spacing;
                    }             
                });
              }
                      
              setTimeout(positionElements,200);    
              window.addEventListener('resize', positionElements);

            }

            // answer key: column3
            else if (dragAndDropType === "column3" && gameMode === "preview") {
              const draggableElements = document.querySelectorAll('.drag-and-drop');
            
              if (gameMode === "preview" && dragAndDropEdit === false){
                draggableElements.forEach(function(el) {
                  el.classList.add('state-pointer-events-none');
                });
              }
            
              function positionElements() {
                let currentTop0 = 0;
                let currentTop1 = 0;
                let currentTop2 = 0;
                const spacing = 1;
                draggableElements.forEach(function(activityBlock, i) {
                    const correctIndex = activity.blockArray[i].correctIndex;
                    if (correctIndex === 0) {
                        activityBlock.style.left = "15.1%";
                        activityBlock.style.top = `calc(${currentTop0}px + 15%)`;
                        const blockHeight = activityBlock.offsetHeight;
                        currentTop0 += blockHeight + spacing;
                    } else if (correctIndex === 1) {
                        activityBlock.style.left = "39.3%";
                        activityBlock.style.top = `calc(${currentTop1}px + 15%)`;
                        const blockHeight = activityBlock.offsetHeight;
                        currentTop1 += blockHeight + spacing;
                      } else if (correctIndex === 2) {
                        activityBlock.style.left = "64.2%";
                        activityBlock.style.top = `calc(${currentTop2}px + 15%)`;
                        const blockHeight = activityBlock.offsetHeight;
                        currentTop2 += blockHeight + spacing;
                    }               
                });
              }
             
              setTimeout(positionElements,200);
              window.addEventListener('resize', positionElements);

            }
            
            // no answer key
            else {
              if (userInput["puzzle" + challengeIndex] && userInput["puzzle" + challengeIndex]["puzzlePosition"][i]) {
                activityBlock.style.left = userInput["puzzle" + challengeIndex]["puzzlePosition"][i].x;
                activityBlock.style.top = userInput["puzzle" + challengeIndex]["puzzlePosition"][i].y;
              } else {
                setTimeout(randomizeBlocks,500);
                function randomizeBlocks(){
                  activityBlock.style.left = Math.random() * 45 + 5 + "%";
                  let randomTop = Math.random() * 40 + 22 + "%";
                  activityBlock.style.top = randomTop;
                   
                  // save user inputs
                  let currentX = parseFloat(activityBlock.style.left) || 0;
                  let currentY = parseFloat(activityBlock.style.top) || 0;
                  userInput["puzzle" + challengeIndex]["puzzlePosition"][i] = { x: currentX + "%", y: currentY + "%" };
                }         
              }
            }
      
            // set drag functionality
            let isDragging = false;
            let currentX = parseFloat(activityBlock.style.left) || 0;
            let currentY = parseFloat(activityBlock.style.top) || 0;
            let initialX;
            let initialY;
      
            document.addEventListener("mousedown", dragStart);
            document.addEventListener("mouseup", dragEnd);
            document.addEventListener("mousemove", drag);
            document.addEventListener("mouseleave", dragEnd);
          
            activityBlock.addEventListener("touchstart", dragStart, { passive: false });
            activityBlock.addEventListener("touchend", dragEnd, { passive: false });
            activityBlock.addEventListener("touchmove", drag, { passive: false });
            activityBlock.addEventListener("touchcancel", dragEnd, { passive: false });
      
            function dragStart(e) {
              if (e.type === "touchstart") {
                initialX = e.touches[0].clientX - activityBlock.getBoundingClientRect().left;
                initialY = e.touches[0].clientY - activityBlock.getBoundingClientRect().top;
              } else {
                initialX = e.clientX - activityBlock.getBoundingClientRect().left;
                initialY = e.clientY - activityBlock.getBoundingClientRect().top;
              }
              if (e.target === activityBlock) {
                const draggableElements = document.querySelectorAll('.drag-and-drop');
                let maxZIndex = 2;
                draggableElements.forEach(function(el) {
                  const zIndex = parseInt(el.style.zIndex);
                  if (!isNaN(zIndex) && zIndex > maxZIndex) {
                    maxZIndex = zIndex;
                  }
                });
                activityBlock.style.zIndex = maxZIndex + 1;
                isDragging = true;
              }
            } 
            function dragEnd(e) {
              toggleClass(activityModalWrapper, "overflow-y-hidden", "overflow-y-scroll");
              isDragging = false;
              
              // save user inputs
              currentX = parseFloat(activityBlock.style.left) || 0;
              currentY = parseFloat(activityBlock.style.top) || 0;
              userInput["puzzle" + challengeIndex]["puzzlePosition"][i] = { x: currentX + "%", y: currentY + "%" };
              
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
                const pieceWidth = activityBlock.offsetWidth / activityModalContentContainerTop.offsetWidth * 100;
                const pieceHeight = activityBlock.offsetHeight / activityModalContentContainerTop.offsetHeight * 100;
                const minX = 0;
                const minY = 0;
                const maxX = 100 - pieceWidth;
                const maxY = 100 - pieceHeight;
                currentX = Math.max(minX, Math.min(currentX, maxX));
                currentY = Math.max(minY, Math.min(currentY, maxY));
                activityBlock.style.left = currentX + "%";
                activityBlock.style.top = currentY + "%";
              }
            }
  
          }

        }

    ////////
    // tag
    ////////
    if (activity.blockArray[i].tag){
      activityBlock.style.paddingTop = 0;
      let activityBlocktag = createElement("p", ["activity-block__tag"], activityBlock);
      activityBlocktag.innerHTML = styleText(activity.blockArray[i].tag.text); 
      activityBlocktag.classList.add(style.text.font[activity.style.block.tag.font].tag);
      activityBlocktag.classList.add(style.text.size[activity.style.block.tag.size]);
      activityBlocktag.classList.add(style.text.align[activity.style.block.tag.align]);
      activityBlocktag.classList.add(style.text.padding[activity.style.block.tag.padding].tag);
      if (activity.blockArray[i].tag.transform){
        let tagX = activity.blockArray[i].tag.transform.translateX;
        let tagY = activity.blockArray[i].tag.transform.translateY;
        let tagR = activity.blockArray[i].tag.transform.rotate;
        transformElement(activityBlocktag, tagX, tagY, tagR); 
      }
    }

    let currentCount = 0;
    let currentIndex = 0;
 
    for (let j = 0; j < activity.blockArray[i].contentArray.length; j++) {

      ////////////////////
      // content container
      ////////////////////
      const activityContentContainer = createElement("div", ["activity-content__container"], activityBlock);
      if (activity.style.contentArray[j].dimension){
        activityContentContainer.classList.add(style.dimension.width[activity.style.contentArray[j].dimension.width]);
        activityContentContainer.classList.add(style.dimension.height[activity.style.contentArray[j].dimension.height]);
      }
      if (activity.style.contentArray[j].misc){
        activityContentContainer.classList.add(style.misc.padding[activity.style.contentArray[j].misc.padding]);
      }
      if (activity.style.contentArray[j].flexbox){
        activityContentContainer.classList.add(style.flexbox.justifyContent[activity.style.contentArray[j].flexbox.justifyContent]);
        activityContentContainer.classList.add(style.flexbox.alignItems[activity.style.contentArray[j].flexbox.alignItems]);
        if (activity.style.contentArray[j].flexbox.flexGrow){
          activityContentContainer.classList.remove(style.dimension.height[activity.style.contentArray[j].dimension.height]);
          activityContentContainer.classList.add(style.flexbox.flexGrow[activity.style.contentArray[j].flexbox.flexGrow]);
        }
      }

      // dimension override
      if (activity.blockArray[i].contentArray[j].dimension){
        activityContentContainer.classList.remove(style.dimension.width[activity.style.contentArray[j].dimension.width]);
        activityContentContainer.classList.remove(style.dimension.height[activity.style.contentArray[j].dimension.height]);
        activityContentContainer.classList.add(style.dimension.width[activity.blockArray[i].contentArray[j].dimension.width]);
        activityContentContainer.classList.add(style.dimension.height[activity.blockArray[i].contentArray[j].dimension.height]);
      }

      ////////
      // title
      ////////
      if (activity.blockArray[i].contentArray[j].title){
        let activityContentTitle = createElement("p", ["activity-content__title"], activityContentContainer); 
        activityContentTitle.innerHTML = styleText(activity.blockArray[i].contentArray[j].title.text);
        activityContentTitle.classList.add(style.text.font[activity.style.contentArray[j].title.font].title);
        activityContentTitle.classList.add(style.text.size[activity.style.contentArray[j].title.size]);
        activityContentTitle.classList.add(style.text.align[activity.style.contentArray[j].title.align]);
        if (activity.blockArray[i].contentArray[j].subtitle){
          activityContentTitle.style.marginBottom = "1%";
        }
        else {
          activityContentTitle.style.marginBottom = "3.5%";
        }
      }

      ///////////
      // subtitle
      ///////////
      if (activity.blockArray[i].contentArray[j].subtitle){
        let activityContentSubtitle = createElement("p", ["activity-content__subtitle"], activityContentContainer); 
        activityContentSubtitle.innerHTML = styleText(activity.blockArray[i].contentArray[j].subtitle.text);
        activityContentSubtitle.classList.add(style.text.font[activity.style.contentArray[j].subtitle.font].subtitle);
        activityContentSubtitle.classList.add(style.text.size[activity.style.contentArray[j].subtitle.size]);
        activityContentSubtitle.classList.add(style.text.align[activity.style.contentArray[j].subtitle.align]);
      }

      //////////
      // passage
      //////////
      if (activity.blockArray[i].contentArray[j].passage) {
        if (activity.style.contentArray[j].passage.brSplit) {
            let passages = activity.blockArray[i].contentArray[j].passage.text.split('<br>'); // Split the text by <br> tags
            passages.forEach(passageText => {
                let activityContentParagraph = createElement("p", ["activity-content__paragraph"], activityContentContainer); 
                activityContentParagraph.innerHTML = styleText(passageText.trim()); // Trim any extra whitespace
                activityContentParagraph.classList.add(style.text.font[activity.style.contentArray[j].passage.font].paragraph);
                activityContentParagraph.classList.add(style.text.size[activity.style.contentArray[j].passage.size]);
                activityContentParagraph.classList.add(style.text.align[activity.style.contentArray[j].passage.align]);
                activityContentParagraph.classList.add(style.text.indent[activity.style.contentArray[j].passage.indent]);
                activityContentParagraph.classList.add(style.text.brSplit[activity.style.contentArray[j].passage.brSplit]);
                if (activity.style.contentArray[j].passage.puzzle) {
                  activityContentParagraph.classList.add(style.dimension.width.puzzleTextWidth);
                }
            });
        } else {
            let activityContentParagraph = createElement("p", ["activity-content__paragraph"], activityContentContainer); 
            activityContentParagraph.innerHTML = styleText(activity.blockArray[i].contentArray[j].passage.text.trim()); // Trim any extra whitespace
            activityContentParagraph.classList.add(style.text.font[activity.style.contentArray[j].passage.font].paragraph);
            activityContentParagraph.classList.add(style.text.size[activity.style.contentArray[j].passage.size]);
            activityContentParagraph.classList.add(style.text.align[activity.style.contentArray[j].passage.align]);
            activityContentParagraph.classList.add(style.text.indent[activity.style.contentArray[j].passage.indent]);
            if (activity.style.contentArray[j].passage.puzzle) {
              activityContentParagraph.classList.add(style.dimension.width.puzzleTextWidth);
            }
        }
      }
     
      ////////
      // image
      ////////
      if (activity.blockArray[i].contentArray[j].image){
        let activityContentImage= createElement("img", ["activity-content__image"], activityContentContainer); 
        if (activity.blockArray[i].contentArray[j].image.type === "theme"){
          activityContentImage.src = "resource/" + resourceTheme + "/assets/activity/passage/" + activity.blockArray[i].contentArray[j].image.file;
        }
        if (activity.blockArray[i].contentArray[j].image.type === "angle"){
          activityContentImage.src = "assets/activity/math/angle/" + activity.blockArray[i].contentArray[j].image.file;
        }
        if (activity.blockArray[i].contentArray[j].image.type === "shape-partition"){
          activityContentImage.src = "assets/activity/math/shape-partition/" + activity.blockArray[i].contentArray[j].image.file;
        }
        if (activity.blockArray[i].contentArray[j].image.type === "shape"){
          activityContentImage.src = "assets/activity/math/shape/" + activity.blockArray[i].contentArray[j].image.file;
        }
        if (activity.blockArray[i].contentArray[j].image.type === "local"){
          activityContentImage.src = "resource/" + resourceTheme + "/assets/activity/local/" + activity.blockArray[i].contentArray[j].image.file;
        }

      }

      /////////
      // figure
      /////////
      if (activity.blockArray[i].contentArray[j].figure){

        let activityContentFigure = createElement("div", ["activity-content__figure"], activityContentContainer);

        if (activity.blockArray[i].contentArray[j].figure.label.top){
          let activityContentFigureLabelTop = createElement("p", ["activity-content__figure__label", "activity-content__figure__label--top"], activityContentFigure); 
          activityContentFigureLabelTop.innerHTML = styleText(activity.blockArray[i].contentArray[j].figure.label.top);
          activityContentFigureLabelTop.classList.add(style.text.font[activity.style.contentArray[j].label.font].label);
          activityContentFigureLabelTop.classList.add(style.text.size[activity.style.contentArray[j].label.size]);   
          if (activity.blockArray[i].contentArray[j].figure.label.top === "offset"){
            activityContentFigureLabelTop.innerHTML = styleText(activity.blockArray[i].contentArray[j].figure.label.bottom);
            activityContentFigureLabelTop.classList.add(style.misc.opacity.percent0);
          } 
        }

        if (activity.blockArray[i].contentArray[j].figure.label.left){
          let activityContentFigureLabelLeft = createElement("p", ["activity-content__figure__label", "activity-content__figure__label--left"], activityContentFigure); 
          activityContentFigureLabelLeft.innerHTML = styleText(activity.blockArray[i].contentArray[j].figure.label.left);
          activityContentFigureLabelLeft.classList.add(style.text.font[activity.style.contentArray[j].label.font].label);
          activityContentFigureLabelLeft.classList.add(style.text.size[activity.style.contentArray[j].label.size]); 
          if (activity.blockArray[i].contentArray[j].figure.label.left === "offset"){
            activityContentFigureLabelLeft.innerHTML = styleText(activity.blockArray[i].contentArray[j].figure.label.right);
            activityContentFigureLabelLeft.classList.add(style.misc.opacity.percent0);
          }
        }

        let activityContentFigureShape = createElement("div", ["activity-content__figure-shape"], activityContentFigure);
        activityContentFigureShape.classList.add(style.background.color[activity.style.contentArray[j].figure.background.color]);
        activityContentFigureShape.classList.add(style.border.width[activity.style.contentArray[j].figure.border.width]);

        if (activity.blockArray[i].contentArray[j].figure.label.right){
          let activityContentFigureLabelRight = createElement("p", ["activity-content__figure__label", "activity-content__figure__label--right"], activityContentFigure); 
          activityContentFigureLabelRight.innerHTML = styleText(activity.blockArray[i].contentArray[j].figure.label.right);
          activityContentFigureLabelRight.classList.add(style.text.font[activity.style.contentArray[j].label.font].label);
          activityContentFigureLabelRight.classList.add(style.text.size[activity.style.contentArray[j].label.size]);
          if (activity.blockArray[i].contentArray[j].figure.label.right === "offset"){
            activityContentFigureLabelRight.innerHTML = styleText(activity.blockArray[i].contentArray[j].figure.label.left);
            activityContentFigureLabelRight.classList.add(style.misc.opacity.percent0);
          }
        }
 
        if (activity.blockArray[i].contentArray[j].figure.label.bottom){
          let activityContentFigureLabelBottom = createElement("p", ["activity-content__figure__label", "activity-content__figure__label--bottom"], activityContentFigure); 
          activityContentFigureLabelBottom.innerHTML = styleText(activity.blockArray[i].contentArray[j].figure.label.bottom);
          activityContentFigureLabelBottom.classList.add(style.text.font[activity.style.contentArray[j].label.font].label);
          activityContentFigureLabelBottom.classList.add(style.text.size[activity.style.contentArray[j].label.size]); 
          if (activity.blockArray[i].contentArray[j].figure.label.bottom === "offset"){
            activityContentFigureLabelBottom.innerHTML = styleText(activity.blockArray[i].contentArray[j].figure.label.top);
            activityContentFigureLabelBottom.classList.add(style.misc.opacity.percent0);
          }
        }

        let numCellsWidth = activity.blockArray[i].contentArray[j].figure.measurement.width;
        let numCellsHeight = activity.blockArray[i].contentArray[j].figure.measurement.height;



        for (let k = 0; k < numCellsHeight; k++) {
          let activityContentFigureRow = createElement("div", ["activity-content__figure__row"], activityContentFigureShape); 
          for (let l = 0; l < numCellsWidth; l++) {
            let activityContentFigureRowCell = createElement("div", ["activity-content__figure__row__cell"], 
            activityContentFigureRow); 
            activityContentFigureRowCell.classList.add(style.cell.dimension.size[activity.style.contentArray[j].cell.dimension.size]);
            if (activity.style.contentArray[j].cell.border.width === "thin"){
              activityContentFigureRowCell.style.backgroundImage = 'url(assets/activity/math/figure/border-thin.svg)';
            }

          }

        }
   
      }

      //////////////
      // number line
      //////////////
      if (activity.blockArray[i].contentArray[j].numberLine){

        let activityContentNumberLine = createElement("div", ["activity-content__number-line"], activityContentContainer);
        let activityContentNumberLineArrowLeft = createElement("div", ["activity-content__number-line__arrow", "activity-content__number-line__arrow--left"], activityContentNumberLine); 
        let activityContentNumberLineLine = createElement("div", ["activity-content__number-line__line", "style-border--dynamic"], activityContentNumberLine); 
        let activityContentNumberLineArrowRight = createElement("div", ["activity-content__number-line__arrow", "activity-content__number-line__arrow--right"], activityContentNumberLine); 

        let activityContentNumberLineTickContainer = createElement("div", ["activity-content__number-line__tick-container"], activityContentNumberLine);
        for (k = 0; k < activity.blockArray[i].contentArray[j].numberLine.measurement.fraction + 1; k++){
          let activityContentNumberLineTickItem = createElement("div", ["activity-content__number-line__tick-item",], activityContentNumberLineTickContainer);

          let activityContentNumberLineDot = createElement("div", ["activity-content__number-line__dot", "style-border--default", "state-display-none"], activityContentNumberLineTickItem);
          if (k === activity.blockArray[i].contentArray[j].numberLine.measurement.dot){
            toggleClass(activityContentNumberLineDot, "state-display-none", "state-display-block");
          }

          let activityContentNumberLineTick = createElement("div", ["activity-content__number-line__tick", "style-border--dynamic"], activityContentNumberLineTickItem);
          let activityContentNumberLineTickLabel = createElement("p", ["activity-content__number-line__tick__label", "style-font--size__tiny"], activityContentNumberLineTickItem);
          if (k === 0){
            activityContentNumberLineTickLabel.innerHTML = activity.blockArray[i].contentArray[j].numberLine.label.start;
          }
          if (k === activity.blockArray[i].contentArray[j].numberLine.measurement.fraction){
            activityContentNumberLineTickLabel.innerHTML = activity.blockArray[i].contentArray[j].numberLine.label.end;
          }
        }
   
      }

      ///////////////////
      // background image
      ///////////////////
      if (activity.blockArray[i].contentArray[j].backgroundImage){
        activityContentContainer.style.backgroundImage = "url(resource/" + resourceTheme + "/assets/activity/puzzle/" + activity.blockArray[i].contentArray[j].backgroundImage.file + ")";
        activityContentContainer.classList.add(style.background.size[activity.style.contentArray[j].background.size]);
        activityContentContainer.classList.add(style.background.repeat[activity.style.contentArray[j].background.repeat]);
      }

      ///////////
      // fraction
      ///////////
      if (activity.blockArray[i].contentArray[j].fraction) {
        let activityContentFraction = createElement("div", ["activity-content__fraction"], activityContentContainer);
        let problemArray = activity.blockArray[i].contentArray[j].fraction.text.split(' ');
    
        for (let k = 0; k < problemArray.length; k++) {
            let parts = problemArray[k].split('/');
    
            let activityContentFractionContainer = createElement("div", ["activity-content__fraction__container"], activityContentFraction);
    
            if (parts.length === 1) { // Handle integers or whole number parts of mixed numbers
                let activityContentFractionInteger = createElement("p", ["activity-content__fraction__integer"], activityContentFractionContainer);
                activityContentFractionInteger.classList.add(style.text.font[activity.style.contentArray[j].fraction.font].fraction);
                activityContentFractionInteger.classList.add(style.text.size[activity.style.contentArray[j].fraction.size.integer]);
                activityContentFractionInteger.innerHTML = styleText(parts[0]);
            } else if (parts.length === 2) { // Handle fractions
                // Create the numerator
                let numerator = createElement("p", ["activity-content__fraction__numerator"], activityContentFractionContainer);
                numerator.classList.add(style.text.font[activity.style.contentArray[j].fraction.font].fraction);
                numerator.classList.add(style.text.size[activity.style.contentArray[j].fraction.size.fraction]);
                numerator.innerHTML = styleText(parts[0]);
    
                // Create the fraction line
                let line = createElement("p", ["activity-content__fraction__line", "style-border--dynamic"], activityContentFractionContainer);
    
                // Create the denominator
                let denominator = createElement("p", ["activity-content__fraction__denominator"], activityContentFractionContainer);
                denominator.classList.add(style.text.font[activity.style.contentArray[j].fraction.font].fraction);
                denominator.classList.add(style.text.size[activity.style.contentArray[j].fraction.size.fraction]);
                denominator.innerHTML = styleText(parts[1]);
            }
        }
      }

      ///////////////////
      // coordinate-plane
      ///////////////////
      if (activity.blockArray[i].contentArray[j].coordinatePlane) {

        let activityContentCoordinatePlane = createElement("div", ["activity-content__coordinate-plane"], activityContentContainer);

        let activityContentPlane = createElement("div", ["activity-content__plane"], activityContentCoordinatePlane);

        activityContentPlane.style.backgroundImage = "url('assets/activity/math/coordinate-plane/coordinate-plane.png')";

        let activityContentKey = createElement("div", ["activity-content__key"], activityContentCoordinatePlane);
        for (k = 0; k < activity.blockArray[i].contentArray[j].coordinatePlane.key.length; k++){
          let activityContentKeyItem = createElement("div", ["activity-content__key__item"], activityContentKey);
          let activityContentKeyItemImage = createElement("img", ["activity-content__key__item__image", "style-border--default"], activityContentKeyItem);
          activityContentKeyItemImage.classList.add(style.background.color[activity.blockArray[i].contentArray[j].coordinatePlane.key[k].color]);
          let activityContentKeyItemText = createElement("p", ["activity-content__key__item__text"], activityContentKeyItem);
          activityContentKeyItemText.classList.add(style.text.font[activity.style.contentArray[j].key.font].key);
          activityContentKeyItemText.classList.add(style.text.size[activity.style.contentArray[j].key.size]);
          activityContentKeyItemText.classList.add(style.text.align[activity.style.contentArray[j].key.align]);
          activityContentKeyItemText.innerHTML = activity.blockArray[i].contentArray[j].coordinatePlane.key[k].text.split('').join(' ');

          let xMultiplier = 4.99;
          let yMultiplier = 9.3;
          let xModifier = 7.3;
          let yModifier = 12.1;

          let activityContentCoordinatePlaneDot = createElement("div", ["activity-content__coordinate-plane__dot", "style-border--default"], activityContentCoordinatePlane);
          activityContentCoordinatePlaneDot.style.left = ((activity.blockArray[i].contentArray[j].coordinatePlane.key[k].coordinate[0]) * xMultiplier + xModifier) + '%';
          activityContentCoordinatePlaneDot.style.bottom = ((activity.blockArray[i].contentArray[j].coordinatePlane.key[k].coordinate[1]) * yMultiplier + yModifier) + '%';
          activityContentCoordinatePlaneDot.classList.add(style.background.color[activity.blockArray[i].contentArray[j].coordinatePlane.key[k].color]);

        }

      }

      /////////////
      // cryptogram
      /////////////
      if (activity.blockArray[i].contentArray[j].cryptogram) {

        removeWidthHeightClasses(activityBlock);
        function removeWidthHeightClasses(element) {
          const classes = element.className.split(' ');
          const filteredClasses = classes.filter(className => 
            !/width|height/i.test(className)
          );
          element.className = filteredClasses.join(' ');
        }

        activityBlock.classList.add(style.dimension.width.percent80);
        activityBlock.classList.add(style.dimension.height.percent38);

        let activityContentCryptogramContainer = createElement('div',['activity-content__cryptogram__container'],activityContentContainer);
        let activityContentCryptogramTable = createElement('table',['activity-content__cryptogram-table', 'style-border--default'],activityContentCryptogramContainer);
        const symbolArray = ["AA","BB","CC","DD","EE","FF","GG","HH","II","JJ","KK","LL","MM","NN","OO","PP","QQ","RR","SS","TT","UU","VV","WW","XX","YY","ZZ"];
        const cellsPerRow = Math.ceil(symbolArray.length / 2);
        for (let row = 0; row < 2; row++) {
          const activityContentCryptogramRow = createElement('tr',['activity-content__cryptogram__table-row'],activityContentCryptogramTable);
          for (let cell = 0; cell < cellsPerRow; cell++) {
            const index = row * cellsPerRow + cell;
            const activityContentCryptogramCell = createElement('td',['activity-content__cryptogram__table-cell', 'style-border--default'],activityContentCryptogramRow);

            activityContentCryptogramCellText = createElement('p',['activity-content__cryptogram__cell__text'], 
            activityContentCryptogramCell);

            if (index < symbolArray.length) {
              const letters = symbolArray[index];
              const firstLetter = letters.charAt(0);
              const secondLetter = letters.charAt(1);

              let firstLetterFont = style.text.font[activity.style.contentArray[j].cryptogram.font1.font].cryptogram;
              let firstLetterSize = style.text.size[activity.style.contentArray[j].cryptogram.font1.size];
              let secondLetterFont = style.text.font[activity.style.contentArray[j].cryptogram.font2.font].cryptogram;
              let secondLetterSize = style.text.size[activity.style.contentArray[j].cryptogram.font2.size];
              
              activityContentCryptogramCellText.innerHTML = '<span class="' + secondLetterFont + ' ' + secondLetterSize + '">' + firstLetter + '</span><br><span class="' + firstLetterFont + ' ' + firstLetterSize + '">' + secondLetter + '</span>';
              
            } 

          }
        }  


        /*
        const cryptogram = createElement('div',['cryptogram', activityCryptogram.style.material],cryptogramContainer);
        transformElement(cryptogram, activityCryptogram.item.cryptogram.transform.translateX, activityCryptogram.item.cryptogram.transform.translateY, activityCryptogram.item.cryptogram.transform.rotate); 
        const cryptogramTable = createElement('table',['cryptogram-table'],cryptogram);
        const symbolArray = ["AA","BB","CC","DD","EE","FF","GG","HH","II","JJ","KK","LL","MM","NN","OO","PP","QQ","RR","SS","TT","UU","VV","WW","XX","YY","ZZ"];
        const cellsPerRow = Math.ceil(symbolArray.length / 2);
        for (let row = 0; row < 2; row++) {
          const cryptogramRow = createElement('tr',['cryptogram-table-row'],cryptogramTable);
          for (let cell = 0; cell < cellsPerRow; cell++) {
            const index = row * cellsPerRow + cell;
            const cryptogramCell = createElement('td',['cryptogram-table-cell', activityCryptogram.style.text.paragraph],cryptogramRow);
            if (index < symbolArray.length) {
              const letters = symbolArray[index];
              const firstLetter = letters.charAt(0);
              const secondLetter = letters.charAt(1);
              cryptogramCell.innerHTML = `${firstLetter}<br>${secondLetter}`;
            }    
          }
        }   
        */

      }  

    }

  }

}


  /*
  let activityPassage;
  let passageStyleMaterial;
  let passageStyleText;

  // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
  if (resource.challengeArray){
    // create aliases
    activityPassage = resource.challengeArray[activityArrayIndex].activity;
    passageStyleMaterial = resource.challengeArray[activityArrayIndex].activity.style.material;
    passageStyleText = resource.challengeArray[activityArrayIndex].activity.style.text;
  }
  // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅

  // create container
  const passageContainer = createElement("div", ["passage-container"], activityModalContentContainerTop);

  // create elements inside container
  for (let i = 0; i < activityPassage.item.length; i++) {
      const passage = createElement("div", ["passage", passageStyleMaterial], passageContainer);
      transformElement(passage, activityPassage.item[i].transform.translateX, activityPassage.item[i].transform.translateY, activityPassage.item[i].transform.rotate); 
      const passageImage = createElement("div", ["passage-image"], passage);
      passageImage.style.backgroundImage = "url(resource/" + resourceTheme + "/assets/activity/passage/" + activityPassage.item[i].image + ")";
      const passageTextContainer  = createElement("div", ["passage-text-container"], passage);
      const passageTitle = createElement("p", ["passage-title", passageStyleText.title], passageTextContainer);
      passageTitle.textContent = activityPassage.item[i].title;

      const passageParagraph = createElement("p", ["passage-paragraph", passageStyleText.paragraph], passageTextContainer); 
      passageParagraph.innerHTML = processParagraph(activityPassage.item[i].paragraph); 
  }

}



function processParagraph(paragraph) {
  return paragraph.replace(/\[(.*?)\]/g, '<span style="text-decoration: underline;">$1</span>');
}

*/