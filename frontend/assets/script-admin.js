const orderHeader  = () => {
    return `
        <div class="order-header">
            <h3>Hi, Admin</h3>
            <img src="/assets/img/user.png"
        </div>
    `
};

const searchComponentTest = () => {
    return `
        <div class="wrapper"> 
            <div class="box1">
                <div class="titles">
                    <h2>Orders</h2>
                </div>
            </div>
            <div class="box2">
                <div class="input-container">
                    <div>
                      <input type="date">
                    </div>
                    <div>
                        <input type="date">
                    </div>
                    <div>
                        <select class="cicamica">
                            <option>Status</option>
                            <option value="pending2">Pending</option>
                            <option value="progress2">Progress</option>
                            <option value="success2">Success</option>
                        </select>
                    </div>
                    <div class='search-box'>
                        <input type="search" id="search-input" placeholder="Search...">
                        <div class="input-img">
                            <img src="/assets/img/search.png">
                        </div>
                    </div>
                </div>
            </div>
            <div class='box3'>
                <div class="circles">
                    <div class="circleconti">
                         <div class="Green">0</div> 
                         <h4>Success</h4>
                    </div>
                    <div class="circleconti">
                         <div class="Yellow">0</div> 
                         <h4>Pending</h4>
                    </div>
                    <div class="circleconti">
                         <div class="Red">0</div> 
                         <h4>Progress</h4>
                    </div>
                    <div class="circleconti">
                         <div class="total">0</div> 
                         <h4>Total</h4>
                    </div>
                </div>                      
            </div>
        </div>
        `
}
/* const searchComponent = () => {
    return `
        <div class="wrapper"> 
            <div class="center">
                <div id="search-container">
                    <input type="search" id="search-input" placeholder="Search User's name...">
                    <button id="search">Search</button>
                </div>
                <div class="buttons">
                    <button class="button-all">All</button>
                    <button class="button-pending">Pending</button>
                    <button class="button-progress">Progress</button>
                    <button class="button-succes">Success</button>
                </div>
            </div>
        </div>
        `
} */

const orderTitle  = () => {
    return `
        <ul class="order-title">
            <li>Date</li>
            <li>Name</li>
            <li>Quantity</li>
            <li>Price</li>
            <li>Address</li>
            <li>Phone</li>
            <li>E-mail</li>
            <li>Status</li>
        </ul>
    `
};
const pizzaComponent = (name, qty, price) =>{

}
const orderComponent = (pizzaName, pizzaQty, pizzaPrice, address, phone, email, date) => {
    return `
        <ul class="orderlist" class="visible">
            <li>${date}</li>
            <li>${pizzaName}</li>
            <li>${pizzaQty}</li>
            <li>${pizzaPrice}</li>
            <li>${address}</li>
            <li>${phone}</li>
            <li>${email}</li>
            <select class="status">
                <option>Status: </option>
                <option value="pending">Pending</option>
                <option value="progress">Progress</option>
                <option value="success">Success</option>
            </select>
            <img class="statuspic" src="">
        </ul>
        `
    }; 
    
    const loadEvent = async () =>{
        console.log('Hello admin-js felület')
        
        document.getElementById('admin-root').insertAdjacentHTML('beforeend', orderHeader())
        document.getElementById('admin-root').insertAdjacentHTML('beforeend', searchComponentTest())
        document.getElementById('admin-root').insertAdjacentHTML('beforeend', orderTitle())        
        
    // ORDER - ADMIN 
    let jsonOrder = await fetch('./assets/order.json');
    let parseOrder = await jsonOrder.json();
    
    let orderData = parseOrder
    
    
    let result = '';
    
    let pizzaName = ""
    let pizzaQty = ""
    let pizzaPrice = ""

    
    orderData.map(order => {
        order.pizza.map(pizza =>{
            pizzaName +=  pizza.pizzaName + " "
            pizzaQty += pizza.pizzaQty + " "
            pizzaPrice += pizza.pizzaPrice + " "
        })
        result += orderComponent(pizzaName, pizzaQty, pizzaPrice, order.order.username, order.order.add, order.order.mail)
        console.log(order)
    });
    console.log(pizzaName.split(" "))
    console.log(pizzaQty.split(" "))
    console.log(pizzaPrice)
    
    
    document.getElementById('admin-root').insertAdjacentHTML('beforeend', result) 
    

    //DROPDOWN MENU

    
    let selectElement = document.querySelectorAll(".status")
    
    
    selectElement.forEach(selectBtn => {
        selectBtn.addEventListener("change", function(){  
            if (selectBtn.value === "pending") {
                document.querySelector(".statuspic").setAttribute("src", "assets/img/expired.png", alt="kocsog")
            } else if (selectBtn.value === "progress") {
                document.querySelector(".statuspic").setAttribute("src", "assets/img/work-in-progress.png", alt="nyomi")
            } else if (selectBtn.value === "success") {
                document.querySelector(".statuspic").setAttribute("src", "assets/img/check.png", alt="cica")
            }
        
        })
    })
    console.log(selectElement)

    //SEARCH BUTTONS

    let buttonElement = document.querySelector('.buttons').children
    let orderList = document.querySelectorAll('.orderlist')

    for (let i of orderList){
        const name = i.querySelector
    }




/*     console.log(buttonElement)

    buttonElement.forEach(searchBtn => {
        let orderCards = document.querySelectorAll('.orderlist')

        searchBtn.addEventListener('click', function(e){
            console.log(e.target.value)
            if(e.target.value === '.button-all.buttons'){
                orderCards.classList.add('visible')
            } else {
                orderCards.classList.remove('visible')
            }
        })
    })  */


}
window.addEventListener('load', loadEvent)