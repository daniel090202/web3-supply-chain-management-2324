const Services = ({
  setCreateVegetableModal,
  setGrowVegetableModal,
  setHarvestVegetableModal,
  setAuditVegetableModal,
  setProcessVegetableModal,
  setCertifyVegetableModal,
  setPackVegetableModal,
  setDistributeVegetableModal,
  setPurchaseVegetableModal,
}) => {
  const services = [
    {
      title: "Create",
    },
    {
      title: "Grow",
    },
    {
      title: "Harvest",
    },
    {
      title: "Audit",
    },
    {
      title: "Process",
    },
    {
      title: "Certify",
    },
    {
      title: "Pack",
    },
    {
      title: "Distribute",
    },
    {
      title: "Purchase",
    },
  ];

  const openModelBox = (status) => {
    if (status === 1) {
      setCreateVegetableModal(true);
    } else if (status === 2) {
      setGrowVegetableModal(true);
    } else if (status === 3) {
      setHarvestVegetableModal(true);
    } else if (status === 4) {
      setAuditVegetableModal(true);
    } else if (status === 5) {
      setProcessVegetableModal(true);
    } else if (status === 6) {
      setCertifyVegetableModal(true);
    } else if (status === 7) {
      setPackVegetableModal(true);
    } else if (status === 8) {
      setDistributeVegetableModal(true);
    } else if (status === 9) {
      setPurchaseVegetableModal(true);
    }
  };

  return (
    <section className="py-0 pb-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {services.map((service, index) => {
              return (
                <li key={index}>
                  <div
                    onClick={() => openModelBox(index + 1)}
                    className="w-full h-60 sm:h-52 md:h-56 flex items-center justify-center bg-black shadow-md rounded-xl opacity-60"
                  >
                    <span className="uppercase text-4xl text-white">
                      {service.title}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
