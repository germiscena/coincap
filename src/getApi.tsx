import axios from "axios";
import { API_URL } from "./env";

export async function getApi(currentPage: number, search: string) {
  const mainLink: string = `${API_URL}${
    search == "" ? "?" : `?search=${search}&`
  }limit=10&page=${currentPage}&offset=${10 * (-1 + currentPage)}`;
  const topLink: string = `${API_URL}?limit=3`;
  const mainApi = await axios.get(mainLink).then((res) => res.data.data);
  const topApi = await axios.get(topLink).then((res) => res.data.data);
  return { mainApi, topApi };
}

export async function getGraphApi(name: string) {
  const data = await axios
    .get(`${API_URL}/${name}/history?interval=d1`)
    .then((res) => res.data.data);
  return data;
}
