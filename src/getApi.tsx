import axios from "axios";
import { API_URL } from "./env";

export function getApi(currentPage: number) {
  const data = axios
    .get(`${API_URL}?limit=10&page=${currentPage}&offset=${10 * (-1 + currentPage)}`)
    .then((res) => res.data.data);
  return data;
}

export function getTopApi() {
  const data = axios.get(`${API_URL}?limit=3`).then((res) => res.data);
  return data;
}
