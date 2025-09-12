import axios from "axios";

const BASE_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

export async function fetchAllCards() {
  const res = await axios.get(`${BASE_URL}?num=300&offset=0`);
  return res.data.data;
}
