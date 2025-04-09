// Hardcoded Users (Initially)
const users = {
    "admin1": { password: "Admin@123", role: "Admin" },
    "editor1": { password: "Editor@123", role: "Editor" },
    "viewer1": { password: "Viewer@123", role: "Viewer" }
};

let loggedInUser = null;
let uploadedFiles = [];

// Show Registration Form
document.getElementById("register-link").addEventListener("click", () => {
    document.getElementById("auth").style.display = "none";
    document.getElementById("register").style.display = "block";
});

// Register New User
document.getElementById("registerBtn").addEventListener("click", () => {
    let newUsername = document.getElementById("new-username").value;
    let newPassword = document.getElementById("new-password").value;

    if (newUsername && newPassword) {
        if (users[newUsername]) {
            document.getElementById("register-msg").innerText = "Username already exists!";
        } else {
            users[newUsername] = { password: newPassword, role: "Viewer" }; // Default role: Viewer
            document.getElementById("register-msg").innerText = "Registration successful! Please login.";
            setTimeout(() => {
                document.getElementById("register").style.display = "none";
                document.getElementById("auth").style.display = "block";
            }, 2000);
        }
    } else {
        document.getElementById("register-msg").innerText = "Please enter a username and password.";
    }
});

// Login Function
document.getElementById("loginBtn").addEventListener("click", () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (users[username] && users[username].password === password) {
        loggedInUser = { username, role: users[username].role };
        sendOTP();
    } else {
        document.getElementById("error-msg").innerText = "Invalid Username or Password!";
    }
});

// Simulate OTP Verification
function sendOTP() {
    alert("OTP sent: 123456");  // Simulating OTP for demo
    document.getElementById("auth").style.display = "none";
    document.getElementById("verify-otp").style.display = "block";
}

// Verify OTP
document.getElementById("verifyBtn").addEventListener("click", () => {
    let otp = document.getElementById("otp").value;
    if (otp === "123456") {
        document.getElementById("verify-otp").style.display = "none";
        document.getElementById("fileOperations").style.display = "block";
        alert(`Welcome, ${loggedInUser.username} (${loggedInUser.role})`);
        loadFiles();
    } else {
        document.getElementById("otp-error").innerText = "Invalid OTP!";
    }
});

// File Upload
document.getElementById("uploadBtn").addEventListener("click", () => {
    let file = document.getElementById("fileInput").files[0];
    if (file) {
        uploadedFiles.push(file);
        loadFiles();
    } else {
        alert("Please select a file.");
    }
});

// Load Files to View, Download, and Delete
function loadFiles() {
    let fileListDiv = document.getElementById("fileList");
    fileListDiv.innerHTML = "<h3>Uploaded Files:</h3>";

    uploadedFiles.forEach((file, index) => {
        let fileURL = URL.createObjectURL(file);
        fileListDiv.innerHTML += `
            <p>${file.name}
                <button onclick="viewFile('${fileURL}')">View</button>
                <button onclick="downloadFile('${fileURL}', '${file.name}')">Download</button>
                ${loggedInUser.role !== "Viewer" ? `<button onclick="deleteFile(${index})">Delete</button>` : ""}
            </p>
        `;
    });
}

// View File in New Tab
function viewFile(fileURL) {
    window.open(fileURL, "_blank");
}

// Load Files with View, Download, and Delete Options
function loadFiles() {
    let fileListDiv = document.getElementById("fileList");
    fileListDiv.innerHTML = "<h3>Uploaded Files:</h3>";

    uploadedFiles.forEach((file, index) => {
        let fileURL = URL.createObjectURL(file);
        fileListDiv.innerHTML += `
            <p>${file.name}
                <button onclick="viewFile('${fileURL}')">View</button>
                <button onclick="downloadFile('${fileURL}', '${file.name}')">Download</button>
                ${loggedInUser.role !== "Viewer" ? `<button onclick="deleteFile(${index})">Delete</button>` : ""}
            </p>
        `;
    });
}
// Download File
function downloadFile(fileURL, fileName) {
    let a = document.createElement("a");
    a.href = fileURL;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Delete File
function deleteFile(index) {
    if (loggedInUser.role === "Admin" || loggedInUser.role === "Editor") {
        uploadedFiles.splice(index, 1);
        loadFiles();
    } else {
        alert("You don't have permission to delete files.");
    }
}

// Close File Viewer Modal
document.querySelector(".close-btn").addEventListener("click", () => {
    document.getElementById("file-viewer-modal").style.display = "none";
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    loggedInUser = null;
    document.getElementById("fileOperations").style.display = "none";
    document.getElementById("auth").style.display = "block";
});

