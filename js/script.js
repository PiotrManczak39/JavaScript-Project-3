
//First text field in focus by default using jQuery.
$('#name').focus();
//Hide Other Job Role.
$('#other-title').hide();
//Hide the “Select Theme” `option` element in the “Design” menu.
$('#design option:first-child').hide();
//Update the “Color” field to read “Please select a T-shirt theme”.
const $newText = 'Please select a T-shirt theme';
$('#colors-js-puns label').text($newText);
//Hide the colors in the “Color” drop down menu.
$('#color').hide();

/*----------------------------------------------------------
                 T-shirt Selection
-----------------------------------------------------------*/

const colorSelection = document.getElementById('color');
const design = document.getElementById('design');
design.addEventListener('change', () => {
  colorSelection.style.display = 'block';
  let colorTitle = document.querySelector('#colors-js-puns label');
  colorTitle.textContent  = 'Color';

  //Options variables
  let cornflowerblue = colorSelection.querySelector('option:nth-child(1)');
  let darkslategrey = colorSelection.querySelector('option:nth-child(2)');
  let gold = colorSelection.querySelector('option:nth-child(3)');
  let tomato = colorSelection.querySelector('option:nth-child(4)');
  let steelblue = colorSelection.querySelector('option:nth-child(5)');
  let dimgrey = colorSelection.querySelector('option:nth-child(6)');
  //Switching between options
  if (design.value === 'js puns') {
    cornflowerblue.selected = 'true';
    cornflowerblue.style.display = 'block';
    darkslategrey.style.display = 'block';
    gold.style.display = 'block';
    tomato.style.display = 'none';
    steelblue.style.display = 'none';
    dimgrey.style.display = 'none';
  } else if (design.value === 'heart js') {
    tomato.selected = 'true';
    cornflowerblue.style.display = 'none';
    darkslategrey.style.display = 'none';
    gold.style.display = 'none';
    tomato.style.display = 'block';
    steelblue.style.display = 'block';
    dimgrey.style.display = 'block';
  }
});

/*-----------------------------------------------------------
               Activities Section
------------------------------------------------------------*/

let totalActivityCost = 0;
const totalCost = document.createElement('h3');
const activitiesDiv = document.querySelector('.activities');
activitiesDiv.appendChild(totalCost);
const courseOptions = activitiesDiv.getElementsByTagName('input');

//Event listener checking checkboxes
activitiesDiv.addEventListener('change', (e) => {
  if (e.target.tagName === 'INPUT') {
    let checkbox = e.target;
    if (checkbox.checked) {
      //Checking and disabling the same time activities
      let chosenData = checkbox.getAttribute('data-day-and-time');
      for (let i=1; i<courseOptions.length; i++) {
        let data = courseOptions[i].getAttribute('data-day-and-time');
        if ( data === chosenData ) {
          if (courseOptions[i] !== checkbox) {
            courseOptions[i].setAttribute('disabled', true);
          }
        }
      }
      //Calculating total cost of all activities (+)
      let parent = checkbox.parentNode;
      let courseCost = checkbox.getAttribute('data-cost');
      let courseCostNumber = parseInt(courseCost, 10);
      totalActivityCost += courseCostNumber;
    } else if (checkbox.checked == false) {
      //Checking and enabling the same time activities
      let chosenData = checkbox.getAttribute('data-day-and-time');
      for (let i=1; i<courseOptions.length; i++) {
        let data = courseOptions[i].getAttribute('data-day-and-time');
        if ( data === chosenData && courseOptions[i] !== checkbox) {
            courseOptions[i].removeAttribute('disabled');
        }
      }
      //Calculating total cost of all activities (-)
      let parent = checkbox.parentNode;
      let courseCost = checkbox.getAttribute('data-cost');
      let courseCostNumber = parseInt(courseCost, 10);
      totalActivityCost -= courseCostNumber;
    }
  }
  totalCost.textContent = `Total Cost:  $${totalActivityCost}`;
});

/*---------------------------------------------------------
                Payment Method Information
----------------------------------------------------------*/

const paymentMethod = document.getElementById('payment');
//Hiding 'Select Method' option
const selectMethod = document.querySelector('option[value="select method"]');
selectMethod.style.display = 'none';

//Selectors for this part
const creditCard = document.querySelector('option[value="credit card"]');
const paypal = document.querySelector('option[value="paypal"]');
const bitcoin = document.querySelector('option[value="bitcoin"]');
const creditCardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');

//Displaying Credit Card as a first payment option
creditCard.selected = 'true';

//Hiding info about paypal and bitcoin
paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

//Event Listener for changes in payment methods
paymentMethod.addEventListener('change', () => {
  if (paypal.selected) {
    creditCardDiv.style.display = 'none';
    paypalDiv.style.display = 'block';
    bitcoinDiv.style.display = 'none';
  } else if (bitcoin.selected) {
    creditCardDiv.style.display = 'none';
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'block';
  } else if (creditCard.selected) {
    creditCardDiv.style.display = 'block';
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
  }
});

/*---------------------------------------------------
                 Error Messages
---------------------------------------------------*/

