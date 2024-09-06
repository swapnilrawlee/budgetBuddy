import React from "react";
import Navbar from "../../components/Navbar";

const sharedClasses = {
  formInput: "form-input p-2 border-2",
  formSelect: "form-select",
  formTextarea: "form-textarea",
  bgPrimary: "bg-primary",
  textPrimaryForeground: "text-black",
  bgDestructive: "bg-red-400",
  textDestructiveForeground: "text-destructive-foreground",
  hoverBgPrimary: "hover:bg-primary/80",
  hoverBgDestructive: "hover:bg-destructive/80",
};

const FinancialGoalForm = () => {
  return (
    <div className="w-screen min-h-screen flex">
      <Navbar />
      <div className="flex-1 p-4  ml-[24%] w-[50%] ">
        <div className=" text-black p-6 rounded-lg shadow-lg flex flex-col gap-5">
          <h2 className="text-2xl font-semibold mb-4 ">
            Add New Financial Goal
          </h2>
          <form className="flex flex-col gap-5">
            <div className="mb-4 flex flex-col gap-5">
              <label htmlFor="goalName" className="block text-sm font-medium">
                Goal Name
              </label>
              <input
                type="text"
                id="goalName"
                name="goalName"
                placeholder="Enter goal name"
                className={sharedClasses.formInput}
                required
              />
            </div>

            <div className="mb-4 flex flex-col gap-5">
              <label
                htmlFor="targetAmount"
                className="block text-sm font-medium"
              >
                Target Amount
              </label>
              <input
                type="number"
                id="targetAmount"
                name="targetAmount"
                placeholder="Enter target amount"
                className={sharedClasses.formInput}
                required
              />
            </div>

            <div className="mb-4 flex flex-col gap-5">
              <label
                htmlFor="currentSavings"
                className="block text-sm font-medium"
              >
                Current Savings
              </label>
              <input
                type="number"
                id="currentSavings"
                name="currentSavings"
                placeholder="Enter current savings"
                className={sharedClasses.formInput}
                required
              />
            </div>

            <div className="mb-4 flex flex-col gap-5">
              <label htmlFor="deadline" className="block text-sm font-medium">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                className={sharedClasses.formInput}
                required
              />
            </div>

            <div className="mb-4 flex flex-col gap-5">
              <label
                htmlFor="priorityLevel"
                className="block text-sm font-medium"
              >
                Priority Level
              </label>
              <select
                id="priorityLevel"
                name="priorityLevel"
                className={sharedClasses.formSelect}
                required
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="mb-4 flex flex-col gap-5">
              <label htmlFor="notes" className="block text-sm font-medium">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Enter notes"
                className={sharedClasses.formTextarea}
              ></textarea>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className={`${sharedClasses.bgPrimary} ${sharedClasses.textPrimaryForeground} text-white px-4 py-2 rounded-md ${sharedClasses.hoverBgPrimary}`}
              >
                Save
              </button>
              <button
                type="button"
                className={`${sharedClasses.bgDestructive} ${sharedClasses.textDestructiveForeground} px-4 py-2 rounded-md ${sharedClasses.hoverBgDestructive}`}
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="mt-4 text-sm text-muted-foreground">
            {/* Additional content goes here */}
          </div>

          <div className="mt-4 text-sm text-accent-foreground">
            {/* Additional content goes here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialGoalForm;
