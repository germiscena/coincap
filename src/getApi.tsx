import axios from "axios";
import { API_URL, getItemsForPage, sortingData } from "./env";
import { coinApis } from "./types/types";

export async function getApi(currentPage: number, sort: string) {
  const mainLink: string = API_URL;
  const mainApiFirst: any = await axios
    .get(mainLink)
    .then((res) => sortingData(sort, res.data.data));
  const mainApi: coinApis[] = getItemsForPage(mainApiFirst, currentPage, 10);
  const topLink: string = `${API_URL}?limit=3`;
  const topApi: coinApis[] = await axios.get(topLink).then((res) => res.data.data);
  return { mainApi, topApi };
}

// export async function getSortApi(currentPage: number, sort: string) {
//   const mainLink: string = API_URL;
//   const mainApi: coinApis[] = await axios.get(mainLink).then((res) => res.data.data);
//   let sortedApi: coinApis[] = [];
//   if (sort == "rank") {
//     sortedApi = mainApi.sort((a, b) => Number(a.rank) - Number(b.rank));
//   } else if (sort == "name") {
//     sortedApi = mainApi.sort((a, b) => a.name.localeCompare(b.name));
//   } else if (sort == "price") {
//     sortedApi = mainApi.sort((a, b) => Number(a.priceUsd) - Number(b.priceUsd));
//   } else if (sort == "dayValue") {
//     sortedApi = mainApi.sort((a, b) => Number(a.volumeUsd24Hr) - Number(b.volumeUsd24Hr));
//   }
//   return sortedApi;
// }

export async function getSearchApi(currentPage: number, search: string) {
  const mainLink: string = `${API_URL}?search=${search}`;
  const mainApi: coinApis[] = await axios.get(mainLink).then((res) => res.data.data);
  const data: coinApis[] = getItemsForPage(mainApi, currentPage, 10);
  const len: number = mainApi.length;
  if (mainApi.length == 0) {
    return null;
  } else {
    return { data, len };
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
