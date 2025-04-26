
const scriptURL = 'AKfycbweNC6q1xVFjVpmSmfZ7C7sALC3XKwJQZh1GOCvWBPrntX69O9GtNcHzuyhOfvH98n37g';
const form = document.forms['submit-to-google-sheet'];
const successMsg = document.getElementById("success-message");

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      successMsg.style.display = "block";
      form.reset();
    })
    .catch(error => console.error('Error!', error.message));
});
