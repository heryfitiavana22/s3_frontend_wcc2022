let inputTitle = document.querySelector('.title-input'),
    city_moab = document.querySelector('.title>span');
    
function showInputTitle() {
    inputTitle.style.left = '31px'
    city_moab.style.transform = 'translateY(50px)'
}
function hideInputTitle() {
    inputTitle.style.left = '-50%'
    city_moab.style.transform = 'translateY(0)'
}

let intervalStar = undefined,
    degreStar = 360;
function rotateStar(star) {
    // amin'ny voalohany iany no creer-na
    if(intervalStar === undefined) {
        intervalStar = setInterval(() => {
            star.style.transform = 'rotate('+degreStar+'deg)';
            degreStar += 360;
        },200)
    }
}

let body = document.querySelector('body');
function zoomInImage(area) {
    let img = area.childNodes[1].cloneNode(true),
        div = document.createElement('div');

    div.classList.add('zoom-in');
    div.insertAdjacentElement('beforeend', img)
    div.insertAdjacentHTML('beforeend', '<iconify-icon icon="mi:close" class="close" onclick="zoomOutImage(this)"></iconify-icon>')
    body.insertAdjacentElement('beforeend', div);
    setTimeout(()=> {
        div.style.transform = 'scale(1)'
    },5)
}

function zoomOutImage() {
    let div = document.querySelector('.zoom-in');
    // s'il y en a une image zoomer
    if(div != null) {
        div.style.transform = 'scale(0)'
        setTimeout(()=> {
            div.remove();
        }, 1200)
    }
}
let area = document.querySelectorAll('.area'),
    areaWidth = 0,
    arrowLeft = document.querySelector('.to-left > path'),
    arrowRight= document.querySelector('.to-right > path'),
    slideImageArea = document.querySelector('.slide-image-area'),
    inf = 0, sup = 2, margin, isSlideLeft = false, isSlideRight = false, left = 0;
function slideLeft() {
    if((sup >= (area.length-1))) return;
    
    for(let i=0; i<area.length; i++) {
        area[i].style.left = -left + 'px';
    }
    arrowLeft.style.fill = '#000'
    inf++;
    sup++;
    if((sup == (area.length-1))) {arrowRight.style.fill = '#C9C5C2'}
    isSlideLeft = true;
    isSlideRight = false
    adjustWidth()
}

function slideRight() {
    if((inf <= 0)) return
    
    for(let i=0; i<area.length; i++) {
        area[i].style.left = margin + 'px';
    }
    arrowRight.style.fill = '#000'
    inf--;
    sup--;
    if((inf == 0)) {arrowLeft.style.fill = '#C9C5C2';}
    isSlideRight = true;
    isSlideLeft = false
    adjustWidth()
}

function adjustWidth() {
    let widthContainer = document.querySelector('.content').clientWidth,
        hotelRecommended = document.querySelector('.hotel-recommended'),
        areaContainer = document.querySelector('.area-container'),
        areaContainerHeight = areaContainer.clientHeight;

    areaWidth = (32*widthContainer) / 100; // 32% anle largeur    
    margin = (widthContainer - (areaWidth*3))/2 -5;
    left = areaWidth+margin;

    slideImageArea.style.marginTop = (areaContainerHeight+30) + 'px'
    hotelRecommended.style.width = widthContainer + 'px';
    hotelRecommended.style.height = (areaContainerHeight+50) + 'px';
    areaContainer.style.width = (areaWidth*area.length) + (margin*2 + 5) + 'px'
    for(let i=0; i<area.length; i++) {
        area[i].style.width = areaWidth + 'px';
    }
    for(let i=inf; i<=sup; i++) {
        area[i].style.marginRight = margin + 'px'
    }
}

function stopRotate() {
    clearInterval(intervalStar);
    intervalStar = undefined;
}

window.onclick = function(e) {
    if((!e.target.matches('.title-input')) && (!e.target.matches('.search-title')) &&
       (!e.target.matches('.nav-search')) && (!e.target.matches('.nav-search>svg'))) {

        hideInputTitle()
    }

    if((!e.target.matches('.zoom-in > img')) && (!e.target.matches('.area'))) {
        
        zoomOutImage()
    }
}

window.onresize = function() {
    adjustWidth()
    if(isSlideLeft) {
        for(let i=inf; i<=sup; i++) {
            area[i].style.left = -(left) + 'px';
        }
    }
    if(isSlideRight) {
        for(let i=inf; i<=sup; i++) {
            area[i].style.left = margin + 'px';
        }
    }
}

window.onload = function() {adjustWidth()}