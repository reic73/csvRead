const downloadAsTxt = (data: string, fileName: string) => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(data)
  );
  element.setAttribute("download", `${fileName}.txt`);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export default downloadAsTxt;
