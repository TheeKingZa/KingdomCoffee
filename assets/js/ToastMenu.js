// (This function loads a CSV file and displays it in the table)
    async function loadCSV() {
      const response = await fetch('./assets/data/ToastMenu.csv'); 
      //(Ensure [file].csv is in same folder)
      const text = await response.text();

      const rows = text.split('\n').map(row => row.split(','));

      // (Create header row)
      const headerRow = document.getElementById('Toast_tableHeaders');
      rows[0].forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        headerRow.appendChild(th);
      });

      // (Create table rows)
      const tableBody = document.getElementById('Toast_tableBody');
      rows.slice(1).forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
          const td = document.createElement('td');
          td.textContent = cell;
          tr.appendChild(td);
        });
        tableBody.appendChild(tr);
      });
    }

    loadCSV(); // (Call function on page load)