export default async function readBinaryText(file: File): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function () {
            resolve(Buffer.from(reader.result as ArrayBuffer));
        };
        reader.onerror = function () {
            reject(reader.error);
        };
        reader.readAsArrayBuffer(file);
    });
}
