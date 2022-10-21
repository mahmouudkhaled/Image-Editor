let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let hueRotate = document.getElementById('hue-rotate');

let upload = document.getElementById('upload');
let download = document.getElementById('download');
let reset = document.querySelector('span');

let image = document.getElementById('img');
let imgBox = document.getElementById('img-box'); 

const canvas = document.getElementById("canvas");
const contxt = canvas.getContext("2d");

//==============================================================

function resetValues() {
    contxt.filter = "none";
    saturate.value = 100;
    contrast.value = 100;
    brightness.value = 100;
    sepia.value = 0;
    grayscale.value = 0;
    blur.value = 0;
    hueRotate.value = 0;
}

reset.onclick = function () {
    contxt.filter = "none";
    contxt.drawImage(image, 0, 0, canvas.width, canvas.height);
    saturate.value = 100;
    contrast.value = 100;
    brightness.value = 100;
    sepia.value = 0;
    grayscale.value = 0;
    blur.value = 0;
    hueRotate.value = 0;
}


window.onload = function () {
    download.style.display = "none";
    reset.style.display = "none";
    imgBox.style.display = "none";
};

upload.onchange = function () {
    download.style.display = "block";
    reset.style.display = "block";
    imgBox.style.display = "block";
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function () {
        image.src = file.result;
    }
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        contxt.drawImage(image, 0, 0, canvas.width, canvas.height);
        image.style.display = 'none';
    }
    resetValues()

};

let filters = document.querySelectorAll('ul li input');
filters.forEach(filter => {
    filter.addEventListener('input', function () {

        contxt.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `
        contxt.drawImage(image, 0, 0, canvas.width, canvas.height);

     /* Another Solve */  
     
        // let effects = [];
        // filters.forEach(effect => {
        //     effects.push(`${effect.getAttribute("id")}(${effect.value}${effect.getAttribute("id") === "grayscale" ? ""
        //         : effect.getAttribute("id") === "blur" ? "px" : effect.getAttribute("id") === "hue-rotate" ? "deg" : "%"})`)
        // });
        // canvas.style.filter = effects.join('');
    });
});

download.onclick = function () {
    download.href = canvas.toDataURL("image/jpg");
};
