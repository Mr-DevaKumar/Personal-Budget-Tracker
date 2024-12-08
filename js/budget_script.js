// Function to display financial summary (income, expenses, remaining budget)
function updateFinancialSummary() {
    const income = parseFloat(document.getElementById("income").value) || 0;
    const housing = parseFloat(document.getElementById("housing").value) || 0;
    const transportation = parseFloat(document.getElementById("transportation").value) || 0;
    const food = parseFloat(document.getElementById("food").value) || 0;
    const entertainment = parseFloat(document.getElementById("entertainment").value) || 0;
    const savings = parseFloat(document.getElementById("savings").value) || 0;
    const miscellaneous = parseFloat(document.getElementById("miscellaneous").value) || 0;

    // Calculate total expenses
    const totalExpenses = housing + transportation + food + entertainment + savings + miscellaneous;

    // Calculate remaining budget
    const remainingBudget = income - totalExpenses;

    // Update the summary section with detailed data
    document.getElementById('total-income').textContent = `Total Income: $${income.toFixed(2)}`;
    document.getElementById('total-expenses').textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;
    document.getElementById('remaining-budget').textContent = `Remaining Budget: $${remainingBudget.toFixed(2)}`;

    // Display individual expenses in the budget summary
    document.getElementById('housing-summary').textContent = `Housing: $${housing.toFixed(2)}`;
    document.getElementById('transportation-summary').textContent = `Transportation: $${transportation.toFixed(2)}`;
    document.getElementById('food-summary').textContent = `Food: $${food.toFixed(2)}`;
    document.getElementById('entertainment-summary').textContent = `Entertainment: $${entertainment.toFixed(2)}`;
    document.getElementById('savings-summary').textContent = `Savings: $${savings.toFixed(2)}`;
    document.getElementById('miscellaneous-summary').textContent = `Miscellaneous: $${miscellaneous.toFixed(2)}`;

    // Update pie chart with detailed budget data
    updatePieChart(income, housing, transportation, food, entertainment, savings, miscellaneous);
}

// Function to update the pie chart based on budget data
function updatePieChart(income, housing, transportation, food, entertainment, savings, miscellaneous) {
    const ctx = document.getElementById("budget-chart").getContext("2d");

    const data = {
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
                                return tooltipItem.label + ': $' + tooltipItem.raw.toFixed(2);
                            }
                        }
                    }
                }
            }
        });
    }
}

// Event listener for the main budget form (income and expenses)
document.getElementById("budget-form").addEventListener("submit", function (event) {
    event.preventDefault();
    updateFinancialSummary();
});

// Initialize financial summary and pie chart on page load
document.addEventListener("DOMContentLoaded", function () {
    updateFinancialSummary();
});
