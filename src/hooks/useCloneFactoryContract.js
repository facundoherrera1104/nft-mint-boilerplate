import useContract from "./useContract";

import cloneFactoryContractAbi from "abis/CloneFactory.json";

const useCloneFactoryContract = () =>
  useContract(process.env.REACT_APP_NFT_IMPLEMENTATION_CONTRACT_ADDRESS, cloneFactoryContractAbi, true);

export default useCloneFactoryContract;