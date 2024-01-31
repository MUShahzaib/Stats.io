const copyButton = document.getElementById("copy-permutations");
const clearButton = document.getElementById("clear-permutations");
const saveToTextButton = document.getElementById("save-to-text");

copyButton.addEventListener("click", copyPermutations);
clearButton.addEventListener("click", clearPermutations);
saveToTextButton.addEventListener("click", () => {
    saveToTextFile();
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
    link.download=filename;
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
