const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ฟังก์ชันที่ใช้เพื่อเพิ่มข้อมูลลงในฐานข้อมูล
async function main() {
  const token = { id:2 }; // ค่านี้จะต้องมาจากระบบการพิสูจน์ตัวตนของคุณ
  const userId = token.id;

  await prisma.tradeTechnique.createMany({
    data: [
      { userId, technique: 'Scalping', Contract: 'EURUSD', LongShort: 'Long', Leverage: '1:100', lotsize: '0.01', EntryPrice: '1.0900', ExitPrice: '1.0910', Pip: '10', Note: 'Quick scalp during high volatility.', Timeframe: 'M1', result: 'win' },
      { userId, technique: 'Swing Trading', Contract: 'GBPUSD', LongShort: 'Short', Leverage: '1:50', lotsize: '0.04', EntryPrice: '1.3100', ExitPrice: '1.3050', Pip: '50', Note: 'Swing trade on technical signal.', Timeframe: 'H4', result: 'win' },
      { userId, technique: 'Breakout', Contract: 'AUDJPY', LongShort: 'Long', Leverage: '1:100', lotsize: '0.1', EntryPrice: '84.00', ExitPrice: '84.50', Pip: '50', Note: 'Breakout from consolidation zone.', Timeframe: 'M15', result: 'win' },
      { userId, technique: 'Reversal', Contract: 'NZDJPY', LongShort: 'Short', Leverage: '1:100', lotsize: '0.05', EntryPrice: '76.00', ExitPrice: '75.50', Pip: '50', Note: 'Reversal pattern spotted on H1 chart.', Timeframe: 'M30', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'USDCHF', LongShort: 'Long', Leverage: '1:200', lotsize: '0.02', EntryPrice: '0.9200', ExitPrice: '0.9210', Pip: '10', Note: 'Quick scalp during economic news.', Timeframe: 'M1', result: 'lose' },
      { userId, technique: 'Trend Following', Contract: 'USDJPY', LongShort: 'Long', Leverage: '1:30', lotsize: '0.07', EntryPrice: '110.00', ExitPrice: '110.60', Pip: '60', Note: 'Following the upward trend.', Timeframe: 'H4', result: 'win' },
      { userId, technique: 'Mean Reversion', Contract: 'GBPCHF', LongShort: 'Short', Leverage: '1:100', lotsize: '0.05', EntryPrice: '1.2500', ExitPrice: '1.2450', Pip: '50', Note: 'Mean reversion expected after recent surge.', Timeframe: 'M15', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'EURGBP', LongShort: 'Short', Leverage: '1:200', lotsize: '0.03', EntryPrice: '0.8500', ExitPrice: '0.8490', Pip: '10', Note: 'Scalping based on M1 chart.', Timeframe: 'M5', result: 'lose' },
      { userId, technique: 'Breakout', Contract: 'USDZAR', LongShort: 'Long', Leverage: '1:100', lotsize: '0.05', EntryPrice: '14.5000', ExitPrice: '14.5500', Pip: '50', Note: 'Breakout from resistance area.', Timeframe: 'M30', result: 'win' },
      { userId, technique: 'Trend Reversal', Contract: 'EURNZD', LongShort: 'Short', Leverage: '1:100', lotsize: '0.06', EntryPrice: '1.6900', ExitPrice: '1.6800', Pip: '100', Note: 'Trend reversal spotted on daily chart.', Timeframe: 'H1', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'GBPJPY', LongShort: 'Long', Leverage: '1:200', lotsize: '0.02', EntryPrice: '151.00', ExitPrice: '151.10', Pip: '10', Note: 'Scalping during market open.', Timeframe: 'M5', result: 'win' },
      { userId, technique: 'Swing Trading', Contract: 'CADJPY', LongShort: 'Short', Leverage: '1:50', lotsize: '0.04', EntryPrice: '88.00', ExitPrice: '87.50', Pip: '50', Note: 'Swing trade on technical signal.', Timeframe: 'H4', result: 'win' },
      { userId, technique: 'Breakout', Contract: 'CHFJPY', LongShort: 'Long', Leverage: '1:100', lotsize: '0.1', EntryPrice: '118.00', ExitPrice: '118.50', Pip: '50', Note: 'Breakout from consolidation zone.', Timeframe: 'M15', result: 'win' },
      { userId, technique: 'Reversal', Contract: 'AUDUSD', LongShort: 'Short', Leverage: '1:100', lotsize: '0.03', EntryPrice: '0.7800', ExitPrice: '0.7750', Pip: '50', Note: 'Reversal pattern spotted on H4 chart.', Timeframe: 'M30', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'USDNOK', LongShort: 'Long', Leverage: '1:500', lotsize: '0.01', EntryPrice: '9.0500', ExitPrice: '9.0550', Pip: '5', Note: 'Scalping during high volatility.', Timeframe: 'M1', result: 'lose' },
      { userId, technique: 'Trend Following', Contract: 'EURUSD', LongShort: 'Long', Leverage: '1:30', lotsize: '0.07', EntryPrice: '1.0800', ExitPrice: '1.0850', Pip: '50', Note: 'Following the upward trend.', Timeframe: 'H4', result: 'win' },
      { userId, technique: 'Mean Reversion', Contract: 'NZDUSD', LongShort: 'Short', Leverage: '1:100', lotsize: '0.05', EntryPrice: '0.6700', ExitPrice: '0.6650', Pip: '50', Note: 'Mean reversion expected after recent rise.', Timeframe: 'M15', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'EURJPY', LongShort: 'Short', Leverage: '1:200', lotsize: '0.03', EntryPrice: '130.50', ExitPrice: '130.40', Pip: '10', Note: 'Scalping during market open.', Timeframe: 'M5', result: 'lose' },
      { userId, technique: 'Breakout', Contract: 'GBPUSD', LongShort: 'Long', Leverage: '1:100', lotsize: '0.08', EntryPrice: '1.3200', ExitPrice: '1.3250', Pip: '50', Note: 'Breakout from resistance level.', Timeframe: 'M30', result: 'win' },
      { userId, technique: 'Trend Reversal', Contract: 'USDJPY', LongShort: 'Short', Leverage: '1:100', lotsize: '0.06', EntryPrice: '110.50', ExitPrice: '110.00', Pip: '50', Note: 'Trend reversal spotted on daily chart.', Timeframe: 'H1', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'AUDCAD', LongShort: 'Long', Leverage: '1:200', lotsize: '0.02', EntryPrice: '0.9500', ExitPrice: '0.9510', Pip: '10', Note: 'Quick scalp during high volatility.', Timeframe: 'M1', result: 'win' },
      { userId, technique: 'Swing Trading', Contract: 'EURCHF', LongShort: 'Long', Leverage: '1:50', lotsize: '0.04', EntryPrice: '1.0800', ExitPrice: '1.0850', Pip: '50', Note: 'Swing trade based on trend analysis.', Timeframe: 'H4', result: 'win' },
      { userId, technique: 'Breakout', Contract: 'CADCHF', LongShort: 'Long', Leverage: '1:100', lotsize: '0.1', EntryPrice: '0.7000', ExitPrice: '0.7050', Pip: '50', Note: 'Breakout from consolidation zone.', Timeframe: 'M15', result: 'win' },
      { userId, technique: 'Reversal', Contract: 'AUDJPY', LongShort: 'Short', Leverage: '1:100', lotsize: '0.05', EntryPrice: '84.50', ExitPrice: '84.00', Pip: '50', Note: 'Reversal pattern spotted on H4 chart.', Timeframe: 'M30', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'GBPUSD', LongShort: 'Long', Leverage: '1:200', lotsize: '0.03', EntryPrice: '1.3300', ExitPrice: '1.3310', Pip: '10', Note: 'Scalping during high volatility.', Timeframe: 'M5', result: 'win' },
      { userId, technique: 'Trend Following', Contract: 'NZDJPY', LongShort: 'Long', Leverage: '1:30', lotsize: '0.07', EntryPrice: '76.00', ExitPrice: '76.60', Pip: '60', Note: 'Following the upward trend.', Timeframe: 'H4', result: 'win' },
      { userId, technique: 'Mean Reversion', Contract: 'EURGBP', LongShort: 'Short', Leverage: '1:100', lotsize: '0.05', EntryPrice: '0.8600', ExitPrice: '0.8550', Pip: '50', Note: 'Mean reversion expected after recent rise.', Timeframe: 'M15', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'USDNOK', LongShort: 'Long', Leverage: '1:500', lotsize: '0.01', EntryPrice: '9.1000', ExitPrice: '9.1050', Pip: '50', Note: 'Scalping during market volatility.', Timeframe: 'M1', result: 'win' },
      { userId, technique: 'Breakout', Contract: 'AUDNZD', LongShort: 'Long', Leverage: '1:100', lotsize: '0.08', EntryPrice: '1.0800', ExitPrice: '1.0850', Pip: '50', Note: 'Breakout from resistance level.', Timeframe: 'M30', result: 'win' },
      { userId, technique: 'Trend Reversal', Contract: 'GBPJPY', LongShort: 'Short', Leverage: '1:100', lotsize: '0.06', EntryPrice: '150.00', ExitPrice: '149.50', Pip: '50', Note: 'Trend reversal spotted on daily chart.', Timeframe: 'H1', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'EURUSD', LongShort: 'Short', Leverage: '1:200', lotsize: '0.03', EntryPrice: '1.0850', ExitPrice: '1.0840', Pip: '10', Note: 'Scalping during market volatility.', Timeframe: 'M5', result: 'lose' },
      { userId, technique: 'Swing Trading', Contract: 'GBPJPY', LongShort: 'Long', Leverage: '1:50', lotsize: '0.04', EntryPrice: '151.00', ExitPrice: '151.50', Pip: '50', Note: 'Swing trade on trend signal.', Timeframe: 'H4', result: 'win' },
      { userId, technique: 'Breakout', Contract: 'USDCHF', LongShort: 'Long', Leverage: '1:100', lotsize: '0.1', EntryPrice: '0.9200', ExitPrice: '0.9250', Pip: '50', Note: 'Breakout from consolidation zone.', Timeframe: 'M15', result: 'win' },
      { userId, technique: 'Reversal', Contract: 'EURJPY', LongShort: 'Short', Leverage: '1:100', lotsize: '0.05', EntryPrice: '130.00', ExitPrice: '129.50', Pip: '50', Note: 'Reversal pattern spotted on H1 chart.', Timeframe: 'M30', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'USDJPY', LongShort: 'Long', Leverage: '1:500', lotsize: '0.01', EntryPrice: '110.00', ExitPrice: '110.10', Pip: '10', Note: 'Quick scalp during high volatility.', Timeframe: 'M1', result: 'lose' },
      { userId, technique: 'Trend Following', Contract: 'EURUSD', LongShort: 'Long', Leverage: '1:30', lotsize: '0.07', EntryPrice: '1.0800', ExitPrice: '1.0850', Pip: '50', Note: 'Following the upward trend.', Timeframe: 'H4', result: 'win' },
      { userId, technique: 'Mean Reversion', Contract: 'GBPUSD', LongShort: 'Short', Leverage: '1:100', lotsize: '0.05', EntryPrice: '1.3000', ExitPrice: '1.2950', Pip: '50', Note: 'Mean reversion expected after recent rise.', Timeframe: 'M15', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'AUDCAD', LongShort: 'Long', Leverage: '1:200', lotsize: '0.02', EntryPrice: '0.9400', ExitPrice: '0.9410', Pip: '10', Note: 'Scalping during market volatility.', Timeframe: 'M1', result: 'win' },
      { userId, technique: 'Breakout', Contract: 'CHFJPY', LongShort: 'Long', Leverage: '1:100', lotsize: '0.08', EntryPrice: '118.50', ExitPrice: '119.00', Pip: '50', Note: 'Breakout from resistance level.', Timeframe: 'M30', result: 'win' },
      { userId, technique: 'Trend Reversal', Contract: 'EURNZD', LongShort: 'Short', Leverage: '1:100', lotsize: '0.06', EntryPrice: '1.6800', ExitPrice: '1.6700', Pip: '100', Note: 'Trend reversal spotted on daily chart.', Timeframe: 'H1', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'EURCHF', LongShort: 'Long', Leverage: '1:200', lotsize: '0.02', EntryPrice: '1.0900', ExitPrice: '1.0910', Pip: '10', Note: 'Quick scalp during high volatility.', Timeframe: 'M1', result: 'win' },
      { userId, technique: 'Swing Trading', Contract: 'USDJPY', LongShort: 'Short', Leverage: '1:50', lotsize: '0.04', EntryPrice: '110.50', ExitPrice: '110.00', Pip: '50', Note: 'Swing trade based on technical signal.', Timeframe: 'H4', result: 'win' },
      { userId, technique: 'Breakout', Contract: 'AUDNZD', LongShort: 'Long', Leverage: '1:100', lotsize: '0.1', EntryPrice: '1.0800', ExitPrice: '1.0850', Pip: '50', Note: 'Breakout from consolidation area.', Timeframe: 'M15', result: 'win' },
      { userId, technique: 'Reversal', Contract: 'NZDUSD', LongShort: 'Short', Leverage: '1:100', lotsize: '0.05', EntryPrice: '0.6600', ExitPrice: '0.6550', Pip: '50', Note: 'Reversal pattern spotted on H4 chart.', Timeframe: 'M30', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'GBPJPY', LongShort: 'Long', Leverage: '1:200', lotsize: '0.03', EntryPrice: '152.00', ExitPrice: '152.10', Pip: '10', Note: 'Scalping during market open.', Timeframe: 'M5', result: 'win' },
      { userId, technique: 'Trend Following', Contract: 'EURCHF', LongShort: 'Long', Leverage: '1:30', lotsize: '0.07', EntryPrice: '1.0800', ExitPrice: '1.0850', Pip: '50', Note: 'Following the upward trend.', Timeframe: 'H4', result: 'win' },
      { userId, technique: 'Mean Reversion', Contract: 'GBPCHF', LongShort: 'Short', Leverage: '1:100', lotsize: '0.05', EntryPrice: '1.2600', ExitPrice: '1.2550', Pip: '50', Note: 'Mean reversion expected after recent rise.', Timeframe: 'M15', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'AUDUSD', LongShort: 'Short', Leverage: '1:200', lotsize: '0.02', EntryPrice: '0.7800', ExitPrice: '0.7790', Pip: '10', Note: 'Scalping during market open.', Timeframe: 'M5', result: 'lose' },
      { userId, technique: 'Breakout', Contract: 'USDZAR', LongShort: 'Long', Leverage: '1:100', lotsize: '0.1', EntryPrice: '14.4000', ExitPrice: '14.4500', Pip: '50', Note: 'Breakout from resistance level.', Timeframe: 'M30', result: 'win' },
      { userId, technique: 'Trend Reversal', Contract: 'CADJPY', LongShort: 'Short', Leverage: '1:100', lotsize: '0.06', EntryPrice: '88.50', ExitPrice: '88.00', Pip: '50', Note: 'Trend reversal spotted on daily chart.', Timeframe: 'H1', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'USDCHF', LongShort: 'Long', Leverage: '1:500', lotsize: '0.01', EntryPrice: '0.9300', ExitPrice: '0.9310', Pip: '10', Note: 'Scalping during market volatility.', Timeframe: 'M1', result: 'win' },
      { userId, technique: 'Swing Trading', Contract: 'USDJPY', LongShort: 'Long', Leverage: '1:50', lotsize: '0.04', EntryPrice: '111.00', ExitPrice: '111.50', Pip: '50', Note: 'Swing trade based on technical analysis.', Timeframe: 'H4', result: 'win' },
      { userId, technique: 'Breakout', Contract: 'GBPUSD', LongShort: 'Long', Leverage: '1:100', lotsize: '0.1', EntryPrice: '1.3200', ExitPrice: '1.3250', Pip: '50', Note: 'Breakout from consolidation area.', Timeframe: 'M15', result: 'win' },
      { userId, technique: 'Reversal', Contract: 'AUDJPY', LongShort: 'Short', Leverage: '1:100', lotsize: '0.05', EntryPrice: '84.50', ExitPrice: '84.00', Pip: '50', Note: 'Reversal pattern spotted on H4 chart.', Timeframe: 'M30', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'EURJPY', LongShort: 'Long', Leverage: '1:200', lotsize: '0.02', EntryPrice: '129.50', ExitPrice: '129.60', Pip: '10', Note: 'Quick scalp during high volatility.', Timeframe: 'M1', result: 'win' },
      { userId, technique: 'Trend Following', Contract: 'EURUSD', LongShort: 'Long', Leverage: '1:30', lotsize: '0.07', EntryPrice: '1.0850', ExitPrice: '1.0900', Pip: '50', Note: 'Following the upward trend.', Timeframe: 'H4', result: 'win' },
      { userId, technique: 'Mean Reversion', Contract: 'GBPJPY', LongShort: 'Short', Leverage: '1:100', lotsize: '0.05', EntryPrice: '152.00', ExitPrice: '151.50', Pip: '50', Note: 'Mean reversion expected after recent rise.', Timeframe: 'M15', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'USDJPY', LongShort: 'Short', Leverage: '1:500', lotsize: '0.01', EntryPrice: '110.50', ExitPrice: '110.40', Pip: '10', Note: 'Scalping during market volatility.', Timeframe: 'M5', result: 'win' },
      { userId, technique: 'Breakout', Contract: 'AUDCAD', LongShort: 'Long', Leverage: '1:100', lotsize: '0.08', EntryPrice: '0.9500', ExitPrice: '0.9550', Pip: '50', Note: 'Breakout from resistance level.', Timeframe: 'M30', result: 'win' },
      { userId, technique: 'Trend Reversal', Contract: 'CHFJPY', LongShort: 'Short', Leverage: '1:100', lotsize: '0.06', EntryPrice: '118.00', ExitPrice: '117.50', Pip: '50', Note: 'Trend reversal spotted on daily chart.', Timeframe: 'H1', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'GBPUSD', LongShort: 'Long', Leverage: '1:200', lotsize: '0.03', EntryPrice: '1.3400', ExitPrice: '1.3410', Pip: '10', Note: 'Quick scalp during market volatility.', Timeframe: 'M5', result: 'win' },
      { userId, technique: 'Swing Trading', Contract: 'EURCHF', LongShort: 'Long', Leverage: '1:50', lotsize: '0.04', EntryPrice: '1.0800', ExitPrice: '1.0850', Pip: '50', Note: 'Swing trade based on trend signal.', Timeframe: 'H4', result: 'win' },
      { userId, technique: 'Breakout', Contract: 'NZDJPY', LongShort: 'Long', Leverage: '1:100', lotsize: '0.1', EntryPrice: '76.00', ExitPrice: '76.50', Pip: '50', Note: 'Breakout from consolidation area.', Timeframe: 'M15', result: 'win' },
      { userId, technique: 'Reversal', Contract: 'USDCHF', LongShort: 'Short', Leverage: '1:100', lotsize: '0.05', EntryPrice: '0.9300', ExitPrice: '0.9250', Pip: '50', Note: 'Reversal pattern spotted on H4 chart.', Timeframe: 'M30', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'USDNOK', LongShort: 'Long', Leverage: '1:500', lotsize: '0.01', EntryPrice: '9.2000', ExitPrice: '9.2050', Pip: '50', Note: 'Quick scalp during market volatility.', Timeframe: 'M1', result: 'win' },
      { userId, technique: 'Trend Following', Contract: 'CADJPY', LongShort: 'Long', Leverage: '1:30', lotsize: '0.07', EntryPrice: '89.00', ExitPrice: '89.50', Pip: '50', Note: 'Following the upward trend.', Timeframe: 'H4', result: 'win' },
      { userId, technique: 'Mean Reversion', Contract: 'GBPCHF', LongShort: 'Short', Leverage: '1:100', lotsize: '0.05', EntryPrice: '1.2700', ExitPrice: '1.2650', Pip: '50', Note: 'Mean reversion expected after recent rise.', Timeframe: 'M15', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'AUDNZD', LongShort: 'Short', Leverage: '1:200', lotsize: '0.02', EntryPrice: '1.0800', ExitPrice: '1.0790', Pip: '10', Note: 'Scalping during market volatility.', Timeframe: 'M5', result: 'lose' },
      { userId, technique: 'Breakout', Contract: 'CHFJPY', LongShort: 'Long', Leverage: '1:100', lotsize: '0.1', EntryPrice: '118.00', ExitPrice: '118.50', Pip: '50', Note: 'Breakout from consolidation area.', Timeframe: 'M30', result: 'win' },
      { userId, technique: 'Trend Reversal', Contract: 'EURNZD', LongShort: 'Short', Leverage: '1:100', lotsize: '0.06', EntryPrice: '1.6900', ExitPrice: '1.6800', Pip: '100', Note: 'Trend reversal spotted on daily chart.', Timeframe: 'H1', result: 'win' },
      { userId, technique: 'Scalping', Contract: 'EURUSD', LongShort: 'Long', Leverage: '1:500', lotsize: '0.01', EntryPrice: '1.0900', ExitPrice: '1.0910', Pip: '10', Note: 'Scalping during market volatility.', Timeframe: 'M1', result: 'win' },
      { userId, technique: 'Swing Trading', Contract: 'GBPUSD', LongShort: 'Long', Leverage: '1:50', lotsize: '0.04', EntryPrice: '1.3100', ExitPrice: '1.3150', Pip: '50', Note: 'Swing trade based on trend signal.', Timeframe: 'H4', result: 'win' },
    ],
  });

  console.log('Data has been seeded.');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
