function initPortfolio() {
    $(".navbar .nav-link, .footer-nav-link, .back-to-top-btn, .hero-actions a[href^='#']").off('click').on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var target = $(hash);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 700, function () {
                    window.location.hash = hash;
                });
            }
        }
    });
    $(".resume-tab-btn").off('click').on("click", function (e) {
        e.preventDefault();
        $(".resume-tab-btn").removeClass("active");
        $(this).addClass("active");
        var targetPane = $(this).attr("data-target");
        $(".resume-tab-pane").hide();
        $(targetPane).fadeIn(280);
    });
    var $track = $("#project-carousel-track");
    if ($track.length) {
        var scrollStep = 374;
        var autoFlowTimer = null;
        var isHovered = false;

        $("#carousel-next").off('click').on("click", function () {
            var maxScroll = $track[0].scrollWidth - $track[0].clientWidth;
            if ($track.scrollLeft() >= maxScroll - 10) {
                $track.animate({ scrollLeft: 0 }, 500);
            } else {
                $track.animate({ scrollLeft: $track.scrollLeft() + scrollStep }, 350);
            }
        });

        $("#carousel-prev").off('click').on("click", function () {
            if ($track.scrollLeft() <= 10) {
                var maxScroll = $track[0].scrollWidth - $track[0].clientWidth;
                $track.animate({ scrollLeft: maxScroll }, 500);
            } else {
                $track.animate({ scrollLeft: $track.scrollLeft() - scrollStep }, 350);
            }
        });

        function startAutoFlow() {
            if (autoFlowTimer) clearInterval(autoFlowTimer);
            autoFlowTimer = setInterval(function () {
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
        $track.off('mouseenter touchstart mouseleave touchend')
            .on("mouseenter touchstart", function () { isHovered = true; })
            .on("mouseleave touchend", function () { isHovered = false; });

        $(".carousel-nav-btn").off('mouseenter mouseleave')
            .on("mouseenter", function () { isHovered = true; })
            .on("mouseleave", function () { isHovered = false; });

        startAutoFlow();

        $(".portfolio-filters a").off('click').on("click", function (e) {
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
                $cards.each(function () {
                    if ($(this).hasClass(selector)) {
                        $(this).removeClass("dimmed").fadeIn(300);
                    } else {
                        $(this).addClass("dimmed");
                    }
                });
                var $firstMatch = $track.find(".project-card." + selector).first();
                if ($firstMatch.length) {
                    var cardLeft = $firstMatch.position().left + $track.scrollLeft() - $track.offset().left;
                    $track.animate({ scrollLeft: cardLeft }, 400);
                }
            }
        });

        var isDown = false;
        var startX, scrollLeftVal;

        $track.off('mousedown mousemove').on("mousedown", function (e) {
            isDown = true;
            $track.css("cursor", "grabbing");
            startX = e.pageX - $track.offset().left;
            scrollLeftVal = $track.scrollLeft();
        });

        $(document).off('mouseup.carousel').on("mouseup.carousel", function () {
            if (isDown) {
                isDown = false;
                $track.css("cursor", "grab");
            }
        });

        $track.on("mousemove", function (e) {
            if (!isDown) return;
            e.preventDefault();
            var x = e.pageX - $track.offset().left;
            var walk = (x - startX) * 1.5;
            $track.scrollLeft(scrollLeftVal - walk);
        });
    }

    if ($('body').data('bs.scrollspy')) {
        $('body').scrollspy('refresh');
    }
}

async function loadModularSections() {
    var includes = document.querySelectorAll('[data-include]');

    if (!includes.length) {
        initPortfolio();
        return;
    }

    if (window.location.protocol === 'file:') {
        console.warn('Viewing via file:// protocol. Browsers restrict fetch() on local files for security. Please use "npm start" or an HTTP server.');
    }
    while (includes.length > 0) {
        await Promise.all(Array.from(includes).map(async function (el) {
            var file = el.getAttribute('data-include');
            try {
                var resp = await fetch(file);
                if (resp.ok) {
                    var html = await resp.text();
                    el.outerHTML = html;
                } else {
                    console.error('Failed to load:', file, resp.status);
                    el.removeAttribute('data-include');
                }
            } catch (err) {
                console.error('Error loading module:', file, err);
                el.removeAttribute('data-include');
            }
        }));
        includes = document.querySelectorAll('[data-include]');
    }
    initPortfolio();
}

$(document).ready(function () {
    loadModularSections();
});
function initMap() {
    var mapEl = document.getElementById('map');
    if (!mapEl) return;

    var map = new google.maps.Map(mapEl, {
        center: { lat: 20.0, lng: 15.0 },
        zoom: 3,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
            { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
            { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
            { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
            { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
            { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
            { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
            { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
            { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
            { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
            { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
            { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
            { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
            { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
            { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] }
        ]
    });
}
