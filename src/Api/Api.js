import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";
export async function AllproductsDetail() {
  return await axios.get(`${BASE_URL}/products`);
}
