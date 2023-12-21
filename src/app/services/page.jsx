"use client";

import { Fragment, useState, useEffect, useContext } from "react";

import {
  Form,
  Table,
  Services,
  GrowVegetable,
  HarvestVegetable,
  AuditVegetable,
  ProcessVegetable,
  CertifyVegetable,
  PackVegetable,
  DistributeVegetable,
  PurchaseVegetable,
} from "./components/index";

import { VegetableContext } from "../../../context/Vegetable";

const Home = () => {
  const {
    createVegetable,
    growVegetable,
    harvestVegetable,
    auditVegetable,
    processVegetable,
    certifyVegetable,
    packVegetable,
    distributeVegetable,
    purchaseVegetable,
    getAllVegetables,
  } = useContext(VegetableContext);

  const [createVegetableModal, setCreateVegetableModal] = useState(false);
  const [growVegetableModal, setGrowVegetableModal] = useState(false);
  const [harvestVegetableModal, setHarvestVegetableModal] = useState(false);
  const [auditVegetableModal, setAuditVegetableModal] = useState(false);
  const [processVegetableModal, setProcessVegetableModal] = useState(false);
  const [certifyVegetableModal, setCertifyVegetableModal] = useState(false);
  const [packVegetableModal, setPackVegetableModal] = useState(false);
  const [distributeVegetableModal, setDistributeVegetableModal] =
    useState(false);
  const [purchaseVegetableModal, setPurchaseVegetableModal] = useState(false);
  const [allVegetablesData, setAllVegetablesData] = useState();

  useEffect(() => {
    const vegetables = getAllVegetables();

    return async () => {
      const allVegetables = await vegetables;

      setAllVegetablesData(allVegetables);
    };
  }, []);

  return (
    <Fragment>
      <Services
        setCreateVegetableModal={setCreateVegetableModal}
        setGrowVegetableModal={setGrowVegetableModal}
        setHarvestVegetableModal={setHarvestVegetableModal}
        setAuditVegetableModal={setAuditVegetableModal}
        setProcessVegetableModal={setProcessVegetableModal}
        setCertifyVegetableModal={setCertifyVegetableModal}
        setPackVegetableModal={setPackVegetableModal}
        setDistributeVegetableModal={setDistributeVegetableModal}
        setPurchaseVegetableModal={setPurchaseVegetableModal}
      />

      <Table
        allVegetablesData={allVegetablesData}
        setCreateVegetableModal={setCreateVegetableModal}
      />

      <Form
        createVegetable={createVegetable}
        createVegetableModal={createVegetableModal}
        setCreateVegetableModal={setCreateVegetableModal}
      />

      <GrowVegetable
        growVegetable={growVegetable}
        growVegetableModal={growVegetableModal}
        setGrowVegetableModal={setGrowVegetableModal}
      />

      <HarvestVegetable
        harvestVegetable={harvestVegetable}
        harvestVegetableModal={harvestVegetableModal}
        setHarvestVegetableModal={setHarvestVegetableModal}
      />

      <AuditVegetable
        auditVegetable={auditVegetable}
        auditVegetableModal={auditVegetableModal}
        setAuditVegetableModal={setAuditVegetableModal}
      />

      <ProcessVegetable
        processVegetable={processVegetable}
        processVegetableModal={processVegetableModal}
        setProcessVegetableModal={setProcessVegetableModal}
      />

      <CertifyVegetable
        certifyVegetable={certifyVegetable}
        certifyVegetableModal={certifyVegetableModal}
        setCertifyVegetableModal={setCertifyVegetableModal}
      />

      <PackVegetable
        packVegetable={packVegetable}
        packVegetableModal={packVegetableModal}
        setPackVegetableModal={setPackVegetableModal}
      />

      <DistributeVegetable
        distributeVegetable={distributeVegetable}
        distributeVegetableModal={distributeVegetableModal}
        setDistributeVegetableModal={setDistributeVegetableModal}
      />

      <PurchaseVegetable
        purchaseVegetable={purchaseVegetable}
        purchaseVegetableModal={purchaseVegetableModal}
        setPurchaseVegetableModal={setPurchaseVegetableModal}
      />
    </Fragment>
  );
};

export default Home;
