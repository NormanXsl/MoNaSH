'use strict';

// function definitions
const selectLink = function (event) {
    highlightLink(event.currentTarget);
}

const highlightLink = function (element) {
    for (let link of links) {
        link.classList.remove('selected');
    }

    element.classList.add('selected')
}


const checkSections = function (entries) {
    //console.log(entries);
    for (let entry of entries) {
        if (entry.intersectionRatio >= 0.3) {
            console.log('scroll to', entry.target);
            let hash = '#' + entry.target.id;
            for (let link of links) {
                if (link.hash === hash) {
                    highlightLink(link);
                }
            }
        }
    }
};

const scrollToAnimate = function () {

    anim1.style.animationDelay = -scrollAmount(history) + 's';
    anim2.style.animationDelay = -scrollAmount(history) + 's';
    anim3.style.animationDelay = -scrollAmount(history) + 's';
    anim4.style.animationDelay = -scrollAmount(history) + 's';
    anim5.style.animationDelay = -scrollAmount(history) + 's';
    anim6.style.animationDelay = -scrollAmount(history) + 's';
    anim7.style.animationDelay = -scrollAmount(history) + 's';
    anim8.style.animationDelay = -scrollAmount(history) + 's';

}

const scrollAmount = function (element) {
    let scrollTop = window.innerHeight - element.getBoundingClientRect().top;
    let scrollHeight = element.offsetHeight + window.innerHeight;
    let scrollValue = scrollTop / scrollHeight;
    return scrollValue;
}

let playSlides = function(){
    $currentSlide.fadeOut();

    if($currentSlide.is($lastSlide)){
        $currentSlide = $firstSlide;
    }
    else{
        $currentSlide= $currentSlide.next();
    }

    $currentSlide.fadeIn();
    timer = setTimeout(playSlides, interval)
}

let preSlides = function(){
    $currentSlide.fadeOut();

    if($currentSlide.is($firstSlide)){
        $currentSlide = $lastSlide;
    }
    else{
        $currentSlide= $currentSlide.prev();
    }

    $currentSlide.fadeIn();
    timer = setTimeout(preSlides, interval)
}


let pauseSlide =  function(event){
    clearTimeout(timer)
}

let unpauseSlide = function(event){
    clearTimeout(timer)
    timer = setTimeout(playSlides, interval);
}

let nextSlide= function(event){
    playSlides();
    clearTimeout(timer)
}

let previousSlide= function(event){
    preSlides();
    clearTimeout(timer)
}


 
const remainingChars = function (event) {
    let element = event.currentTarget;
    console.log(element.id, element.value);
    let remain = element.maxLength -  element.value.length;
    remainingOutput.value = `${remain} character left`;
    
  }
  
  const checkForm = function (event) {
    event.preventDefault();
    if(!username.value){
      error.classList.add('show');
    }
    if(!age.value){
        error2.classList.add('show');
    }
    if(!email.value){
        error3.classList.add('show');
    }
    if(!message.value){
        error4.classList.add('show');
    }
    else{
        LastForm.submit();
        console.log('submit successful');
    }
    
  };





// variable declarations
let links = document.querySelectorAll('nav a');
console.log(links);

let observer = new IntersectionObserver(checkSections, {
    threshold: [0.3]
});

let sections = document.querySelectorAll('section');

let history = document.querySelector('#history');
let anim1 = document.querySelector('#anim1');
let anim2 = document.querySelector('#anim2');
let anim3 = document.querySelector('#anim3');
let anim4 = document.querySelector('#anim4');
let anim5 = document.querySelector('#anim5');
let anim6 = document.querySelector('#anim6');
let anim7 = document.querySelector('#anim7');
let anim8 = document.querySelector('#anim8');

let $slideShow = $('#slideshow');
let $slides = $('#slideshow figure');
let $slideNext = $('#next');
let $slidePre = $('#pre');

let $firstSlide = $slides.first();
let $lastSlide = $slides.last();
let $currentSlide = $firstSlide;

let timer;
let interval= 3000;

let LastForm = document.querySelector('#LastForm');
let username = document.querySelector('#username');
let message = document.querySelector('#message');
let email = document.querySelector('#email');
let age = document.querySelector('#age');
let remainingOutput = document.querySelector('#remainingOutput');
let error = document.querySelector('#error');
let error2 = document.querySelector('#error2');
let error3 = document.querySelector('#error3');
let error4= document.querySelector('#error4');


// script initialisation



for (let link of links) {
    link.addEventListener('click', selectLink);
}

document.body.scrollIntoView();

for (let section of sections) {
    observer.observe(section);
}

document.addEventListener('scroll', scrollToAnimate);

imagesLoaded('body', {
    background: true
}, function () {
    document.querySelector('#preloader').classList.add('loaded');
    setTimeout(function () {
        AOS.init({
            'anchor-placement': 'center-center',
            'delay': 1000,
            'easing': 'ease',
            'duration': 2000,
            'mirror': true,
            'offset': 100,
            'once': false
        });
    }, 1000)
});

$slides.not($currentSlide).hide();

timer = setTimeout(playSlides, interval);

$slides.on('mouseenter',pauseSlide);
$slides.on('mouseleave',unpauseSlide);
$slideNext.on('click',nextSlide);
$slidePre.on('click',previousSlide);
$slideNext.on('mouseenter',pauseSlide);
$slideNext.on('mouseleave',pauseSlide);
$slidePre.on('mouseenter',unpauseSlide);
$slidePre.on('mouseleave',unpauseSlide);


message.addEventListener('input', remainingChars);
LastForm.addEventListener('submit', checkForm);

// $slides.on('click',nextSlide);



 

    
