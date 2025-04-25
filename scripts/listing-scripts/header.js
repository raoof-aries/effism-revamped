// Enhanced header functionality with dropdowns
function initializeHeader() {
  // Handle navigation item clicks
  const navItems = document.querySelectorAll(".nav-item");

  // Create dropdown menus based on the navigation items with dropdown indicators
  const dropdownItems = document.querySelectorAll(
    ".nav-item:has(.dropdown-indicator)"
  );

  // Initialize dropdowns
  dropdownItems.forEach((item) => {
    const navText = item.querySelector("span").textContent;
    const dropdownMenu = createDropdownMenu(navText);

    // Append dropdown to body
    document.body.appendChild(dropdownMenu);

    // Position dropdown under nav item
    item.addEventListener("mouseenter", function () {
      const rect = this.getBoundingClientRect();
      dropdownMenu.style.top = `${rect.bottom}px`;
      dropdownMenu.style.left = `${rect.left}px`;
      dropdownMenu.style.width = `${rect.width}px`;
      dropdownMenu.classList.add("visible");

      // Rotate dropdown indicator
      const indicator = this.querySelector(".dropdown-indicator");
      if (indicator) {
        indicator.style.transform = "rotate(180deg)";
      }
    });

    item.addEventListener("mouseleave", function (e) {
      // Check if hovering over dropdown menu
      const relatedTarget = e.relatedTarget;
      if (!dropdownMenu.contains(relatedTarget)) {
        dropdownMenu.classList.remove("visible");

        // Reset dropdown indicator
        const indicator = this.querySelector(".dropdown-indicator");
        if (indicator) {
          indicator.style.transform = "rotate(0)";
        }
      }
    });

    // Handle dropdown menu mouseleave
    dropdownMenu.addEventListener("mouseleave", function (e) {
      // Check if not hovering over the nav item
      const relatedTarget = e.relatedTarget;
      if (relatedTarget !== item && !item.contains(relatedTarget)) {
        dropdownMenu.classList.remove("visible");

        // Reset dropdown indicator
        const indicator = item.querySelector(".dropdown-indicator");
        if (indicator) {
          indicator.style.transform = "rotate(0)";
        }
      }
    });
  });

  // Handle nav item clicks
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      // Only set active class if item doesn't have dropdown
      if (!this.querySelector(".dropdown-indicator")) {
        e.preventDefault();
        navItems.forEach((el) => el.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Add click handler for Today in Aries
  const todayInAries = document.querySelector(".today-in-aries");
  if (todayInAries) {
    todayInAries.addEventListener("click", function () {
      alert("Opening company events: birthdays, anniversaries and more!");
    });
  }
}

// Create dropdown menu based on nav item text
function createDropdownMenu(navText) {
  const dropdown = document.createElement("div");
  dropdown.className = "nav-dropdown";

  // Different menu items based on navigation text
  let menuItems = [];

  switch (navText.trim()) {
    case "Customise":
      menuItems = [
        "Job Type Customisation",
        "Routine Jobs Customisation",
        "Team Customisation",
        "Time Customisation",
      ];
      break;
    case "Delegation":
      menuItems = ["Delegate Job", "Edit Delegation", "Tasks Assigned To Me"];
      break;
    case "Reports":
      menuItems = [
        "Daily Job Status",
        "View All Jobs",
        "Time Sheet",
        "Leave Details",
        "Monthly Leave Summary",
        "Yearly Leave Summary",
        "Carry Forward Jobs",
        "Jobs In Store",
        "1:1:1 Store",
      ];
      break;
    case "Review":
      menuItems = [
        "Daily Review",
        "Routine Checklist",
        "Monthly Summary",
        "Complete History",
        "Review Log",
        "Marketing Performance Evaluation",
      ];
      break;
    case "Monthly Plan":
      menuItems = ["Monthly Plan Entry", "Monthly Plan Review"];
      break;
    default:
      menuItems = ["Menu Item 1", "Menu Item 2"];
  }

  // Create menu items
  menuItems.forEach((item) => {
    const menuItem = document.createElement("a");
    menuItem.href = "#";
    menuItem.className = "dropdown-item";
    menuItem.textContent = item;
    dropdown.appendChild(menuItem);
  });

  return dropdown;
}

// Add dropdown styles if not in CSS
if (!document.querySelector("#dropdown-styles")) {
  const style = document.createElement("style");
  style.id = "dropdown-styles";
  style.textContent = `
    .nav-dropdown {
      position: absolute;
      background-color: var(--surface-bg, #ffffff);
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: 0 0 var(--radius, 0.55rem) var(--radius, 0.55rem);
      box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1));
      z-index: 150;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0.2s ease;
      overflow: hidden;
    }
    
    .nav-dropdown.visible {
      opacity: 1;
      visibility: visible;
    }
    
    .dropdown-item {
      display: block;
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      color: var(--text-secondary, #64748b);
      text-decoration: none;
      transition: all 0.2s ease;
      border-bottom: 1px solid var(--border-color, #e2e8f0);
    }
    
    .dropdown-item:last-child {
      border-bottom: none;
    }
    
    .dropdown-item:hover {
      background-color: #f8fafc;
      color: var(--accent-blue, #055e6f);
    }
    
    .nav-item .dropdown-indicator {
      transition: transform 0.3s ease;
    }
  `;
  document.head.appendChild(style);
}
