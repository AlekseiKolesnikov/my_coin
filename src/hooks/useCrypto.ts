import {useContext} from "react";
import CryptoContext from "../context/crypto-context.tsx";
import {ICryptoContext} from "../interfaces/coin-stats.interface.ts";

export function useCrypto(): ICryptoContext {
    return useContext(CryptoContext)
}