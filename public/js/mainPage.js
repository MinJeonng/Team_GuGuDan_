$('a').click(function (event) {
    event.preventDefault();
});
// 메인슬라이드
$(document).ready(function () {
    let currentIndex = 0;
    let imageSlides = $('.main-slide');
    let slideCount = imageSlides.length;

    imageSlides.eq(0).addClass('active');

    function slideShow() {
        imageSlides.eq(currentIndex).removeClass('active');
        currentIndex = (currentIndex + 1) % slideCount;
        imageSlides.eq(currentIndex).addClass('active');
    }
    setInterval(slideShow, 3000); // 3000 = 3초마다 슬라이드가 변경
});

async function searchMainEmploy() {
    const city_name = document.querySelector('.waselect1').value;
    const job = document.querySelector('.waselect2').value;

    document.location.href = `/employ/board?city-name=${city_name}&job=${job}`;
}
