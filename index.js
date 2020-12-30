const taxSchemes = [
	{
		income: {
			min: 0,
			max: 50000000,
		},
		rate: 0.05,
	},
	{
		income: {
			min: 50000001,
			max: 250000000,
		},
		rate: 0.15,
	},
	{
		income: {
			min: 250000001,
			max: 500000000,
		},
		rate: 0.25,
	},
	{
		income: {
			min: 500000001,
			max: Infinity,
		},
		rate: 0.3,
	},
];

const taxReliefs = {
	TK0: 54000000,
	K0: 58500000,
	K1: 63000000,
	K2: 67500000,
	K3: 72000000,
};

const taxCalculation = (monthlySalary, taxReliefCode) => {
	const annualIncome = monthlySalary * 12;
	// console.log({ annualIncome });

	const taxRelief = taxReliefs[taxReliefCode];

	let taxIncome = annualIncome - taxRelief;
	if (taxIncome <= 0) {
		taxIncome = 0;
	}
	// console.log({ taxIncome });
	let annualTaxted = 0;
	let annualTax = 0;

	if (taxIncome > 0) {
		for (const scheme of taxSchemes) {
			let calc = 0;
			const check = taxIncome - annualTaxted;

			if (check >= scheme.income.max) {
				calc = scheme.income.max - annualTaxted;
				annualTaxted = annualTaxted + calc;
				annualTax = annualTax + calc * scheme.rate;
			} else {
				calc = check;
				annualTaxted = annualTaxted + calc;
				annualTax = annualTax + calc * scheme.rate;

				// console.log({ calc, rate: scheme.rate, annualTaxted });
				break;
			}

			// console.log({ calc, rate: scheme.rate, annualTaxted });
		}
	}

	return annualTax;
};

module.exports = taxCalculation;
