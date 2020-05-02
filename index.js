const superagent = require("superagent");
const pMap = require("p-map");
const fs = require("fs-extra");
const { join, parse } = require("path");
const { pipeline } = require("stream");
const { promisify } = require("util");
const nanomemoize = require("nano-memoize");

const pipe = promisify(pipeline);

const mainUrl = "https://twitch-logs.johnpyp.com";
const twitchLogsPath = "twitch-logs";

const memoEnsureDir = nanomemoize((p) => fs.ensureDir(p));
const buildProcessLog = (prefix) => async (path) => {
  const fullPath = join(twitchLogsPath, path);
  if (!(await fs.pathExists(fullPath))) {
    const fullUrl = mainUrl + prefix + path;
    const tmpPath = `${fullPath}.tmp`;
    await memoEnsureDir(parse(fullPath).dir);
    const writeStream = fs.createWriteStream(tmpPath);
    await pipe(superagent.get(fullUrl), writeStream);
    await fs.move(tmpPath, fullPath);
    console.log(fullUrl);
  }
};
async function main() {
  const { body } = await superagent.get(`${mainUrl}/list-logs`);
  await pMap(body.data.paths, buildProcessLog(body.data.urlPrefix), {
    concurrency: 100,
  });
  // await processChannel("Destinygg");
}

main();
