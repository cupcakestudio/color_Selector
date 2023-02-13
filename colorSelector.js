colorSelector = document.querySelector("input");
// colorSelector.addEventListener("input", false);
// colorSelector.addEventListener("input", watchColorPicker, false);
colorSelector.addEventListener("input", (event) => {
  //found via mdn's site on
  /* "<input type="color"></input>" */
  hexCode.textContent = event.target.value;
  hexCodeString = String(event.target.value);
  console.log(hexCodeString);
  getRGBValues(hexCodeString);
});

//values to set the rgb textContent and hsl textContent
let hexCode = document.querySelector("#hex");
let rgbCode = document.querySelector("#rgb");
let hslCode = document.querySelector("#hsl");

let hexCodeString;
let rgbValue = "";
// function watchColorPicker(event) {
//   hexCode.textContent = event.target.value;
//   hexCodeString = String(event.target.value);
//   console.log(hexCodeString);
// }

function getRGBValues(hexCodeString) {
  //split the hexCode string into red part, green part and blue part
  let splitHexR = hexCodeString.substring(1, 3);
  let splitHexG = hexCodeString.substring(3, 5);
  let splitHexB = hexCodeString.substring(5);
  //convert the hexCode parts to base 16 in order to get the rbg values.
  let redVal = Number.parseInt(splitHexR, 16);
  let greenVal = Number.parseInt(splitHexG, 16);
  let blueVal = Number.parseInt(splitHexB, 16);
  console.log(redVal, greenVal, blueVal);
  //put the converted numbers into rbg p's textContent.
  rgbCode.textContent = `${redVal}${greenVal}${blueVal}`.toString();
  rgbCode.value = rgbCode.textContent;
  console.log(rgbCode.value);
  // put the calue
  rgbValue = rgbCode.value;
  getHSLValues(rgbValue);
}

//convert hex code to rbg

//convert RBG values to HSL add additional code
//this is from brief
function getHSLValues(rgbValue) {
  //get the rbg values to parse into the hsl values
  // let hslValue = rgbValue;

  //convert the numbers from rbg to hsl
  let r = Number.parseInt(rgbValue.substring(0, 3)),
    g = Number.parseInt(rgbValue.substring(3, 5)),
    b = Number.parseInt(rgbValue.substring(5));
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
  hslCode.textContent = `${h}% ${s}% ${l}%`.toString();
  console.log(hslCode);
}
// rgbCode.textContent = `${redVal}${greenVal}${blueVal}`.toString();
