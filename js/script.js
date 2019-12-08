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

const design = document.getElementById('design');
design.addEventListener('change', () => {
  let colorTitle = document.querySelector('#colors-js-puns label');
  colorTitle.textContent  = 'Color';

  let puns = document.querySelector('#design :nth-child(2)');
  if (puns.style.display === 'block') {
    console.log(puns.textContent);
  } else {
    console.log(1);
  }
  let colorSelection = document.getElementById('color');
  colorSelection.style.display = 'block';
});
