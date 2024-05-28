const slider = document.querySelector("input[type=range]");
const sliderValue = document.querySelector(".value");
const form = document.querySelector("form");
const generateBtn = document.querySelector("button");
const constraints = document.getElementsByName("options");
const output = document.querySelector(".result__text-field");
const copyIcon = document.querySelector(".password-generator__result > img");
const copyText = document.querySelector(".copied");
const passwordState = document.querySelector(".password-strength__state");
const passwordStrength = document.querySelector("#password-strength");

sliderValue.textContent = slider.value;
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
const lowerCase = "abcdefghijklmnopqrstuvxyz";
const numbers = "0123456789";
const specialChars = "£$&()*+[]@#^-_!?";

//Default points to calculate Strenght
let pointsLenght = 2; //default Character Length of 10
let pointsLowerCase = 0;
let pointsUpperCase = 0;
let pointsNumbers = 0;
let pointsSymbols = 0;
let pointsTotal = 2; //default Character Length of 10

let charPool = "";
let isToWeak = false;

slider.oninput = () => {
  sliderValue.textContent = slider.value;
  switch (slider.value) {
    case "5":
    case "6":
      pointsLenght = 0;
      break;
    case "7":
    case "8":
      pointsLenght = 1;
      break;
    case "9":
    case "10":
      pointsLenght = 2;
      break;
    case "11":
    case "12":
      pointsLenght = 3;
      break;

    default:
      pointsLenght = 4;
      break;
  }

  calculatePoints();
};

generateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  charPool = "";
  if (pointsLowerCase == 1) {
    charPool += lowerCase;
  }
  if (pointsUpperCase == 1) {
    charPool += upperCase;
  }
  if (pointsNumbers == 1) {
    charPool += numbers;
  }
  if (pointsSymbols == 1) {
    charPool += specialChars;
  }
  generatePassword();
});

const generatePassword = () => {
  const tempPoints =
    pointsLowerCase + pointsUpperCase + pointsNumbers + pointsSymbols;
  if (tempPoints !== 0) {
    let randomPas = "";
    for (let i = 0; i < slider.value; i++) {
      const index = Math.floor(Math.random() * charPool.length);
      randomPas += charPool[index];
    }
    if (isToWeak) output.value = "";
    else output.value = randomPas;
  } else {
    generateBtn.innerHTML = "<span>include letters/numners/symbols</span>";
  }
};

const defaultBtnCode = () => {
  generateBtn.innerHTML = `<span>generate</span>
  <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#24232C"
      d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
    />
  </svg>`;
};

const calculatePoints = () => {
  pointsTotal =
    pointsLowerCase +
    pointsUpperCase +
    pointsNumbers +
    pointsSymbols +
    pointsLenght;

  // if pointsTotal <= 2 prevent generating password
  if (pointsTotal <= 2) {
    passwordStrength.className = "";
    generateBtn.innerHTML = "<span>to weak!</span>";
    isToWeak = true;
    output.value = "";
  } else if (pointsTotal <= 4) {
    passwordStrength.className = "too-weak";
    isToWeak = false;
    defaultBtnCode();
  } else if (pointsTotal <= 6) passwordStrength.className = "weak";
  else if (pointsTotal < 8) passwordStrength.className = "medium";
  else if (pointsTotal >= 8) passwordStrength.className = "strong";
};

//Select all checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Loop through each checkbox and add event listener
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    pointsUpperCase = constraints[0].checked ? 1 : 0;
    pointsLowerCase = constraints[1].checked ? 1 : 0;
    pointsNumbers = constraints[2].checked ? 1 : 0;
    pointsSymbols = constraints[3].checked ? 1 : 0;
    calculatePoints();
  });
});

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    copyText.classList.add("animate");
    setTimeout(() => {
      copyText.classList.remove("animate");
    }, 2000);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

copyIcon.onclick = copyToClipboard;
