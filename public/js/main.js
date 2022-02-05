$(function () {
  //------- Active Nice Select --------//
  $('select').niceSelect();

  //------- fixed navbar --------//  
  $(window).scroll(function () {
    var sticky = $('.header_area'),
      scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
  });

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

// Sets the navbar automatically each page

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


              <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
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

// Sets the footer automatically each page
$(".footer-area").html(`
<div class="container">
				<div class="row section_gap">
					<div class="col-lg-3 col-md-6 col-sm-6">
						<div class="single-footer-widget tp_widgets ">
							<h4 class="footer_title large_title">Our Mission</h4>
							<p>
                At SP IT, We specialise in providing the best IT solutions to our customers. We are a team of highly skilled and experienced IT professionals who are passionate about delivering the best IT solutions to our customers. 
              </p>
						</div>
					</div>
					<div class="offset-lg-1 col-lg-2 col-md-6 col-sm-6">
						<div class="single-footer-widget tp_widgets">
							<h4 class="footer_title">Quick Links</h4>
							<ul class="list">
								<li><a href="/Home</a></li>
								<li><a href="/products">Products</a></li>
								<li><a href="/products?promotions=true">Promotions</a></li>
								<li><a href="/categories">Categories</a></li>
							</ul>
						</div>
					</div>
					<div class="offset-lg-1 col-lg-3 col-md-6 col-sm-6">
						<div class="single-footer-widget tp_widgets">
							<h4 class="footer_title">Contact Us</h4>
							<div class="ml-40">
								<p class="sm-head">
									<span class="fa fa-location-arrow"></span>
									Head Office
								</p>
								<p>500 Dover Road, Singapore 139651</p>

								<p class="sm-head">
									<span class="fa fa-phone"></span>
									Phone Number
								</p>
								<p>
                  +65 6775 1133
								</p>

								<p class="sm-head">
									<span class="fa fa-envelope"></span>
									Email
								</p>
								<p>
                contactus@sp.edu.sg
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="footer-bottom">
			<div class="container">
				<div class="row d-flex">
					<p class="col-lg-12 footer-text text-center">
						<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
						Copyright &copy;<script>
							document.write(new Date().getFullYear());
						</script> All rights reserved | This template is made with <i class="fa fa-heart"
							aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
						<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
					</p>
				</div>
			</div>
`)

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