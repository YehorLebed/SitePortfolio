$(function () {

  //Scroll to anchor
  $("a.scrollLink").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);
  });

  // Menu-burger
  $('.header__menu').on('click', function () {
    $('.header__menu-hamburger').toggleClass('header__menu-hamburger-animate');
    $('.navigation').toggleClass('navigation-active');
  })

});
