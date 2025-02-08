document.addEventListener("DOMContentLoaded", function () {
    // Your RestDB API Key
    const APIKEY = "67a784c94d87447c4c82804e";
    getContacts();
    
    // [STEP 1]: Create our submit form listener
    document.getElementById("contactForm").addEventListener("submit", function (e) {
        e.preventDefault();
        
        // [STEP 2]: Retrieve form data
        let fullName = document.getElementById("fullName").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;
        
        // [STEP 3]: Create our JSON data
        let jsondata = {
            "name": fullName,
            "email": email,
            "message": message
        };
        
        // [STEP 4]: Create our AJAX settings
        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata)
        };
        
        // [STEP 5]: Send our AJAX request to RestDB
        fetch("https://retrocollect-354b.restdb.io/rest/contact", settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Show success message
                document.getElementById("successMessage").style.display = "block";
                document.getElementById("successMessage").classList.add("show");
                
                // Reset the form
                document.getElementById("contactForm").reset();
                
                // Hide success message after 3 seconds
                setTimeout(function () {
                    document.getElementById("successMessage").style.display = "none";
                    document.getElementById("successMessage").classList.remove("show");
                }, 3000);
                
                // Update contacts list
                getContacts();
            })
            .catch(error => {
                // Show error message
                document.getElementById("errorMessage").style.display = "block";
                document.getElementById("errorMessage").classList.add("show");
                
                setTimeout(function () {
                    document.getElementById("errorMessage").style.display = "none";
                    document.getElementById("errorMessage").classList.remove("show");
                }, 3000);
                
                console.error('Error:', error);
            });
    });
    
    // [STEP 6]: Get contacts function
    function getContacts(limit = 10, all = true) {
        let settings = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
        };
        
        fetch("https://retrocollect-354b.restdb.io/rest/contact", settings)
            .then(response => response.json())
            .then(response => {
                console.log(response);
            });
    }
});