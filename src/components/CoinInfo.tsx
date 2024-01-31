import { Flex, Typography } from "antd";
import { ICoinStatsApi } from "../interfaces/coin-stats.interface.ts";

export const CoinInfo = ({ coin, withSymbol }: { coin: ICoinStatsApi | null, withSymbol: boolean }) => {
    return (
        <Flex align={"center"}>
            <img
                src={coin?.icon}
                alt={coin?.name}
                style={{ width: 40, marginRight: 10 }}
            />
            <Typography.Title level={2} style={{ margin: 0 }}>
                {withSymbol && <span>({coin?.symbol})</span>} {coin?.name}
            </Typography.Title>
        </Flex>
    )
}