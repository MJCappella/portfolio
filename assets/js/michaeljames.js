/*!
=========================================================
* Michael James Landing page
=========================================================

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link, .footer-nav-link, .back-to-top-btn, .hero-actions a[href^='#']").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });

    // Resume tab navigation
    $(".resume-tab-btn").on("click", function(e) {
        e.preventDefault();
        $(".resume-tab-btn").removeClass("active");
        $(this).addClass("active");
        var targetPane = $(this).attr("data-target");
        $(".resume-tab-pane").hide();
        $(targetPane).fadeIn(280);
    });
});

// Horizontal flowing project carousel & filters
$(document).ready(function() {
    var $track = $("#project-carousel-track");
    if (!$track.length) return;

    var scrollStep = 374; // Card width (350px) + gap (24px)
    var autoFlowTimer = null;
    var isHovered = false;

    // Next / Prev button navigation
    $("#carousel-next").on("click", function() {
        var maxScroll = $track[0].scrollWidth - $track[0].clientWidth;
        if ($track.scrollLeft() >= maxScroll - 10) {
            $track.animate({ scrollLeft: 0 }, 500);
        } else {
            $track.animate({ scrollLeft: $track.scrollLeft() + scrollStep }, 350);
        }
    });

    $("#carousel-prev").on("click", function() {
        if ($track.scrollLeft() <= 10) {
            var maxScroll = $track[0].scrollWidth - $track[0].clientWidth;
            $track.animate({ scrollLeft: maxScroll }, 500);
        } else {
            $track.animate({ scrollLeft: $track.scrollLeft() - scrollStep }, 350);
        }
    });

    // Auto-flow timer
    function startAutoFlow() {
        if (autoFlowTimer) clearInterval(autoFlowTimer);
        autoFlowTimer = setInterval(function() {
            if (!isHovered && $track.is(":visible")) {
                var maxScroll = $track[0].scrollWidth - $track[0].clientWidth;
                if ($track.scrollLeft() >= maxScroll - 15) {
                    $track.animate({ scrollLeft: 0 }, 600);
                } else {
                    $track.animate({ scrollLeft: $track.scrollLeft() + scrollStep }, 450);
                }
            }
        }, 4200);
    }

    function stopAutoFlow() {
        if (autoFlowTimer) clearInterval(autoFlowTimer);
    }

    // Pause on hover / touch
    $track.on("mouseenter touchstart", function() {
        isHovered = true;
    }).on("mouseleave touchend", function() {
        isHovered = false;
    });

    $(".carousel-nav-btn").on("mouseenter", function() {
        isHovered = true;
    }).on("mouseleave", function() {
        isHovered = false;
    });

    startAutoFlow();

    // Category filter logic
    $(".portfolio-filters a").on("click", function(e) {
        e.preventDefault();
        $(".portfolio-filters a").removeClass("active");
        $(this).addClass("active");

        var filter = $(this).attr("data-filter");
        var $cards = $track.find(".project-card");

        if (filter === "*" || filter === ".new") {
            $cards.removeClass("dimmed").fadeIn(300);
            $track.animate({ scrollLeft: 0 }, 300);
        } else {
            var selector = filter.replace(".", "");
            $cards.each(function() {
                if ($(this).hasClass(selector)) {
                    $(this).removeClass("dimmed").fadeIn(300);
                } else {
                    $(this).addClass("dimmed");
                }
            });
            // Scroll to the first matching visible card
            var $firstMatch = $track.find(".project-card." + selector).first();
            if ($firstMatch.length) {
                var cardLeft = $firstMatch.position().left + $track.scrollLeft() - $track.offset().left;
                $track.animate({ scrollLeft: cardLeft }, 400);
            }
        }
    });

    // Drag-to-scroll support for desktop
    var isDown = false;
    var startX, scrollLeftVal;

    $track.on("mousedown", function(e) {
        isDown = true;
        $track.css("cursor", "grabbing");
        startX = e.pageX - $track.offset().left;
        scrollLeftVal = $track.scrollLeft();
    });

    $(document).on("mouseup", function() {
        if (isDown) {
            isDown = false;
            $track.css("cursor", "grab");
        }
    });

    $track.on("mousemove", function(e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - $track.offset().left;
        var walk = (x - startX) * 1.5;
        $track.scrollLeft(scrollLeftVal - walk);
    });
});


// google maps
function initMap() {
// Styles a map in night mode with a neutral global view.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 20.0, lng: 15.0},
        zoom: 3,
        scrollwheel:  false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
}
