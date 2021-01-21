const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.listen(PORT, () => {
    console.log(`Go Force, Run Force!!! At port ${PORT}`);
});

app.get('/downloadmp3', async (req, res, next) => {
    try {
        const url = req.query.url;
        if (!ytdl.validateURL(url)) {
            return res.sendStatus(400);
        }

        let info = await ytdl.getInfo(url);
        let title = info.videoDetails.title;

        await ytdl.getBasicInfo(url, {
            format: 'mp4'
        }, (err, info) => {
            if (err) throw err;
            title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
        });

        res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
        ytdl(url, {
            format: 'mp3',
            filter: 'audioonly',
            quality: 'highestaudio'
        }).pipe(res);
    } catch (err) {
        console.error(err);
    }
});

app.get('/downloadmp4', async (req, res, next) => {
    try {
        let url = req.query.url;
        if (!ytdl.validateURL(url)) {
            return res.sendStatus(400);
        }

        let info = await ytdl.getInfo(url);
        let title = info.videoDetails.title;

        await ytdl.getBasicInfo(url, {
            format: 'mp4'
        }, (err, info) => {
            title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
        });

        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
        ytdl(url, {
            format: 'mp4',
            quality: 'highestvideo',
            filter: 'videoandaudio',
        }).pipe(res);
    } catch (err) {
        console.error(err);
    }
});
