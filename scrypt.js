let phoneScreenOn = true;

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
            let counter = 0;
            let direction;
            let stopSlideBorder = '-1020px';
            let toLeft;

            arrowDirection === 'arrow-left' ? (
                direction = -1,
                stopSlideBorder = '-1020px',
                toLeft = true
            )
                : (
                    direction = 1,
                    stopSlideBorder = '1021px',
                    toLeft = false
                )

            setSlidePosition(toLeft);

            let interval = setInterval(function () {
                document.querySelectorAll('.slider-wrapper').forEach((item) => {
                    counter += direction;;
                    item.style.left = `${counter}px`;
                    if (item.style.left === stopSlideBorder) {
                        clearInterval(interval);
                        return;
                    }
                })
            });
        }

        function setSlidePosition(toLeft) {
            let slide = getLeftmostOrRightmostSlide(toLeft);
            console.log(slide);
        }

        //Function returns leftmost or rightmost slide
        function getLeftmostOrRightmostSlide(leftmost) {
            let slideToSearch;
            let left;
            document.querySelectorAll('.slider-wrapper').forEach(slide => {
                debugger;
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