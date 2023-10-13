import axios from "axios";
import { API_URL } from "./env";
import { coinApis } from "./types/types";

export async function getApi(currentPage: number) {
  const mainLink: string = `${API_URL}?limit=10&page=${currentPage}&offset=${
    10 * (-1 + currentPage)
  }`;
  const mainApi: coinApis[] = await axios.get(mainLink).then((res) => res.data.data);
  const topLink: string = `${API_URL}?limit=3`;
  const topApi: coinApis[] = await axios.get(topLink).then((res) => res.data.data);
  return { mainApi, topApi };
}

export async function getSearchApi(currentPage: number, search: string) {
  const mainLink: string = `${API_URL}${
    search == "" ? "?" : `?search=${search}&`
  }limit=10&page=${currentPage}&offset=${10 * (-1 + currentPage)}`;
  const mainApi: coinApis[] = await axios.get(mainLink).then((res) => res.data.data);
  if (mainApi.length == 0) {
    return null;
  } else {
    return mainApi;
  }
}

export async function getDiffApi(arr: string[]) {
  const asyncRes: number[][] = await Promise.all(
    arr.map(async (item) => {
      const tempArr: string[] = item.split(",");
      const res: coinApis = await axios.get(`${API_URL}/${tempArr[0]}`).then((item) => {
        return item.data.data;
      });
      const totalPrice: number = Number(res.priceUsd) * Number(tempArr[1]);
      const currPrice: number = Number(res.priceUsd);
      return [totalPrice, currPrice];
    }),
  );
  const totalPrice: number = asyncRes
    .map((item) => {
      return item[0];
    })
    .reduce((sum, current) => sum + current, 0);
  const singlePrices: string[] = asyncRes.map((item) => {
    return String(item[1]);
  });
  return { totalPrice, singlePrices };
}

export async function getGraphApi(id: string, period: string) {
  const data: string[] = await axios
    .get(`${API_URL}/${id}/history?interval=${period}`)
    .then((res) => res.data.data);
  return data;
}
