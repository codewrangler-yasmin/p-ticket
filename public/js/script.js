/*
 * *******************************************************************************************************
 * Task List:
 * 1. Click on Banner button to scroll down to seat booking system
 * 2. Click on available seats to
 * --- add seats count as selected seats
 * --- decrease the seats count from available seats
 * --- can not select more than 4 seats
 * --- add inner html with the numbers of seats
 * 3. get total price of the seats
 * 4. if selected seats count 4 then coupon field and button will enable
 * 5. add discounted price as innerHTML
 * 6. minus discounted price from total price to get the grand total
 * 7. enable passenger info fields and submit button
 * 8. get the success message modal
 * 9. click on continue to reload the window
 * *******************************************************************************************************
 */

// Global Variables

const stickyHeader = document.getElementById("sticky-header");
const mobileMenuContainer = document.getElementById("mobile-menu-container");
const mobileMenuBars = document.getElementById("mobile-menu-bars");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const availableSeats = document.getElementById("available-seat");
const selectedSeats = document.getElementById("selected-seats");
const seatCount = document.getElementById("seat-count");
const defaultText = document.getElementById("default-text");
const totalPrice = document.getElementById("total-price");
const couponInput = document.getElementById("coupon");
const applyCoupon = document.getElementById("apply-coupon");
const discount = document.getElementById("discount");
const passengerName = document.getElementById("passenger-name");
const phoneNumber = document.getElementById("phone-number");
const passengerEmail = document.getElementById("passenger-email");
const infoSubmit = document.getElementById("info-submit");
const modalContainer = document.getElementById("modal-container");
const continueBtn = document.getElementById("modal-close-btn");

// sticky header on scroll
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    stickyHeader.classList.add("py-6");
  }
});

// add event on mobile menu
mobileMenuBars.addEventListener("click", function () {
  console.log("menu-clicked");
  // Show mobile after clicking on mobile menu bars
  mobileMenuContainer.classList.remove("hidden");
});

// close mobile menu
mobileMenuClose.addEventListener("click", function () {
  mobileMenuContainer.classList.add("hidden");
});

// Close the mobile menu by clicking outside of the menu
window.addEventListener("click", function (event) {
  if (event.target === mobileMenuContainer) {
    mobileMenuContainer.classList.add("hidden");
  }
});

// Select seats
let seatName = [];
let initialTicketPrice = 0;

function selectSeat(event) {
  // get the innerText onclick event
  let value = event.innerText;

  if (seatName.includes(value)) {
    // get alert for selected seats
    return alert("Seat already taken");
  } else if (seatName.length < 4) {
    event.classList.add("bg-custom-green");
    event.classList.add("text-white");

    // add seats count
    seatName.push(event.innerText);
    seatCount.innerText = seatName.length;

    // decrease selected seats count from available seats
    const availableSeatsValue = parseFloat(availableSeats.innerText);
    const newSeatsValue = availableSeatsValue - 1;
    availableSeats.innerText = newSeatsValue;

    // hide the default text
    defaultText.classList.add("hidden");

    // add the selected seats
    selectedSeats.innerHTML += `<div
                  class="flex justify-between items-center py-2"
                >
                  <span class="text-base font-medium text-stone-500 w-1/3">${event.innerText}</span>
                  <span class="text-base font-medium text-stone-500 w-1/3">
                    Economy
                  </span>
                  <span
                    class="text-base font-medium text-stone-500 w-1/3 text-right"
                  >
                    550
                  </span>
                </div>`;

    // get total price of the seats
    initialTicketPrice += 550;
    totalPrice.innerText = initialTicketPrice;

    // enable coupon field and apply coupon button
    if (seatName.length > 3) {
      coupon.removeAttribute("disabled");
      applyCoupon.removeAttribute("disabled");
    }

    // enable passenger info after selecting seat/seats
    passengerName.removeAttribute("disabled");

    return;
  } else {
    // maximum seat selection limit is 4
    alert("Maximum seat booked!");
    return;
  }
}

