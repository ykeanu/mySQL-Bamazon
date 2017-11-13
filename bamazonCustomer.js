// ==================== I. NPM PACKAGES && IMPORTS ==================== 

const mysql = require("mysql");
const inquirer = require('inquirer');
// Formats SQL data
require('console.table');

// ==================== II. FUNCTIONS && DECLARATIONS ====================

let currentQuantity = "";
let selectedProduct = "";

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "bamazon"
});

function displayItems() {
    const query = 'SELECT * FROM Products';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
    promptPurchase();
}

function promptOptions() {
    inquirer.prompt({
            name: "task",
            type: "list",
            message: "How can we help you?",
            choices: [
                "Shop for Products",
                "Leave Store"
            ]
        })
        .then(function(answer) {
            switch (answer.task) {
                case "Shop for Products":
                    displayItems();
                    break;
                case "Leave Store":
                    console.log("Thank you for shopping with us");
                    connection.end();
                    break;
            }
        })
}

function promptPurchase() {
    inquirer.prompt([{
            name: "item",
            type: "list",
            message: "What would you like to purchase?",
            choices: [
                "MacBook",
                "iPhone",
                "Hololens",
                "Basketball",
                "Toothpaste",
                "Hoodie",
                "TennisBall",
                "ToothBrush",
                "24-packWater",
                "GroundBeef"
            ]
        }, {
            name: "quantity",
            message: "How many would you like to purchase?"
        }])
        .then(function(answer) {
            const query = "SELECT product_name, stock_quantity FROM products WHERE?";
            connection.query(query, { product_name: answer.item }, function(err, res) {
                if (err) throw err;
                if (res[0].stock_quantity > answer.quantity) {
                    console.log("Item is in stock!");
                    currentQuantity = (res[0].stock_quantity) - (answer.quantity);
                    selectedProduct = answer.item;
                    const query = connection.query("UPDATE products SET ? WHERE?", [{
                            stock_quantity: currentQuantity
                        },
                        {
                            product_name: selectedProduct
                        }
                    ])
                } else {
                    console.log("Sorry, there aren't enough items in stock");
                }
                promptOptions();
            });
        })
}

// ==================== III. MAIN PROCESS ====================


connection.connect(function(err) {
    if (err) throw err;
    displayItems();
});