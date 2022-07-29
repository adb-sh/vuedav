import { is } from 'typescript-is';

export const readFileAs = <T>(
  file: File,
  getReaderMethod = (reader: FileReader) => reader.readAsDataURL
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = async (event) => {
      const buffer = event.target?.result;
      if (!buffer) reject('failed to read file');
      if (!is<T>(buffer)) reject('wrong type');
      else resolve(buffer as T);
    };
    getReaderMethod(reader as FileReader)(file);
  });
};

export const readFileBuffer = async (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = async (event) => {
      const buffer = event.target?.result;
      if (buffer === null || buffer === undefined || typeof buffer === 'string')
        reject('failed to read file');
      else resolve(buffer);
    };
    reader.readAsArrayBuffer(file);
  });
  /*return readFileAs<ArrayBuffer>(
    file,
    (reader: FileReader) => reader.readAsArrayBuffer
  );*/
};

export const readFileBlob = async (file: File): Promise<Blob> => {
  const data = await readFileAs<string>(file);
  return await (await fetch(data)).blob();
};
