import * as XLSX from "xlsx";
import { ICalendar } from "../shared/models/Calendar";

interface RawCalendarData {
  "Seq No.": number;
  Week: string;
  "Week Label": string;
  Month: string;
  "Month Label": string;
}

export const readCalendarData = async (filePath: string) => {
  try {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const sheetName = "Calendar";
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON
    const rawData: RawCalendarData[] = XLSX.utils.sheet_to_json(worksheet);
    const transformedData: ICalendar[] = rawData.map((item) => ({
      sqNo: item["Seq No."] || 0,
      week: item["Week"] || "",
      weekLabel: item["Week Label"] || "",
      month: item["Month"] || "",
      monthLabel: item["Month Label"] || "",
    }));

    return transformedData;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return [];
  }
};
