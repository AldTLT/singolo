onload = function () {
    let onClickElement;

    //Set z-index for slides
    document.querySelector('#slide1').style.zIndex = 10;
    document.querySelector('#slide2').style.zIndex = 5;

    this.document.onclick = function (e) {

        onClickElement = e.path[1];

        if (onClickElement !== undefined) {

            //Click on a phone to switch off
            if (onClickElement.classList[0] === 'base-container' || onClickElement.classList[0] === 'screen') {
                let display = onClickElement.parentElement.querySelector('.screen').style.display;

                display = display == 'none' ? 'block' : 'none';

                onClickElement.parentElement.querySelector('.screen').style.display = display;
            }

            //Click on a image from gallery to set border
            if (onClickElement.classList[0] === 'gallery-image') {

                document.querySelectorAll('.gallery-image').forEach(element => {
                    element.style.border = 'none';
                    element.style.padding = '5px';
                });

                let style = onClickElement.style;
                style.border = '5px solid #F06C64';
                style.padding = '0';
            }

            //Click on a arrow to slide
            if (onClickElement.classList[0] === 'arrow') {
                document.querySelectorAll('.arrow').forEach(arrow => arrow.style.pointerEvents = 'none');

                MoveSlide(onClickElement.classList[1]);
            }

            //Click on a menu item to change color
            if (onClickElement.classList[0] === 'navigation-menu') {
                document.querySelectorAll('.nav-main').forEach(item => {
                    item.style.color = '#ffffff';
                });

                onClickElement.firstElementChild.style.color = '#f06c64';
            }

            if (onClickElement.classList[0] === 'menu-item') {
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.style.color = '#767e9e';
                });

                onClickElement.style.color = '#dedede';
            }
        }
    };
}

//Move slides
function MoveSlide(arrowDirection) {
    let position = arrowDirection === 'arrow-left' ? '-1020px' : '1020px';
    const slides = document.querySelectorAll('.slider-wrapper');
    let firstSlide;
    let secondSlide;

    slides.forEach(item => {
        if (item.style.zIndex == 10) {
            firstSlide = item;
        }
        else {
            secondSlide = item;
        }
    });

    firstSlide.style.transition = 'transform 0.5s ease-in-out';
    firstSlide.style.transform = `translateX(${position})`;

    firstSlide.addEventListener('transitionend', function () {
        firstSlide.style.zIndex = 5;
        secondSlide.style.zIndex = 10;
        firstSlide.style.transform = 'none';
        firstSlide.style.transition = 'none';
        document.querySelectorAll('.arrow').forEach(arrow => arrow.style.pointerEvents = 'auto');
    });

}

//Change positions of gallery images
function ChangeGalleryPosition(i) {
    let positions = [];

    let gallery = document.querySelectorAll('.gallery-image');
    gallery.forEach((image, i) => {
        let imageItems = {
        };

        let t = image.firstElementChild;
        imageItems.src = image.firstElementChild.src;

        positions[i] = imageItems;
    });

    positions = MoveImage(positions);

    gallery.forEach((image, i) => {
        image.firstElementChild.src = positions[i].src;
    });
}

//Move the images
function MoveImage(array) {
    for (let i = 0; i < array.length; i++) {
        let buffer = array[i];
        array[i] = (i + 1) > array.length - 1 ? array[i] : array[i + 1];

        if (i < (array.length - 1)) {
            array[i + 1] = buffer;
        }
    }

    return array;
}

//Function sets active portfolio item menu.
function AllActive() {
    SetColor('#all-menu');
    ChangeGalleryPosition('all-menu');
}

function WebDesignActive() {
    SetColor('#web-design-menu');
    ChangeGalleryPosition('web-design-menu');
}

function GraphicActive() {
    SetColor('#graphic-design-menu');
    ChangeGalleryPosition('graphic-design-menu');
}

function ArtworkActive() {
    SetColor('#artwork-menu');
    ChangeGalleryPosition('artwork-menu');

}

//Function set color and border-color of the portfolio menu
function SetColor(itemName) {
    let item = document.querySelector(itemName);

    document.querySelectorAll('.menu-item').forEach(item => {
        item.style.color = '#767e9e';
        // item.style.borderColor = '#767e9e';

    });
    item.style.color = '#dedede';
    // item.style.borderColor = '#dedede';
}

//Function checks form validation and shows info submit window.
function SubmitForm() {
    if (!InputFormValidation()) {
        return;
    }

    let inputForms = document.querySelectorAll(".input-form");
    let theme = inputForms[2].value == "" ? "Без темы" : `Тема: ${inputForms[2].value}`;
    let description = inputForms[3].value == "" ? "Без описания" : `Описание: ${inputForms[3].value}`;

    let submitForms = document.querySelector(".submit-info").children;
    submitForms[1].innerText = theme;
    submitForms[2].innerText = description;

    event.preventDefault();
    document.querySelector(".submit-info").style.display = "block";
}

//Function hide window after Ok click.
function ConfirmSubmitOk() {
    document.querySelector(".submit-info").style.display = "none";
}

//Function returns true if name and email validation - Ok, otherwiese - false.
function InputFormValidation(form) {
    return document.querySelector("#name").checkValidity() && document.querySelector("#email").checkValidity();
}