// ======================= Global Site Logic =======================
document.addEventListener('DOMContentLoaded', () => {
  // ======================= Global Authentication Logic =======================
  // Safely access Firebase globals if present
  const hasFirebase = typeof window !== 'undefined'
                   && typeof window.auth !== 'undefined'
                   && typeof window.googleProvider !== 'undefined';

  const loginBtn     = document.getElementById('login-btn');
  const userProfile  = document.getElementById('user-profile');
  const userAvatar   = document.getElementById('user-avatar');

  function signInWithGoogle() {
    if (!hasFirebase) {
      console.warn('Auth not available on this page.');
      return;
    }
    auth.signInWithPopup(googleProvider)
      .then((result) => {
        console.log('Signed in successfully!', result.user);
      })
      .catch((error) => {
        console.error('Authentication failed:', error);
      });
  }

  function signOutUser() {
    if (!hasFirebase) {
      console.warn('Auth not available on this page.');
      return;
    }
    auth.signOut()
      .then(() => {
        console.log('Signed out successfully.');
      })
      .catch((error) => {
        console.error('Sign out failed:', error);
      });
  }

  // Listen for changes in authentication state (only if auth exists)
  if (hasFirebase && typeof auth.onAuthStateChanged === 'function') {
    auth.onAuthStateChanged((user) => {
      // Safely update UI only if elements exist
      if (user) {
        if (loginBtn)    loginBtn.style.display = 'none';
        if (userProfile) userProfile.style.display = 'block';
        if (userAvatar)  userAvatar.src = user.photoURL || '';
      } else {
        if (loginBtn)    loginBtn.style.display = 'block';
        if (userProfile) userProfile.style.display = 'none';
        if (userAvatar)  userAvatar.src = '';
      }
    });
  }

  // Add click listeners for login/logout (only if elements exist)
  if (loginBtn) {
    loginBtn.addEventListener('click', signInWithGoogle);
  }

  if (userAvatar) {
    userAvatar.addEventListener('click', () => {
      if (confirm('Do you want to sign out?')) {
        signOutUser();
      }
    });
  }

  // ======================= Global Page Transition Logic =======================
  const transitionOverlay = document.querySelector('.page-transition-overlay');

  // Fade IN on page load (only if overlay exists)
  if (transitionOverlay) {
    window.addEventListener('load', () => {
  transitionOverlay.classList.add('fade-out');
  // Ensure header is visible on any page load
  document.body.classList.add('is-loaded');
  document.body.classList.remove('is-loading');
});
  }

  // Fade OUT on internal link click (only if overlay exists)
  if (transitionOverlay) {
    const allLinks = document.querySelectorAll('a[href]');
    allLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Ignore empty, hash links, mailto/tel, or absolute URLs
        if (!href || href.trim() === '' ||
            href.startsWith('#') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            href.startsWith('http')) {
          return;
        }

        // It is an internal navigation: animate overlay
        e.preventDefault();
        transitionOverlay.classList.remove('fade-out');

        // Navigate after the overlay fades in (match CSS duration)
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      });
    });
  }
});

// NUCLEAR SAFETY NET - always show header after 3 seconds
setTimeout(() => {
  const header = document.querySelector('.header');
  if (header) {
    header.style.opacity = '1';
    header.style.visibility = 'visible';
    header.style.pointerEvents = 'auto';
    header.style.display = 'block';
    header.style.zIndex = '9500';
  }
  document.body.classList.remove('is-loading');
  document.body.classList.add('is-loaded');
}, 3000);
