document.addEventListener("DOMContentLoaded", function () {
  displayMenuItems();
  document.getElementById("orderForm").addEventListener("submit", handleSubmit);
});

const menuItems = [
  {
    id: 1,
    name: "El T-Rex",
    price: 8.99,
    image:
      "https://makeyourmeals.com/wp-content/uploads/2020/05/bacon-cheeseburger-featured.jpg.webp",
  },
  {
    id: 2,
    name: "Don Vito",
    price: 5.99,
    image:
      "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/FBB73F91-2A4F-475E-BB25-CE12D72C9D19/Derivates/d1eddcbc-5604-4592-bb85-1ef70ee15f96.jpg",
  },
  {
    id: 3,
    name: "La Mounstro",
    price: 9.99,
    image:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2010/4/26/1/FNM_060110-Insert-017_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371591466674.jpeg",
  },
  {
    id: 4,
    name: "La Babosa",
    price: 8.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkXSTsKIZhPy-mVGZePnL8yA6TdZpH0-856g&usqp=CAU",
  },
  {
    id: 5,
    name: "La Canchera",
    price: 5.34,
    image:
      "https://www.seriouseats.com/thmb/itKa4-ZQ1k5FlAjkpMaiJk7ElYw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__aht.seriouseats.com__images__2013__07__20130723-bacon-weave-food-lab-burger-step-by-step-26-618cb29b8e494be79d23d4f7938ee862.jpg",
  },
  {
    id: 6,
    name: "El Fagget",
    price: 6.99,
    image:
      "https://makeitdairyfree.com/wp-content/uploads/2019/06/vegan-chickpea-burgers-4.jpg",
  },
  {
    id: 7,
    name: "El Elegante",
    price: 5.99,
    image:
      "https://www.butter-n-thyme.com/wp-content/uploads/2023/04/McDonalds-Hamburger.jpg",
  },
  {
    id: 8,
    name: "La Precisa",
    price: 6.7,
    image:
      "https://burgermeistermia.com/wp-content/uploads/2023/09/1-Classic-Hamburger-Bun.jpg",
  },
  {
    id: 9,
    name: "Mc and Cheester",
    price: 6.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm51G-8DjvuvBRC7QeRWXIIJbwxmorfCdxYQ&usqp=CAU",
  },
  {
    id: 10,
    name: "Velociraptor",
    price: 7.99,
    image:
      "https://i.pinimg.com/736x/df/65/7b/df657bf1d9e9823bef6e1e3155d9171d.jpg",
  },
  {
    id: 11,
    name: "Diplodocus",
    price: 13.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8ds-T4tEoFK19aevfUPijVIB2ngf8IZEiv4yJ_Gjhbd5nBGzgxxFU-qgbDSTxpr_Sujg&usqp=CAU",
  },
  {
    id: 12,
    name: "HomoBisexaurus",
    price: 4.34,
    image:
      "https://s2.abcstatics.com/media/bienestar/2020/03/14/hamburguesa-saludable-kJdG--1248x698@abc.jpg",
  },
];

function displayMenuItems() {
  const menuContainer = document.getElementById("menuItems");
  menuItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("menu-card");
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="menu-card-name">${item.name} - $${item.price}</div>
      <div class="menu-card-checkbox">
        <input type="checkbox" id="item-${item.id}" name="item" value="${item.id}">
      </div>
      <div class="menu-card-select">
        <label for="item-${item.id}">Seleccionar</label>
        <input type="number" id="quantity-${item.id}" name="quantity" min="1" value="1" disabled>
      </div>
    `;
    menuContainer.appendChild(itemElement);

    document
      .getElementById(`item-${item.id}`)
      .addEventListener("change", function () {
        document.getElementById(`quantity-${item.id}`).disabled = !this.checked;
      });
  });
}

function handleSubmit(event) {
  event.preventDefault();
  if (!validateForm()) {
    return;
  }
  const orderDetails = getOrderDetails();
  const totalCost = calculateTotalCost(orderDetails);
  saveOrderToLocalStorage(orderDetails, totalCost);
  displayOrderConfirmation(orderDetails, totalCost);
}

function validateForm() {
  const checkedItems = document.querySelectorAll('input[name="item"]:checked');
  if (checkedItems.length === 0) {
    alert("Por favor, selecciona al menos un artículo del menú.");
    return false;
  }
  return true;
}

function getOrderDetails() {
  const selectedItems = [];
  document
    .querySelectorAll('input[name="item"]:checked')
    .forEach((itemElement) => {
      const itemId = itemElement.value;
      const quantity = document.getElementById(`quantity-${itemId}`).value;
      const item = menuItems.find((item) => item.id == itemId);
      if (item && quantity > 0) {
        selectedItems.push({ ...item, quantity: parseInt(quantity, 10) });
      }
    });
  return selectedItems;
}

function calculateTotalCost(orderDetails) {
  return orderDetails.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

function saveOrderToLocalStorage(orderDetails, totalCost) {
  const order = {
    items: orderDetails,
    total: totalCost,
    date: new Date().toISOString(),
  };
  localStorage.setItem("lastOrder", JSON.stringify(order));
}

function getNextOrderNumber() {
  let lastOrderNumber = parseInt(localStorage.getItem("lastOrderNumber")) || 0;
  lastOrderNumber++;
  localStorage.setItem("lastOrderNumber", lastOrderNumber);
  return lastOrderNumber;
}

function displayOrderConfirmation(orderDetails, totalCost) {
  const orderNumber = getNextOrderNumber();

  let html = `Pedido Número: ${orderNumber}<br>Has ordenado:<br>`;
  orderDetails.forEach((item) => {
    html += `${item.quantity} x ${item.name} - $${
      item.price * item.quantity
    }<br>`;
  });
  html += `Total: $${totalCost}`;
  document.getElementById("modalOrderConfirmation").innerHTML = html;

  // Imprimir los detalles del pedido en la consola
  console.log(`Pedido Número: ${orderNumber}`);
  orderDetails.forEach((item) => {
    console.log(
      `${item.quantity} x ${item.name} - $${item.price * item.quantity}`
    );
  });
  console.log(`Total: $${totalCost}`);

  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  setTimeout(function () {
    modal.style.display = "none";
    resetOrderFormAndMenu();
  }, 5000);
}

function resetOrderFormAndMenu() {
  document.getElementById("orderForm").reset();
  document
    .querySelectorAll('.menu-card input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.checked = false;
    });
  document
    .querySelectorAll('.menu-card input[type="number"]')
    .forEach((quantity) => {
      quantity.value = 1;
      quantity.disabled = true;
    });
}

var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
  resetOrderFormAndMenu();
};
