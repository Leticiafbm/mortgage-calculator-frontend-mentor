const mortgageTotalInput = document.querySelector('#mortgageTotalInput');
const mortgageTermInput = document.querySelector('#mortgageTermInput');
const interestRateInput = document.querySelector('#interestRateInput');
const calculeButton = document.querySelector('#calculeButton');


calculeButton.addEventListener('click', calcule);

function emptyField(f){
    if (f == 0){
        return true
    } else {
        return false
    }
}

function repayment(){
    const mortaggeType = document.getElementsByName('mortgageType');

    if (mortaggeType[0].checked){
        return true
    }
}

function interestOnly(){
    const mortaggeType = document.getElementsByName('mortgageType');

    if (mortaggeType[1].checked){
        return true
    }
}

function calcule(){
    const resultContainer = document.querySelector('#resultContainer');
    const noResultContainer = document.querySelector('#noResultContainer');
    let mortgageAmount = Number(mortgageTotalInput.value);
    let mortgageTerm = Number(mortgageTermInput.value) * 12;
    let interestRate = Number(document.querySelector("#interestRateInput").value) / 100 / 12;
    let monthlyRepayments = 0;

    if (emptyField(mortgageAmount) || emptyField(mortgageTerm) || emptyField(interestRate)){
        document.querySelectorAll(".main-inputs").forEach(input => {
            input.classList.add("input-error");
        });

        document.querySelectorAll(".currency-placeholder, .years-placeholder, .percentage-placeholder").forEach(span => {
            span.classList.add("span-error");
        });
    } else {
        resultContainer.style.display = 'flex'
        noResultContainer.style.display = 'none'
        
        if(repayment()){
            monthlyRepayments = mortgageAmount * (interestRate * (1 + interestRate) ** mortgageTerm) / ((1 + interestRate) ** mortgageTerm - 1);

        } else if (interestOnly()){
            monthlyRepayments = mortgageAmount * interestRate;

        }
        let totalRepayments = monthlyRepayments * mortgageTerm;
        
        const totalMonthlyRepaymentsDiv = document.querySelector('#totalMonthlyRepayments');
        const totalRepaymentsDiv = document.querySelector('#totalRepayments');

        totalMonthlyRepaymentsDiv.innerHTML = `£${monthlyRepayments.toFixed(2)}`
        totalRepaymentsDiv.innerHTML = `£${totalRepayments.toFixed(2)}`
    }
}