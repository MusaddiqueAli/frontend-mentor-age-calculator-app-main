"use strict";

// LABEL ELEMENT
const labels = document.querySelectorAll('label[for]:not([for=""])');

// INPUT ELEMENTS
const parentInputBlock = document.querySelector(".input_block");
const input_day = document.querySelector("#day");
const input_month = document.querySelector("#month");
const input_year = document.querySelector("#year");
const endDate = document.querySelector("#endDate");

// OUTPUT ELEMENTS
const output_year = document.querySelector("#YY");
const output_month = document.querySelector("#MM");
const output_day = document.querySelector("#DD");

// ERROR ELEMENTS
const error_day = document.querySelector(".error_day");
const error_month = document.querySelector(".error_month");
const error_year = document.querySelector(".error_year");

// BUTTON
const calculateButton = document.querySelector("#calculate");

// Current Day, Month and Year
const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = 1 + currentDate.getMonth();
const currentYear = currentDate.getFullYear();

// Functions to show the day, month or year labels and input field borders as red
function dayRed() {
    labels[0].style.color = "hsl(0, 100%, 67%)";
    input_day.style.borderColor = "hsl(0, 100%, 67%)";
}

function monthRed() {
    labels[1].style.color = "hsl(0, 100%, 67%)";
    input_month.style.borderColor = "hsl(0, 100%, 67%)";
}

function yearRed() {
    labels[2].style.color = "hsl(0, 100%, 67%)";
    input_year.style.borderColor = "hsl(0, 100%, 67%)";
}

// Function to check empty fields
function emptyFieldsCheck() {
    if (input_day.value === "") {
      dayRed();
      error_day.textContent = "This field is required";
    }
  
    if (input_month.value === "") {
      monthRed();
      error_month.textContent = "This field is required";
    }
  
    if (input_year.value === "") {
      yearRed();
      error_year.textContent = "This field is required";
    }
}

