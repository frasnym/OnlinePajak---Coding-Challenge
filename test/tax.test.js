const taxCalculation = require("../index");

test("monthly salary is 6.500.000 and married with 1 child", async () => {
	expect(taxCalculation(6500000, "K1")).toBe(750000);
});

test("monthly salary is 25.000.000 and single", async () => {
	expect(taxCalculation(25000000, "TK0")).toBe(31900000);
});
