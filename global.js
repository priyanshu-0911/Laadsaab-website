// ======================= Global Site Logic =======================
document.addEventListener('DOMContentLoaded', () => {
    
    // ======================= Global Authentication Logic =======================
    const loginBtn = document.getElementById('login-btn');
    const userProfile = document.getElementById('user-profile');
    const userAvatar = document.getElementById('user-avatar');

    // Function to handle Google Sign-In
    function signInWithGoogle() {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                console.log("Signed in successfully!", result.user);
            })
            .catch((error) => {
                console.error("Authentication failed:", error);
            });
    }

    // Function to handle Sign-Out
    function signOutUser() {
        auth.signOut()
            .then(() => {
                console.log("Signed out successfully.");
            })
            .catch((error) => {
                console.error("Sign out failed:", error);
            });
    }

    // Listen for changes in authentication state
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            loginBtn.style.display = 'none';
            userProfile.style.display = 'block';
            userAvatar.src = user.photoURL; // Set avatar image from Google account
        } else {
            // User is signed out
            loginBtn.style.display = 'block';
            userProfile.style.display = 'none';
            userAvatar.src = '';
        }
    });

    // Add click listeners for login/logout
    loginBtn.addEventListener('click', signInWithGoogle);
    userAvatar.addEventListener('click', () => {
        // Simple confirmation for logout
        if (confirm("Do you want to sign out?")) {
            signOutUser();
        }
    });

    // ======================= Global Page Transition Logic =======================
    const transitionOverlay = document.querySelector('.page-transition-overlay');

    // --- Fade IN on page load ---
    window.addEventListener('load', () => {
        if (transitionOverlay) {
            transitionOverlay.classList.add('fade-out');
        }
    });

    // --- Fade OUT on link click ---
    const allLinks = document.querySelectorAll('a');

    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Check if it's a valid, internal link and not just a scroll link
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                e.preventDefault(); // Stop the browser from navigating instantly

                if (transitionOverlay) {
                    transitionOverlay.classList.remove('fade-out'); // Make it visible
                }

                // Wait for the fade animation to finish, then navigate
                setTimeout(() => {
                    window.location.href = href;
                }, 500); // This duration should match the CSS transition time
            }
        });
    });
});