//Name error Message
let nameError = document.createElement('p');
nameError.textContent = 'Name field should not be empty!';
nameError.className = 'error';
let parentInfo = document.querySelector('fieldset');
let sibiling = document.querySelector('label[for="name"]');
parentInfo.insertBefore(nameError, sibiling);
nameError.setAttribute('id', 'nameError');
nameError.style.display = 'none';

//Email Error Message
let emailError = document.createElement('p');
emailError.textContent = 'It does not look like an email to me!';
emailError.className = 'error';
let emailSibiling = document.querySelector('label[for="mail"]');
parentInfo.insertBefore(emailError, emailSibiling);
emailError.setAttribute('id', 'emailError');
emailError.style.display = 'none';

//Checkbox Error Message
let activitiesError = document.createElement('p');
activitiesError.textContent = 'You MUST check at least one checkbox, please!';
activitiesError.className = 'error';
let activitiviesErrorParent = document.querySelector('.activities');
let activitiesErrorSibiling = document.querySelector('input[name="all"]').parentNode;
activitiviesErrorParent.insertBefore(activitiesError, activitiesErrorSibiling);
activitiesError.setAttribute('id', 'emailError');
activitiesError.style.display = 'none';

//Credit Card Error message
let creditCardError = document.createElement('p');
creditCardError.textContent = 'Credit Card number should be between 13 and 16 numbers long!';
creditCardError.className = 'errorCC';
let creditCardErrorSibiling = document.querySelector('.col-6');
creditCardDiv.insertBefore(creditCardError, creditCardErrorSibiling);
creditCardError.setAttribute('id', 'creditCardError');
creditCardError.style.display = 'none';

//Zip Code Error message
let ZCError = document.createElement('p');
ZCError.textContent = 'Zip should be 5 digits long!';
ZCError.className = 'errorZC';
let ZCErrorSibiling = creditCardDiv.querySelector('div:nth-child(3)');
creditCardDiv.insertBefore(ZCError, ZCErrorSibiling);
ZCError.setAttribute('id', 'ZCError');
ZCError.style.display = 'none';

//CVV Error message
let CVVError = document.createElement('p');
CVVError.textContent = 'CVV should be 3 digits long!';
CVVError.className = 'errorCVV';
let CVVErrorSibiling = creditCardDiv.querySelector('div:nth-child(5)');
creditCardDiv.insertBefore(CVVError, CVVErrorSibiling);
CVVError.setAttribute('id', 'CVVError');
CVVError.style.display = 'none';

/*---------------------------------------------------
           Validation functions
---------------------------------------------------*/

//Validation of Name Section
const nameField = document.getElementById('name');
function nameFieldValidation() {
  if (nameField.value == '') {
    nameError.style.display = 'block';
    return false;
  } else {
    nameError.style.display = 'none';
    return true;
  }
}

//Email validation function
const emailField = document.getElementById('mail');
function emailFieldValidation(email) {
  if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(email) == true) {
    emailError.style.display = 'none';
    return true;
  } else {
    emailError.style.display = 'block';
    return false;
  }
}

//Activity Section Validation
let checkboxArray = activitiesDiv.getElementsByTagName('input');
function checkboxValidation(arr) {
  let arrChecked = [];
  let arrNotchecked = [];
  for (let i=0; i < arr.length; i++) {
    (arr[i].checked ? arrChecked.push(arr[i]) : arrNotchecked.push([i]));
  }
  if (arrChecked.length > 0) {
    activitiesError.style.display = 'none';
    return true;
  } else {
    activitiesError.style.display = 'block';
    return false;
  }
}

//Credit Card Validation
const creditCardInput = document.getElementById('cc-num');
function creditCardValidation(string) {
  let userInputNumber = parseInt(string, 10);
  let regex = /^\d{13,16}$/;
  if (regex.test(userInputNumber)) {
    creditCardError.style.display = 'none';
    return true;
  } else {
    creditCardError.style.display = 'block';
    return false;
  }
}

//Zip Code Valuation function
const zipCode = document.getElementById('zip');
function zipCodeValuation(string) {
  let userInputZipCode = parseInt(string, 10);
  let regex = /^\d{5}$/;
  if (regex.test(userInputZipCode)) {
    ZCError.style.display = 'none';
    return true;
  } else {
    ZCError.style.display = 'block';
    return false;
  }
}

//CVV Valuation function
const CVV = document.getElementById('cvv');
function CVVInputValidation(string) {
  let userInputCVV = parseInt(string, 10);
  let regex = /^\d{3}$/;
  if (regex.test(userInputCVV)) {
    CVVError.style.display = 'none';
    return true;
  } else {
    CVVError.style.display = 'block';
    return false;
  }
}

const button = document.getElementsByTagName('button')[0];
button.addEventListener('click', (event) => {
  event.preventDefault();
  nameFieldValidation(nameField.value);
  emailFieldValidation(emailField.value);
  checkboxValidation(checkboxArray);
  creditCardValidation(creditCardInput.value);
  zipCodeValuation(zipCode.value);
  CVVInputValidation(CVV.value);
});






//end
