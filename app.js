let count = 1;
const BASE_URL = `https://rickandmortyapi.com/api`;
const URLCHARTS = `/character/?page=1`;
let url = BASE_URL + URLCHARTS;

async function getData(url) {
  try {
    const respuestaApi = await fetch(url);
    const respuestaJson = await respuestaApi.json();
    let characters = respuestaJson.results;
    setCharacters(characters);
  }
  catch{
    let docError = document.getElementById("mainH1")
    docError.innerHTML = "Not found 404"
  }
}
getData(url);

function openModal(name, image, status, species, location, gender) {
  let containerModal = document.getElementById("container-modal");
  $(document).ready(function () {
    $("#myModal").modal("show");
    $("#myButton").on("click", function () {
      $("#myModal").modal("show");
    });
  });
  containerModal.innerHTML = "";
  containerModal.innerHTML = `
    <div class="m-4">
      <div class="modal fade" id="myModal" data-bs-backdrop="static" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">${name}</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
            <img src="${image}"
              <p class="text-secondary"></p>
            </div>
            <div id="footer" class="modal-footer">
            <div class="footer-tags">
            <span class="tags">${species}</span>
            <span class="tags" >${status}</span>
            <span class="tags" >${location}</span>
            <span class="tags" >${gender}</span>
          </div>
        </div>
    </div> `;
   
}

function setCharacters(characters) {
  let container = document.getElementById("container");
  container.innerHTML = "";
  characters.forEach((element) => {
    container.innerHTML += `<div class="card" style="width: 18rem;">
    <button onclick="openModal('${element.name}','${element.image}','${element.species}','${element.status}','${element.gender}','${element.location.name}')" class="btnImage" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    <img src="${element.image}"class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">${element.name}</p>
  </div>
   </button> 
  </div> 
  `;
  });
}

document.getElementById("search").addEventListener("click", search);

async function search() {
  let docError = document.getElementById("mainH1")
    docError.innerHTML =""
  document.getElementById("btnLeft").style.display = "none"
  document.getElementById("btnRight").style.display = "none"
  let input = document.getElementById("input").value;
  let urlName = `${BASE_URL}/character/?name=${input}`
  if(input.length!==0){
  getData(urlName)
  }

}

document.getElementById("btnLeft").addEventListener("click", backPage);
document.getElementById("btnRight").addEventListener("click", nextPage);

function nextPage() {
  count++;
  let UrlPage = `https://rickandmortyapi.com/api/character/?page=${count}`;
  getData(UrlPage);
}
function backPage() {
  if (count > 1) {
    count--;
  }

  let UrlPage = `https://rickandmortyapi.com/api/character/?page=${count}`;
  getData(UrlPage);
}
