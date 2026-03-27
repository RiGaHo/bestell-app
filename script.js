let menus = [
	{
		'name': 'Hamburger',
		'ingredients':'rote Zwiebeln, frische Tomaten, saure Gurken, Lolo Salat, hausgemachte Burgersauce',
		'price':'8.99',
		'amount':'0',
	},
	{
		'name': 'Cheeseburger',
		'ingredients':'irischer Cheddar, Rote Zwiebeln, frische Tomaten, Lolo Salat, saure Gurken, hausgemachte Burgersauce',
		'price':'9.49',
		'amount':'0',
	},
	{
		'name': 'Barbecue Bacon Burger',
		'ingredients':'Bacon, Barbecuesauce, Zwiebeln, Tomaten, saure Gurken, Salat',
		'price':'9.99',
		'amount':'0',
	},
	{
		'name': 'Greek Burger',
		'ingredients':'Schafskäse, Peperoni, frische Salatgurke, frische Tomaten, rote Zwiebeln, Lolo Salat, saure Gurken, hausgemachte Burgersauce',
		'price':'10.49',
		'amount':'0',
	},
	{
		'name': 'Pesto Burger',
		'ingredients':'Rucola, rotes Pesto, Tomaten, Parmesan',
		'price':'11.49',
		'amount':'0',
	},
];


let sides = [
	{
		'name': 'Calzini Salami',
		'ingredients':'Teigtasche mit Tomatensauce, geriebenem Mozzarella und Salami.',
		'price':'6.99',
		'amount':'0',
	},
	{
		'name': 'Calzini Schinken und Paprika',
		'ingredients':'Teigtasche mit Tomatensauce, geriebenem Mozzarella, Hinterschinkenund Paprika.',
		'price':'6.99',
		'amount':'0',
	},
	{
		'name': 'Pommes',
		'ingredients':'Leckere Pommes zum Dippen.',
		'price':'3.49',
		'amount':'0',
	},
	{
		'name': 'Pizza-Brötchen ohne Füllung',
		'ingredients':'8 leckere Pizza-Brötchen.',
		'price':'5.49',
		'amount':'0',
	},
	{
		'name': 'Pizza-Brötchen Käse',
		'ingredients':'8 leckere Pizza-Brötchen mit Käsefüllung.',
		'price':'5.59',
		'amount':'0',
	},
];


let desserts = [
	{
		'name': 'Apfle-Zimt-Brot',
		'ingredients':'Zimtbrot mit warmen Apfelkompott und Zimt.',
		'price':'3.99',
		'amount':'0',
	},
	{
		'name': 'New York Cheesecake',
		'ingredients':'Käsekuchen mit Spekulatiusboden und -crumble.',
		'price':'3.49',
		'amount':'0',
	},
	{
		'name': 'Lava Kuchen',
		'ingredients':'frisch gebackener Schokokuchen mit flüssigem Kern',
		'price':'3.55',
		'amount':'0',
	},
	{
		'name': 'Tiramisu',
		'ingredients':'Tiramisu - handgemacht, mit leckerer Mascarpone Creme, lockerem Biskuit sowie Kaffee und Kakao.',
		'price':'3.99',
		'amount':'0',
	},
	{
		'name': 'Churros',
		'ingredients':'8 leckere Churros mit warmer Kakaocremefüllung und Knuspermantel',
		'price':'8.99',
		'amount':'0',
	},
];


let mealsCopy = [];


let carts = [];


function startFunction() {
	fillCart();
	generateMenu(menus);
}


function calculateTotalPrice() {
	let totalPrice = 0;
	for(let n = 0; n < carts.length; n++) {
		let price = carts[n].amount * carts[n].price;
		totalPrice += price;
	}
	return totalPrice;
}


function showResponsiveCartBtn() {
	let cartButton = document.getElementById('responsive-cart-button');
	cartButton.classList.remove('d-none');
}


function hideResponsiveCartBtn() {
	let cartButton = document.getElementById('responsive-cart-button');
	cartButton.classList.add('d-none');
}


