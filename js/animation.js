document.addEventListener('DOMContentLoaded', function() {
    const milestonesSection = document.querySelector('.milestones');
    const milestoneItems = document.querySelectorAll('.milestone-list li');
    const corporateSection = document.querySelector('.corporate-citizenship');
  
    function handleScroll() {
      // Milestones Section
      const milestoneRect = milestonesSection.getBoundingClientRect();
      if (milestoneRect.top < window.innerHeight && milestoneRect.bottom > 0) {
        milestonesSection.classList.add('visible');
        milestoneItems.forEach(item => item.classList.add('visible'));
      } else {
        milestonesSection.classList.remove('visible');
        milestoneItems.forEach(item => item.classList.remove('visible'));
      }
  
      // Corporate Citizenship Section
      const corporateRect = corporateSection.getBoundingClientRect();
      if (corporateRect.top < window.innerHeight && corporateRect.bottom > 0) {
        corporateSection.classList.add('visible');
      } else {
        corporateSection.classList.remove('visible');
      }
    }
  
    // Initial check in case the section is already in view
    handleScroll();
  
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
  });
  

  document.addEventListener('DOMContentLoaded', function() {
    const infoCardsSection = document.querySelector('.info-cards');
    const infoCards = document.querySelectorAll('.info-cards .card');

    function handleScroll() {
        // Info Cards Section
        const infoCardsRect = infoCardsSection.getBoundingClientRect();
        if (infoCardsRect.top < window.innerHeight && infoCardsRect.bottom > 0) {
            infoCardsSection.classList.add('visible');
            infoCards.forEach(card => card.classList.add('visible'));
        } else {
            infoCardsSection.classList.remove('visible');
            infoCards.forEach(card => card.classList.remove('visible'));
        }
    }

    // Initial check in case the section is already in view
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});



document.addEventListener('DOMContentLoaded', function() {
  const highlightsSection = document.querySelector('.highlights');
  const photoGallery = document.querySelector('.photo-gallery');
  const awardsSection = document.querySelector('.awards');
  const galleryImages = document.querySelectorAll('.gallery img');
  const awardsItems = document.querySelectorAll('.awards li');

  function handleScroll() {
      const highlightsRect = highlightsSection.getBoundingClientRect();
      if (highlightsRect.top < window.innerHeight && highlightsRect.bottom > 0) {
          highlightsSection.classList.add('visible');
      }

      const photoGalleryRect = photoGallery.getBoundingClientRect();
      if (photoGalleryRect.top < window.innerHeight && photoGalleryRect.bottom > 0) {
          photoGallery.classList.add('visible');
          galleryImages.forEach(img => img.classList.add('visible'));
      }

      const awardsRect = awardsSection.getBoundingClientRect();
      if (awardsRect.top < window.innerHeight && awardsRect.bottom > 0) {
          awardsSection.classList.add('visible');
          awardsItems.forEach(item => item.classList.add('visible'));
      }
  }

  // Initial check in case the section is already in view
  handleScroll();

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
});


