onload = function () {
    let onClickElement;    
    let dropdownMenuFlag = false;    

    window.addEventListener('resize', setStyleNavigationMenu);

    //Set z-index for slides
    document.querySelector('#slide1').style.zIndex = 10;
    document.querySelector('#slide2').style.zIndex = 5;

    document.addEventListener('click', onClick);

    this.document.onclick = function (event) {

        onClickElement = event.path[1];

        if (onClickElement !== undefined) {
            if (!onClickElement.classList) {
                return;
            }

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
                style.padding = '0px';
            }

            //Click on a arrow to slide
            if (onClickElement.classList[0] === 'arrow') {
                document.querySelectorAll('.arrow').forEach(arrow => arrow.style.pointerEvents = 'none');

                moveSlide(onClickElement.classList[1]);
            }
        }
    }
    
    function onClick(event) {
        if (!event.target) {
            return;
        }
        //Click on the burger-menu
        if (event.target.id === 'burger-menu') {
            let navigation = document.querySelector('.navigation');
            navigation.style.transition = 'transform 0.5s';

            if (dropdownMenuFlag) {
                dropdownMenuFlag = dropdownMenuUp(event.target);
            }
            else {                
                dropdownMenuFlag = dropdownMenuDown(event.target);
            }
        }

        //Click on the burger-menu item to move menu up
        if (event.target.classList[0] == 'nav-main' && document.body.clientWidth < 768) {
            let burgerMenu = document.querySelector('#burger-menu');
            dropdownMenuFlag = dropdownMenuUp(burgerMenu);
            
        }
    }

    //Move dropdown menu up
    function dropdownMenuUp(target) {
        let navigation = document.querySelector('.navigation');
        let logo = document.querySelector('.header-logo');

        target.style.transform = 'none';
        navigation.classList.remove('navigation-active');                
        navigation.style.transform = 'translateY(-100vh)';
        logo.classList.remove('logo-active');

        return false;
    }

    //Move dropdownmenu down
    function dropdownMenuDown(target) {
        let navigation = document.querySelector('.navigation');
        let logo = document.querySelector('.header-logo');

        target.style.transform = 'rotateZ(90deg)';                
        navigation.classList.add('navigation-active');
        navigation.style.transform = 'translateY(0)';
        logo.classList.add('logo-active');

        return true;
    }

    //Reset burger menu to default settings
    function setStyleNavigationMenu() {
        let navigation = document.querySelector('.navigation');
        if (document.body.clientWidth > 375) {
            navigation.style.transform = 'none';
            navigation.style.transition = 'step-end';
            document.querySelector('.header-logo').classList.remove('logo-active');
            document.querySelector('#burger-menu').style.transform = 'none';
            dropdownMenuFlag = false;
        }
        else {
            if (navigation.style.transform === 'none') {
                navigation.style.transition = 'step-end';
                navigation.style.transform = 'translateY(-100vh)';
            }
        }
    }
}

document.addEventListener('scroll', onScroll);

//Function change color of item menu.
function onScroll() {
    const cursorPos = window.scrollY;
    const sector = document.querySelectorAll('.scroll');
    const menuItem = document.querySelectorAll('.nav-main');

    sector.forEach(item => {
        if (item.offsetTop <= (cursorPos + 92) && (item.offsetTop + item.offsetHeight) > cursorPos) {
            menuItem.forEach(menu => {
                menu.classList.remove('active');
                if (item.getAttribute('id') === menu.getAttribute('href').substring(1)) {
                    menu.classList.add('active');
                }
            })
        }
    })
}

//Move slides
function moveSlide(arrowDirection) {
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

//Function moves images of gallery.
function changeImagePosition() {
    let gallery = document.querySelector(".layout-4-columns");
    for (let i = 1; i < gallery.childNodes.length - 2; i += 2) {
        let currentNode = gallery.childNodes[i];
        let nextNode = i + 2 >= gallery.length ? gallery.childNodes[1] : gallery.childNodes[i + 2];
        gallery.replaceChild(nextNode, currentNode);
        gallery.insertBefore(currentNode, gallery.childNodes[i + 2]);
    }
}

//Function sets active portfolio item menu.
function allActive() {
    setColor('#all-menu');
    changeImagePosition('all-menu');
}

function webDesignActive() {
    setColor('#web-design-menu');
    changeImagePosition('web-design-menu');
}

function graphicActive() {
    setColor('#graphic-design-menu');
    changeImagePosition('graphic-design-menu');
}

function artworkActive() {
    setColor('#artwork-menu');
    changeImagePosition('artwork-menu');
}

//Function set color and border-color of the portfolio menu
function setColor(itemName) {
    const menuItem = document.querySelectorAll('.menu-item');
    menuItem.forEach(item => {
        item.classList.remove('active-portfolio-menu');
    });

    document.querySelector(itemName).classList.add('active-portfolio-menu');
}

//Function checks form validation and shows info submit window.
function submitForm() {
    if (!inputFormValidation()) {
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
function confirmSubmitOk() {
    document.querySelectorAll('.input-form').forEach(inputForm => inputForm.value = '');
    document.querySelector(".submit-info").style.display = "none";
}

//Function returns true if name and email validation - Ok, otherwiese - false.
function inputFormValidation(form) {
    return document.querySelector("#name").checkValidity() && document.querySelector("#email").checkValidity();
}