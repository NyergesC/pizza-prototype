// === LOADING PAGE COMPONENT
const loadingHTML = `
    <section id='animation-section'>
            <div class='slice_1'>
                <img src='assets/img/slice_1.png' class='slices' alt=''>
            </div>
            <div class='slice_2'>
                <img src='assets/img/slice_2.png' class='slices' alt=''>
            </div>
            <div class='slice_3'>
                <img src='assets/img/slice_3.png' class='slices' alt=''>
            </div>
            <div class='slice_4'>
                <img src='assets/img/slice_4.png' class='slices' alt=''>
            </div>
            <div class='slice_5'>
                <img src='assets/img/slice_5.png' class='slices' alt=''>
            </div>
            <div class='slice_6'>
                <img src='assets/img/slice_6.png' class='slices' alt=''>
        </div>
    </section>
`;

// === LANDING PAGE COMPONENT
const landingHTML = `
    <header class='header'>
        <img src='../assets/img/logo.png'>
        <button id='add-cart' class='closed'><img src='../assets/img/cart.png'></button>
    </header>
    <div id='content-cont'></div>
    <footer>
        <p>©2022 by ACID</p>
    </footer>
`;

// === ORDER PAGE COMPONENT
// 
const orderHTML = `
    <div id='order-content-cont' class="hidden">
        <p>Your Order</p>
        <div class='order-cont'></div>
        <p>Delivery Information</p>
        <form id='form'>
            <label for='i-username'>Name</label>
            <input type='text' id='i-username' name='i-username' placeholder='Your Name'>
            <label for='i-address'>Zip code/City/Str./House num.</label>
            <input type='text' id='i-address' name='i-address' placeholder='Your Address'>
            <label for='i-phone'>Phone Number</label>
            <input type='text' id='i-phone' name='i-phone' placeholder='Your phone number'>
            <label for='i-email'>E-mail</label>
            <input type='email' id='i-email' name='i-email' placeholder='Your email address'>
            <button id='order-btn'>Order Now</button>
        </form>
    </div>
`;

// === FUNCTION WHICH LOADS THE LOADING ANIMATION, THEN THE LANDINGPAGE
function loadAnimation (){
    // add the loadingHTML's content to the 'root' element
    root.insertAdjacentHTML('beforeend', loadingHTML);
    // save the element with 'animation-section' id, to animElement variable
    let animElement = document.getElementById('animation-section');
    // use the setTimeout method
    setTimeout(() => {
        // add 'hidden' to animElement's classList
        animElement.classList.add('hidden');
        // if the animElement has the 'hidden' class
        if(animElement.classList.contains('hidden')){
            // remove animElement from 'root' element
            root.innerHTML = '';
            // call the fetchLanding function
            loadLanding();
        };
    // with 4 second delay
    },4000);
};

// === FUNCTION WHICH USES DATA.JSON TO RENDER THE LANDING PAGE
async function loadLanding() {
    // make a server request with the 'fetch()', it returns an object saved in 'dataJson'
    let dataJson = await fetch('./assets/data.json');
    // retrieve the response as JSON using the json() function of the 'dataJson' object
    let data = await dataJson.json();
    // make an pizzaCard variable, which is empty by default
    let pizzaCard = '';
    // calling a function on each element in the data array
    data.map(pizza => {
        // write the HTML with the pizza-cont, in pizzaCard variable
        pizzaCard += `
        <div class='pizza-cont'>
            <img src='${pizza.picture}' alt='${pizza.name}' class='pizzas'>
            <div class='pizza_text'>
                <h3 class='pizza_name'>${pizza.name}</h3>
                <p class='ingredients'>${pizza.ingredients}</p>
            </div>
            <div class='pizza_input'>
                <input class='inp' type='number' min='1' max='99' id='input-${pizza.name}'>
                <button class='btn' id='${pizza.name}'><img src='../assets/img/add-to-cart.png'></button>
                <p class='price'>${pizza.price} Ft</p>
            </div>
        </div>
    `});
    // add the orderHTML, and the landingHTML to the 'root' element 
    root.insertAdjacentHTML('beforeend', landingHTML);
    document.querySelector('.header').insertAdjacentHTML('afterend', orderHTML);
    // add the pizzaCards to the 'content-cont' element
    document.getElementById('content-cont').insertAdjacentHTML('beforeend', pizzaCard);
    // call the addPizzaEvent, cartBtnEvent, and the getFormData functions
    addPizzaEvent(data);
    cartBtnEvent(orderData);
    getFormData();
};

// === FUNCTION WHICH USES PIZZADATA / SENDS IT TO BACKEND:
let orderData = [];

