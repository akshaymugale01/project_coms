const InsuranceDetails = () => {
    return (
      <section>
        <div className="flex  justify-center bg-black m-4 p-2 rounded-md">
          <h2 className="text-xl font-semibold text-center text-white ">
            Insurance Details
          </h2>
        </div>
        <div className="flex flex-col items-center mx-10">

          <div className=" flex justify-end w-full">

          </div>
          <div className="grid grid-cols-3 w-full gap-5 my-5">
            <p className="text-xl font-medium">Name :</p>
            <p  className="text-xl font-medium">Gender :</p>
            <p  className="text-xl font-medium">Martial Status :</p>
            <p  className="text-xl font-medium">Dependent Information:</p>
            <p  className="text-xl font-medium">Current Insurance Coverage :</p>
            <p  className="text-xl font-medium">Desired Coverage Amounts :</p>
            <p  className="text-xl font-medium">Premium Amount :</p>
            <p  className="text-xl font-medium">Policy Details :</p>
            {/* <p  className="text-xl font-medium">Vehicle Number :</p>
            <p  className="text-xl font-medium">Unit :</p> */}
          </div>
        </div>
      </section>
    );
  };

  export default InsuranceDetails;