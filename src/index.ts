import {app} from "./app";
import {SETTINGS} from "./settings";
import {runDB} from "./db/mongodb";

async function start() {
    await runDB(SETTINGS.DB.URL).then();
    app.listen(SETTINGS.PORT, () => {
        console.log(`Server started on port ${SETTINGS.PORT}`);
    })
}

start().then()

