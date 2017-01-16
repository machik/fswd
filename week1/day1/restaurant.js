function Client(name, id) {
	this.name = name;
	this.id = id;
}


function Ingredient(name, cost) {
	this.name = name;
	this.cost = cost;
}


function Dish(name, prize, ingredients) {
	this.name = name;
	this.baseCost = 10;
	this.prize = prize;
	this.ingredients = ingredients;
}

Dish.prototype.cost = function() {
	return this.ingredients.reduce((acc, b) => acc + b.cost, this.baseCost);
};

Dish.prototype.profit = function() {		
	return this.prize - this.cost();
};


function Restaurant() {
	this.orders =  {};
}

Restaurant.prototype.orderDish = function(dish, client) {	
	if(!!this.orders[client.name])
		this.orders[client.name].push(dish);
	else
		this.orders[client.name] = [dish];
};	

Restaurant.prototype.printOrders = function(client) {
	console.log(client.name);
	this.orders[client].forEach((order, index) => console.log(`Order #${index}: - ${order.price}`));
};

Restaurant.prototype.printCheck = function(client) {
	let check = 0;
	console.log(client.name);
	this.orders[client.name].forEach((order, index) => {
		console.log(`Order #${index}: - ${order.prize}`);
		check += order.prize;
	});
	console.log(`Total: ${check}\n`);
}

Restaurant.prototype.totalProfit = function() {
	let profit = 0;
	const clients = Object.keys(this.orders);
	
	clients.forEach(client => {
		this.orders[client].forEach(dish => profit += dish.profit());
	});
	return profit;
};

Restaurant.prototype.profitOfACustomer = function(client) {
	let profit = 0;
	this.orders[client.name].forEach(dish => profit += dish.profit());
	return profit;
};



var cheese = new Ingredient('Cheese', 5);
var pepperoni = new Ingredient('Pepperoni', 10);
var dough = new Ingredient('Dough', 2);
var lettuce = new Ingredient('Lettuce', 3);
var tomato = new Ingredient('Tomato', 4);

var pizza = new Dish('Pizza', 35, [cheese, pepperoni, dough]);
var salad = new Dish('Salad', 30, [lettuce, cheese, tomato]);

var restaurant = new Restaurant();

var pluto = {
  name: 'Pluto',
  id: 1
};
var goofy = {
  name: 'Goofy',
  id: 2
};

restaurant.orderDish(pizza, goofy);
restaurant.printCheck(goofy);
restaurant.orderDish(pizza, pluto);
restaurant.orderDish(salad, pluto);
restaurant.printCheck(pluto);
console.log('The total profit of the restaurant is: ', restaurant.totalProfit());
console.log('The profit of  the custom Goofy is: ', restaurant.profitOfACustomer(goofy));
console.log('The profit of  the custom Goofy is: ', restaurant.profitOfACustomer(pluto));
