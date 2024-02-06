const copyButton = document.getElementById("copy-combinations");
const clearButton = document.getElementById("clear-combinations");
const saveToTextButton = document.getElementById("save-to-text");
const sortByDropdown = document.getElementById("sort-by");
const selectedSortOption = sortByDropdown.value;
const fontSizeSlider = document.getElementById("font-size");
let words;
var wordsSet; // using words set for faster searching/sorting
var sortedCombinations;

///// load the words from url dictionary in the start /////////////////
loadWords();

copyButton.addEventListener("click", copyCombinations);
clearButton.addEventListener("click", clearCombinations);
saveToTextButton.addEventListener("click", () => {
  saveToTextFile();
});
sortByDropdown.addEventListener("change", () => {
  const selectedSortOption = sortByDropdown.value;
  sortCombinations(combinations, selectedSortOption);
  // Update the displayed combinations
  displayCombinations(sortedcombinations);
});

fontSizeSlider.addEventListener("change", () => {
  const newFontSize = parseInt(fontSizeSlider.value);
  document.documentElement.style.setProperty("--font-size", `${newFontSize}px`);
});

async function loadWords(){
  // Load the word list at startup
 words = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words.txt')
.then(response => response.text())
.then(text => text.split('\n').map(word => word.toLowerCase())); // Convert to lowercase
wordsSet=new Set(words);  // assign words to word set for faster searching later
}

function saveToTextFile() {
  // Get the results to save (either from table or div)
  const results = combinationsTable ? combinationsTable.innerText : combinationsDiv.innerText;

  // Create a blob object with a text/plain MIME type
  const blob = new Blob([results], { type: "text/plain" });

  // Create a link element for download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  const filename = document.getElementById("filename").value;
  link.download = filename;
  //link.download = "combinations.txt";
  link.click();
}

function copyCombinations() {
  // Get the results to copy (either from table or div)
  const results = combinationsTable ? combinationsTable.innerText : combinationsDiv.innerText;

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
  alert("combinations copied to clipboard!");
}

function clearCombinations() {
  // Clear the results (either from table or div)
    combinationsTable.tBodies[0].innerHTML = "";
    combinationsDiv.innerHTML = "";
  // Update the combination count (optional)
  combinationCountLabel.textContent = "Number of combinations: 0";
  sortByDropdown.value="None";
}

// Function to sort combinations based on different criteria
function sortCombinations(combinations, sortOption) {
  switch (sortOption) {
    case "firstLetterAsc":
      sortedCombinations=combinations.sort((a, b) => a[0].localeCompare(b[0]));
      break;
    case "firstLetterDesc":
      sortedCombinations=combinations.sort((a, b) => b[0].localeCompare(a[0]));
      break;
    case "wordLengthAsc":
      sortedCombinations=combinations.sort((a, b) => a.length - b.length);
      break;
    case "wordLengthDesc":
      sortedCombinations=combinations.sort((a, b) => b.length - a.length);
      break;
    case "alphabeticalFull":
      sortedCombinations=combinations.sort((a, b) => a.localeCompare(b));
      break;
    case "meaningFul":
      sortMeaningful();
    break;
    default:
    // No sorting needed if sortOption is "none" or invalid
  }
}

function sortMeaningful() {
  console.log(combinations.length);
  const meaningfulcombinations = combinations.filter(word => wordExists(word));
  sortedCombinations=meaningfulcombinations;
}

// Function to check if a word exists
 function wordExists(word) {
  //if(words.includes(word.toLowerCase()) || words.includes(word.toLowerCase()+"s") ) // Consider case-insensitive search)
  if(wordsSet.has(word.toLowerCase()) || wordsSet.has(word.toLowerCase()+"s"))
  {
     //console.log(word);
       return word;
  }
  return "";
}
