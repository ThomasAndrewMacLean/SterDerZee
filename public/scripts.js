let storage = firebase.storage();
let storageRef = storage.ref();

let isBigImage = false;
let ctr = 0;

const imageHtml = document.querySelector('img');

const img1 = storageRef.child('small/sterderzee1.jpeg');
const img1Big = storageRef.child('large/sterderzee1.jpeg');


let pageArray = [];
let pageArraySmall = [];


let load = (id) => {
    let img2Big = storageRef.child('large/sterderzee' + id + '.jpeg');
    return img2Big.getDownloadURL();
}

img1.getDownloadURL().then(function (url) {
    imageHtml.src = url;
    pageArraySmall[0] = url;

    img1Big.getDownloadURL().then((res) => {
        imageHtml.src = res;
        pageArray[0] = res;

        for (let i = 1; i < 12; i++) {
            this.load(i).then((res) => {
                let im = new Image();
                im.src = res;
                pageArray[i - 1] = im;
            });
        }

    });
}).catch(function (error) {
    console.error(error);
});

imageHtml.onclick = () => {

    ctr++;

    console.log(ctr);

    imageHtml.src = pageArray[ctr % 11].src;
}


document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) { /*most significant*/
        if (xDiff > 0) {
            /* left swipe */
            ctr++;

            console.log(ctr);
            //imageHtml.src = pageArraySmall[ctr%11];  
            imageHtml.src = pageArray[ctr % 11].src;
        } else {
            /* right swipe */
            ctr--;

            if (ctr == -1) {
                // debugger;
                ctr = 10
            }
            console.log(ctr);
            //imageHtml.src = pageArraySmall[ctr%11];  
            imageHtml.src = pageArray[ctr % 11].src;
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};