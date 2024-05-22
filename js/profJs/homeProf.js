document.addEventListener("DOMContentLoaded", function() {
    // Retrieve level and ProfID from session storage
    const level = sessionStorage.getItem('level');
    const profID = sessionStorage.getItem('profID');

    // Conditional display based on the value of 'level'
    const content = document.getElementById('conditional-content');
    if (level !== '1') {
      content.style.display = 'none';
    }

    // Use profID as needed
    console.log('ProfID:', profID);
  });