const apiKey = "124C79QIE5Z9S6BEYCRNVKKYSWYY1I5S2M";

const buildApi = (provider) => {
  if (provider.name === "mainnet") return "https://api.etherscan.io/api";
  else return "https://api-" + provider.name + ".etherscan.io/api";
}

const GetTxListApi = ({ provider, address, startBlock, endBlock, page = 1, offset = 10 }) => {
  return (
    buildApi(provider) +
    "?module=account" +
    "&action=txlist" +
    "&address=" +
    address +
    "&startblock=" +
    startBlock +
    "&endblock=" +
    endBlock +
    "&page=" +
    page +
    "&offset=" +
    offset +
    "&sort=asc" +
    "&apikey=" +
    apiKey
  );
};


export {
    GetTxListApi,
}