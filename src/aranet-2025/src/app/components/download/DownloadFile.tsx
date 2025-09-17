"use client";

import { useEffect } from "react";
import { ExportData } from "@/interfaces";

export const DownloadFile = ({file, filename, remove }: ExportData) => {
  useEffect(() => {
    const downloadFile = async () => {
      try {
        const url = `/api/download?file=${file}&filename=${filename}&remove=${remove || false}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error descargando el fichero");

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(blobUrl); // libera memoria
      } catch (err) {
        console.error(err);
      }
    };
    if (file && filename) {
      downloadFile();
    }
  }, [file, filename, remove]);

  return null;
}