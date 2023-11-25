const fetch = require("node-fetch")
const { token, data, time } = require("./config.js")

async function main() {
    data.forEach(async ID => {
        let newData = await fetch("https://www.itemsatis.com/api/merchant/v1/moveUpMyPost", { "headers": { "content-type": "application/json" }, "body": "{\"postID\":\"" + ID + "\",\"token\":\"" + token + "\"}", "method": "POST" }).then(res => res.json())
        if (newData.success) {
            console.log(`İlan ID: ${ID} ${newData.message.replace(/<\/?b>/g, " ").replace(/<br>/g, " ")}`);
        } else if (newData.success == false) {
            console.log(`İlan ID: ${ID} ${newData.message.replace(/<\/?b>/g, "").replace(/<br>/g, " ").replace(" Farklı kategoride bulunan ilanlarınızı yukarı taşımayı deneyiniz.", " ")}`);
        }
    });
}

main()
setInterval(() => { main() }, 60000 * 60 * time)