function showCart() {
	let responsiveCart = document.getElementById('responsive-cart');
	responsiveCart.classList.remove('d-none');
}


function hideCart() {
	let responsiveCart = document.getElementById('responsive-cart');
	responsiveCart.classList.add('d-none');
}


function fillCartList(meals, menuIdx) {
	let addMenu = meals[menuIdx];

	if(carts.length < 1) {
		addMenu.amount++;
		carts.push(addMenu);
		showResponsiveCartBtn();
	} else if(carts.includes(addMenu)) {
		let cartsIdx = carts.indexOf(addMenu)
		carts[cartsIdx].amount++;
	} else {
		addMenu.amount++;
		carts.push(addMenu);
	}
}


function removeItem(cartsIdx) {
	carts[cartsIdx].amount--;
	if(carts[cartsIdx].amount == 0) {
		carts.splice(cartsIdx, 1);
	}
	if(carts.length < 1) {
		hideResponsiveCartBtn();
	}
	fillCart();
	fillResponsiveCart();
}


function addItem(cartsIdx) {
	carts[cartsIdx].amount++;
	fillCart();
	fillResponsiveCart();
}


function cartHeaderInnerHtml(cart) {
	cart.innerHTML  = `
			<div class="empty-cart">
				<h3>Fülle Deinen Warenkorb</h3>
				<span>Füge deinem Warenkorb Gerichte aus der Speisekarte hinzu.</span>
			</div>
	`;
}


function cartContentsInnerHtml(cart) {
	for(let n = 0; n < carts.length; n++) {
		cart.innerHTML += `
				<div class="cart-contents">
					<form class="order-amount">
						<label><b>Menge: </b></label>
						<button type="button" onclick="removeItem(${n})">-</button>
						<span>${carts[n].amount}</span>
						<button type="button" onclick="addItem(${n})">+</button>
					</form>
					<span><b>Gericht</b>: ${carts[n].name}</span>
					<span><b>Preis</b>: ${(carts[n].price * carts[n].amount).toFixed(2)} €</span>
				</div>
	`;}
}


function fillCart() {
	let cart = document.getElementById('cart-contents');
	if(carts.length < 1) {
		cartHeaderInnerHtml(cart)
			;} else {
		cart.innerHTML = '';
		cartContentsInnerHtml(cart);
		let totalPrice = +calculateTotalPrice().toFixed(2);
		cart.innerHTML += `<span><b>Summe</b>: ${totalPrice} €</span>`;
		cart.innerHTML += `<button type="button" class="responsive-btn" onclick="emptyCart()">Kauf abschließen</button>`;
	}
}


function fillResponsiveCart() {
	let cart = document.getElementById('responsive-cart-contents');
	if(carts.length < 1) {
		cartHeaderInnerHtml(cart)
			;} else {
		cart.innerHTML = '';
		cartContentsInnerHtml(cart);
		let totalPrice = +calculateTotalPrice().toFixed(2);
		cart.innerHTML += `<span><b>Summe</b>: ${totalPrice} €</span>`;
		cart.innerHTML += `<button type="button" class="responsive-btn" onclick="emptyCart()">Kauf abschließen</button>`;
	}
}


function emptyCart() {
	carts = [];
	fillCart();
	fillResponsiveCart();
}


function addToCart(meals, menuIdx) {
	fillCartList(meals, menuIdx);
	fillCart();
	fillResponsiveCart();
}


function generateMenu(meals) {
	mealsCopy = [...meals];
	console.log(mealsCopy);
	let menuList = document.getElementById('menu');
	menuList.innerHTML = '';
	for(let menu = 0; menu < meals.length; menu++) {
		menuList.innerHTML += `
			<div class="menu-card">
				<div class="menu-card-header">
					<h3>${meals[menu].name}</h3>
					<button type="button" class="button-default" onclick="addToCart(mealsCopy, ${menu})">+</button>
				</div>
				<span>${meals[menu].ingredients}</span>
				<p><b>${meals[menu].price} €</b></p>
			</div>
		`;}
}
