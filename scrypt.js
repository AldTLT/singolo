let phoneScreenOn = true;
let left = 0;
let countSlider = 0;

onload = function () {
    let onClickElement;
    this.document.onclick = function (e) {

        onClickElement = e.path[1];

        if (onClickElement !== undefined) {

            //Click on a phone to switch off
            if (onClickElement.classList[0] === 'base-container' || onClickElement.classList[0] === 'screen') {
                if (phoneScreenOn) {
                    onClickElement.parentElement.querySelector('.screen').style.display = 'none';
                    phoneScreenOn = false;
                }
                else {
                    onClickElement.parentElement.querySelector('.screen').style.display = 'block';
                    phoneScreenOn = true;
                }
            }

            //Click on a image from gallery to set border
            if (onClickElement.classList[0] === 'gallery-image') {

                document.querySelectorAll('.gallery-image').forEach(element => element.style.border = 'none');

                let style = onClickElement.style;
                style.border = '5px solid #F06C64';
            }

            //Click on a arrow to slide
            if (onClickElement.classList[0] === 'arrow') {
                slide(onClickElement.classList[1]);
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

//Change positions of gallery images (do not work yet)
function ChangeGalleryPosition() {
    let positions = [];

    let gallery = document.querySelectorAll('.gallery-image');
    gallery.forEach((image, i) => {
        let imageItems = {
        };

        let t = image.firstElementChild;
        imageItems.src = image.firstElementChild.src;
        imageItems.right = image.firstElementChild.style.right;
        imageItems.bottom = image.firstElementChild.style.bottom;

        positions[i] = imageItems;
    });

    positions = MoveImage(positions);

    gallery.forEach((image, i) => {
        image.firstElementChild.src = positions[i].src;
    });
}

//(Not allowed yet)
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

function TemporaryChangePositions(menuItem) {
    document.querySelector('.layout-4-columns').style.flexDirection =
        menuItem === 'all-menu' ?
            'column-reverse'
            : menuItem === 'web-design-menu' ?
                'row-reverse'
                : menuItem === 'graphic-design-menu' ?
                    'column'
                    : 'row';
}

//Menu Portfolio
function AllActive() {
    SetColor('#all-menu');
    TemporaryChangePositions('all-menu');
}

function WebDesignActive() {
    SetColor('#web-design-menu');
    TemporaryChangePositions('web-design-menu');
}

function GraphicActive() {
    SetColor('#graphic-design-menu');
    TemporaryChangePositions('graphic-design-menu');
}

function ArtworkActive() {
    SetColor('#artwork-menu');
    TemporaryChangePositions('artwork-menu');

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

//Move slide to the left or to the right
function slide(arrowDirection) {
    let direction;
    let toLeft;

    arrowDirection === 'arrow-left' ? (
        direction = -1,
        toLeft = true
    )
        : (
            direction = 1,
            toLeft = false
        );

    setSliderLeftOffset(toLeft);

    let interval = setInterval(function () {
        document.querySelectorAll('.slider-wrapper').forEach((item) => {
            left += direction;
            item.style.left = `${left}px`;
            if (countSlider > 1018) {
                countSlider = 0;
                clearInterval(interval);
                return;
            }
            countSlider++;
        })
    });
}


function setSliderLeftOffset(toLeft) {
    document.querySelectorAll('.slider-wrapper').forEach((item) => {
        if ((item.offsetLeft > 1018) && !toLeft) {
            item.offsetLeft
        };
    });
}

function setSlidePosition(toLeft) {
    let slide = getLeftmostOrRightmostSlide(toLeft);
}

//Function returns leftmost or rightmost slide
function getLeftmostOrRightmostSlide(leftmost) {
    let slideToSearch;
    let left;
    document.querySelectorAll('.slider-wrapper').forEach(slide => {
        let styleLeft = slide.offsetLeft;

        if (left == undefined) {
            slideToSearch = slide;
            left = slide.offsetLeft;
        }

        if (leftmost) {
            //Get min left of sliders
            if (styleLeft < left) {
                left = styleLeft;
                slideToSearch = slide;
            }
        }
        else {
            //Get max left of sliders
            if (styleLeft > left) {
                left = styleLeft;
                slideToSearch = slide;
            }
        }
    })

    return slideToSearch;
}

//Function parse string of pixels to number
function leftStyleParse(value) {

    return value === undefined ?
        undefined :
        Number.parseInt(value.substring(0, value.length - 2));
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