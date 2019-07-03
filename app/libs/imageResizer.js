//for use
//
//set css for wrapper_block:
// display: flex; justify-content: center; align-items: center
//
//set css for image:
//width: 100%; height: auto;
//
//For start
//window.onload = function() {
//  setMaxHeightByWrapper ("wrapper_class", "image_class");
//  setMaxHeightAllBlocks("blockClass");
//};

function setMaxHeightByWrapper (wrapperClass, imgClass) {

  //объявляем переменные
  let wrapperMass = document.getElementsByClassName(wrapperClass);
  let imgMass = document.getElementsByClassName(imgClass);
  let maxHeight = 0;
  let maxWidth = 0;
  // let minHeight = 0;
  // let minWidth = 0;

  //вычисляем максимальные и минимальные значения
  if(wrapperMass && wrapperMass != null && wrapperMass != undefined ){
    for (let i = 0; i < wrapperMass.length; i++) {
    
      if (maxHeight < wrapperMass[i].offsetHeight) {
        maxHeight = wrapperMass[i].offsetHeight;
      }        
      //параметры высоты и ширины
      // if (minHeight > wrapperMass[i].offsetHeight || minHeight == 0) {
      //   minHeight = wrapperMass[i].offsetHeight;
      // }        

      // if (maxWidth < wrapperMass[i].offsetWidth) {
      //   maxWidth = wrapperMass[i].offsetWidth;
      // }        

      // if (minWidth > wrapperMass[i].offsetWidth || minWidth == 0) {
      //   minWidth = wrapperMass[i].offsetWidth;
      // }
    }
  } else {
    console.log('Error! WrapperMass= ' + wrapperMass);
  }

  console.log('maxHeight ' + maxHeight);

  //устанавливаем значения

  if (imgMass) {
    for (let i = 0; i < imgMass.length; i++) {
      if(imgMass[i].offsetHeight < maxHeight){
        imgMass[i].style = "width: auto; height: " + maxHeight + "px;";
      }
    }
  } else {
    console.log('Error! imgMass= ' + imgMass);
  }
}


////////////////////////высота блоков по самому большому
function setMaxHeightAllBlocks (blockClass) {
  
  let blockMass = document.getElementsByClassName(blockClass);
  let maxHeight = 0;

  if(blockMass && blockMass != null && blockMass != undefined ){
    for (var i = 0; i < blockMass.length; i++) {
      if (blockMass[i].offsetHeight > maxHeight) {
        maxHeight = blockMass[i].offsetHeight;
      }
    }
  } else {
      console.log('blockMass is incorrect:' + blockMass);
  }

  for (var i = 0; i < blockMass.length; i++) {
    blockMass[i].style = "height:" + maxHeight + "px";
  }

}
