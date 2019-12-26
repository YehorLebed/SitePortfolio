$(function () {
  let body = document.querySelector('body');

  //Scroll to anchor
  $("a.scrollLink").click(function (event) {
    event.preventDefault();
    if (body.querySelector('.navigation-active') && 
      document.documentElement.clientWidth <= 870) {
      $('.header__menu-hamburger').toggleClass('header__menu-hamburger-animate');
      $('.navigation').toggleClass('navigation-active');
      toggleOverflow();
    }
    $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 800);
  });

  // Menu-burger
  $('.header__menu').on('click', function () {
    $('.header__menu-hamburger').toggleClass('header__menu-hamburger-animate');
    $('.navigation').toggleClass('navigation-active');
    toggleOverflow();
  })

  // Window resize adaptation for menu
  window.addEventListener('scroll', toggleOverflow);
  window.addEventListener('resize', toggleOverflow);

  // No scroll open menu
  function toggleOverflow() {
    if (body.querySelector('.navigation-active') &&
      document.documentElement.clientWidth <= 870) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'visible';
    }
  }

});