// Validate passenger name
passengerName.addEventListener("input", function () {
  const nameError = document.getElementById("name-error");

  // If name field is empty, or not a valid string, show the error
  if (passengerName.value.trim() === "") {
    nameError.classList.remove("hidden");
    phoneNumber.setAttribute("disabled", true); // Show error message
    // Keep phone number disabled
  } else {
    nameError.classList.add("hidden"); // Hide error message
    phoneNumber.removeAttribute("disabled"); // Enable phone number input
  }
});

//validate passenger phone number
phoneNumber.addEventListener("input", function () {
  const phoneError = document.getElementById("phone-error");
  const phoneValue = phoneNumber.value; // Get the current value of the phone number input
  const isPhoneValid = /^\d{11,}$/.test(phoneValue); // Check if the phone number has at least 11 digits

  // If phone number is not valid, show the error and disable the email field
  if (!isPhoneValid) {
    phoneError.classList.remove("hidden"); // Show error message
    passengerEmail.setAttribute("disabled", true); // Disable the email input
  } else {
    phoneError.classList.add("hidden"); // Hide error message
    passengerEmail.removeAttribute("disabled"); // Enable the email input
  }
});

// validate passenger email ID

passengerEmail.addEventListener("input", function () {
  const emailError = document.getElementById("email-error");
  const emailValue = passengerEmail.value; // Get the current value of the email input
  const isEmailValid = emailValue.includes("@") && emailValue.endsWith(".com"); // Check if the email container'@' & 'com'

  // If email field is valid enable the submit button
  if (!isEmailValid) {
    emailError.classList.remove("hidden"); // Show error message
    infoSubmit.setAttribute("disabled", true); // Enable the email input
  } else {
    emailError.classList.add("hidden"); // Hide error message
    infoSubmit.removeAttribute("disabled"); // Enable the email input
  }
});

// add event to submit button
infoSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  // Show modal after clicking info submit button
  modalContainer.classList.remove("hidden");
});

// Coupon Apply
applyCoupon.addEventListener("click", function () {
  let discountAmount = 0;
  const discountAmountValue = couponInput.value;

  // Validate the coupon code
  if (discountAmountValue !== "New15" && discountAmountValue !== "Couple20") {
    alert("Your provided coupon is not valid");
    return;
  }

  // Calculate the discount amount with coupon %
  if (discountAmountValue === "New15") {
    discountAmount = Number(totalPrice.innerText) * 0.15;
  } else if (discountAmountValue === "Couple20") {
    discountAmount = Number(totalPrice.innerText) * 0.2;
    console.log(discountAmount);
  }

  // add discount row in innerHTML
  discount.innerHTML = `<div
                    class="flex justify-between items-center border-b border-dashed border-gray-400"
                  ><h4 class="text-base font-semibold">Discount</h4>
                  <h4 class="text-base font-semibold mb-5">
                    <span>-BDT:</span> <span>${discountAmount}</span>
                  </h4></div>`;

  // hide coupon field after applying
  const couponContainer = document.getElementById("coupon-container");
  couponContainer.classList.add("hidden");

  // Calculate Grand total
  const grandTotalValue = Number(totalPrice.innerText) - discountAmount;

  // get grand total in innerHTML
  const grandTotalContainer = document.getElementById("grand-total-container");
  grandTotalContainer.innerHTML = `<h4 class="text-base font-semibold py-5">Grand Total</h4>
                  <h4 class="text-base font-semibold py-5">
                    <span>BDT:</span> <span>${grandTotalValue}</span>
                  </h4>`;
});

// close modal to reload the window
continueBtn.addEventListener("click", function () {
  modalContainer.classList.add("hidden");
  window.location.reload();
});

// close modal by clicking on window
window.addEventListener("click", function (event) {
  if (event.target === modalContainer) {
    modalContainer.classList.add("hidden");
  }
});
