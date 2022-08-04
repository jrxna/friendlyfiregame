// cSpell:disable
// @ts-check

const path = require("node:path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const GenerateJsonPlugin = require("generate-json-webpack-plugin");
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");
const gitRevisionPlugin = new GitRevisionPlugin();

/** @type {import("webpack").Configuration} */
const config = {
    mode: "production",
    devtool: false,
    resolve: {
        symlinks: false,
        mainFields: ["browser", "main", "module"]
    },
    target: "electron-renderer",
    plugins: [
        /** @type {import("webpack").WebpackPluginInstance} */
        (new GenerateJsonPlugin("appinfo.json", {
            version: process.env.npm_package_version,
            gitCommitHash: gitRevisionPlugin.commithash()
        })),
        new CopyPlugin({
            patterns: [
                { from: "assets/", to: "assets/" },
                {
                    from: "index.html", transform(content) {
                        return content.toString().replace("src=\"node_modules/steal/steal.js\" main=\"lib/FriendlyFire\"",
                            "src=\"index.js\"");
                    }
                },
                { from: "style.css" },
                { from: "manifest.webmanifest" }
            ]
        })
    ]
};
module.exports = config;
