import axios from "axios";

const EXCHANGE_RATE_KEY = "26c87d5df59e2a2f161d7b02"; // مفتاح ExchangeRate

export async function getMarketData() {
  try {
    const url = `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_KEY}/latest/USD`;
    const response = await axios.get(url);

    if (!response.data || !response.data.conversion_rates) {
      throw new Error("Missing currency data");
    }

    const rates = response.data.conversion_rates;

    // صيغة محلية لآخر تحديث
    const lastUpdate = response.data.time_last_update_utc
      ? new Date(response.data.time_last_update_utc).toLocaleString()
      : "Unknown";

    return {
      rates,         // جميع العملات مقابل USD
      lastUpdate,    // آخر تحديث
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getCurrencyHistory(base = "USD", target = "EGP", days = 7) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);

  const url = `https://api.exchangerate.host/timeseries?start_date=${start.toISOString().slice(0,10)}&end_date=${end.toISOString().slice(0,10)}&base=${base}&symbols=${target}`;

  const response = await axios.get(url);
  const rates = response.data.rates;

  return Object.keys(rates).map(date => ({
    date,
    price: rates[date][target]
  }));
}
