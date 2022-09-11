export const calculatingSize = (width, height, currWidth, currHeight, typeImage) => {
  const sizeObj = {
    cuttedWidth: 0,
    cuttedHeight: 0,
    imgWidth: 0,
    imgHeight: 0,
    canvasStartWidth: 0,
    canvasStartHeight: 0,
    canvasWidth: 0,
    canvasHeight: 0,
  };
  sizeObj.imgWidth = width;
  sizeObj.imgHeight = height;

  if (typeImage === "1x1") {
    const minSide = Math.min(currWidth, currHeight);
    sizeObj.canvasWidth = minSide;
    sizeObj.canvasHeight = minSide;
    
    if (width < height) {
      sizeObj.cuttedHeight = (height - width) / 2;
      sizeObj.imgHeight = width;

    } else if (width > height) {
      sizeObj.cuttedWidth = (width - height) / 2;
      sizeObj.imgWidth = height;
    }

  } else if (typeImage === "x") {
    const coeff = width / currWidth;
    sizeObj.canvasWidth = currWidth;
    sizeObj.canvasHeight = height / coeff;

  } else if (typeImage === "y") {
    const coeff = height / currHeight;
    sizeObj.canvasHeight = currHeight;
    sizeObj.canvasWidth = width / coeff;

  } else if (typeImage === 'xy'){

    sizeObj.canvasWidth = currWidth;
    sizeObj.canvasHeight = currHeight;

    const coeffImg = width / height
    const coeffScreen = currWidth / currHeight

    const tmpWidth = width / coeffImg
    const tmpHeight = height * coeffImg

    if (coeffImg > 1) {
      sizeObj.imgWidth = tmpWidth * coeffScreen;
      sizeObj.cuttedWidth = (width - sizeObj.imgWidth) / 2;
    }else if (coeffImg < 1){
      sizeObj.imgHeight = tmpHeight / coeffScreen;
      sizeObj.cuttedHeight = (height - sizeObj.imgHeight) / 2;
    }
  }
  return sizeObj;
};