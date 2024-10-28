document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Simple validation
        if (!username || !password) {
            showErrorModal("Vui lòng điền cả tên người dùng và mật khẩu.");
            return; // Stop further execution
        }

        // Simulate a login process (Replace this with actual API call)
        if (username !== "admin" || password !== "yourAdminPassword") {
            showErrorModal("Tên người dùng hoặc mật khẩu không hợp lệ");
            return; // Stop further execution
        }

        // If the credentials are correct, you can proceed to submit the form
        loginForm.submit(); // Submit the form
    });

    // Toggle password visibility
    document.getElementById("togglePassword").addEventListener("click", function () {
        const passwordField = document.getElementById("password");
        const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
        passwordField.setAttribute("type", type);
        this.classList.toggle("active");
    });

    // Function to show the error modal
    function showErrorModal(message) {
        document.getElementById("errorMessage").innerText = message; // Set the error message
        const modal = new bootstrap.Modal(document.getElementById("loginErrorModal"));
        modal.show(); // Show the modal
    }
});
