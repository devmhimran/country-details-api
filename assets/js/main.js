

const loadCountryData = () => {
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(allCountry => countryData(allCountry))
}
loadCountryData();

const countryData = allCountryData => {
    
    const countryDetailCard = document.getElementById('country-detail-container');
    allCountryData.forEach(countryDetails => {
        // console.log(countryDetails);
 
        const createDetailCard = document.createElement('div');
        createDetailCard.classList.add('col-md-3');
        createDetailCard.innerHTML = `
        <div class="card">
            <div class="card-body">
            <img class="flag-img" src=${countryDetails.flags.png} alt=""></img>
                <h4 class="country-name mt-3">${countryDetails.name.common}</h4>
                <p>${countryDetails.capital}</p>
                <a onclick='singleCountryDetail("${countryDetails.name.common}")' class="btn btn-primary" href="#" data-bs-toggle="modal" 
                data-bs-target="#exampleModal">See More</a>
            </div>
        </div>
        `;
        
        countryDetailCard.appendChild(createDetailCard);
    });
}
// document.getElementById('country-detail-button').addEventListener('click', function(event){
//     console.log(event.target);
// });

const singleCountryDetail = singleDetail => {
    
    fetch(`https://restcountries.com/v3.1/name/${singleDetail}`)
    .then(res => res.json())
    .then(json => singleCountryDetails(json));
    
}

const singleCountryDetails = data =>{
    console.log(data[0].name.official);
    const spinner =document.getElementById('spinner');
    spinner.style.display = 'none';
    const cardTitle = document.getElementById('modal-title');
    const cardBody = document.getElementById('modal-body');
    const countryDetailP = document.getElementsByClassName('modal-text');
    // countryDetailP.forEach(countryDetailText => {
    //     countryDetailText.innerText = '';
    // });
    for( const countryDetailText of countryDetailP ){
        countryDetailText.innerText = '';
    }
    cardTitle.innerText = data[0].name.common;
    const p = document.createElement('p');
    p.classList.add('modal-text')
    p.innerText = `
    Capital: ${data[0].capital}
    Native Name: ${data[0].name.official}
    `;
    cardBody.appendChild(p);
}