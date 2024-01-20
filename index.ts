import { Cmd } from "@/libs/cmd";

const cmdHandler = new Cmd('dailyhn', '');
cmdHandler.setDefaultHandler(() => {
    console.log('hello from dailyhn');
})
cmdHandler.run();