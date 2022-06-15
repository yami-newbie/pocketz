const apiKey = "124C79QIE5Z9S6BEYCRNVKKYSWYY1I5S2M";

const buildApi = (provider) => {
  if (provider.name === "mainnet") return "https://api.etherscan.io/api";
  else return "https://api-" + provider.name + ".etherscan.io/api";
};

const GetTxListApi = ({
  provider,
  address,
  startBlock,
  endBlock,
  page = 1,
  offset = 10,
}) => {
  const url =
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
    "&sort=desc" +
    "&apikey=" +
    apiKey;
  return url;
};

const getBalancesApi = ({ provider, accounts }) => {
  const addressList = accounts.map((acc) => acc.account.address);
  var str = "";
  Array(addressList).forEach((e) => {
    str += e + ",";
  });

  str = str.substr(0, str.length - 1);

  const url = `${buildApi(provider)}?module=account&action=balancemulti&address=${str}&tag=latest&apikey=${apiKey}`;

  return url;
};

export { GetTxListApi, getBalancesApi };
