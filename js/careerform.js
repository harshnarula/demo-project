
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

  let isSubmitted = false; // Flag to track form submission status

  function FormValidation(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form elements
    const form = document.getElementById("career-form");
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("mobileNo").value.trim();
    const checkboxes = document.querySelectorAll('input[name="position"]:checked');
    const resume = document.getElementById("resume");
    const statement = document.getElementById("email").value.trim(); // Corrected textarea ID to 'email' to match HTML
    const errorMessage = document.getElementById("error-message");
    const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
  
    // Regex for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    // Reset error message
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
  
    // Check if the form has already been submitted
    if (isSubmitted) {
      return; // Exit if already submitted
    }
  
    // Validate form inputs
    if (name === "") {
      errorMessage.textContent = "Please enter your name";
      errorMessage.style.display = 'block';
      return false;
    }
  
    if (name.length > 20) {
      errorMessage.textContent = "Name is too long";
      errorMessage.style.display = 'block';
      return false;
    }
  
    if (email === "") {
      errorMessage.textContent = "Please enter your email";
      errorMessage.style.display = 'block';
      return false;
    }
  
    if (!emailRegex.test(email)) {
      errorMessage.textContent = "Enter a valid email";
      errorMessage.style.display = 'block';
      return false;
    }
  
    if (phone === "") {
      errorMessage.textContent = "Please enter your phone number";
      errorMessage.style.display = 'block';
      return false;
    }
  
    if (!/^\d{10}$/.test(phone)) {
      errorMessage.textContent = "Phone number must be exactly 10 digits";
      errorMessage.style.display = 'block';
      return false;
    }
  
    if (checkboxes.length !== 1) {
      errorMessage.textContent = "Please select exactly one position";
      errorMessage.style.display = 'block';
      return false;
    }
  
    if (resume.files.length > 0) {
      const fileSize = resume.files[0].size;
      if (fileSize > maxFileSize) {
        errorMessage.textContent = "Uploaded file size should not exceed 5MB";
        errorMessage.style.display = 'block';
        return false;
      }
    } else {
      errorMessage.textContent = "Please upload your resume";
      errorMessage.style.display = 'block';
      return false;
    }
  
    if (statement.length > 70) {
      errorMessage.textContent = "Statement should not exceed 70 characters";
      errorMessage.style.display = 'block';
      return false;
    }
  
    // If all validations pass
    errorMessage.textContent = "Sent Successfully";
    errorMessage.style.backgroundColor = "#416392";
    errorMessage.style.display = 'block';
  
    // Set flag to prevent further validation
    isSubmitted = true;
  
    // Clear the form fields
    form.reset();
  
    // Hide the success message after 3 seconds
    setTimeout(() => {
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
    }, 3000);
  }
  
  
  // Attach FormValidation to form submission
  document.getElementById("career-form").addEventListener("submit", FormValidation);
  