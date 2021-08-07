const form = document.querySelector("form");
const addFile = document.querySelector(".click-folder");
const browseFile = document.querySelector("#import");
const fileInput = document.querySelector(".file-input");
const progressArea = document.querySelector(".progress-area");
const description = document.querySelector(".desc");
// const inputArea = document.querySelector(".input-area");
const breedName = document.querySelector(".breed-name");
let response;
let file;

// const addFile = document.querySelector(".click-folder");
const cnBgEffect = document.querySelector(".cn-bg-effect");
const bodyEl = document.querySelector("body");
const inputArea = document.querySelector(".input-area");
const detectElm = document.querySelector("#detect");
const wrapper = document.querySelector(".wrapper");
const button = wrapper.querySelector("#another");
const activate_btn = document.querySelector("#breed");
let adClasses = ["ad", "ads", "adsbox", "doubleclick", "ad-placement", "ad-placeholder", "adbadge", "BannerAd"];
for(let item of adClasses){
  detect.classList.add(item);
}
let getProperty = window.getComputedStyle(detectElm).getPropertyValue("display");

// For adblock feature
// if(!wrapper.classList.contains("show")){
//   getProperty == "none" ? wrapper.classList.add("show") : wrapper.classList.remove("show");
// }

activate_btn.addEventListener("click", ()=>{
  if (file){
    showPopup();
  }
  else {
    alert("Please attach an image file");
    return false;
  }
});

button.addEventListener("click", ()=>{
  hidePopup();
//   inputArea.innerHTML = `
//   <div class='folder'><img class="click-folder" src="{% static '/images/folderemoji.png' %}" id='folder'/></div>
//   <p id='instruction'>Place image file here</p>
//   <section class="progress-area"></section>
//                         `;
  window.location.reload(); // reload page to try another image file
});

// Show Popup Box function - CodingNepal
function showPopup(){
  wrapper.classList.add("show");
  cnBgEffect.classList.add("show");
  bodyEl.style.overflowY = "hidden";
}

// Hide Popup Box function - CodingNepal
function hidePopup(){
  wrapper.classList.remove("show");
  cnBgEffect.classList.remove("show");
  bodyEl.style.overflowY = "auto";
}


addFile.addEventListener("click", () =>{
    fileInput.click();
  });

browseFile.addEventListener("click", () =>{
    fileInput.click();
  });

fileInput.onchange = ({target})=>{
    file = target.files[0];
    processFile(file);
  }

function uploadFile (name) {
    console.log("Uploading...")
    browseFile.disabled = true;
    activate_btn.disabled = true;
    //If user Drag File Over DropArea
    dropArea.removeEventListener("dragover", dragOver);

    //If user leaves dragged File from DropArea
    dropArea.removeEventListener("dragleave", dragLeave);

    //If user drop File on DropArea
    dropArea.removeEventListener("drop", drop);

    //alert the user if a file is being uploaded via drag and drop
    dropArea1.addEventListener("drop", (event) => {
      // console.log("Alert me now!");
      event.preventDefault(); //preventing from default behaviour
      alert("Sorry! Action not allowed at this time");
    });

    let xhr = new XMLHttpRequest();
    xhr.open("POST","/api/predict/");
    xhr.responseType = 'json';
    //xhr.setRequestHeader('Content-type','multipart/form-data')
    xhr.upload.addEventListener("progress", ({loaded, total}) => {

        console.log("Uploading file...")
        let fileLoaded = Math.floor((loaded/total) * 100);
        let fileTotal = Math.floor(total/1000);
        let fileSize;
        (fileTotal < 1024) ? fileSize = fileTotal + "KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + "MB";
        let progressHTML = `
        <div class='folder'><img src="../../static/frontend/images/fileemoji.png"/></div>
        <span class="name">${name} • Uploading</span>
        <span class="percent">${fileLoaded}%</span>
        <div class="progress-bar">
            <div class="progress" style="width: ${fileLoaded}%"></div>
        </div>
                            `;
        inputArea.innerHTML = progressHTML;

        if (loaded == total) {
            browseFile.disabled = false;
            activate_btn.disabled = false;
            inputArea.innerHTML = `
            <div class='folder' id="checked"><img src="../../static/frontend/images/checkedemoji.png"/></div>
            <span class="name">${name} • Uploaded</span>
            <span class="size">${fileSize}</span>
                                  `;
        }

    });

    xhr.onreadystatechange = () =>{
        if (xhr.readyState === XMLHttpRequest.DONE) {
        response = xhr.response;
        const breed = response.inference
        breedName.innerHTML = breed;
        switch (breed) {
          case "Alsatian":
            description.innerHTML = "A large dog of a breed typically used as guard dogs or for police work.";
            break;

          case "Dalmatian":
            description.innerHTML = "A breed of medium-sized dog, noted for its unique white coat marked with black or brown-colored spots.";
            break;

          case "Siberian Husky":
            description.innerHTML = "A breed recognizable by its thickly furred double coat, erect triangular ears, and distinctive markings, and is smaller than the similar-looking Alaskan Malamute.";
            break;

          case "Boerboel":
            description.innerHTML = "A large, mastiff-type dog from South Africa with a black mask and a short coat.";
            break;

          default:
            console.log('<No data fetched>');
        }


        }
    }
    let data;
    let empt = document.forms["form1"]["imageFile"].value;
    console.log(empt);
    if (empt == "")
      {
        data = new FormData();
        data.append('imageFile', file);
      }
      else data = new FormData(form);

    xhr.send(data);

}

const dropArea = document.querySelector(".input-area");
const dropArea1 = document.querySelector("#input-area");
const dragText = document.querySelector("header");
// const input = dropArea.querySelector("input");

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", dragOver);

//If user leaves dragged File from DropArea
dropArea.addEventListener("dragleave", dragLeave);

//If user drop File on DropArea
dropArea.addEventListener("drop", drop);


function processFile (file) {
  let fileType = file.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    dropArea.classList.add("active");
    if(validExtensions.includes(fileType)){
      console.log(file.size/(1024*1024));
      if(file && ((file.size/(1024*1024)) <= 50)){
        let fileName = file.name;
        if(fileName.length >= 12){
          let splitName = fileName.split('.');
          fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
        }
        uploadFile(fileName);
      }
      else if(!file){
        alert("No image file detected");
      }
      else alert("File is too big");
    }else{
      alert("This is not an Image File!");
      dropArea.classList.remove("active");
      dragText.textContent = "Drag & Drop to Upload File";
    }

}

function dragOver (event) {
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
}

function dragLeave () {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
}

function drop (event) {
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  processFile(file);
}