// Event handler to remove the red color from the elements when numbers are being typed in the fields
parentInputBlock.addEventListener("input", function (event) {
    if (input_day.value !== "") {
      labels[0].style.color = "hsl(0, 1%, 44%)";
      input_day.style.borderColor = "hsl(0, 0%, 86%)";
      error_day.textContent = "";
    }

    if (input_month.value !== "") {
      labels[1].style.color = "hsl(0, 1%, 44%)";
      input_month.style.borderColor = "hsl(0, 0%, 86%)";
      error_month.textContent = "";
    }
  
    if (input_year.value !== "") {
      labels[2].style.color = "hsl(0, 1%, 44%)";
      input_year.style.borderColor = "hsl(0, 0%, 86%)";
      error_year.textContent = "";
    }

    if (+input_day.value > 31) {
      labels[0].style.color = "hsl(0, 100%, 67%)";
      input_day.style.borderColor = "hsl(0, 100%, 67%)";
      error_day.textContent = "Must be a valid day";
      calculateButton.disabled = true;
      calculateButton.style.backgroundColor = "hsl(0, 1%, 44%)";
    } else {
      calculateButton.disabled = false;
      calculateButton.style.backgroundColor = "hsl(259, 100%, 65%)";
    }

    if (+input_day.value > 30 && (+input_month.value === 4 || +input_month.value === 6 || +input_month.value === 9 || +input_month.value === 11)) {
      labels[0].style.color = "hsl(0, 100%, 67%)";
      input_day.style.borderColor = "hsl(0, 100%, 67%)";
      labels[1].style.color = "hsl(0, 100%, 67%)";
      input_month.style.borderColor = "hsl(0, 100%, 67%)";
      labels[2].style.color = "hsl(0, 100%, 67%)";
      input_year.style.borderColor = "hsl(0, 100%, 67%)";
      error_day.textContent = "Must be a valid date";
      calculateButton.disabled = true;
      calculateButton.style.backgroundColor = "hsl(0, 1%, 44%)";
    } else {
      calculateButton.disabled = false;
      calculateButton.style.backgroundColor = "hsl(259, 100%, 65%)";
    }

    if (+input_month.value === 2) {
      if ((+input_day.value > 28 && !isLeapYear(+input_year.value)) 
      || (+input_day.value > 29 && isLeapYear(+input_year.value))) {
        labels[0].style.color = "hsl(0, 100%, 67%)";
        input_day.style.borderColor = "hsl(0, 100%, 67%)";
        error_day.textContent = "Must be a valid date";
        labels[1].style.color = "hsl(0, 100%, 67%)";
        input_month.style.borderColor = "hsl(0, 100%, 67%)";
        labels[2].style.color = "hsl(0, 100%, 67%)";
        input_year.style.borderColor = "hsl(0, 100%, 67%)";
        calculateButton.disabled = true;
        calculateButton.style.backgroundColor = "hsl(0, 1%, 44%)";
      }
    } else {
      calculateButton.disabled = false;
      calculateButton.style.backgroundColor = "hsl(259, 100%, 65%)";
    }

    if (+input_month.value > 12) {
      labels[1].style.color = "hsl(0, 100%, 67%)";
      input_month.style.borderColor = "hsl(0, 100%, 67%)";
      error_month.textContent = "Must be a valid month";
      calculateButton.disabled = true;
      calculateButton.style.backgroundColor = "hsl(0, 1%, 44%)";
    } else {
      calculateButton.disabled = false;
      calculateButton.style.backgroundColor = "hsl(259, 100%, 65%)";
    }
    
    if (+input_year.value > currentYear) {
      labels[2].style.color = "hsl(0, 100%, 67%)";
      input_year.style.borderColor = "hsl(0, 100%, 67%)";
      error_year.textContent = "Must be in the past";
      calculateButton.disabled = true;
      calculateButton.style.backgroundColor = "hsl(0, 1%, 44%)";
    } 
    else if ((+input_year.value === currentYear) && (+input_month.value > currentMonth)) {
      labels[1].style.color = "hsl(0, 100%, 67%)";
      input_month.style.borderColor = "hsl(0, 100%, 67%)";
      error_month.textContent = "Must be in the past";
      calculateButton.disabled = true;
      calculateButton.style.backgroundColor = "hsl(0, 1%, 44%)";
    }
    else if ((+input_year.value === currentYear) && (+input_month.value === currentMonth) && (+input_day.value > currentDay)) {
      labels[0].style.color = "hsl(0, 100%, 67%)";
      input_day.style.borderColor = "hsl(0, 100%, 67%)";
      error_day.textContent = "Must be in the past";
      calculateButton.disabled = true;
      calculateButton.style.backgroundColor = "hsl(0, 1%, 44%)";
    }
    else {
      calculateButton.disabled = false;
      calculateButton.style.backgroundColor = "hsl(259, 100%, 65%)";
    }
});

function isLeapYear(year) {
    // Check for dates in the Julian calendar (before 1582)
    if (year < 1582) {
      return (year % 4 === 0);
    } else {
      // After 1582, Leap years are divisible by 4,
      // However, years divisible by 100 are not leap years, unless they are also divisible by 400
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
}

//! MAIN CLICK EVENT of the PROGRAM
calculateButton.addEventListener('click', (e) => {
    e.preventDefault();
    emptyFieldsCheck();
    calculateDateDifference();
});

function calculateDateDifference() {
  // Past Day, Month and Year
  const pastDay = +input_day.value;
  const pastMonth = +input_month.value;
  const pastYear = +input_year.value;

  // Calculate the difference in years, months and days
  let years = currentYear - pastYear;
  let months = currentMonth - pastMonth;
  let days;

  if (endDate.checked) {days = currentDay - pastDay + 1;}
  else {days = currentDay - pastDay;}

  // Adjust for negative values in months and days
  if (days < 0) {
    months--;
    days += new Date(pastYear, pastMonth, 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // WITHOUT ANIMATION
  /*
  output_year.textContent = years;
  output_month.textContent = months;
  output_day.textContent = days;
  */

  // WITH ANIMATION
  countAnimate(years, output_year);
  countAnimate(months, output_month);
  countAnimate(days, output_day);
}

function countAnimate(value, element) {
  let initialValue = 0;

  const increaseCount = setInterval(() => {
    initialValue += 1;

    if (initialValue > value) {
      element.textContent = value;
      clearInterval(increaseCount);
      return;
    }

    element.textContent = initialValue;
  }, 10);
}
