const xlsx = require("xlsx");
const Expense = require("../models/Expense");

//add expense in database
exports.addExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    return res.status(500).json({ message: "Server Error -> ", error: error.message });
  }
};

//get all expense data from database
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error." });
  }
};

//delete expense data from database
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Income Data deleted Successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server Error." });
  }
};

//download expense data in excel format
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    //prepare data for excel
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
      //Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error." });
  }
};
