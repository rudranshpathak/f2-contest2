// Function to fetch data from the API using .then
function fetchDataWithThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => renderTable(data))
      .catch(error => console.log(error));
  }
  
  // Function to fetch data from the API using async/await
  async function fetchDataWithAsyncAwait() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      renderTable(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  // Function to render the table with the fetched data
  function renderTable(data) {
    const coinTableBody = document.getElementById('coinTableBody');
    coinTableBody.innerHTML = '';
  
    data.forEach((coin, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${coin.name}</td>
        <td>${coin.symbol}</td>
        <td>${coin.current_price}</td>
        <td>${coin.total_volume}</td>
      `;
      coinTableBody.appendChild(row);
    });
  }
  
  // Function to handle search functionality
  function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
  
    const coinRows = document.querySelectorAll('#coinTableBody tr');
    coinRows.forEach(row => {
      const coinName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
      const coinSymbol = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
      if (coinName.includes(searchTerm) || coinSymbol.includes(searchTerm)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
  
  // Function to handle sorting based on market cap
  function sortByMarketCap() {
    const coinTableBody = document.getElementById('coinTableBody');
    const coinRows = Array.from(coinTableBody.getElementsByTagName('tr'));
  
    coinRows.sort((a, b) => {
      const marketCapA = parseFloat(a.querySelector('td:nth-child(4)').textContent);
      const marketCapB = parseFloat(b.querySelector('td:nth-child(4)').textContent);
      return marketCapA - marketCapB;
    });
  
    coinRows.forEach(row => coinTableBody.appendChild(row));
  }
  
  // Function to handle sorting based on percentage change
  function sortByPercentageChange() {
    const coinTableBody = document.getElementById('coinTableBody');
    const coinRows = Array.from(coinTableBody.getElementsByTagName('tr'));
  
    coinRows.sort((a, b) => {
      const percentageChangeA = parseFloat(a.querySelector('td:nth-child(5)').textContent);
      const percentageChangeB = parseFloat(b.querySelector('td:nth-child(5)').textContent);
      return percentageChangeA - percentageChangeB;
    });
  
    coinRows.forEach(row => coinTableBody.appendChild(row));
  }
  
  // Event listeners for search and sort buttons
  document.getElementById('searchInput').addEventListener('input', handleSearch);
  document.getElementById('sortMarketCapBtn').addEventListener('click', sortByMarketCap);
  document.getElementById('sortPercentageChangeBtn').addEventListener('click', sortByPercentageChange);
  
  // Fetch data using both methods
  fetchDataWithThen();
  fetchDataWithAsyncAwait();
          