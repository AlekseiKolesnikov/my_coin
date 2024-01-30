export function percentDifference(assetsPrise: number, coinPrice: number): number {
    return +(100 * Math.abs((assetsPrise - coinPrice) / ((assetsPrise + coinPrice) / 2))).toFixed(2);
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.substring(1)
}