const zip = require("npm-build-zip");
const fs = require("fs");
const iv = require("increase-version");

const releaseFolder = "./releases"

if (!fs.existsSync(releaseFolder)) {
    fs.mkdirSync(releaseFolder);
}

async function increase() {
    const oldVersion = await iv.getVersionOfPackageJson("./package.json");

    iv.json("./package.json", {
        old: oldVersion,
        new: iv.changeVersion(oldVersion, iv.constants.type.MINOR)
    });

}

increase().then(() => {
    zip.pack({
        source: "./dist",
        destination: "./releases",
        name: "",
        info: true,
        includes: ""
    });
});
