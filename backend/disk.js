const { getDiskInfo } = require("node-disk-info");

async function getDiskUsage() {
    const disks = await getDiskInfo();

    const disk = disks[0];

    const total = disk.blocks / (1024 * 1024);
    const free = disk.available / (1024 * 1024);
    const used = total - free;

    const percent = Math.round((used / total) * 100);

    return {
        total_gb: total.toFixed(2),
        used_gb: used.toFixed(2),
        free_gb: free.toFixed(2),
        usage_percent: percent
    };
}


module.exports = { getDiskUsage };
