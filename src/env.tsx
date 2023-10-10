import React from "react";
import AppContext from "./context";

export const API_URL: string = `https://api.coincap.io/v2/assets`;

export function convert(value: string) {
  const priceUsd: string =
    Number(value) < 0.01
      ? String(Number(value).toFixed(4))
      : Number(value) < 1000
      ? String(Number(value).toFixed(2))
      : Number(value) > 999 && Number(value) < 1000000
      ? `${(Number(value) / 1000).toFixed(2)}k`
      : Number(value) > 999999 && Number(value) < 999999999
      ? `${(Number(value) / 1000000).toFixed(2)}m`
      : `${(Number(value) / 1000000000).toFixed(2)}b`;
  return priceUsd;
}
