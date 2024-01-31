import React, { Context, createContext, useEffect, useState } from "react";
import {
    CryptoContextProviderProps,
    ICoinAssetApi,
    ICoinAssets,
    ICoinStatsApi,
    ICryptoContext
} from "../interfaces/coin-stats.interface.ts";
import { percentDifference } from "../utils/precent-difference.ts";
import fetchCoinStats from "../services/api/coin-stats-api.ts";
import fetchCoinAssetsApi from "../services/api/coin-assets-api.ts";

const CryptoContext: Context<ICryptoContext> = createContext<ICryptoContext>({
    coinAssets: [],
    coinStats: [],
    loading: false
})

export const CryptoContextProvider: React.FC<CryptoContextProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [coinStats, setCoinStats] = useState<ICoinStatsApi[]>([])
    const [coinAssets, setCoinAssets] = useState<ICoinAssets[]>([])

    function mapCoinAssetsApi(asset: ICoinAssetApi, coinStatsApiResult: ICoinStatsApi[]): ICoinAssets {
        const coin = coinStatsApiResult.find(coin => coin.id === asset.id)
        if (!coin) {
            throw new Error('No matching coin found')
        }
        return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset
        }
    }

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const coinStatsApiResult: ICoinStatsApi[] = await fetchCoinStats()
            const coinAssetsApiResult: ICoinAssetApi[] = await fetchCoinAssetsApi()
            setCoinAssets(coinAssetsApiResult.map(asset => mapCoinAssetsApi(asset, coinStatsApiResult)))
            setCoinStats(coinStatsApiResult)
            setLoading(false)
        }

        preload()
    }, [])
    return (
        <CryptoContext.Provider value={{ loading, coinStats, coinAssets }}>
            {children}
        </CryptoContext.Provider>)
}

export default CryptoContext
