let slideIndex = 1;
const eventsImage = document.querySelector('.events .wrapper img');
const navList = document.querySelector('.navlist');
const hambarger = document.querySelector('.container .hamberger');

const sources =  ['event1.jpg','event2.jpg','event3.jpg' ];
let currentImage  = 0;


setInterval(() => {
  if(currentImage<sources.length){
    eventsImage.src = `./img/${sources[currentImage]}`;

    currentImage++;
   
  }else if(currentImage>=sources.length){
    currentImage = 0;
    eventsImage.src = `./img/${sources[currentImage]}`;

    currentImage++;
    
    
  }
 

  
}, 3000);




showSlides(slideIndex);


function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}


//navlist

hambarger.addEventListener('click',()=>{
  navList.classList.toggle('response')
})

