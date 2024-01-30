import {ICoinStatsApi} from "../../interfaces/coin-stats.interface.ts";
import axios from "axios";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'X-API-KEY': 'qeB0enHu/ytoO14B829tRxI7c6nb9vIeXRHII5X9rYY='
    }
};

export default function fetchCoinStats(): Promise<ICoinStatsApi[]> {
    return new Promise((resolve, reject) => {
        axios.get('https://openapiv1.coinstats.app/coins', options)
            .then(response => resolve(response.data.result))
            .catch(err => reject(err))
    })
}