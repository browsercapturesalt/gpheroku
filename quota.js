const { exec } = require("child_process");

function getOutput(command) {
  return new Promise((resolve) => {
    exec(command, (err, stdout, stderr) => {
      resolve(stdout);
    });
  });
}

function quota(tokenName) {
  return new Promise(async (resolve) => {
    process.env["HEROKU_API_KEY"] = process.env[tokenName];
    const apps = await getOutput("heroku apps");
    const firstApp = apps.split("\n")[1].split(" ")[0];
    const q = await getOutput(`heroku ps -a ${firstApp}`);
    const m = q.match(/Free dyno hours quota remaining this month: (.*)/);
    const name = tokenName.split("_")[2].padEnd(25, " ");
    const log = m ? name + m[1] : name + "could not get quota";

    resolve(log);
  });
}

function allQuotas() {
  return new Promise(async (resolve) => {
    let buff = "";
    for (const key of Object.keys(process.env).filter((key) =>
      key.match(/^HEROKU_TOKEN/)
    )) {
      const log = await quota(key);
      console.log(log);
      buff += log + "\n";
    }
    resolve(buff);
  });
}

allQuotas();

module.exports = {
  allQuotas,
};
