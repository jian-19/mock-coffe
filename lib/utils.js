import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url) =>
  fetch(url).then(async (res) => {
    const body = await res.json();
    console.log(body);
    return body;
  });
