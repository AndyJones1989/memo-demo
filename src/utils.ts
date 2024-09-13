export const processData = async (data: Array<string>) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const processedData =  data.map((entry) => entry.toUpperCase()).reverse().filter((entry) => !entry.includes('Z'));
    return processedData;
}