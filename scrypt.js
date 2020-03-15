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

            //console.log(onClickElement.classList[0]);
            if (onClickElement.classList[0] === 'arrow') {
                slide(onClickElement.classList[1]);
            }

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
            debugger;
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
    };
}

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

    console.log(theme);
    console.log(description);

    event.preventDefault();
    document.querySelector(".submit-info").style.display = "block";
}

function ConfirmSubmitOk() {
    document.querySelector(".submit-info").style.display = "none";
}

function InputFormValidation(form) {
    return document.querySelector("#name").checkValidity() && document.querySelector("#email").checkValidity();
}