// function includeHTML() {
//     var z, i, elmnt, file, xhttp;
//     /* Loop through a collection of all HTML elements: */
//     z = document.getElementsByTagName("*");
//     for (i = 0; i < z.length; i++) {
//       elmnt = z[i];
//       /* Search for elements with a certain attribute: */
//       file = elmnt.getAttribute("w3-include-html");
//       if (file) {
//         /* Make an HTTP request using the attribute value as the file name: */
//         xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//           if (this.readyState == 4) {
//             if (this.status == 200) {elmnt.innerHTML = this.responseText;}
//             if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
//             /* Remove the attribute, and call this function once more: */
//             elmnt.removeAttribute("w3-include-html");
//             includeHTML();
//           }
//         }
//         xhttp.open("GET", file, true);
//         xhttp.send();
//         /* Exit the function: */
//         return;
//       }
//     }
//   }
  

// document.addEventListener("DOMContentLoaded", includeHTML);



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


document.addEventListener("DOMContentLoaded", function() {
  document.body.classList.add('loaded');
});

document.addEventListener("DOMContentLoaded", function() {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navbarSmall = document.getElementById("navbar-small");

  if (hamburgerMenu && navbarSmall) {
    hamburgerMenu.addEventListener("click", function() {
        navbarSmall.classList.toggle("show");
    });
  }
});







let isSubmitted = false; // Flag to track form submission status

function FormValidation(event) {
  event.preventDefault(); // Prevent form submission

  // Get form elements
  const form = document.getElementById("contact-form");
  const Name = document.getElementById("name").value.trim();
  const Email = document.getElementById("email").value.trim();
  const Message = document.getElementById("message").value.trim();
  const errorMessage = document.getElementById("error-message");
  const wordCount = Message.trim().split(/\s+/).length;

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
  if (Name === "") {
    errorMessage.textContent = "Please enter your name";
    errorMessage.style.display = 'flex';
    return false;
  }

  if (Name.length > 20) {
    errorMessage.textContent = "Name is too long";
    errorMessage.style.display = 'flex';
    return false;
  }

  if (Email === "") {
    errorMessage.textContent = "Please enter your email";
    errorMessage.style.display = 'flex';
    return false;
  }

  if (!emailRegex.test(Email)) {
    errorMessage.textContent = "Enter a valid email";
    errorMessage.style.display = 'flex';
    return false;
  }

  if (wordCount > 20) {
    errorMessage.textContent = "Message should be short";
    errorMessage.style.display = 'flex';
    return false;
  }

  // If all validations pass
  errorMessage.textContent = "Sent Successfully";
  errorMessage.style.backgroundColor = "#18bbb3";
  errorMessage.style.display = 'flex';

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

// Reset flag if the form is reset manually or if needed
function resetForm() {
  isSubmitted = false;
}

// Attach resetForm to the form reset event if needed
document.getElementById("contact-form").addEventListener("reset", resetForm);




  function toggleAnswer(answerId) {
    var answerElement = document.getElementById(answerId);
    if (answerElement.style.display === 'none' || answerElement.style.display === '') {
      answerElement.style.display = 'block';
    } else {
      answerElement.style.display = 'none';
    }
  }
  
  

  
