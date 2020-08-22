export default async function readFileText(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function () {
            resolve(reader.result as string);
        };
        reader.onerror = function () {
            reject(reader.error);
        };
        reader.readAsText(file);
    });
}
