import useContract from "./useContract";

import nFTContractAbi from "abis/Implementation.json";

const useNFTContract = () =>
  useContract(process.env.REACT_APP_NFT_CONTRACT_ADDRESS, nFTContractAbi, true);

export default useNFTContract;