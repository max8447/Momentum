export { };

const express = require("express");
const app = express.Router();

import Island, { IslandInterface } from "../model/island";

const { verifyToken, verifyClient } = require("../tokenManager/tokenVerify.js");
import error from "../utilities/structs/error";

//Thanks milxnor
app.get("/links/api/fn/mnemonic/:islandCode", async (req, res) => {

    const islandCode: string = req.params.islandCode;
    const islandCodePattern = /^\d{4}-\d{4}-\d{4}$/;
    const followsRegex = islandCodePattern.test(islandCode)

    if (!followsRegex) {
        //Bad request
        return res.sendStatus(400)
    }

    const islandData = await Island.findOne({ menmonic: islandCode }).then((island) => {

        if (!island) {
            return error.createError(
                "errors.com.epicgames.links.no_active_version",
                "No active links available for mnemonic: " + islandCode,
                [], 1, "no_active_link", 404, res
            );
        }

        res.json(island);

    }).catch((err) => {
    });

});

app.get("/api/v1/links/favorites/:accountId/check", verifyToken, async (req, res) => {

    res.json({
        hasMore: "False",
        results: []
    })

});

module.exports = app;