export const errorHandler = (message: string = "Process Error") => {
  alert(message);
};

export const errorMessage: { [index: string]: string } = {
  FILE_IS_NOT_CSV: "Tipe file harus berformat .csv",
  FILE_NOT_FOUND: "File tidak dapat dimuat",
};
