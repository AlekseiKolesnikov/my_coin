import {ICoinAssetApi} from "../../interfaces/coin-stats.interface.ts";
import {cryptoAssets} from "../../data/coin-assets.data.ts";

export default function fetchCoinAssetsApi(): Promise<ICoinAssetApi[]> {
    return new Promise((resolve) => {
        resolve(cryptoAssets)
    })
}
