const FILENAME_REGX = /^.*[\\/]/;

export const getFileName = (fileOriginalName: string) => {
  return (fileOriginalName && fileOriginalName.replace(FILENAME_REGX, "")) || "";
};
