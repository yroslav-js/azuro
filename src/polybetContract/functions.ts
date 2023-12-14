import pinataSDK from "@pinata/sdk";
import {ethers} from "ethers";

export async function uploadJsonToIpfs(data: any): Promise<string> {
  const pinata = new pinataSDK(process.env.NEXT_PUBLIC_PINATA_API_KEY, process.env.NEXT_PUBLIC_PINATA_API_SECRET);

  //   const options =
  const res = await pinata.pinJSONToIPFS(data, {
    pinataMetadata: {
      name: "BetEvent",
      walletAddress: "ethers.ZeroAddress",
    },
    pinataOptions: {
      cidVersion: 0,
    },
  });
  console.log("uploadJsonToPinata res:", res);
  return res.IpfsHash;
}

// IPFS
export interface BetEventIpfsStruct {
  topic: string;
  options: string[];
  salt: string;
  tags: string[];
  descriptinAndRules: string;
}

// export async function loadJsonFromPinataIpfs(ipfsHash: string): Promise<BetEventIpfsStruct> {
//   const url = `https://gateway.ipfs.io/ipfs/${ipfsHash}`;
//
//   try {
//     const response = await axios.get<BetEventIpfsStruct>(url);
//     if (response.data && typeof response.data === "object") {
//       return response.data;
//     } else {
//       throw new Error(Invalid
//       data
//       format.url
//     : ${url}
//     )
//       ;
//     }
//   } catch (error) {
//     console.error("Error fetching IPFS data from ", url);
//     throw error;
//   }
// }

export function topicKeccak256(topicRaw: string, salt: string): string {
  // abi-encoded string
  const encoded = ethers.AbiCoder.defaultAbiCoder().encode(["string", "string"], [topicRaw, salt]);

  const hash = ethers.keccak256(encoded);

  return hash;
}

export function stringToKeccak256(data: string): string {
  // abi-encoded string
  const encoded = ethers.AbiCoder.defaultAbiCoder().encode(["string"], [data]);
  const hash = ethers.keccak256(encoded);

  return hash;
}