const Vegetables = artifacts.require("Vegetables");

module.exports = function (deployer) {
  deployer.deploy(Vegetables);
};
