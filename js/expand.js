document.addEventListener("DOMContentLoaded", function() {
    var projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(function(card) {
        card.addEventListener("click", function() {
            card.classList.toggle("expanded");
        });
    });
});
