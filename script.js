// Fetch data from JSON file
fetch('https://stanford-ohs-wharton.github.io/HilaryAsh/data.json')
  .then(response => response.json())
  .then(data => {
    // Get the current date in the required format, e.g., 'October_29_2023'
    const currentPageFileName = window.location.pathname.split('/').pop(); // Extract the filename from the URL

	let currentDate;

	// Extract the date string from the filename (e.g., "November_28_2023")
	if (currentPageFileName.includes('.html')) {
	  currentDate = currentPageFileName.split('.')[0];
	} else {
	  // Set a default date here if no specific date is found in the URL
	  currentDate = 'December_05_2023'; // Replace 'Default_Date' with your desired default date
	}
    
    const content = data[currentDate];

    // Update elements in your HTML based on the fetched data
    document.querySelector('#Top_Gainers').setAttribute('src', content.top_gainers_image);
    document.querySelector('#Top_Losers').setAttribute('src', content.top_losers_image);
	
	// Assuming 'content' holds the JSON data
	const activelyTradedTable = document.getElementById('Most_Actively_Traded_Body');

	const mostActivelyTraded = content.most_actively_traded;

	mostActivelyTraded.Company.forEach((company, index) => {
	  const row = document.createElement('tr');
	  const companyCell = document.createElement('td');
	  const changePercentageCell = document.createElement('td');

	  companyCell.textContent = company;
	  changePercentageCell.textContent = mostActivelyTraded['Change Percentage'][index];

	  row.appendChild(companyCell);
	  row.appendChild(changePercentageCell);

	  activelyTradedTable.appendChild(row);
	});

    document.querySelector('#sports_equity_paragraph').textContent = content.sports_equity_paragraph;
    document.querySelector('#real_estate_paragraph').textContent = content.real_estate_paragraph;

    // Update elements in your HTML based on the fetched data within the 'corporate_news' section
    const corporateNewsSection = document.querySelector('#corporate_news');

    const companyCards = corporateNewsSection.querySelectorAll('.card-img-top');
    const companyTitles = corporateNewsSection.querySelectorAll('.card-title.text-center');
    const companyDescriptions = corporateNewsSection.querySelectorAll('.card-text');

    content.companies.forEach((company, index) => {
      if (index < companyCards.length) {
        companyCards[index].setAttribute('src', company.logo);
        companyTitles[index].textContent = company.name;
        companyDescriptions[index].textContent = company.description;
      }
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });