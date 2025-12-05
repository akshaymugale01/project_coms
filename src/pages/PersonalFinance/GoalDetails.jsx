const GoalDetails = () => {
    return (
      <section>
        <div className="flex  justify-center bg-black m-4 p-2 rounded-md">
          <h2 className="text-xl font-semibold text-center text-white ">
          Goal Planning Details
          </h2>
        </div>
        <div className="flex flex-col items-center mx-10">

          <div className=" flex justify-end w-full">

          </div>
          <div className="grid grid-cols-3 w-full gap-5 my-5">
            <p className="text-xl font-medium">Name :</p>
            <p  className="text-xl font-medium">Goal Name :</p>
            <p  className="text-xl font-medium">Target Amount :</p>
            <p  className="text-xl font-medium">Monthly Savings Contribution:</p>
            <p  className="text-xl font-medium">Target Completion Date :</p>
            {/* <p  className="text-xl font-medium">Utilities :</p>
            <p  className="text-xl font-medium">Transportation :</p>
            <p  className="text-xl font-medium">Groceries :</p>
            <p  className="text-xl font-medium">Entertainment :</p>
            <p  className="text-xl font-medium">Health Insurance Premiums :</p> */}
          </div>
        </div>
      </section>
    );
  };

  export default GoalDetails;