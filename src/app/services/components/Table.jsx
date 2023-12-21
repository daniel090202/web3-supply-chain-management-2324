const Table = ({ allVegetablesData, setCreateVegetableModal }) => {
  const handleVegetableStatus = (status) => {
    let vegetableStatus = "Exception";

    if (status == 0) {
      vegetableStatus = "Stored";
    } else if (status == 1) {
      vegetableStatus = "Planted";
    } else if (status == 2) {
      vegetableStatus = "Harvested";
    } else if (status == 3) {
      vegetableStatus = "Audited";
    } else if (status == 4) {
      vegetableStatus = "Processed";
    } else if (status == 5) {
      vegetableStatus = "Certified";
    } else if (status == 6) {
      vegetableStatus = "Packed";
    } else if (status == 7) {
      vegetableStatus = "On Sale";
    } else if (status == 8) {
      vegetableStatus = "Purchased";
    }

    return vegetableStatus;
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Vegetable Traceability
          </h3>
          <p className="text-gray-600 mt-2">
            Tracking the vegetables from the plantation
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <p
            onClick={() => setCreateVegetableModal(true)}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text-sm rounded-lg md:inline-flex"
          >
            Add vegetable
          </p>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">SKU</th>
              <th className="py-3 px-6">UPC</th>
              <th className="py-3 px-6">Owner</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Quantity</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {allVegetablesData?.map((vegetable, index) => {
              return (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vegetable.skuDigits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vegetable.upcDigits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vegetable.ownerID.slice(0, 15)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vegetable.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vegetable.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {handleVegetableStatus(vegetable.status)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
