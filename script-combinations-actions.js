const copyButton = document.getElementById("copy-combinations");
const clearButton = document.getElementById("clear-combinations");
const saveToTextButton = document.getElementById("save-to-text");

copyButton.addEventListener("click", copyCombinations);
clearButton.addEventListener("click", clearCombinations);
saveToTextButton.addEventListener("click", () => {
    saveToTextFile();
  });

  function saveToTextFile() {
    // Get the results to save (either from table or div)
    const results = combinationsTable ? combinationsTable.innerText : combinationsDiv.innerText;
  
    // Create a blob object with a text/plain MIME type
    const blob = new Blob([results], { type: "text/plain" });
  
    // Create a link element for download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const filename = document.getElementById("filename").value;
    link.download=filename;
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
  alert("Combinations copied to clipboard!");
}

function clearCombinations() {
  // Clear the results (either from table or div)
  if (combinationsTable) {
    combinationsTable.tBodies[0].innerHTML = "";
  } else {
    combinationsDiv.innerHTML = "";
  }

  // Update the combination count (optional)
  combinationCountLabel.textContent = "Number of combinations: 0";
}
