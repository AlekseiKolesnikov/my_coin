import './App.css'
import {CryptoContextProvider} from "./context/crypto-context.tsx";
import AppLayout from "./components/layout/AppLayout.tsx";

export default function App() {
    return (
        <CryptoContextProvider>
            <AppLayout/>
        </CryptoContextProvider>
    )
}
