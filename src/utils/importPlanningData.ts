import * as XLSX from "xlsx";

interface RawPlanningData {
  Store: string;
  SKU: string;
  Week: string;
  "Sales Units": number;
}

export const readPlanningData = async (filePath: string) => {
  try {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const sheetName = "Planning";
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON
    const rawData: RawPlanningData[] = XLSX.utils.sheet_to_json(worksheet);
    const transformedData = rawData.map((item) => ({
      store: item["Store"] || "",
      sku: item["SKU"] || "",
      week: item["Week"].toLowerCase() || "",
      salesUnits: item["Sales Units"] || 0,
    }));

    const groupedData: {
      [key: string]: {
        store: string;
        sku: string;
        [key: string]: number | string;
      };
    } = {};

    transformedData.forEach(({ store, sku, week, salesUnits }) => {
      const key = `${store}-${sku}`;

      if (!groupedData[key]) {
        groupedData[key] = { store, sku };
      }

      groupedData[key][`${week}-salesUnits`] = salesUnits;
    });

    return Object.values(groupedData);
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return [];
  }
};
