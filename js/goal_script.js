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

    goals.forEach((goal, index) => {
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
            <button onclick="deleteGoal(${index})">Delete</button>
        `;

        goalList.appendChild(goalItem);
    });
}

// Function to delete a goal
function deleteGoal(index) {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    if (index > -1 && index < goals.length) {
        goals.splice(index, 1); // Remove the goal at the specified index
        localStorage.setItem("goals", JSON.stringify(goals));
        displayGoals(); // Refresh the goal display after deletion
    }
}

// Function to calculate total saved amount across all goals
function calculateTotalGoalSavings() {
    const goals = JSON.parse(localStorage.getItem("goals")) || [];
    return goals.reduce((total, goal) => total + goal.savedAmount, 0);
}

// Initialize goal display on page load
document.addEventListener("DOMContentLoaded", function () {
    displayGoals();
});
