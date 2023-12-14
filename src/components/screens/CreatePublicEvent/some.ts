// import {ContractTransaction, ContractTransactionResponse, MaxUint256, TransactionReceipt, ZeroAddress} from "ethers";
// import {task} from "hardhat/config";
// import type {HardhatRuntimeEnvironment, TaskArguments} from "hardhat/types";
// import pinataSDK from "@pinata/sdk";
// import axios from "axios";
// import {ONE_MINUTE} from "../test/utils/constants";

// import {ONE_HOUR, ONE_MINUTE, ONE_WEEK} from "../../test/utils/constants";
// import {BetManager} from "../../types";
// import {BetEventIpfsStruct, awaitTx, stringToKeccak256, topicKeccak256, uploadJsonToIpfs} from "../utils";

// task("task:stageBetting", "creates BetEvent with such stage").setAction(async function (taskArgs, hre) {
//   const {ethers, deployments} = hre;
//
//   const signers = await ethers.getSigners();
//   const {get} = hre.deployments;
//   const deployer = signers[0];
//   const alice = signers[1];
//   const bob = signers[2];
//   const treasury = signers[5];
//   const rewardAccumulator = signers[6];
//
//   const betManager = await ethers.getContractAt("BetManager", (await get("BetManager")).address);
//   const usdt = await ethers.getContractAt("USDT", (await get("USDT")).address);
//   const oracle = await ethers.getContractAt("ExclusiveVotingOracle", (await get("ExclusiveVotingOracle")).address);
//   const votingHandler = await ethers.getContractAt(
//     "ExclusiveVotingHandler",
//     (
//       await get("ExclusiveVotingHandler")
//     ).address,
//   );
//   const referralDistributor = await ethers.getContractAt(
//     "ReferralDistributor",
//     (
//       await get("ReferralDistributor")
//     ).address,
//   ); //ReferralDistributorFactory.attach((await get("ReferralDistributor")).address);
//   const referralStorageAttached = await ethers.getContractAt(
//     "ReferralStorageUpgradable",
//     (
//       await get("ReferralStorageUpgradeable")
//     ).address,
//   );
//   const tokenVesting = await ethers.getContractAt("BetManager", (await get("BetManager")).address);
//   const polybet = await ethers.getContractAt("Polybet", (await get("Polybet")).address);
//   const synthetic = await ethers.getContractAt("SyntheticSorbettiere", (await get("SyntheticSorbettiere")).address);
//   const orderBook = await ethers.getContractAt("OrderBook", (await get("OrderBook")).address);
//
//   const latestBlock = await ethers.provider.getBlock("latest");
//
//   const topicNameRaw = "Who will win the US elections 2023?";
//   const option1Raw = "Donald Trump";
//   const option2Raw = "Igor Nikolaev";
//   const option3Raw = "Barack Obama";
//   const option4Raw = "Joe Biden";
//
//   if (!latestBlock) {
//     throw new Error("latestBlock is not available");
//   }
//   console.log("Current Block Timestamp:", latestBlock.timestamp);
//
//   const jsonStruct: BetEventIpfsStruct = {
//     topic: topicNameRaw,
//     options: [option1Raw, option2Raw, option3Raw, option4Raw],
//     salt: latestBlock.timestamp.toString(),
//     tags: [''],
//     descriptinAndRules: ''
//   }
//   const ipfsHash = await uploadJsonToIpfs(jsonStruct);
//
//   //   const res = await loadJsonFromPinataIpfs(ipfsHash);
//
//   //   console.log("loadJsonFromPinataIpfs: ", res);
//
//   const topicName = topicKeccak256(topicNameRaw, latestBlock.timestamp.toString());
//   const option1 = stringToKeccak256(option1Raw);
//   const option2 = stringToKeccak256(option2Raw);
//   const option3 = stringToKeccak256(option3Raw);
//   const option4 = stringToKeccak256(option4Raw);
//   const increaseDuration = ONE_WEEK * 1000;
//   const latestTimestamp = latestBlock!.timestamp;
//   const beatingDeadline = latestTimestamp + ONE_MINUTE + increaseDuration;
//   const votingStart = beatingDeadline + ONE_MINUTE;
//   const roundDuration = ONE_MINUTE;
//   const disputeDuration = ONE_MINUTE;
//
//   // await showTokenBalance(polybet, [deployer, alice, bob]);
//   const createBetParams = {
//     topicName: topicName,
//     referrer: ethers.ZeroAddress,
//     votingStart: votingStart,
//     round1Duration: roundDuration,
//     round2Duration: roundDuration,
//     disputeDuration: disputeDuration,
//     options: [option1, option2, option3, option4],
//     ipfs: ipfsHash,
//     bettingDeadline: beatingDeadline,
//     provideLiquidityOptions: [option1, option2, option3, option4],
//     coeficients: [10001, 15000, 20000, 30000],
//     liquiditiesAmount: [1000000 * 100, 1000000 * 100, 1000000 * 100, 1000000 * 100],
//   } as BetManager.CreateBetEventParamsStruct;
//   await awaitTx(await betManager.createBet(createBetParams), "await betManager.createBet(createBetParams)");
//
//   export async function awaitTx(
//     transactionResponse: ContractTransactionResponse,
//     tag: string,
//   ): Promise<TransactionReceipt | null> {
//     // Ожидание подтверждения транзакции
//     console.log("wait for: ", transactionResponse.hash, " |", tag, "|");
//
//     const receipt = await transactionResponse.wait();
//     console.log("done");
//
//     return receipt;
//   }
//
//   export function waitSeconds(seconds: number): Promise<void> {
//     console.log("waitingSeconds: ", seconds);
//
//     return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
//   }
//
//   export function waitMinutes(minutes: number = 1): Promise<void> {
//     return waitSeconds(minutes * ONE_MINUTE);
//   }
// CREATE_BET:
// usdt.approve(betManager, MaxUint256)