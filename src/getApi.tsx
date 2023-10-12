import axios from "axios";
import { API_URL } from "./env";
import { coinApis } from "./types/types";

export async function getApi(currentPage: number, search: string) {
  const mainLink: string = `${API_URL}${
    search == "" ? "?" : `?search=${search}&`
  }limit=10&page=${currentPage}&offset=${10 * (-1 + currentPage)}`;
  const topLink: string = `${API_URL}?limit=3`;
  const mainApi: coinApis[] = await axios.get(mainLink).then((res) => res.data.data);
  const topApi: coinApis[] = await axios.get(topLink).then((res) => res.data.data);
  return { mainApi, topApi };
}

export async function getDiffApi(arr: string[]) {
  const asyncRes: number[] = await Promise.all(
    arr.map(async (item) => {
      const tempArr: string[] = item.split(",");
      const res: coinApis = await axios.get(`${API_URL}/${tempArr[0]}`).then((item) => {
        return item.data.data;
      });
      return Number(res.priceUsd) * Number(tempArr[1]);
    }),
  );
  return asyncRes.reduce((sum, current) => sum + current, 0);
}

export async function getGraphApi(id: string, period: string) {
  const data: string[] = await axios
    .get(`${API_URL}/${id}/history?interval=${period}`)
    .then((res) => res.data.data);
  return data;
}
