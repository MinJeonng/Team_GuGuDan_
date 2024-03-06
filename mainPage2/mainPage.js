const jobData = [
    { title: '채용공고 1', description: '내용 및 설명 1' },
    { title: '채용공고 2', description: '내용 및 설명 2' },
    { title: '채용공고 3', description: '내용 및 설명 3' },
    { title: '채용공고 4', description: '내용 및 설명 4' },
    { title: '채용공고 5', description: '내용 및 설명 5' },
    { title: '채용공고 6', description: '내용 및 설명 6' },
    { title: '채용공고 7', description: '내용 및 설명 7' },
    { title: '채용공고 8', description: '내용 및 설명 8' },
];

function createJobElement(job) {
    const jobElement = document.createElement('div');
    jobElement.classList.add('job');
    jobElement.innerHTML = `
      <h2>${job.title}</h2>
      <p>${job.description}</p>
    `;
    return jobElement;
}

const jobContainer = document.getElementById('job-container');
jobData.forEach((job) => {
    const jobElement = createJobElement(job);
    jobContainer.appendChild(jobElement);
});
let slideIndex = 0;
showSlide(slideIndex);

function prevSlide() {
    showSlide((slideIndex -= 1));
}

function nextSlide() {
    showSlide((slideIndex += 1));
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide .ad');
    if (index >= slides.length) {
        slideIndex = 0;
    }
    if (index < 0) {
        slideIndex = slides.length - 1;
    }
    slides.forEach((slide) => {
        slide.style.transform = `translateX(${-slideIndex * 200}px)`;
    });
}

setInterval(nextSlide, 3000); 
