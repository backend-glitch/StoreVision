
const fs = require("fs");
const { getDiskUsage } = require("./disk");

const FILE = "storage_history.json";

async function predictStorage() {

    const current = await getDiskUsage();
    const today = new Date().toISOString().split("T")[0];

    let history = [];

    if (fs.existsSync(FILE)) {
        history = JSON.parse(fs.readFileSync(FILE));
    }

    history.push({
        date: today,
        usage_percent: parseInt(current.usage_percent)
    });

    fs.writeFileSync(FILE, JSON.stringify(history, null, 2));

    if (history.length < 2) {
        return { message: "Not enough data yet" };
    }

    const growth = history[history.length - 1].usage_percent - history[0].usage_percent;
    const days = history.length;

    if (growth <= 0) {
        return { message: "Storage stable" };
    }

    const dailyGrowth = growth / days;
    const remaining = 100 - current.usage_percent;

    const daysRemaining = Math.round(remaining / dailyGrowth);

    const future = new Date();
    future.setDate(future.getDate() + daysRemaining);

    return {
        days_remaining: daysRemaining,
        predicted_full_date: future.toISOString().split("T")[0]
    };
}

module.exports = { predictStorage };
