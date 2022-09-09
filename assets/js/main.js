

const loadCountryData = () => {
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(allCountry => countryData(allCountry));
    
}
loadCountryData();

const countryData = allCountryData => {
    
    const countryDetailCard = document.getElementById('country-detail-container');
    allCountryData.forEach(countryDetails => {
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
    console.log(data[0].name);
    console.log(data[0].flags.png);
    
    
    const cardBody = document.getElementById('modal-content');
    const countryDetailP = document.getElementsByClassName('modal-text');

    cardBody.innerHTML = '';
    const p = document.createElement('div');
    p.classList.add('country-detail-content');
    p.innerHTML = `

    <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">${data[0].name.common}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div  class="modal-body">
                    Capital: ${data[0].capital} <br>
                    Native Name: ${data[0].name.official} <br>
                              
                    <img class='w-100 mt-2' src=' ${data[0].flags.png}'>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>

                
    
    `;
    
    cardBody.appendChild(p);
    
}