const copyButton = document.getElementById("copy-permutations");
const clearButton = document.getElementById("clear-permutations");
const saveToTextButton = document.getElementById("save-to-text");
const sortByDropdown = document.getElementById("sort-by");
const selectedSortOption = sortByDropdown.value;
const fontSizeSlider = document.getElementById("font-size");
let words;

loadWords();

copyButton.addEventListener("click", copyPermutations);
clearButton.addEventListener("click", clearPermutations);
saveToTextButton.addEventListener("click", () => {
  saveToTextFile();
});
sortByDropdown.addEventListener("change", () => {
  const selectedSortOption = sortByDropdown.value;
  sortPermutations(permutations, selectedSortOption);
  displayPermutations();
  // Update the displayed permutations
});

fontSizeSlider.addEventListener("change", () => {
  const newFontSize = parseInt(fontSizeSlider.value);
  document.documentElement.style.setProperty("--font-size", `${newFontSize}px`);
});


function saveToTextFile() {
  // Get the results to save (either from table or div)
  const results = permutationsTable ? permutationsTable.innerText : permutationsDiv.innerText;

  // Create a blob object with a text/plain MIME type
  const blob = new Blob([results], { type: "text/plain" });

  // Create a link element for download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  const filename = document.getElementById("filename").value;
  link.download = filename;
  //link.download = "permutations.txt";
  link.click();
}

function copyPermutations() {
  // Get the results to copy (either from table or div)
  const results = permutationsTable ? permutationsTable.innerText : permutationsDiv.innerText;

  // Create a temporary textarea element to hold the results
  const textarea = document.createElement("textarea");
  textarea.value = results;
  textarea.style.position = "fixed"; // Make it off-screen
  document.body.appendChild(textarea);

  // Select the text and copy it to the clipboard
  textarea.select();
  document.execCommand("copy");

  // Remove the temporary textarea
  document.body.removeChild(textarea);

  // Show a success message (optional)
  alert("permutations copied to clipboard!");
}

function clearPermutations() {
  // Clear the results (either from table or div)
  if (permutationsTable) {
    permutationsTable.tBodies[0].innerHTML = "";
  } else {
    permutationsDiv.innerHTML = "";
  }

  // Update the permutation count (optional)
  permutationCountLabel.textContent = "Number of permutations: 0";
}


// Function to sort permutations based on different criteria
function sortPermutations(permutations, sortOption) {
  switch (sortOption) {
    case "firstLetterAsc":
      permutations.sort((a, b) => a[0].localeCompare(b[0]));
      break;
    case "firstLetterDesc":
      permutations.sort((a, b) => b[0].localeCompare(a[0]));
      break;
    case "wordLengthAsc":
      permutations.sort((a, b) => a.length - b.length);
      break;
    case "wordLengthDesc":
      permutations.sort((a, b) => b.length - a.length);
      break;
    case "alphabeticalFull":
      permutations.sort((a, b) => a.localeCompare(b));
      break;
    case "meaningFul":
      sortMeaningful();
    break;
    default:
    // No sorting needed if sortOption is "none" or invalid
  }
}


function sortMeaningful() {
  console.log(permutations.length);
  const meaningfulPermutations = permutations.filter(word => wordExists(word));
  // Display meaningful permutations
  displayPermutationsInDiv(meaningfulPermutations);
}

async function loadWords(){
  // Load the word list at startup
 words = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words.txt')
.then(response => response.text())
.then(text => text.split('\n').map(word => word.toLowerCase())); // Convert to lowercase
}

// Function to check if a word exists
 function wordExists(word) {
  console.log("wordsLength"+words.length+words[26]);
  console.log(word);
  if(words.includes(word.toLowerCase()) || words.includes(word.toLowerCase()+"s") ) // Consider case-insensitive search)
  {
       return word;
  }
  else if(words.includes(word.toUpperCase()) || words.includes(word.toLowerCase()+"S")){
    return word;
  }

  return "";
}

// Usage in your code
// const userWord = "meaningful";
// if (wordExists(userWord)) {
//   console.log("Word found!");
// } else {
//   console.log("Word not found.");
// }






