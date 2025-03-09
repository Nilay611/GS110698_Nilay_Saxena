import * as XLSX from "xlsx";
import { IStore } from "../shared/models/Store";

interface RawStoreData {
  "Seq No.": number;
  ID: string;
  Label: string;
  City: string;
  State: string;
}

export const readStoresData = async (filePath: string) => {
  try {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const sheetName = "Stores";
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON
    const rawData: RawStoreData[] = XLSX.utils.sheet_to_json(worksheet);
    const transformedData: IStore[] = rawData.map((item) => ({
      sqNo: item["Seq No."] || 0,
      id: item["ID"] || "",
      label: item["Label"] || "",
      city: item["City"] || "",
      state: item["State"] || "",
    }));

    return transformedData;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return [];
  }
};
