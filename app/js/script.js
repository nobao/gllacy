// "Оживление" слайдера
let sliderDot = document.querySelectorAll('.slider-dot');
let sliderItem = document.querySelectorAll('.slider-item');
let body = document.querySelector('body');

sliderDot.forEach(function(item, i) {
    item.addEventListener('click', function(evt) {
        evt.preventDefault();
        sliderDot.forEach(function(item, i) {
            item.classList.remove('active');
        });
        sliderDot[i].classList.add('active');
        body.classList.remove('body-slider-1', 'body-slider-2', 'body-slider-3');
        body.classList.add(`body-slider-${i+1}`);
        sliderItem.forEach(function(item, i){
            item.classList.add('hide-item');
            item.classList.remove('show-item');
        });
        sliderItem[i].classList.remove('hide-item');
        sliderItem[i].classList.add('show-item');
    })
});

// работа с localStorage в форме
let modal = document.querySelector('.modal');

let isStorageSupport = true;
let storageName = '';
let storageEmail = '';

let feedbackForm = modal.querySelector('.feedback-modal form');

try {
    storageName = localStorage.getItem('name');
    storageEmail = localStorage.getItem('email');
} catch(err) {
    isStorageSupport = false;
}

feedbackForm.addEventListener('submit', function(evt) {
    if (!userNameField.value || !userEmailField.value) {
        feedbackModal.classList.remove('error-animation');
        feedbackModal.offsetWidth = feedbackModal.offsetWidth;
        evt.preventDefault();
        feedbackModal.classList.add('error-animation');
    } else {
        if (isStorageSupport) {
            localStorage.setItem('name', userNameField.value);
            localStorage.setItem('email', userEmailField.value);
        }
    }
})

// всплытие формы обратной связи
let feedbackButton = document.querySelector('.feedback-button');

let userNameField = modal.querySelector('#user-name');
let userEmailField = modal.querySelector('#user-email');
let userMessageField = modal.querySelector('#user-message');

feedbackButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    modal.classList.remove('none-item');
    modal.classList.add('block-item');
    feedbackModal.classList.remove('hide-animation');
    feedbackModal.classList.add('show-animation');
    if (storageName) {
        userNameField.value = storageName;
        userEmailField.focus();
    }
    if (storageName && storageEmail) {
        userEmailField.value = storageEmail;
        userMessageField.focus();
    }
    if (!storageName && !storageEmail) {
        userNameField.focus();
    }
});

// закрытие формы обратной связи
let modalClose = modal.querySelector('.modal-close');
let modalOverlay = modal.querySelector('.overlay');
let feedbackModal = modal.querySelector('.feedback-modal');

modalClose.addEventListener('click', function(evt) {
    evt.preventDefault();
    feedbackModal.classList.remove('show-animation');
    feedbackModal.classList.remove('error-animation');
    feedbackModal.classList.add('hide-animation');
    setTimeout(function(){
        modal.classList.remove('block-item');
        modal.classList.add('none-item');
    }, 999);   
});

feedbackModal.addEventListener('click', function(evt) {
    evt.stopPropagation();
});

modalOverlay.addEventListener('click', function(evt) {
    evt.preventDefault();
    feedbackModal.classList.remove('show-animation');
    feedbackModal.classList.remove('error-animation');
    feedbackModal.classList.add('hide-animation');
    setTimeout(function(){
        modal.classList.remove('block-item');
        modal.classList.add('none-item');
    }, 999);    
});

window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        feedbackModal.classList.remove('show-animation');
        feedbackModal.classList.remove('error-animation');
        feedbackModal.classList.add('hide-animation');
        setTimeout(function(){
            modal.classList.remove('block-item');
            modal.classList.add('none-item');
        }, 999);       
    }
});