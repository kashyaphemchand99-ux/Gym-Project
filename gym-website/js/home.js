// Load membership plans on home page
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const plans = await getMembershipPlans();
    displayPlans(plans);
  } catch (error) {
    console.error('Error loading plans:', error);
  }
});

// Display membership plans
function displayPlans(plans) {
  const container = document.getElementById('plansContainer');
  if (!container) return;

  container.innerHTML = '';
  plans.forEach(plan => {
    const planHTML = `
      <div class="plan">
        <h3>${plan.name}</h3>
        <p>₹${plan.price}</p>
        <p style="font-size: 14px; color: #aaa; margin: 15px 0;">${plan.duration_months} Month${plan.duration_months > 1 ? 's' : ''}</p>
        <p style="font-size: 13px; color: #bbb; margin: 10px 0;">${plan.features}</p>
        <button onclick="handlePlanClick('${plan.name}')" class="plan-btn">Choose Plan</button>
      </div>
    `;
    container.innerHTML += planHTML;
  });
}

// Handle join button click
function handleJoinClick() {
  if (isLoggedIn()) {
    window.location.href = 'plans.html';
  } else {
    window.location.href = 'login.html';
  }
}

// Handle plan selection
function handlePlanClick(planName) {
  if (isLoggedIn()) {
    purchasePlanModal(planName);
  } else {
    alert('Please login first!');
    window.location.href = 'login.html';
  }
}

// Purchase plan modal
async function purchasePlanModal(planName) {
  if (confirm(`Do you want to purchase the ${planName} plan?`)) {
    try {
      const result = await purchaseMembership(planName);
      alert(result.message);
      window.location.href = 'dashboard.html';
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }
}
