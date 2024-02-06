const wordsInput = document.getElementById("words-input");
const generateButton = document.getElementById("generate");
const combinationsTable = document.getElementById("combinations-table");
const combinationsDiv = document.getElementById("combinations-div");
const combinationCountLabel = document.getElementById("combination-count");
const displayOptionCheckbox = document.getElementById("display-option");
const kInput= document.getElementById("k-value");
var combinations;

generateButton.addEventListener("click", () => {
  generateNewCombination();
});

// Event listener for the checkbox
displayOptionCheckbox.addEventListener("change", () => {
  // Clear previous results it is called from script-actions
   clearCombinations();
   generateNewCombination();
});

function generateNewCombination(){
  const words = wordsInput.value.trim().split(" ");
  if(words==""){
    alert("Invalid or Empty word(s) !");
    return;
  }
  const letters = words.join("").split("");
  var kValue = parseInt(kInput.value);

  if (kInput.value.trim() === "") {
    kValue = letters.length;
    alert(`No k value entered. Using k = ${kValue} (number of words).`);
    kInput.value = kValue; // Set input value for clarity
  } else {
    kValue = parseInt(kInput.value);
    if (isNaN(kValue) || kValue < 1 || kValue>letters.length) {
      alert("Invalid k value. Please enter a positive integer smaller than total words.");
      return; // Prevent further code execution if k is invalid
    }
  }
  combinations = generateCombination(letters, kValue);
  displayCombinations(combinations);
  sortByDropdown.selectedIndex=0;
}

function displayCombinations(combinations){
  if (displayOptionCheckbox.checked) {
    displayCombinationInTable(combinations);
  } else {
    displayCombinationInDiv(combinations);
  }

  const combinationCount = combinations.length;
  combinationCountLabel.textContent = `Number of combination: ${combinationCount}`;
}

function generateCombination(letters, k) {
  const results = [];
  if (k === 0) {
    results.push([]);
  } else {
    for (let i = 0; i < letters.length; i++) {
      const remainingLetters = letters.slice(i + 1);
      const remainingCombinations = generateCombination(remainingLetters, k - 1);
      for (const combination of remainingCombinations) {
        results.push(letters[i]+combination);
        //results.push([letters[i]].concat(combination));  // by using this we can add  a comma between elements of set like a,c b,c
      }
    }
  }
  return results;
}

function displayCombinationInTable(combination) {
    // Clear previous data
    combinationsTable.tBodies[0].innerHTML = "";
    // Group combination by first letter
    const groupedcombination = groupByFirstLetter(combination);
    // Loop through each letter and its combination
    for (const letter in groupedcombination) {
      // Create a new row for the letter
      const row = combinationsTable.tBodies[0].insertRow();
      const letterCell = row.insertCell();
      const combinationCell = row.insertCell();
      // Set the letter as the table header
      letterCell.textContent = letter;
      // Create a container element for combination
      const combinationContainer = document.createElement("div");
      // Add each permutation to the container with a line break
      for (const permutation of groupedcombination[letter]) {
        combinationContainer.textContent += permutation + "\n";
      }
      // Set the combination container as the cell content
      combinationCell.appendChild(combinationContainer);
    }
  }

function displayCombinationInDiv(combinationToShow) {
  combinationsDiv.innerHTML = combinationToShow.join("<br>");
}

function groupByFirstLetter(combinations) {
  const groups = {};
  for (const combination of combinations) {
    const firstLetter = combinations[0];
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(combination);
  }
  return groups;
}
