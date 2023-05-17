export const keyGeneratorUtil = (index: number | null, ...names: string[]) => {
    if (index === null) {
        console.error('keyGeneratorUtil: Executed generic key index. Please use custom index!');
        index = new Date().getTime();
    }

    if (!names?.length) {
        console.error('keyGeneratorUtil: Executed generic item name. Please use custom names!');
        names = [`item-${new Date().getTime()}`];
    }

    const keyName = names?.join('-');
    return `${keyName}-${index}`.replaceAll(/[!@#$%^&*()\\+=,. _]/gi, '-');
};
