const { exec } = require("child_process")

function getOutput(command){
    return new Promise(resolve=>{
        exec(command, (err, stdout, stderr)=>{
            resolve(stdout)
        })
    })
}

function quota(tokenName){
    return new Promise(async resolve => {
        process.env["HEROKU_API_KEY"] = process.env[tokenName]
        const apps = await getOutput("heroku apps")
        const firstApp = apps.split("\n")[1].split(" ")[0]
        const q = await getOutput(`heroku ps -a ${firstApp}`)
        const m = q.match(/Free dyno hours quota remaining this month: (.*)/)
        if(m){
            console.log(tokenName.split("_")[2].padEnd(25, " "), m[1])
        }else{
            console.log(tokenName, "could not get quota")
        }
        resolve()
    })
}

async function allQuotas(){
    for(const key of Object.keys(process.env).filter(key => key.match(/^HEROKU_TOKEN/))){
        await quota(key)
    }
}

allQuotas()