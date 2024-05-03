import { menuArr } from "./data.js";
const menuArray = [...menuArr];
const uuid = uuidv4();

document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector("main .menu");
  let order = [];

  // Render menu items
  const mappedMenuArray = menuArray.map((item, index) => {
    const { name, ingredients, price, emoji } = item;
    return `
      <div class='menu-item'>
      <div class='item-image'>${emoji}</div>

        <div class='item-description'>    
          <h2>${name}</h2>
          <p>${ingredients.join(", ")}</p>
          <p>$${price}</p>
        </div>
        <div class='item-add' data-index="${index}">+</div>
      </div>
    `;
  });
  menu.innerHTML = mappedMenuArray.join("");

  // Add event listener to add buttons
  const addButtons = document.querySelectorAll("main .menu .item-add");

  addButtons.forEach((button) => {
    // let count = 0;
    button.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      // count++;

      // const item = { ...menuArray[index], id: uuidv4() }; // Generate id here
      menuArray[index].quantity++;
      order.push(menuArray[index]);

      displayOrder();

      console.log(menuArray);
      console.log(order);
      renderOrder();
    });
  });

  // Render order
  function renderOrder() {
    const yourOrder = document.querySelector(".your-order");
    if (order.length > 0) {
      yourOrder.style.display = "block";
    } else {
      yourOrder.style.display = "none";
    }
    // yourOrder.style.display = "block";
    yourOrder.innerHTML = `
      <h2>Your order</h2>
      ${displayOrder()}
      <hr />
      <div class="total ">
        <p class="left-p ">Total price:</p>
        <p class="price ">$${calculateTotalPrice()}</p>
      </div>
      <button class="complete-order">Complete order</button>
    `;
    // Add event listener to remove buttons
    const removeButtons = document.querySelectorAll(".item .remove");

    // removeButtons.forEach((button) => {
    //   button.addEventListener("click", (e) => {
    //     const targetId = e.target.dataset.id;
    //     const targetIdNum = Number(targetId);
    //     console.log(targetIdNum);

    //     order.forEach((item, index) => {
    //       console.log(item.id);
    //       if (item.id === targetIdNum) {
    //         order.splice(index, 1);
    //         return;
    //       }
    //       // renderOrder();
    //     });
    //     console.log(order);
    removeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const targetId = Number(e.target.dataset.id);
        console.log(targetId);

        // Loop through the order array
        for (let i = order.length - 1; 0 <= i; i--) {
          if (order[i].id === targetId) {
            // Remove the item at index i
            order[i].quantity--;
            order.splice(i, 1);
            // document.querySelector(".item ${targetId}").classList.add("moveUp");
            // document
            //   .querySelector(".item ${targetId}")
            //   .classList.remove("moveUp");
            // const itemElement = document.querySelector(".item." + targetId);
            // itemElement.classList.add("moveUp");

            // itemElement.addEventListener(
            //   "transitionend",
            //   () => {
            //     itemElement.classList.remove("moveUp");
            //     renderOrder();
            //   },
            //   { once: true }
            // ); // The event listener will be removed after it's called once

            break; // Exit the loop after removing the item
          }
        }
        console.log(order);

        renderOrder();
        // order = newOrder;
      });
    });
    // Attach event listener to a parent element
    // document.querySelector("#orderContainer").addEventListener("click", (e) => {
    //   // Check if the clicked element is a remove button
    //   if (e.target.classList.contains("remove")) {
    //     const targetId = e.target.dataset.id;
    //     order = order.filter((item) => item.id !== targetId);
    //     renderOrder();
    //   }
    // });

    // Add event listener to complete order button
    const completeButton = document.querySelector(".complete-order");
    completeButton.addEventListener("click", () => {
      console.log("You clicked on complete order");
      const popup = document.querySelector(".background");
      popup.style.display = "block";
    });
  }

  // Display order
  function displayOrder() {
    let uniqueItems = [];
    const orderItemsString = order
      .map((item) => {
        const { name, price, id, quantity, emoji } = item;
        if (!quantity) {
          return;
        }
        if (!uniqueItems.includes(name)) {
          uniqueItems.push(name);
          return `<div class="item ${id}">
          <span class='item-image'>${emoji}</span><p class="left-p" data-id="${id}">${name} <span class='item-price'>$${price}</span> <span class='item-quantity'>x ${quantity}
          </span></p>
          <p class="left-p remove" data-id="${id}">remove</p>
          <p class="price">$${price * quantity}</p>
        </div>`;
        }
      })
      .join("");

    return orderItemsString;
  }
  // function displayOrder() {
  //   let uniqueElements = {};
  //   let returnString = "";
  //   order.forEach((element) => {
  //     const { name, price, id, quantity } = element;
  //     // Check if the element has been logged before
  //     if (!uniqueElements[element]) {
  //       returnString += `<div class="item">
  //         <p class="left-p" data-id="${id}">${name} <span class='item-price'>$${price}</span> <span class='item-quantity'>x ${quantity}</span></p>
  //         <p class="left-p remove" data-id="${id}">remove</p>
  //         <p class="price">$${price * quantity}</p>
  //       </div>`;
  //       uniqueElements[element] = true; // Mark the element as logged
  //     }
  //   });
  //   return returnString;
  // }

  // Calculate total price
  function calculateTotalPrice() {
    const totalPrice = order.reduce((acc, item) => acc + item.price, 0);
    return totalPrice;
  }

  // Event Listener for Clicking on Background to Close Popup
  document
    .querySelector(".background")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("background")) {
        this.style.display = "none"; // Hide the popup background
        document.querySelector(".your-order").style.display = "block";
      }
    });

  // Call renderOrder() to initially render the order
  // renderOrder();
});

// const randomArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(randomArray.pop());
// console.log(randomArray);
