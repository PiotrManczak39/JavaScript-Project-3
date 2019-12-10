

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
           Validation functions
---------------------------------------------------*/

//Submit Button
const submitButton = document.querySelector('button');

const nameField = document.getElementById('name');
function nameFieldValidation() {
  if (nameField.value == '') {
    return false;
  } else {
    return true;
  }
}


//Email validation function
const emailField = document.getElementById('mail');
function emailFieldValidation(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

emailFieldValidation(emailField.value)
//Activity Section Validation

let checkboxArray = activitiesDiv.getElementsByTagName('input');

function checkboxValidation(arr) {
  let arrChecked = [];
  let arrNotchecked = [];
  for (let i=0; i < arr.length; i++) {
    if (arr[i].checked) {
      arrChecked.push(arr[i]);
    } else {
      arrNotchecked.push([i]);
    }
  }
  if (arrChecked.length > 0) {
    return true;
  } else {
    return false;
  }
}

console.log(checkboxValidation(checkboxArray));







//end
