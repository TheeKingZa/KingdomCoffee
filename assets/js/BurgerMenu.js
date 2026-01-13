function parseCSVLine(line) {
  // Handles commas inside quotes:  "A, B",C  -> ["A, B", "C"]
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"' ) {
      // Toggle quotes, but allow escaped quotes ("")
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current.trim());
  return result;
}

function formatPrice(value) {
  // optional: format prices nicely if your CSV price column is numeric
  const v = value.trim();
  const num = Number(v.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(num)) return v;         // keep original if not a number
  return `R${num.toFixed(2)}`;
}

async function loadMenuCSV({ url, headerRowId, bodyId, formatLastColumnAsPrice = false }) {
  const headerRow = document.getElementById(headerRowId);
  const tableBody = document.getElementById(bodyId);

  if (!headerRow || !tableBody) {
    console.error("Missing table elements:", { headerRowId, bodyId });
    return;
  }

  // Clear existing content (prevents duplicates)
  headerRow.textContent = "";
  tableBody.textContent = "";

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to load ${url} (${response.status})`);

    const text = await response.text();

    // Split lines, remove empty lines, remove Windows \r
    const lines = text
      .split("\n")
      .map(l => l.replace(/\r/g, "").trim())
      .filter(Boolean);

    if (lines.length === 0) return;

    const rows = lines.map(parseCSVLine);

    // Build header
    const headerFrag = document.createDocumentFragment();
    rows[0].forEach(col => {
      const th = document.createElement("th");
      th.textContent = col;
      headerFrag.appendChild(th);
    });
    headerRow.appendChild(headerFrag);

    // Build body
    const bodyFrag = document.createDocumentFragment();
    const lastColIndex = rows[0].length - 1;

    rows.slice(1).forEach(row => {
      // Skip totally empty rows
      if (row.every(cell => !cell || !cell.trim())) return;

      const tr = document.createElement("tr");

      row.forEach((cell, idx) => {
        const td = document.createElement("td");

        let value = cell ?? "";
        if (formatLastColumnAsPrice && idx === lastColIndex) {
          value = formatPrice(value);
          td.classList.add("is-price"); // style in CSS if you want
        }

        td.textContent = value;
        tr.appendChild(td);
      });

      bodyFrag.appendChild(tr);
    });

    tableBody.appendChild(bodyFrag);
  } catch (err) {
    console.error(err);
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 10;
    td.textContent = "Menu is temporarily unavailable. Please try again.";
    tr.appendChild(td);
    tableBody.appendChild(tr);
  }
}

// Run after DOM is ready (safe even if script is not deferred)
document.addEventListener("DOMContentLoaded", () => {
  loadMenuCSV({
    url: "./assets/data/BurgerMenu.csv",
    headerRowId: "Burger_tableHeaders",
    bodyId: "Burger_tableBody",
    formatLastColumnAsPrice: true
  });
});