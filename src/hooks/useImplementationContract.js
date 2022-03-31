import useContract from "./useContract";

import implementationContractAbi from "abis/Implementation.json";

const useImplementationContract = () =>
  useContract(process.env.REACT_APP_NFT_IMPLEMENTATION_CONTRACT_ADDRESS, implementationContractAbi, true);

export default useImplementationContract;