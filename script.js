
const scriptURL = 'AKfycbxbYs4U12tqg3qlIivPoDBwHMU4nV0lgxCOwj8PfyAW';
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
