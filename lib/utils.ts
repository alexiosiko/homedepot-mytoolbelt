import axios, { AxiosResponse } from "axios";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatArticleNumber = (num: string): string => {
	if (num.length == 6)
		num = "1000" + num; // ex 765045 => 1000765045
	else if (num.length as number == 7)
		num = "100" + num; // ex 1765045 => 1001765045
	else if (num.length != 10) 
		throw Error("Invalid article number ...");
	
	return num;
}

