// document.getElementById('contact-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     alert('Thank you for contacting us, ' + document.getElementById('name').value + '!');
//     // You can add more form submission logic here, such as sending the data to a server
// });


document.addEventListener('DOMContentLoaded', function() {
    // Get all elements with the class 'job-post-div'
    const jobPostDivs = document.querySelectorAll('.job-post-div');

    // Iterate over each job-post-div element
    jobPostDivs.forEach(jobPostDiv => {
        jobPostDiv.addEventListener('click', function() {
            // Find the corresponding extended div using the next sibling element
            const jobPostExtendedDiv = jobPostDiv.nextElementSibling;

            // Toggle the display property of the extended div
            if (jobPostExtendedDiv.style.display === 'none' || jobPostExtendedDiv.style.display === '') {
                jobPostExtendedDiv.style.display = 'flex';  // Show the extended div
            } else {
                jobPostExtendedDiv.style.display = 'none';  // Hide the extended div
            }
        });
    });
});