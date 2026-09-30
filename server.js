const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8080;

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

// आपका channel
const CHANNEL = "@hrbseb10thallcorse";


app.get("/", (req, res) => {
    res.json({
        ok: true,
        service: "Study Mode Hrry Telegram Subscriber API"
    });
});


app.get("/api/telegram/subscribers", async (req, res) => {

    try {

        if (!BOT_TOKEN) {
            return res.status(500).json({
                ok: false,
                error: "TELEGRAM_BOT_TOKEN is not configured"
            });
        }


        const telegramUrl =
            `https://api.telegram.org/bot${BOT_TOKEN}/getChatMemberCount?chat_id=${encodeURIComponent(CHANNEL)}`;


        const response =
            await fetch(telegramUrl);


        const data =
            await response.json();


        if (!response.ok || !data.ok) {

            return res.status(500).json({
                ok: false,
                error: data.description || "Telegram API error"
            });

        }


        return res.json({

            ok: true,

            channel: CHANNEL,

            subscribers: Number(data.result),

            updatedAt: new Date().toISOString()

        });

    }

    catch (error) {

        console.error(
            "Telegram subscriber error:",
            error
        );

        return res.status(500).json({

            ok: false,

            error: "Unable to fetch Telegram subscriber count"

        });

    }

});


app.listen(PORT, () => {

    console.log(
        `Telegram subscriber API running on port ${PORT}`
    );

});
