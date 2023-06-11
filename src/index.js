import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const ref = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

ref.loader.classList.replace('loader', 'is-hidden');
ref.error.classList.add('is-hidden');
ref.divCatInfo.classList.add('is-hidden');



let arrBreedsId = [];
fetchBreeds()
.then(data => {
    // console.log(data);
    data.forEach(element => {
        arrBreedsId.push({text: element.name, value: element.id});
    });
    // console.log(arrBreedsId);
new SlimSelect({
    select: ref.selector,
    data: arrBreedsId,
});
    
    // let options = '';
    // for (const item of arrBreedsId) {
    //     options += `<option value="${item.id}">${item.breed}</option>`;
    // }
    // // console.log(options);
    // ref.selector.innerHTML = options;
    })
    .catch(onFetchError);




ref.selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
    ref.loader.classList.replace('is-hidden', 'loader');
    ref.selector.classList.add('is-hidden');
    ref.divCatInfo.innerHTML = '';

    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
    .then(data => {
        ref.loader.classList.replace('loader', 'is-hidden');
        ref.selector.classList.remove('is-hidden');
        ref.divCatInfo.classList.remove('is-hidden');
        ref.divCatInfo.innerHTML = `<div class="box-img"><img src="${data[0].url}" alt="${data[0].breeds[0].name}" width="300"/></div><div class="box"><h1>${data[0].breeds[0].name}</h1><p>${data[0].breeds[0].description}</p><p><b>Temperament:</b> ${data[0].breeds[0].temperament}</p></div>`
    })
    .catch(onFetchError);
};

function onFetchError(error) {
    ref.selector.classList.add('is-hidden');
    if (ref.loader.classList.contains('loader')) {
        ref.loader.classList.replace('loader', 'is-hidden');
    }
    // ref.error.classList.remove('is-hidden');
    Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
};

function removeMarkup(reference) {
    reference.textContent = '';
}
   






    





