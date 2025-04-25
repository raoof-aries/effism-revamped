// This function will be called by the module loader
function initializeFilter() {

  // References to DOM elements - using querySelector to ensure we find the elements
  const filterToggle = document.querySelector("#filterToggle");
  const filterContent = document.querySelector("#filterContent");
  const toggleText = document.querySelector("#toggleText");
  const toggleIcon = document.querySelector("#toggleIcon");
  const resetButton = document.querySelector("#resetFilters");
  const applyButton = document.querySelector("#applyFilters");
  const selectedFiltersContainer = document.querySelector("#selectedFilters");
  const allSelects = document.querySelectorAll(".filter-section select");

 

  // Toggle filter visibility
  if (filterToggle && filterContent && toggleText && toggleIcon) {
    filterToggle.addEventListener("click", function (e) {
      e.preventDefault();
      filterContent.classList.toggle("expanded");

      if (filterContent.classList.contains("expanded")) {
        toggleText.textContent = "Hide filters";
        toggleIcon.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
      } else {
        toggleText.textContent = "Show filters";
        toggleIcon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
      }

      
    });
  }

  // Apply filters
  if (applyButton && selectedFiltersContainer) {
    applyButton.addEventListener("click", function (e) {
      e.preventDefault();
      updateSelectedFilters();

      // Auto-collapse the filter section when filters are applied
      if (filterContent && filterContent.classList.contains("expanded")) {
        // Collapse the filter content
        filterContent.classList.remove("expanded");

        // Update toggle button text and icon
        if (toggleText) {
          toggleText.textContent = "Show filters";
        }

        if (toggleIcon) {
          toggleIcon.innerHTML =
            '<polyline points="6 9 12 15 18 9"></polyline>';
        }
      }
;
      // Data filter logic here
    });
  }

  // Reset filters
  if (resetButton && allSelects.length > 0) {
    resetButton.addEventListener("click", function (e) {
      e.preventDefault();
      allSelects.forEach((select) => {
        select.selectedIndex = 0;
      });
      updateSelectedFilters();
    });
  }

  // Update selected filters display
  function updateSelectedFilters() {
    if (!selectedFiltersContainer) return;

    selectedFiltersContainer.innerHTML = "";
    let hasSelectedFilters = false;

    allSelects.forEach((select) => {
      if (select.value && select.value !== "") {
        hasSelectedFilters = true;
        const selectedText = select.options[select.selectedIndex].text;
        // Get label - try to obtain text from a preceding LABEL element
        const label = select.previousElementSibling;
        const labelText =
          label && label.tagName === "LABEL" ? label.textContent : select.id;

        const filterTag = document.createElement("div");
        filterTag.className = "selected-filter";
        filterTag.innerHTML = `
          <span>${labelText}:</span> ${selectedText}
          <button class="remove-filter" data-select-id="${select.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        `;
        selectedFiltersContainer.appendChild(filterTag);
      }
    });

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-filter").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const selectId = this.getAttribute("data-select-id");
        const select = document.getElementById(selectId);
        if (select) {
          select.selectedIndex = 0;
          updateSelectedFilters();
        }
      });
    });

    // Show or hide the container based on whether there are any selected filters
    if (hasSelectedFilters) {
      selectedFiltersContainer.style.display = "flex";
    } else {
      selectedFiltersContainer.style.display = "none";
    }

    
  }

  // Force the filter content to be expanded on load
  if (filterContent) {
    filterContent.classList.add("expanded");
  }

  // Update toggle button text and icon
  if (toggleText && toggleIcon) {
    toggleText.textContent = "Hide filters";
    toggleIcon.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
  
  }

  // Run an initial update to show any pre-selected filters
  updateSelectedFilters();

}

// Make the function available globally
window.initializeFilter = initializeFilter;
