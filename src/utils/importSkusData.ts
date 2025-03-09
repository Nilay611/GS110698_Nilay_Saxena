import * as XLSX from "xlsx";
import { ISku } from "../shared/models/Sku";

interface RawSkuData {
  ID: string;
  Label: string;
  Class: string;
  Department: string;
  Price: number;
  Cost: number;
}

export const readSkusData = async (filePath: string) => {
  try {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const sheetName = "SKUs";
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON
    const rawData: RawSkuData[] = XLSX.utils.sheet_to_json(worksheet);
    const transformedData: ISku[] = rawData.map((item) => ({
      id: item["ID"] || "",
      label: item["Label"] || "",
      class: item["Class"] || "",
      department: item["Department"] || "",
      price: parseFloat((item["Price"] || 0).toFixed(2)), // Format to 2 decimal places
      cost: parseFloat((item["Cost"] || 0).toFixed(2)), // Format to 2 decimal places
    }));

    return transformedData;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return [];
  }
};