function addPizzaEvent(data) {
    // select every '.btn' element, and add 'click' event for each
    document.querySelectorAll('.btn').forEach(btn =>
        btn.addEventListener('click', () => {
            // save the value of an input witch has the button's id in it 
            let inputValue = document.getElementById(`input-${btn.id}`).value;
            // calling a function on each element in the data array 
            data.map(pizza => {
                // if the pizza.name equals to the button's id (e.g. both are "Pepperoni")
                if (pizza.name === btn.id) {
                    // set the pizza's "order" key value to "inputValue"
                    pizza.order = inputValue;
                    // set the pizza's "price" key to the price * ordered quantity
                    pizza.price = parseInt(pizza.price * pizza.order);
                    // push the string with the ordered pizza dates in it, to orderData variable (to use later in the orderData rendering)
                    orderData.push(`${pizza.name}`);
                    orderData.push(`${pizza.order}`);
                    orderData.push(`${pizza.price}`);
                    const formData = new FormData()
                    formData.append('name', pizza.name);
                    formData.append('qty', pizza.order);
                    formData.append('price', pizza.price);
                    const fetchSetting = {
                        method: "POST",
                        body: formData
                    }
                    fetch('/', fetchSetting)
                };
            });
        })
    );
};

// === FUNCTION WHICH OPENS THE "YOUR ORDER" MENU, AND RENDER THE ORDERED PIZZAS IN IT
function cartBtnEvent(orderData) {
    // search the button with 'add-cart' id
    let cartBtn = document.getElementById('add-cart');
    // add 'click' event to the button
    cartBtn.addEventListener('click', () => {
        // if the cartBtn has a class 'closed'
        if (cartBtn.classList.contains('closed')) {
            // change the cartBtn's class to 'opened'
            cartBtn.className = 'opened';
            // and toggle 'hidden' to the element with 'order-content-cont' id
            document.getElementById('order-content-cont').classList.toggle('hidden');
            // make an orderPizza variable, which is empty by default
            let orderPizza = '';
            // calling a function on each element in the orderData array (orderData made in 77th line, content made in the addBtnEvent function(93th line))
            orderData.map(pizzatype => {
                // write the HTML with the pizzatype, in orderPizza variable
                orderPizza += `
                <p>${pizzatype}</p>
                `
            });
            // change the .order-cont's inner HTML to orderPizza 
            document.querySelector('.order-cont').innerHTML = orderPizza;
        // else
        } else {
            // change the cartBtn's class to 'closed'
            cartBtn.className = 'closed';
            // and toggle 'hidden' to the element with 'order-content-cont' id
            document.getElementById('order-content-cont').classList.toggle('hidden');
        };
    });
};

// === FUNCTION WHICH READS THE INPUT DATA FROM "YOUR ORDER" MENU, AND SENDS IT TO BACKEND
function getFormData() {
    // get the Date, and compile it to 'today' variable
    let d = new Date();
    let dd = String(d.getDate()).padStart(2, '0');
    let mm = String(d.getMonth() + 1).padStart(2, '0');
    let yyyy = d.getFullYear();
    let time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    let today = yyyy + '/' + mm + '/' + dd;
    // save the element with 'form' id, to orderElement variable
    let orderElement = document.getElementById('form');
    // add "submit" event to orderElement
    orderElement.addEventListener('submit', event => {
        // cancel the 'submit' event's default action
        event.preventDefault();
        // make a new formDataText with  new FormData object-constructor
        const formDataText = new FormData();
        // append the all the input's value(name, address...etc) as value, with the key (name, address...etc) to formDataText
        formDataText.append('username', event.target.querySelector(`#i-username`).value);
        formDataText.append('address', event.target.querySelector(`#i-address`).value);
        formDataText.append('phone', event.target.querySelector(`#i-phone`).value);
        formDataText.append('email', event.target.querySelector(`#i-email`).value);
        formDataText.append('date', today + ' ' + time);
        // set the fetchSettings2: it's POST method, with the formDataText's data in the body key
        const fetchSettings2 = {
            method: 'POST',
            body: formDataText
        };
        // we send the formDataText's data in a POST method (fetchSettings2) to the '/' -> root directory
        fetch('/', fetchSettings2);
    });
};

// FUNCTION WHICH LOADS EVERYTHING
function loadEvent (){
    // save the element with 'root' id, to root variable
    const root = document.getElementById('root');
    // call the onLoad function
    loadAnimation();
}


// after the 'load' event call 'loadEvent' function
window.addEventListener('load', loadEvent);