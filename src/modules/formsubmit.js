/** Logic for handling Add-Task and Add-Note form on submit events
 *  Takes in data from the form fields and instantiates an obj for it
 *  Renders the list of respective data 
 */

// saved to call .click() method for closing form instead of "submitting"
const nav = document.querySelector('nav');

export default function addSubmitFormListener() {
    const form = document.getElementsByClassName('add-form')[0];

    form.addEventListener('submit', (e) => {
        // Prevent page reload and 
        // save fields to FormData object
        e.preventDefault();
        const formData = new FormData(form);
        const values = [...formData.values()];
        console.log(values);
        nav.click();
    })
}