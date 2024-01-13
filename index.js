const fetch = require("node-fetch")
const { postId, time, cookie } = require("./config.js")

async function main() {
    try {
        postId.forEach(async ID => {
            let newData = await fetch("https://www.itemsatis.com/api/moveUpPost", { headers: { "content-type": "application/x-www-form-urlencoded; charset=UTF-8", cookie: cookie, }, body: `Id=${ID}`, method: "POST" }).then(res => res.json())
            if (newData.success) {
                console.log(`İlan ID: ${ID} ${newData.message.replace(/<\/?b>/g, " ").replace(/<br>/g, " ")}`);
            } else if (newData.success == false) {
                console.log(`İlan ID: ${ID} ${newData.message.replace(/<\/?b>/g, "").replace(/<br>/g, " ").replace(" Farklı kategoride bulunan ilanlarınızı yukarı taşımayı deneyiniz.", " ")}`);
            }
        });
    } catch (error) {
        console.log(error.message);
    }
}

main()
setInterval(() => { main() }, 60000 * 60 * time)
