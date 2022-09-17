let inputTitle = document.querySelector('.title-input'),
    city_moab = document.querySelector('.title>span');
    
function showInputTitle() {
    inputTitle.style.left = '31px'
    city_moab.style.transform = 'translateY(50px)'
}
function hideInputTitle() {
    inputTitle.style.left = '-24%'
    city_moab.style.transform = 'translateY(0)'
}

window.onclick = function(e) {
    if((!e.target.matches('.title-input')) && (!e.target.matches('.search-title'))) {
        
        hideInputTitle()
    }
}