const Ref = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
};

Ref.selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
    const breedId = event.currentTarget.value;
    console.log(breedId);
    fetchCatByBreed(breedId);
};

const url = 'https://api.thecatapi.com/v1';
const api_key = "live_i0tDaOGInqQ26rh7JUwZgUxN2ia9tgGfeQAmLlGg5e4sjZuijJKVoZO121TcrnQ9";
    

function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
    .then(response => {
        if (!response.ok) {
        throw new Error(response.status);
        }
        return response.json();
    })
    .then(data => {
        console.dir(data);
        console.log(data[0].breeds);

                Ref.divCatInfo.innerHTML = `<img src="${data[0].url}" alt="${data[0].breeds[0].name}" width="300"/><h1>${data[0].breeds[0].name}</h1><p>${data[0].breeds[0].description}</p><p>${data[0].breeds[0].temperament}</p>`

    })
    .catch(error => {
        console.log(error);
    });
};

function addArrBreedsToSelector(arrBreedsId) {

    let options = '';
    for (const item of arrBreedsId) {
        options += `<option value="${item.id}">${item.breed}</option>`;
    }
    // console.log(options);
    Ref.selector.innerHTML = options;
}


function fetchBreeds() {
    let arrBreedsId = [];

    return fetch(`${url}/breeds?api_key=${api_key}`)
    .then(response => {
        if (!response.ok) {
        throw new Error(response.status);
        }
        return response.json();
    })
        .then(data => {
        console.log(data);
        data.forEach(element => {
            arrBreedsId.push({breed: element.name, id: element.id});
        });
        // console.log(arrBreedsId);
        addArrBreedsToSelector(arrBreedsId);
    })
    .catch(error => {
        console.log(error);
    });
};
fetchBreeds()

