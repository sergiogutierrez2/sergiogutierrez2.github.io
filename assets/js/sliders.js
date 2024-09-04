var slideIndex = 1;
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

var slideIndexTwo = 1;
showSlidesTwo(slideIndexTwo);

function plusSlidesTwo(nTwo) {
  showSlidesTwo(slideIndexTwo += nTwo);
}

function currentSlideTwo(nTwo) {
  showSlidesTwo(slideIndexTwo = nTwo);
}


function showSlidesTwo(nTwo) {
  var iTwo;
  var slidesTwo = document.getElementsByClassName("mySlidestwo");
  var dotsTwo = document.getElementsByClassName("dottwo");
  if (nTwo > slidesTwo.length) {slideIndexTwo = 1}    
  if (nTwo < 1) {slideIndexTwo = slidesTwo.length}
  for (iTwo = 0; iTwo < slidesTwo.length; iTwo++) {
      slidesTwo[iTwo].style.display = "none";  
  }
  for (iTwo = 0; iTwo < dotsTwo.length; iTwo++) {
      dotsTwo[iTwo].className = dotsTwo[iTwo].className.replace(" active", "");
  }
  slidesTwo[slideIndexTwo-1].style.display = "block";  
  dotsTwo[slideIndexTwo-1].className += " active";
}