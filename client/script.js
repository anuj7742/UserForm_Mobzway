
  
function saveUser() {
  const user = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      mobileNo: $('#mobileNo').val(),
      email: $('#email').val(),  // Use `emailId` to match your schema
      address: {
          street: $('#street').val(),
          city: $('#city').val(),
          state: $('#state').val(),
          country: $('#country').val()
      },
      loginId: $('#loginId').val(),
      password: $('#password').val()
  };

  $.ajax({
      url: 'https://userform-mobzway-f7oq.onrender.com/api/users',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(user),
      success: function(response) {
          alert('User saved successfully');
          // Clear the form
          $('form')[0].reset();
          // Redirect to the user display page
          window.location.href = 'display-users.html';
         // getUsers();
      },
      error: function(jqXHR) {
          const errorResponse = jqXHR.responseJSON || {};
          let errorMessage = "Error saving user:\n";
          if (errorResponse.errors) {
              for (const key in errorResponse.errors) {
                  if (errorResponse.errors.hasOwnProperty(key)) {
                      errorMessage += `${errorResponse.errors[key].message}\n`;
                  }
              }
          } else {
              errorMessage += errorResponse.message || 'Unknown error';
          }
          alert(errorMessage);
      }
  });
}

function validateForm() {
    const password = document.getElementById('password').value;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!passwordPattern.test(password)) {
      alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
      return false; // Prevent form submission
    }

    return true; // Allow form submission
  }

  // Custom validation messages for email
  document.getElementById('email').addEventListener('input', function (event) {
    const emailField = event.target;
    if (emailField.validity.typeMismatch) {
      emailField.setCustomValidity('Please enter a valid email address');
    } else {
      emailField.setCustomValidity('');
    }
  });

  // function getUsers() {
  //   $.ajax({
  //     url: 'http://localhost:4000/api/users',
  //     type: 'GET',
  //     success: function(users) {
  //       const usersDiv = $('#users');
  //       usersDiv.empty();
  //       users.forEach(user => {
  //         usersDiv.append(`<p>${user.firstName} ${user.lastName}</p>`);
  //       });
  //     },
  //     error: function(error) {
  //       alert('Error fetching users: ' + error.responseJSON.error);
  //     }
  //   });
  // }
  
  // $(document).ready(function() {
  //   getUsers();
  // });
  