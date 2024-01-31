const wordsInput = document.getElementById("words");
const generateButton = document.getElementById("generate");
const permutationsTable = document.getElementById("permutations-table");
const permutationsDiv = document.getElementById("permutations-div");
const permutationCountLabel = document.getElementById("permutation-count");
const displayOptionCheckbox = document.getElementById("display-option");

generateButton.addEventListener("click", () => {
  generateNewPermutations();
  const permutationCount = permutations.length;
  permutationCountLabel.textContent = `Number of permutations: ${permutationCount}`;
});

// Event listener for the checkbox
displayOptionCheckbox.addEventListener("change", () => {
  // Clear previous results
  permutationsTable.tBodies[0].innerHTML = "";
  permutationsDiv.innerHTML = "";
  generateNewPermutations();
});

function generateNewPermutations(){
  // Get the words and generate permutations again
  const words = wordsInput.value.trim().split(" ");
  const letters = words.join("").split("");
  const kValue = parseInt(document.getElementById("k-value").value);
  const permutations = generatePermutations(letters, kValue);
  
  if (displayOptionCheckbox.checked) {
    displayPermutationsInTable(permutations);
  } else {
    displayPermutationsInDiv(permutations);
  }
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

function displayPermutationsInDiv(permutations) {
  permutationsDiv.innerHTML = permutations.join("<br>");
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



