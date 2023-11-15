// Fetch data from JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Get the current date in the required format, e.g., 'October_29_2023'
    const currentDate = 'October_29_2023'; // Replace this with your logic to get the current date
    
    const content = data[currentDate];

    // Update elements in your HTML based on the fetched data
    document.querySelector('#SP').setAttribute('src', content.sp_image);
    document.querySelector('#Dow_Jones').setAttribute('src', content.dow_jones_image);

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