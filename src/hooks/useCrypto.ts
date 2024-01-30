import {useContext} from "react";
import CryptoContext from "../context/crypto-context.tsx";

export function useCrypto() {
    return useContext(CryptoContext)
}