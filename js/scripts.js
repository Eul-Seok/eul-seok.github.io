/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Manual scroll tracking for navigation
    const sections = document.querySelectorAll('section.resume-section');
    const navLinks = document.querySelectorAll('.nav-link.js-scroll-trigger');

    const activateNavItem = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    };

    const ACTIVATION_PERCENTAGE = 0.51; // Percentage of the new section visible to activate (e.g., 0.51 for 51%)

    const handleScroll = () => {
        let currentActiveSectionId = null;
        const scrollY = window.scrollY || window.pageYOffset;
        const viewportHeight = window.innerHeight; // Get viewport height

        // Define the activation point based on the ACTIVATION_PERCENTAGE
        const activationOffset = viewportHeight * (1 - ACTIVATION_PERCENTAGE);

        sections.forEach(section => {
            const sectionRect = section.getBoundingClientRect();
            const sectionTop = sectionRect.top;
            const sectionBottom = sectionRect.bottom;

            // Check if the section's top is above the activation offset
            // and if its bottom is below the activation offset
            // This means the activation point is within the section
            if (sectionTop <= activationOffset && sectionBottom > activationOffset) {
                currentActiveSectionId = section.id;
            }
        });

        if (currentActiveSectionId) {
            activateNavItem(currentActiveSectionId);
        } else if (sections.length > 0) {
            // Fallback: if no section is actively in view based on the 51% rule,
            // activate the first section if the user is at the very top of the page.
            // Or, if the user has scrolled past all sections, activate the last one.

            // Let's activate the first section if scrollY is very small (at the top)
            if (scrollY < 100 && sections[0]) { // Arbitrary small value for "very top"
                activateNavItem(sections[0].id);
            } else {
                // If scrolled past all sections, activate the last one
                const lastSection = sections[sections.length - 1];
                if (lastSection && scrollY >= lastSection.offsetTop + lastSection.offsetHeight - viewportHeight) {
                    activateNavItem(lastSection.id);
                }
            }
        }
    };

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial activation on page load
    handleScroll();
});
