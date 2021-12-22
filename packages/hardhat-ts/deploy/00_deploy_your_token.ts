import { DeployFunction } from 'hardhat-deploy/types';
import { parseEther } from 'ethers/lib/utils';
import { HardhatRuntimeEnvironmentExtended } from 'helpers/types/hardhat-type-extensions';
import { ethers } from 'hardhat';

const seanPatersonEth = "0xb2A522c65b142e047991B2804c21C53D30A11De0";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log("Deployer: ", deployer);
  const yourContract = await deploy('FreeToken', {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: ["Hello"],
    log: true,
  });

  const FreeToken = await ethers.getContract('FreeToken', deployer);

  // await FreeToken.transferOwnership(seanPatersonEth);
};
export default func;
func.tags = ['FreeToken'];
