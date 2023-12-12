function validateForm() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var message = document.getElementById("message").value.trim();

  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  var emailError = document.getElementById("emailError");
  var nameError = document.getElementById("nameError");
  var messageError = document.getElementById("messageError");

  emailError.textContent = "";
  nameError.textContent = "";
  messageError.textContent = "";

  var isValid = true;

  if (name === "") {
    isValid = false;
    nameError.textContent = "Please enter your name.";
  } else if (email === "") {
    isValid = false;
    emailError.textContent = "Please enter your email address.";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    emailError.textContent = "Invalid email address.";
  } else if (message === "") {
    isValid = false;
    messageError.textContent = "Please enter your message.";
  }

  return isValid;
}

function clearError(errorId) {
  var errorElement = document.getElementById(errorId);
  errorElement.textContent = "";
}

const currentYear = new Date().getFullYear();

const copyrightYearElement = document.getElementById("copyright-year");

copyrightYearElement.textContent = currentYear;
