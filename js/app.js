//eventlisterners
document.getElementById("btnLoan").addEventListener("click", getLoan)
document.getElementById("btnWork").addEventListener("click", work)
document.getElementById("btnBank").addEventListener("click", bank)
document.getElementById("btnBuy").addEventListener("click", buyLaptop)

//global variables 
const thisName = document.getElementById("name")
const thisBalance = document.getElementById("balance")
const thisEarnedMoney = document.getElementById("earnedMoney")
const laptopsDropdown = document.getElementById("laptopsDropdown")
let earnedMoney = 0


//fetch data from json
function fetchInfo() {
    fetch("resources/data.json")
        .then(response => response.json())
        .then(data => {
            name = data.people[0].name
            balance = data.people[0].balance
            thisName.innerHTML = name
            thisBalance.innerHTML = balance
            thisEarnedMoney.innerHTML = earnedMoney
            data.laptops.forEach(laptop => {
                laptopsDropdown.innerHTML += `
                <option value="${laptop.id}">${laptop.name}</option>
                `
            });
        })
}

//a function that allows the user to borrow money from the bank
function getLoan() {
    let desiredLoanAmount = prompt("Enter an amount you want to loan?")
    if (desiredLoanAmount > balance * 2 || desiredLoanAmount === null || isNaN(desiredLoanAmount)) { // a check that the user has at least half of the amounts himself at the bank to borrow
        alert("For the loan to go through: \n - MIN 1kr. \n - MAX twice your current balance.");
    }
    else {
        balance = parseInt(balance) + parseInt(desiredLoanAmount);
        thisBalance.innerHTML = balance;
        let getLoanBtn = document.getElementById("btnLoan");
        getLoanBtn.style.display = "none";
    }
}

function work() {
    earnedMoney = parseInt(earnedMoney + 100)  //for each click, the amount earned increases by 100
    thisEarnedMoney.innerHTML = earnedMoney
}

function bank() {
    balance = parseInt(balance + earnedMoney)//transfer the earned money to the bank
    thisBalance.innerHTML = balance
    earnedMoney = 0
    thisEarnedMoney.innerHTML = earnedMoney
}

function selectedLaptop(selectedLaptop) {
    let choosenLaptop = Number(selectedLaptop) //convert the choosen laptop to a int
    if (choosenLaptop + 1 > 0) { //check that the user has make a choose
        document.getElementById("laptopInfo").style.display = "grid"
        fetch("resources/data.json") //fetch data from json
            .then(response => response.json())
            .then(data => {
                price = data.laptops[selectedLaptop].price
                document.getElementById("title").innerHTML = data.laptops[selectedLaptop].name
                document.getElementById("info").innerHTML = data.laptops[selectedLaptop].information
                document.getElementById("image").src = data.laptops[selectedLaptop].image
                document.getElementById("laptopPrice").innerHTML = price + "kr"
                document.getElementById("featureTitle").style.display = "block"
                document.getElementById("featuresInfo").innerHTML = data.laptops[selectedLaptop].features
                document.getElementById("btnBuy").style.display = "block"
            })
    }
}

function buyLaptop() {
    if (price <= balance) { //checks that you have enough money in the bank comparable to the price
        document.getElementById("btnLoan").style.display = "block" // makes the loan button visible again
        balance = parseInt(balance) - parseInt(price); //deducts the price of the computer from the money in the bank
        thisBalance.innerHTML = balance;
        alert("Congratulations! \nYou just bought a new laptop! :D")
    } else {
        alert("You can't buy this laptop. \nYou don't have enough money.")
    }
}




