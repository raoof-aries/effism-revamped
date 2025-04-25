function initializeTable() {
  const tableData = [
    {
      no: 1,
      name: "Abdul Raoof ",
      employeeId: "AG00005985",
      dateOfJoining: "08-01-2024",
      company: "AES",
      division: "E-solutions",
      subDivision: "Software",
      employeeType: "Permanent",
      workLocation: "KOCHI",
      completionDate: "26-12-2024",
      completionStatus: "Completed",
    },
    {
      no: 2,
      name: "Sarah Johnson",
      employeeId: "AG00005986",
      dateOfJoining: "15-02-2024",
      company: "AES",
      division: "E-solutions",
      subDivision: "Data Science",
      employeeType: "Permanent",
      workLocation: "BANGALORE",
      completionDate: "30-12-2024",
      completionStatus: "Pending",
    },
    {
      no: 3,
      name: "Michael Chen",
      employeeId: "AG00005987",
      dateOfJoining: "22-02-2024",
      company: "AES",
      division: "Cloud Services",
      subDivision: "DevOps",
      employeeType: "Contract",
      workLocation: "PUNE",
      completionDate: "15-01-2025",
      completionStatus: "In Progress",
    },
    {
      no: 4,
      name: "Priya Sharma",
      employeeId: "AG00005988",
      dateOfJoining: "10-03-2024",
      company: "AES",
      division: "E-solutions",
      subDivision: "QA",
      employeeType: "Permanent",
      workLocation: "KOCHI",
      completionDate: "05-01-2025",
      completionStatus: "Completed",
    },
    {
      no: 5,
      name: "James Wilson",
      employeeId: "AG00005989",
      dateOfJoining: "17-03-2024",
      company: "AES",
      division: "Mobile Solutions",
      subDivision: "iOS Development",
      employeeType: "Permanent",
      workLocation: "BANGALORE",
      completionDate: "10-01-2025",
      completionStatus: "Pending",
    },
  ];

  // Table configuration
  const tableConfig = {
    columns: [
      { field: "no", header: "No" },
      { field: "name", header: "Name" },
      { field: "employeeId", header: "Employee ID" },
      { field: "dateOfJoining", header: "Date of Joining" },
      { field: "company", header: "Company" },
      { field: "division", header: "Division" },
      { field: "subDivision", header: "Sub Division" },
      { field: "employeeType", header: "Employee Type" },
      { field: "workLocation", header: "Work Location" },
      { field: "completionDate", header: "Completion Date" },
      { field: "completionStatus", header: "Completion Status" },
      { field: "view", header: "View" },
    ],
    pageSize: 3,
    currentPage: 1,
  };

  // Initialize the table state
  let state = {
    data: tableData,
    config: tableConfig,
  };

  // Function to render the table
  function renderTable() {
    const tableContainer = document.getElementById("table-container");
    if (!tableContainer) return;

    // Calculate pagination info
    const { data, config } = state;
    const startIndex = (config.currentPage - 1) * config.pageSize;
    const endIndex = Math.min(startIndex + config.pageSize, data.length);
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / config.pageSize);

    // Generate table HTML
    let tableHTML = `
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                ${config.columns
                  .map((column) => `<th>${column.header}</th>`)
                  .join("")}
              </tr>
            </thead>
            <tbody>
      `;

    // Generate rows
    if (paginatedData.length === 0) {
      tableHTML += `
          <tr>
            <td colspan="${config.columns.length}" class="no-data">No data available</td>
          </tr>
        `;
    } else {
      paginatedData.forEach((row) => {
        tableHTML += "<tr>";
        config.columns.forEach((column) => {
          if (column.field === "completionStatus") {
            const statusClass = getStatusClass(row.completionStatus);
            tableHTML += `<td><span class="status-badge ${statusClass}">${row.completionStatus}</span></td>`;
          } else if (column.field === "view") {
            tableHTML += `<td><a href="#" class="view-link">View</a></td>`;
          } else {
            tableHTML += `<td>${row[column.field]}</td>`;
          }
        });
        tableHTML += "</tr>";
      });
    }

    tableHTML += `
            </tbody>
          </table>
        </div>
        <div class="pagination-container">
          <div class="pagination-info">
            Showing ${startIndex + 1} to ${endIndex} of ${data.length} entries
          </div>
          <div class="pagination-controls">
            <button class="pagination-btn" data-action="first" ${
              config.currentPage === 1 ? "disabled" : ""
            }>First</button>
            <button class="pagination-btn" data-action="previous" ${
              config.currentPage === 1 ? "disabled" : ""
            }>Previous</button>
            <div class="pagination-pages">
              ${generatePaginationLinks(config.currentPage, totalPages)}
            </div>
            <button class="pagination-btn" data-action="next" ${
              config.currentPage === totalPages ? "disabled" : ""
            }>Next</button>
            <button class="pagination-btn" data-action="last" ${
              config.currentPage === totalPages ? "disabled" : ""
            }>Last</button>
          </div>
        </div>
      `;

    tableContainer.innerHTML = tableHTML;

    // Add event listeners to pagination buttons
    addPaginationEventListeners();
  }

  // Helper function to get status class based on completion status
  function getStatusClass(status) {
    switch (status.toLowerCase()) {
      case "completed":
        return "status-success";
      case "pending":
        return "status-warning";
      case "in progress":
        return "status-info";
      default:
        return "";
    }
  }

  // Generate pagination links
  function generatePaginationLinks(currentPage, totalPages) {
    let links = "";
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      links += `<button class="pagination-number ${
        i === currentPage ? "active" : ""
      }" data-page="${i}">${i}</button>`;
    }

    return links;
  }

  // Add event listeners to pagination controls
  function addPaginationEventListeners() {
    document.querySelectorAll(".pagination-btn").forEach((button) => {
      button.addEventListener("click", handlePaginationAction);
    });

    document.querySelectorAll(".pagination-number").forEach((button) => {
      button.addEventListener("click", handlePageNumberClick);
    });
  }

  // Handle pagination actions
  function handlePaginationAction(event) {
    const action = event.target.getAttribute("data-action");
    const { config } = state;
    const totalPages = Math.ceil(state.data.length / config.pageSize);

    switch (action) {
      case "first":
        state.config.currentPage = 1;
        break;
      case "previous":
        state.config.currentPage = Math.max(1, config.currentPage - 1);
        break;
      case "next":
        state.config.currentPage = Math.min(totalPages, config.currentPage + 1);
        break;
      case "last":
        state.config.currentPage = totalPages;
        break;
    }

    renderTable();
  }

  // Handle page number click
  function handlePageNumberClick(event) {
    const pageNumber = parseInt(event.target.getAttribute("data-page"));
    state.config.currentPage = pageNumber;
    renderTable();
  }

  // Initial render
  renderTable();

  // Expose public API
  return {
    refresh: renderTable,
    updateData: (newData) => {
      state.data = newData;
      state.config.currentPage = 1; // Reset to first page when data changes
      renderTable();
    },
  };
}

// Expose the initialization function globally
window.initializeTable = initializeTable;
