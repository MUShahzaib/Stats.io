const wordsInput = document.getElementById("words-input");
const generateButton = document.getElementById("generate");
const permutationsTable = document.getElementById("permutations-table");
const permutationsDiv = document.getElementById("permutations-div");
const permutationCountLabel = document.getElementById("permutation-count");
const displayOptionCheckbox = document.getElementById("display-option");
const kInput= document.getElementById("k-value");
var permutations;

generateButton.addEventListener("click", () => {
  generateNewPermutations();
});

// Event listener for the checkbox
displayOptionCheckbox.addEventListener("change", () => {
  // Clear previous results it is called from script-actions
   clearPermutations();
   generateNewPermutations();
});

function generateNewPermutations(){
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
  permutations = generatePermutations(letters, kValue);
  displayPermutations(permutations);
  sortByDropdown.selectedIndex=0;
}

function displayPermutations(permutations){
  if (displayOptionCheckbox.checked) {
    displayPermutationsInTable(permutations);
  } else {
    displayPermutationsInDiv(permutations);
  }

  const permutationCount = permutations.length;
  permutationCountLabel.textContent = `Number of permutations: ${permutationCount}`;
}

function generatePermutations(letters, k) {
  const results = [];
  if (k === 0) {
    results.push("");
  } else {
    for (let i = 0; i < letters.length; i++) {
      const remainingLetters = letters.slice(0, i).concat(letters.slice(i + 1));
      const remainingPermutations = generatePermutations(remainingLetters, k - 1);
      for (const permutation of remainingPermutations) {
        results.push(letters[i] + permutation);
      }
    }
  }
  return results;
}

function displayPermutationsInTable(permutations) {
    // Clear previous data
    permutationsTable.tBodies[0].innerHTML = "";
    // Group permutations by first letter
    const groupedpermutations = groupByFirstLetter(permutations);
    // Loop through each letter and its permutations
    for (const letter in groupedpermutations) {
      // Create a new row for the letter
      const row = permutationsTable.tBodies[0].insertRow();
      const letterCell = row.insertCell();
      const permutationsCell = row.insertCell();
      // Set the letter as the table header
      letterCell.textContent = letter;
      // Create a container element for permutations
      const permutationsContainer = document.createElement("div");
      // Add each permutation to the container with a line break
      for (const permutation of groupedpermutations[letter]) {
        permutationsContainer.textContent += permutation + "\n";
      }
      // Set the permutations container as the cell content
      permutationsCell.appendChild(permutationsContainer);
    }
  }

function displayPermutationsInDiv(permutationsToShow) {
  permutationsDiv.innerHTML = permutationsToShow.join("<br>");
}

function groupByFirstLetter(permutations) {
  const groups = {};
  for (const permutation of permutations) {
    const firstLetter = permutation[0];
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(permutation);
  }
  return groups;
}
