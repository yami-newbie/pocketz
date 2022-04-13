const apiKey = "124C79QIE5Z9S6BEYCRNVKKYSWYY1I5S2M";

const GetTxListApi = ({ address, startBlock, currentBlock: endBlock }) => {
  return (
    "https://api-ropsten.etherscan.io/api" +
    "?module=account" +
    "&action=txlist" +
    "&address=" +
    address +
    "&startblock=" +
    startBlock +
    "&endblock=" +
    endBlock +
    "&page=1" +
    "&offset=10" +
    "&sort=asc" +
    "&apikey=" +
    apiKey
  );
};


export {
    GetTxListApi,
}