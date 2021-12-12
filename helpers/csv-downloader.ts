const downloadAsCsv = (data: any[], fileName: string) => {
  const csvContent = data.map((e: any) => e.join(",")).join("\n");

  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent)
  );
  element.setAttribute("download", `${fileName}.csv`);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export default downloadAsCsv;
