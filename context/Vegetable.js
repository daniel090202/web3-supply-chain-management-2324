import Web3Modal from "web3modal";

import { ethers } from "ethers";
import React, { useState, useEffect } from "react";

import vegetable from "../build/contracts/Vegetables.json";

const contractABI = vegetable.abi;
const contractAddress = "0xb8c7Af7dca257826c3251EA0181DbBf3A60E098c";

const fetchSmartContract = (signerOrProvider) => {
  return new ethers.Contract(contractAddress, contractABI, signerOrProvider);
};

export const VegetableContext = React.createContext();

export const VegetableProvider = ({ children }) => {
  const createVegetable = async (items) => {
    const { upcDigits, price, quantity } = items;

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchSmartContract(signer);
      const handleCreateVegetable = await contract.createVegetable(
        upcDigits,
        ethers.utils.parseUnits(price, 18),
        quantity,
        { value: ethers.utils.parseUnits(price, 18) }
      );

      await handleCreateVegetable.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const growVegetable = async (items) => {
    console.log(items);
    const { skuDigits, receiver } = items;

    try {
      if (!window.ethereum) return "Require MetaMask.";

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchSmartContract(signer);

      const vegetable = await contract.plantVegetable(skuDigits, receiver, 0);

      vegetable.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const harvestVegetable = async (items) => {
    const { skuDigits, receiver } = items;

    try {
      if (!window.ethereum) return "Require MetaMask.";

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchSmartContract(signer);

      const vegetable = await contract.harvestVegetable(skuDigits, receiver, 0);

      vegetable.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const auditVegetable = async (items) => {
    const { skuDigits, receiver } = items;

    try {
      if (!window.ethereum) return "Require MetaMask.";

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchSmartContract(signer);

      const vegetable = await contract.auditVegetable(skuDigits, receiver, 0);

      vegetable.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const processVegetable = async (items) => {
    const { skuDigits, receiver } = items;

    try {
      if (!window.ethereum) return "Require MetaMask.";

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchSmartContract(signer);

      const vegetable = await contract.processVegetable(skuDigits, receiver, 0);

      vegetable.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const certifyVegetable = async (items) => {
    const { skuDigits, receiver } = items;

    try {
      if (!window.ethereum) return "Require MetaMask.";

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchSmartContract(signer);

      const vegetable = await contract.certifyVegetable(skuDigits, receiver, 0);

      vegetable.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const packVegetable = async (items) => {
    const { skuDigits, receiver } = items;

    try {
      if (!window.ethereum) return "Require MetaMask.";

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchSmartContract(signer);

      const vegetable = await contract.packVegetable(skuDigits, receiver, 0);

      vegetable.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const distributeVegetable = async (items) => {
    const { skuDigits } = items;

    try {
      if (!window.ethereum) return "Require MetaMask.";

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchSmartContract(signer);

      const vegetable = await contract.sellVegetable(skuDigits, 0);

      vegetable.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const purchaseVegetable = async (items) => {
    const { skuDigits } = items;

    try {
      if (!window.ethereum) return "Require MetaMask.";

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchSmartContract(signer);

      const vegetable = await contract.purchaseVegetable(skuDigits, 0);

      vegetable.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllVegetables = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchSmartContract(provider);

      const vegetables = await contract.getAllVegetables();
      const allVegetables = vegetables.map((vegetable) => {
        return {
          skuDigits: vegetable.skuDigits.toString(),
          upcDigits: vegetable.upcDigits.toString(),
          ownerID: vegetable.ownerID.toString(),
          farmerID: vegetable.farmerID.toString(),
          inspectorID: vegetable.inspectorID,
          manufacturerID: vegetable.manufacturerID,
          distributorID: vegetable.distributorID,
          retailerID: vegetable.retailerID,
          customerID: vegetable.customerID,
          price: ethers.utils.formatEther(vegetable.price.toString()),
          quantity: vegetable.quantity.toString(),
          status: vegetable.status,
        };
      });

      return allVegetables;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VegetableContext.Provider
      value={{
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
      }}
    >
      {children}
    </VegetableContext.Provider>
  );
};
