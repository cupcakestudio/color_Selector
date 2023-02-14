colorSelector = document.querySelector("input");
// colorSelector.addEventListener("input", false);
// colorSelector.addEventListener("input", watchColorPicker, false);

//values to set the rgb textContent and hsl textContent
let hexCode = document.querySelector("#hex");
let rgbCode = document.querySelector("#rgb");
let hslCode = document.querySelector("#hsl");

let hexCodeString;
let rgbValue = "";

displayHex(watchColorPicker());

// showRBGVal();
// getHSLValues(rgbValue);
// showHSLVal(h, s, l);

//get selected color from user
//found via mdn's site on
/* "<input type="color"></input>" */

function watchColorPicker() {
  colorSelector.addEventListener("input", (event) => {
    hexCodeString = String(event.target.value);
    console.log(hexCodeString);
    displayHex(hexCodeString);
    let getrgbValues = getRGBValues(hexCodeString);
    showRGBVal(getrgbValues);
    showHSLVal(getHSLValues(getrgbValues));
  });
}

function displayHex(hexCodeString) {
  hexCode.textContent = hexCodeString;
}

// //convert hex code to rbg
function getRGBValues(hexCodeString) {
  //split the hexCode string into red part, green part and blue part
  let splitHexR = hexCodeString.substring(1, 3);
  let splitHexG = hexCodeString.substring(3, 5);
  let splitHexB = hexCodeString.substring(5);
  //convert the hexCode parts to base 16 in order to get the rbg values.
  let redVal = Number.parseInt(splitHexR, 16);
  let greenVal = Number.parseInt(splitHexG, 16);
  let blueVal = Number.parseInt(splitHexB, 16);
  // returns as ann object
  return { redVal, greenVal, blueVal };
}

// //seperate show that this function only changes display of rgb
function showRGBVal({ redVal, greenVal, blueVal }) {
  //read rgb object properties
  let rgbGenerated = { redVal, greenVal, blueVal };
  //put the converted numbers into rbg p's textContent.
  rgbCode.textContent =
    `${rgbGenerated.redVal}${rgbGenerated.greenVal}${rgbGenerated.blueVal}`.toString();
  rgbCode.value = rgbCode.textContent;
}

// //convert RBG values to HSL add additional code
// //this is from brief
function getHSLValues(rgbValue) {
  //get the rbg values to parse into the hsl values

  //convert the numbers from rbg object to hsl
  let r = Number.parseInt(rgbValue.redVal),
    g = Number.parseInt(rgbValue.greenVal),
    b = Number.parseInt(rgbValue.blueVal);
  //divide each value of r, g, and b with 255
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  //return the converted numbers into an object
  return { h, s, l };
}

//this changes the display of hsl textcontent.
function showHSLVal(hslValueObject) {
  //read the value of the hsl object and put it into correct p tag context
  hslCode.textContent =
    `${hslValueObject.h}% ${hslValueObject.s}% ${hslValueObject.l}%`.toString();
  console.log(hslCode.textContent);
}
