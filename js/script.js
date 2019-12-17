
//First text field in focus by default using jQuery.
$('#name').focus();
//Hide Other Job Role.
$('#other-title').attr("type","text").hide();

//Hide the “Select Theme” `option` element in the “Design” menu.
$('#design option:first-child').hide();
const colorMenu = document.getElementById('colors-js-puns');
colorMenu.style.display = 'none';

//Displaying and hiding Other job role option
const jobTitle = document.getElementById('title');
jobTitle.addEventListener('change', () => {
  let other = jobTitle.querySelector('option[value="other"]');
  other.selected ? $('#other-title').show() : $('#other-title').hide();
});
/*----------------------------------------------------------
                 T-shirt Selection
-----------------------------------------------------------*/
const colorSelection = document.getElementById('color');
const design = document.getElementById('design');
design.addEventListener('change', () => {
  colorMenu.style.display = 'block';
  let colorTitle = document.querySelector('#colors-js-puns label');
  colorTitle.textContent  = 'Color:';

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

//CreateError Function
const createError = (text, selector) => {
  let nowyBlad = document.createElement('p');
  nowyBlad.textContent = text;
  nowyBlad.className = 'error';
  let sibiling = document.querySelector(selector);
  let parent = sibiling.parentNode;
  parent.insertBefore(nowyBlad, sibiling);
  nowyBlad.style.display = 'none';
  return nowyBlad;
}
//Errors Creation
const nameError = createError('Type your name and surname, please', 'label[for="name"]');
const nameEmptyError = createError('Name field should not be empty!', 'label[for="name"]');
const emailError = createError('It does not look like an email to me!', 'label[for="mail"]');
const emailEmptyError = createError('Type your email, please!', 'label[for="mail"]');
const activitiesError = createError('You MUST check at least one checkbox, please!', 'input[name="all"]');
const creditCardError = createError('Credit Card number should be between 13 and 16 numbers long!', 'label[for="cc-num"]');
const ZCError = createError('Zip should be 5 digits long!', 'label[for="zip"]');
const ZCEmptyError = createError('Zip is empty! Fill it in, please.', 'label[for="zip"]');
const CVVError = createError('CVV should be 3 digits long!', 'label[for="cvv"]');

/*---------------------------------------------------
           Validation functions
---------------------------------------------------*/

//Validation of Name Section
const nameField = document.getElementById('name');
function nameFieldValidation() {
  let regex = /^[a-zA-Z]+ ([a-z'.A-z]+)?[- ]?[a-zA-Z]{2,}$/;
  if (!regex.test(nameField.value) && !(nameField.value === '')) {
    nameError.style.display = 'block';
    nameEmptyError.style.display = 'none';
    return false;
  } else  if ( nameField.value === '') {
    nameEmptyError.style.display = 'block';
    nameError.style.display = 'none';
    return false;
  } else {
    nameError.style.display = 'none';
    nameEmptyError.style.display = 'none';
    return true;
  }
}
//Email validation function
const emailField = document.getElementById('mail');
function emailFieldValidation(email) {
  if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(email)) {
    emailError.style.display = 'none';
    emailEmptyError.style.display = 'none';
    return true;
  } else  if ( emailField.value === '') {
    emailEmptyError.style.display = 'block';
    emailError.style.display = 'none';
    return false;
  } else {
    emailEmptyError.style.display = 'none';
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
  // let userInputNumber = parseInt(string, 10);
  let regex = /^\d{13,16}$/;
  if (regex.test(string)) {
    creditCardError.style.display = 'none';
    return true;
  } else {
    creditCardError.style.display = 'block';
    return false;
  }
}
//Zip Code Valuation function for an empty input
//and wrong ammount of digits
const zipCode = document.getElementById('zip');
function zipCodeValuation(string) {
  // let userInputZipCode = parseInt(string, 10);
  let regex = /^\d{5}$/;
  if (regex.test(string)) {
    ZCError.style.display = 'none';
    ZCEmptyError.style.display = 'none';
    return true;
  } else if ( zipCode.value === '') {
    ZCEmptyError.style.display = 'block';
    ZCError.style.display = 'none';
  } else {
    ZCEmptyError.style.display = 'none';
    ZCError.style.display = 'block';
    return false;
  }
}
//CVV Valuation function
const CVV = document.getElementById('cvv');
function CVVInputValidation(string) {
  // let userInputCVV = parseInt(string, 10);
  let regex = /^\d{3}$/;
  if (regex.test(string)) {
    CVVError.style.display = 'none';
    return true;
  } else {
    CVVError.style.display = 'block';
    return false;
  }
}
//Zipcode Event listener
zipCode.addEventListener('keyup', () => {
  zipCodeValuation(zipCode.value);
});

//Activities Event listener
activitiesDiv.addEventListener('change', (e) => {
  if (event.target.tagName == 'INPUT') {
    let checkbox = event.target;
    if (checkbox.checked) {
      activitiesError.style.display = 'none';
    }
  }
});

//Email Event listener
emailField.addEventListener('keyup', () => {
  emailFieldValidation(emailField.value);
});
emailField.addEventListener('blur', () => {
  emailFieldValidation(emailField.value);
});

//Name Event Listener
nameField.addEventListener('keyup', () => {
  nameFieldValidation(nameField.value);
});
nameField.addEventListener('blur', () => {
  nameFieldValidation(nameField.value);
});

//Credit Card Event Listener
creditCardInput.addEventListener('keyup', () => {
  creditCardValidation(creditCardInput.value);
});

//CVV Event Listener
CVV.addEventListener('keyup', () => {
  let term = CVV.value;
  CVVInputValidation(term);
});

const modalMessage = (nameError, ) => {

}
//Submit Button EventListener
const form = document.querySelector('[action="index.html"]');
const button = document.getElementsByTagName('button')[0];
button.addEventListener('click', (event) => {
  if (creditCard.selected) {
    nameFieldValidation();
    emailFieldValidation(emailField.value);
    checkboxValidation(checkboxArray);
    creditCardValidation(creditCardInput.value);
    zipCodeValuation(zipCode.value);
    CVVInputValidation(CVV.value);
    if (!nameFieldValidation(nameField.value) || !emailFieldValidation(emailField.value) || !checkboxValidation(checkboxArray) || !creditCardValidation(creditCardInput.value) || !zipCodeValuation(zipCode.value) || !CVVInputValidation(CVV.value)) {
      event.preventDefault();
      let modalDiv = document.createElement('div');
      modalDiv.className = 'bg-modal';
      form.appendChild(modalDiv);
      let modalDivInner = document.createElement('div');
      modalDivInner.className = 'bg-inner';
      modalDiv.appendChild(modalDivInner);
      let modalTitle = document.createElement('h3');
      modalTitle.textContent = 'Submission unsuccesful. See why below:';
      modalDivInner.appendChild(modalTitle);
      let modalList = document.createElement('ul');
      modalDivInner.appendChild(modalList);
      if (!nameFieldValidation(nameField.value)) {
        let li = document.createElement('li');
        if (nameError.style.display == 'block') {
          li.textContent = 'Both name and surname must be present!';
        } else {
          li.textContent = 'Name missing. Fill in the form!';
        }
        modalList.appendChild(li);
      }
      if (!emailFieldValidation(emailField.value)) {
        let li = document.createElement('li');
        if (emailError.style.display == 'block' ) {
          li.textContent = 'Email does not seem to be correct.';
        } else {
          li.textContent = 'Email is missing.';
        }
        modalList.appendChild(li);
      }
      if (!checkboxValidation(checkboxArray)) {
        let li = document.createElement('li');
        li.textContent = 'No checkbox has been checked.';
        modalList.appendChild(li);
      }
      if (!creditCardValidation(creditCardInput.value)) {
        let li = document.createElement('li');
        li.textContent = 'Credit Card number is missing or incorrect.';
        modalList.appendChild(li);
      }
      if (!zipCodeValuation(zipCode.value)) {
        let li = document.createElement('li');
        if (ZCError.style.display == 'block' ) {
          li.textContent = 'Zip Code should be t least 5 digits.';
        } else if (ZCEmptyError.style.display == 'block' ) {
          li.textContent = 'Zip Code is missing.';
        }
        modalList.appendChild(li);
      }
      if (!CVVInputValidation(CVV.value)) {
        let li = document.createElement('li');
        li.textContent = 'CCV is missing or incorrect.';
        modalList.appendChild(li);
      }
      $(window).scrollTop(0);
      const modalButton = document.createElement('button');
      modalButton.textContent = 'Try again. Good luck, matey!';
      modalButton.setAttribute('type', 'button');
      modalDivInner.appendChild(modalButton);

      modalButton.addEventListener('click', (e) => {
        modalDiv.style.display = 'none';
      });
    }
  } else if (!creditCard.selected) {
    nameFieldValidation(nameField.value);
    emailFieldValidation(emailField.value);
    checkboxValidation(checkboxArray);
    if (!nameFieldValidation(nameField.value) || !emailFieldValidation(emailField.value) || !checkboxValidation(checkboxArray)) {
      event.preventDefault();
      let modalDiv = document.createElement('div');
      modalDiv.className = 'bg-modal';
      form.appendChild(modalDiv);
      let modalDivInner = document.createElement('div');
      modalDivInner.className = 'bg-inner';
      modalDiv.appendChild(modalDivInner);
      let modalTitle = document.createElement('h3');
      modalTitle.textContent = 'Submission unsuccesful. See why below:';
      modalDivInner.appendChild(modalTitle);
      let modalList = document.createElement('ul');
      modalDivInner.appendChild(modalList);
      if (!nameFieldValidation(nameField.value)) {
        let li = document.createElement('li');
        if (nameError.style.display == 'block') {
          li.textContent = 'Both name and surname must be present!';
        } else {
          li.textContent = 'Name missing. Fill in the form!';
        }
        modalList.appendChild(li);
      }
      if (!emailFieldValidation(emailField.value)) {
        let li = document.createElement('li');
        if (emailError.style.display == 'block' ) {
          li.textContent = 'Email does not seem to be correct.';
        } else {
          li.textContent = 'Email is missing.';
        }
        modalList.appendChild(li);
      }
      if (!checkboxValidation(checkboxArray)) {
        let li = document.createElement('li');
        li.textContent = 'No checkbox has been checked.';
        modalList.appendChild(li);
      }
      $(window).scrollTop(0);
      const modalButton = document.createElement('button');
      modalButton.textContent = 'Try again. Good luck, matey!';
      modalButton.setAttribute('type', 'button');
      modalDivInner.appendChild(modalButton);
      modalButton.addEventListener('click', (e) => {
        modalDiv.style.display = 'none';
      });
    }
  }
});
