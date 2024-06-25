// js that's applied to all pages

// hamburger menu
const hamburgerButton = document.querySelector('#menu-tlacitko');
const hamburgerList = document.querySelector('#menu-polozky');
const hamburgerIcon = document.querySelector('.fas'); 

const showHamburger = () => {
  hamburgerList.classList.toggle('show');
  if (hamburgerList.classList.contains('show')) {
    hamburgerIcon.classList.remove('fa-bars');
    hamburgerIcon.classList.add('fa-xmark');
  } else {
    hamburgerIcon.classList.remove('fa-xmark');
    hamburgerIcon.classList.add('fa-bars');
  }
}

hamburgerButton.addEventListener('click', showHamburger);

