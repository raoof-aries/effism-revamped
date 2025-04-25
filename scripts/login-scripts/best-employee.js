(function () {
  // Sample data for best employees
  const bestEmployeesData = [
    {
      image: "assets/login-assets/images/LoginPage/user/1.jpg",
      title: "John Smith",
      monthYear: "March 2024",
      department: "AIMRI",
      description:
        "Exceptional performance in sales, consistently exceeding targets and providing outstanding customer service.",
    },
    {
      image: "assets/login-assets/images/LoginPage/user/2.jpg",
      title: "Emily Johnson",
      monthYear: "March 2024",
      department: "e Solutions",
      description:
        "Demonstrated strong leadership skills and teamwork, leading the team to successful project completion ahead of schedule.",
    },
    {
      image: "assets/login-assets/images/LoginPage/user/3.jpg",
      title: "Michael Williams",
      monthYear: "March 2024",
      department: "One",
      description:
        "Innovative problem-solver, implementing creative solutions resulting in significant cost savings.",
    },
    {
      image: "assets/login-assets/images/LoginPage/user/4.jpg",
      title: "Sophia Brown",
      monthYear: "March 2024",
      department: "HR",
      description:
        "Consistently displays a positive attitude and strong work ethic, contributing to a positive team environment.",
    },
    {
      image: "assets/login-assets/images/LoginPage/user/5.jpg",
      title: "Matthew Davis",
      monthYear: "March 2024",
      department: "Admin",
      description:
        "Exceptional attention to detail, ensuring all projects are delivered to the highest standards.",
    },
  ];

  // Select the swiper wrapper
  const swiperWrapper = document.querySelector(
    ".bestEmployee_swiper .swiper-wrapper"
  );

  // Create a slide for each employee
  bestEmployeesData.forEach((item) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    slide.innerHTML = `
        <div class="imageCard">
          <div class="imageCard_ImageWrapper">
            <img src="${item.image}" alt="${item.title}" />
            <div class="imageCard_Overlay">
              <span class="department-tag">${item.department}</span>
            </div>
          </div>
          <div class="imageCard_TextContainer">
            <h4>${item.title}</h4>
            <h5>${item.monthYear}</h5>
            <p>${item.description}</p>
          </div>
        </div>
      `;
    swiperWrapper.appendChild(slide);
  });

  // Initialize Swiper with updated options
  const swiper = new Swiper(".bestEmployee_swiper", {
    grabCursor: true,
    spaceBetween: 30,
    navigation: {
      nextEl: ".nav-next",
      prevEl: ".nav-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      500: {
        slidesPerView: 1.2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1440: {
        slidesPerView: 4.5,
        spaceBetween: 40,
      },
    },
  });
})();
