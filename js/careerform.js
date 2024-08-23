
document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll(".form-input, .form-textarea");
    const form = document.querySelector("form");
  
    inputs.forEach(input => {
        input.addEventListener("focus", function(event) {
            event.stopPropagation();
  
            // Remove 'active' class from all inputs
            inputs.forEach(input => input.classList.remove("active"));
  
            // Add 'active' class to the focused input
            this.classList.add("active");
        });
    });
  
    document.addEventListener("click", function() {
        inputs.forEach(input => {
            input.classList.remove("active");
        });
    });
  
    form.addEventListener("click", function(event) {
        event.stopPropagation();
    });
  });