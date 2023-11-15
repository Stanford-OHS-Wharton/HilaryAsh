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

    const companies = content.companies;
    companies.forEach((company, index) => {
      const companyCard = document.querySelectorAll('.card-img-top')[index];
      companyCard.setAttribute('src', company.logo);

      const companyName = document.querySelectorAll('.card-title.text-center')[index];
      companyName.textContent = company.name;

      const companyDescription = document.querySelectorAll('.card-text')[index];
      companyDescription.textContent = company.description;
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
