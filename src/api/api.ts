export const mockGetData = (): Promise<Array<string> | null> =>  {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(['Data from the server', 'More data from the server', 'Last data from the server']);
        }, 2000);
    });
}