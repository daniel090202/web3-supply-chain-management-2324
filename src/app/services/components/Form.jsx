import { useState } from "react";

import icons from "../../../../assets/icons/index";

const Form = ({
  createVegetable,
  createVegetableModal,
  setCreateVegetableModal,
}) => {
  const [vegetable, setVegetable] = useState({
    upcDigits: "",
    price: "",
    quantity: "",
  });

  const handleCreateVegetable = async () => {
    try {
      await createVegetable(vegetable);
    } catch (error) {
      console.log(error);
    }
  };

  return createVegetableModal ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-10"
        onClick={() => setCreateVegetableModal(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-4">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setCreateVegetableModal(false)}
            >
              {icons.faXmark}
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              Create vegetables
            </h4>
            <p className="text-[15px] text-gray-500">
              Create vegetables and track the supply chain
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="text"
                  name="upc"
                  placeholder="Universal Product Code"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus: border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setVegetable({ ...vegetable, upcDigits: e.target.value })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus: border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setVegetable({ ...vegetable, price: e.target.value })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus: border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setVegetable({ ...vegetable, quantity: e.target.value })
                  }
                />
              </div>
              <button
                onClick={() => handleCreateVegetable()}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus: ring-2"
              >
                Create vegetables
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Form;
