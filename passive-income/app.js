function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

function parseCurrency(value) {
  const cleanValue = value.replace(/[^0-9.]/g, '');
  return parseFloat(cleanValue) || 0;
}

function calculatePortfolio() {
  const monthlyIncomeInput = document.getElementById('monthlyIncome');
  const distributionRateInput = document.getElementById('distributionRate');
  const resultDiv = document.getElementById('result');
  
  const monthlyIncome = parseCurrency(monthlyIncomeInput.value);
  const distributionRatePct = parseFloat(distributionRateInput.value) || 4;
  
  if (monthlyIncome <= 0 || distributionRatePct <= 0) {
    resultDiv.innerHTML = 'Enter your desired monthly income and distribution rate.';
    return;
  }
  
  const annualIncome = monthlyIncome * 12;
  const dr = Math.max(0.0001, distributionRatePct / 100);
  const requiredPortfolio = annualIncome / dr;
  
  const formattedPortfolio = formatCurrency(requiredPortfolio);
  
  resultDiv.innerHTML = `Portfolio Needed @ ${distributionRatePct.toFixed(1)}% = ${formattedPortfolio}`;
}

function syncDistributionRate(value) {
  const rateInput = document.getElementById('distributionRate');
  const rateSlider = document.getElementById('distributionRateSlider');
  
  rateInput.value = value;
  rateSlider.value = value;
  calculatePortfolio();
}

document.addEventListener('DOMContentLoaded', function() {
  const monthlyIncomeInput = document.getElementById('monthlyIncome');
  const distributionRateInput = document.getElementById('distributionRate');
  const distributionRateSlider = document.getElementById('distributionRateSlider');
  
  monthlyIncomeInput.addEventListener('input', function(e) {
    calculatePortfolio();
  });
  
  monthlyIncomeInput.addEventListener('blur', function(e) {
    const value = parseCurrency(e.target.value);
    if (value > 0) {
      e.target.value = formatCurrency(value);
    }
  });
  
  monthlyIncomeInput.addEventListener('focus', function(e) {
    const value = parseCurrency(e.target.value);
    if (value > 0) {
      e.target.value = value.toString();
    }
  });
  
  distributionRateInput.addEventListener('input', function(e) {
    syncDistributionRate(e.target.value);
  });
  
  distributionRateSlider.addEventListener('input', function(e) {
    syncDistributionRate(e.target.value);
  });
  
  calculatePortfolio();
});
