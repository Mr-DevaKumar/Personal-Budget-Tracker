// Function to display financial summary (income, expenses, remaining budget)
function updateFinancialSummary() {
    const totalIncome = parseFloat(document.getElementById("income").value) || 0;
    const totalExpenses = parseFloat(document.getElementById("expenses").value) || 0;

    const remainingBudget = totalIncome - totalExpenses;
    const totalGoalsSaved = calculateTotalGoalSavings();

    // Display remaining budget and goal progress
    document.getElementById("remaining-budget").textContent = `Remaining Budget: $${remainingBudget.toFixed(2)}`;
    document.getElementById("goal-savings").textContent = `Total Saved for Goals: $${totalGoalsSaved.toFixed(2)}`;

    // Update pie chart with income and expenses
    updatePieChart(totalIncome, totalExpenses);
}

// Function to update the pie chart based on budget data
function updatePieChart(income, expenses) {
    const ctx = document.getElementById("pie-chart").getContext("2d");

    const data = {
        labels: ['Income', 'Expenses'],
        datasets: [{
            data: [income, expenses],
            backgroundColor: ['#36A2EB', '#FF5733'],
            borderColor: ['#36A2EB', '#FF5733'],
            borderWidth: 1
        }]
    };

    // Check if the pieChart exists, if it does, update it
    if (window.pieChart) {
        window.pieChart.data = data;
        window.pieChart.update();
    } else {
        window.pieChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return tooltipItem.label + ': $' + tooltipItem.raw;
                            }
                        }
                    }
                }
            }
        });
    }
}


// Function to add a goal
document.getElementById("goal-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const goalName = document.getElementById("goal-name").value;
    const goalAmount = parseFloat(document.getElementById("goal-target-amount").value);
    const goalDate = document.getElementById("goal-target-date").value;

    if (goalName && goalAmount && goalDate) {
        let goals = JSON.parse(localStorage.getItem("goals")) || [];

        const newGoal = {
            name: goalName,
            targetAmount: goalAmount,
            targetDate: goalDate,
            savedAmount: 0, // Initially, saved amount is 0
            remainingAmount: goalAmount
        };

        goals.push(newGoal);
        localStorage.setItem("goals", JSON.stringify(goals));
        displayGoals();
        document.getElementById("goal-form").reset(); // Clear form fields
    } else {
        alert("Please fill out all goal fields!");
    }
});

// Function to display all goals and their progress
function displayGoals() {
    const goalList = document.getElementById("goal-list");
    goalList.innerHTML = ""; // Clear existing goals

    const goals = JSON.parse(localStorage.getItem("goals")) || [];

    goals.forEach(goal => {
        const goalItem = document.createElement("div");
        goalItem.classList.add("goal-item");

        const progress = (goal.savedAmount / goal.targetAmount) * 100;

        goalItem.innerHTML = `
            <p><strong>${goal.name}</strong></p>
            <p>Target Amount: $${goal.targetAmount}</p>
            <p>Saved So Far: $${goal.savedAmount}</p>
            <p>Remaining: $${goal.remainingAmount}</p>
            <p>Progress: ${progress.toFixed(2)}%</p>
            <progress value="${goal.savedAmount}" max="${goal.targetAmount}"></progress>
        `;

        goalList.appendChild(goalItem);
    });
}

// Function to update goal progress when saving money
function updateGoalProgress(amount) {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];

    if (goals.length > 0) {
        goals[0].savedAmount += amount;
        goals[0].remainingAmount = goals[0].targetAmount - goals[0].savedAmount;

        localStorage.setItem("goals", JSON.stringify(goals));

        displayGoals();
    }
}

// Function to calculate total saved amount across all goals
function calculateTotalGoalSavings() {
    const goals = JSON.parse(localStorage.getItem("goals")) || [];
    return goals.reduce((total, goal) => total + goal.savedAmount, 0);
}

// Event listener for the main budget form (income and expenses)
document.getElementById("budget-form").addEventListener("submit", function (event) {
    event.preventDefault();

    updateFinancialSummary();
});

// Initialize goal display on page load
document.addEventListener("DOMContentLoaded", function () {
    displayGoals();
    updateFinancialSummary();
});
const budgetForm = document.getElementById('budget-form');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const remainingBudgetEl = document.getElementById('remaining-budget');

const ctxBudgetChart = document.getElementById('budget-chart').getContext('2d');
let budgetChart;

budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get all income and expense values
    const income = parseFloat(document.getElementById('income').value);
    const housing = parseFloat(document.getElementById('housing').value);
    const transportation = parseFloat(document.getElementById('transportation').value);
    const food = parseFloat(document.getElementById('food').value);
    const entertainment = parseFloat(document.getElementById('entertainment').value);
    const savings = parseFloat(document.getElementById('savings').value);
    const miscellaneous = parseFloat(document.getElementById('miscellaneous').value);

    // Validate if inputs are valid numbers
    if (isNaN(income) || isNaN(housing) || isNaN(transportation) || isNaN(food) ||
        isNaN(entertainment) || isNaN(savings) || isNaN(miscellaneous)) {
        alert("Please enter valid numbers.");
        return;
    }

    // Calculate total expenses
    const totalExpenses = housing + transportation + food + entertainment + savings + miscellaneous;

    // Calculate remaining budget
    const remainingBudget = income - totalExpenses;

    // Update the summary section
    totalIncomeEl.textContent = `Total Income: $${income.toFixed(2)}`;
    totalExpensesEl.textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
    remainingBudgetEl.textContent = `Remaining Budget: $${remainingBudget.toFixed(2)}`;

    // Update Pie Chart for Income vs Expenses Breakdown
    updatePieChart(income, totalExpenses, housing, transportation, food, entertainment, savings, miscellaneous);
});

function updatePieChart(income, totalExpenses, housing, transportation, food, entertainment, savings, miscellaneous) {
    // Destroy existing chart if present
    if (budgetChart) {
        budgetChart.destroy();
    }

    // Create a new Pie chart with detailed expense breakdown
    budgetChart = new Chart(ctxBudgetChart, {
        type: 'pie',
        data: {
            labels: [
                'Income',
                'Housing',
                'Transportation',
                'Food',
                'Entertainment',
                'Savings',
                'Miscellaneous'
            ],
            datasets: [{
                data: [
                    income,
                    housing,
                    transportation,
                    food,
                    entertainment,
                    savings,
                    miscellaneous
                ],
                backgroundColor: [
                    '#4CAF50', // Income
                    '#FF5733', // Housing
                    '#FF8C00', // Transportation
                    '#FFD700', // Food
                    '#00BFFF', // Entertainment
                    '#32CD32', // Savings
                    '#8A2BE2'  // Miscellaneous
                ],
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: $${context.raw.toFixed(2)}`
                    }
                }
            }
        }
    });
}
