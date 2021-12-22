import { DeployFunction } from 'hardhat-deploy/types';
import { parseEther } from 'ethers/lib/utils';
import { HardhatRuntimeEnvironmentExtended } from 'helpers/types/hardhat-type-extensions';
import { ethers } from 'hardhat';

const seanPatersonEth = "0xb2A522c65b142e047991B2804c21C53D30A11De0";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // You might need the previously deployed FreeToken:
  const FreeToken = await ethers.getContract('FreeToken', deployer);

  await deploy('Vendor', {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [FreeToken.address],
    log: true,
  });

  const Vendor = await ethers.getContract("Vendor", deployer);

  console.log("\n 🏵  Sending all 1000 tokens to the vendor...\n");

  // transfer the tokens owned by FreeToken to the vendor
  await FreeToken.transfer(
    Vendor.address,
    ethers.utils.parseEther("1000")
  );

  await Vendor.transferOwnership(seanPatersonEth);
};
export default func;
func.tags = ['Vendor'];
