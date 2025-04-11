const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");
const resultsContainer = document.querySelector(".results-container");

let medicineData = [];

// Fetch the JSON data
fetch("indian_medicine_data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    medicineData = data;
    console.log("Medicine data loaded:", medicineData.length, "items");
  })
  .catch((error) => console.error("Error loading medicine data:", error));

// Function to check if the search box is empty
function isEmpty() {
  if (searchBox.value.trim() === "") {
    alert("Please enter Name of Medicine!!");
    return true;
  }
  return false;
}

// Search function
function searchMedicine() {
  console.log("Search button clicked");
  if (isEmpty()) {
    return;
  }

  const searchTerm = searchBox.value.trim().toLowerCase();
  console.log("Searching for:", searchTerm);

  if (medicineData.length === 0) {
    console.log("Medicine data not loaded yet");
    alert("Medicine data is still loading. Please try again in a moment.");
    return;
  }

  // Get all matches
  const foundMedicines = medicineData
    .filter((medicine) =>
      medicine.name.toLowerCase().includes(searchTerm)
    );

  // Display search results
  if (foundMedicines.length > 0) {
    console.log("Medicine found:", foundMedicines);
    resultsContainer.innerHTML = foundMedicines
      .map((medicine) => `
        <div class="medicine-card">
          <h3>${medicine.name}</h3>
          <p>Price: ₹${medicine["price(₹)"]}</p>
          <p>Manufacturer: ${medicine.manufacturer_name}</p>
          <p>Pack Size: ${medicine.pack_size_label}</p>
          <p>Composition: ${medicine.short_composition1} ${medicine.short_composition2}</p>
          <p>Discontinued: ${medicine.Is_discontinued === "TRUE" ? "Yes" : "No"}</p>
        </div>
      `)
      .join("");
  } else {
    console.log("Medicine not found");
    resultsContainer.innerHTML = "<p>No results found.</p>";
  }
}

// Add event listener to the search button
searchBtn.addEventListener("click", searchMedicine);

// Optional: Debounce search for better performance
let debounceTimer;
searchBox.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    searchMedicine();
  }, 300);
});
