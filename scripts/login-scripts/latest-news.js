(function () {
  // Sample data for latest news
  const newsData = [
    {
      image: "assets/login-assets/images/LoginPage/news/1.jpg",
      title: "Company Milestone Achieved",
      date: "March 15, 2024",
      description:
        "Celebrating our record-breaking quarterly performance and innovative strategies.",
    },
    {
      image: "assets/login-assets/images/LoginPage/news/2.jpg",
      title: "New Product Launch",
      date: "March 10, 2024",
      description:
        "Introducing our groundbreaking solution that's set to revolutionize the industry.",
    },
    {
      image: "assets/login-assets/images/LoginPage/news/3.jpg",
      title: "Sustainability Initiative",
      date: "March 5, 2024",
      description:
        "Our commitment to environmental responsibility and green technology.",
    },
    {
      image: "assets/login-assets/images/LoginPage/news/4.jpg",
      title: "Employee Recognition Program",
      date: "February 28, 2024",
      description:
        "Highlighting our top performers and their exceptional contributions.",
    },
    {
      image: "assets/login-assets/images/LoginPage/news/5.jpg",
      title: "Community Outreach Program",
      date: "February 20, 2024",
      description:
        "Making a positive impact through our community support initiatives.",
    },
  ];

  // Select the swiper wrapper
  const swiperWrapper = document.querySelector(
    ".latestNews_swiper .swiper-wrapper"
  );

  // Create a slide for each news item
  newsData.forEach((item) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    slide.innerHTML = `
        <div class="imageCard">
          <div class="imageCard_ImageWrapper">
            <img src="${item.image}" alt="${item.title}" />
            
          </div>
          <div class="imageCard_TextContainer">
            <h4>${item.title}</h4>
            <h5>${item.date}</h5>
            <p>${item.description}</p>
          </div>
        </div>
      `;
    swiperWrapper.appendChild(slide);
  });

  // Initialize Swiper with updated options
  const swiper = new Swiper(".latestNews_swiper", {
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
      640: {
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
