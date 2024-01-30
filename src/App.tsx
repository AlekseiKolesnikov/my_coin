import './App.css'
import {CryptoContextProvider} from "./context/crypto-context.tsx";
import AppLayout from "./components/AppLayout.tsx";

export default function App() {
    return (
        <CryptoContextProvider>
            <AppLayout/>
        </CryptoContextProvider>
    )
}
