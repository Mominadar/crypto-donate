import "@nomiclabs/hardhat-ethers";
import hre from "hardhat";

export async function deployContract() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const unlockTime = currentTimestampInSeconds + 60;
  
    const lock = await hre.ethers.deployContract("DonationContract");
  
    await lock.waitForDeployment();
    const address = await lock.getAddress();
    console.log(
      `Lock with ETH and unlock timestamp ${unlockTime} deployed at ${address}`
    );

}

export async function deployDonationContract(){
    try{
      await deployContract();
    }catch(error){
        console.error(error);
        process.exitCode = 1;
    }
}

deployDonationContract().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  