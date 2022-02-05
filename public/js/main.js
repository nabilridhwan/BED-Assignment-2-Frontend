$(function () {
  "use strict";

  //------- Parallax -------//
  skrollr.init({
    forceHeight: false
  });

  //------- Active Nice Select --------//
  $('select').niceSelect();

  //------- hero carousel -------//
  $(".hero-carousel").owlCarousel({
    items: 3,
    margin: 10,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      810: {
        items: 3
      }
    }
  });

  //------- Best Seller Carousel -------//
  if ($('.owl-carousel').length > 0) {
    $('#bestSellerCarousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      navText: ["<i class='ti-arrow-left'></i>", "<i class='ti-arrow-right'></i>"],
      dots: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        900: {
          items: 3
        },
        1130: {
          items: 4
        }
      }
    })
  }

  //------- single product area carousel -------//
  $(".s_Product_carousel").owlCarousel({
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: false,
    dots: false
  });

  //------- mailchimp --------//  
  function mailChimp() {
    $('#mc_embed_signup').find('form').ajaxChimp();
  }
  mailChimp();

  //------- fixed navbar --------//  
  $(window).scroll(function () {
    var sticky = $('.header_area'),
      scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
  });

  //------- Price Range slider -------//
  if (document.getElementById("price-range")) {

    var nonLinearSlider = document.getElementById('price-range');

    noUiSlider.create(nonLinearSlider, {
      connect: true,
      behaviour: 'tap',
      start: [500, 4000],
      range: {
        // Starting at 500, step the value by 500,
        // until 4000 is reached. From there, step by 1000.
        'min': [0],
        '10%': [500, 500],
        '50%': [4000, 1000],
        'max': [10000]
      }
    });


    var nodes = [
      document.getElementById('lower-value'), // 0
      document.getElementById('upper-value') // 1
    ];

    // Display the slider value and how far the handle moved
    // from the left edge of the slider.
    nonLinearSlider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
      nodes[handle].innerHTML = values[handle];
    });

  }

});


// CONFIG VARIABLES
const BACKEND_URL = "http://localhost:8080";

// FUNCTIONS
// This function checks for the expiry of the token
// Returns true if expired
function HasTokenExpired(localStorage, keyName) {
  const expiryDate = new Date(localStorage.getItem(keyName));

  if (!expiryDate || expiryDate < new Date()) {
    localStorage.removeItem("token");
    localStorage.removeItem("userid")
    localStorage.removeItem("type")
    return true;
  } else {
    return false;
  }

}

$(".header_area").html(`

<div class="main_menu">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" width="72" alt=""></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div class="collapse navbar-collapse offset" id="navbarSupportedContent">

            <ul class="nav navbar-nav menu_nav ml-auto mr-auto">


              <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="/products">Products</a></li>
              <li class="nav-item"><a class="nav-link" href="/products?promotions=true">Promotions</a></li>
              <li class="nav-item"><a class="nav-link" href="/categories">Categories</a></li>

              <li class="nav-item submenu dropdown admin-only">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                  aria-expanded="false">Admin</a>

                <ul class="dropdown-menu">
                  <li class="nav-item admin-only"><a class="nav-link" href="/categories?action=add">Add Category</a></li>

                  <li class="nav-item admin-only"><a class="nav-link" href="/products?action=add">Add Product</a></li>

                  <li class="nav-item admin-only"><a class="nav-link" href="/discounts?action=add">Add Discounts</a></li>
                </ul>

              </li>


            </ul>

            <ul class="nav-shop">
              <li class="nav-item"><button onclick="window.location.href = '/cart';"><i class="ti-shopping-cart"></i><span
                    class="nav-shop__circle">3</span></button> </li>
              <li class="nav-item"><a class="button button-header" href="" id="navProfileOrLoginButton"></a></li>
            </ul>


          </div>
        </div>
      </nav>
    </div>
`)

// Create this button on every page


// Check if there is a token in local storage
if (!HasTokenExpired(localStorage, "expires")) {
  // User is logged in
  $("#navProfileOrLoginButton").attr("href", "/profile")
  $("#navProfileOrLoginButton").text("Profile")

} else {
  // User is not logged in
  $("#navProfileOrLoginButton").attr("href", "/login")
  $("#navProfileOrLoginButton").text("Login")
}

if (localStorage.getItem("type") == "Admin") {
  $(".admin-only").show();
} else {

  $(".admin-only").hide();
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

// Get the cart from local storage
const c = JSON.parse(localStorage.getItem("cart"));
if(c){
  $(".nav-shop__circle").text(c.length)
}