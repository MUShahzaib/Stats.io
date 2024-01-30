const wordsInput = document.getElementById("words");
const generateButton = document.getElementById("generate");
const combinationsTable = document.getElementById("combinations-table");
const combinationsDiv = document.getElementById("combinations-div");
const combinationCountLabel = document.getElementById("combination-count");
const displayOptionCheckbox = document.getElementById("display-option");

generateButton.addEventListener("click", () => {
  const words = wordsInput.value.trim().split(" ");
  const letters = words.join("").split("");
  const combinations = generateCombinations(letters);

  if (displayOptionCheckbox.checked) {
    displayCombinationsInTable(combinations);
  } else {
    displayCombinationsInDiv(combinations);
  }

  const combinationCount = combinations.length;
  combinationCountLabel.textContent = `Number of combinations: ${combinationCount}`;
});

function generateCombinations(letters) {
  const results = [];
  if (letters.length === 0) {
    results.push("");
  } else {
    for (let i = 0; i < letters.length; i++) {
     // const remainingLetters = letters.slice(0, i).concat(letters.slice(i + 1));
     const remainingLetters = letters.slice(0, i).concat(letters.slice(i + 1, letters.length));
      const remainingCombinations = generateCombinations(remainingLetters);
      for (const combination of remainingCombinations) {
        results.push(letters[i] + combination);
      }
    }
  }
  return results;
}

function displayCombinationsInTable(combinations) {
    // Clear previous data
    combinationsTable.tBodies[0].innerHTML = "";
  
    // Group combinations by first letter
    const groupedCombinations = groupByFirstLetter(combinations);
  
    // Loop through each letter and its combinations
    for (const letter in groupedCombinations) {
      // Create a new row for the letter
      const row = combinationsTable.tBodies[0].insertRow();
      const letterCell = row.insertCell();
      const combinationsCell = row.insertCell();
  
      // Set the letter as the table header
      letterCell.textContent = letter;
  
      // Create a container element for combinations
      const combinationsContainer = document.createElement("div");
  
      // Add each combination to the container with a line break
      for (const combination of groupedCombinations[letter]) {
        combinationsContainer.textContent += combination + "\n";
      }
  
      // Set the combinations container as the cell content
      combinationsCell.appendChild(combinationsContainer);
    }
  }

function displayCombinationsInDiv(combinations) {
  combinationsDiv.innerHTML = combinations.join("<br>");
}

function groupByFirstLetter(combinations) {
  const groups = {};
  for (const combination of combinations) {
    const firstLetter = combination[0];
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(combination);
  }
  return groups;
}

// Event listener for the checkbox
displayOptionCheckbox.addEventListener("change", () => {
  // Clear previous results
  combinationsTable.tBodies[0].innerHTML = "";
  combinationsDiv.innerHTML = "";

  // Get the words and generate combinations again
  const words = wordsInput.value.trim().split(" ");
  const letters = words.join("").split("");
  const combinations = generateCombinations(letters);

  if (displayOptionCheckbox.checked) {
    displayCombinationsInTable(combinations);
  } else {
    displayCombinationsInDiv(combinations);
  }
});


