import { renderArticle } from "@/commands";
import { Cmd } from "@/libs/cmd";

const cmdHandler = new Cmd('dailyhn', '');
cmdHandler.setDefaultHandler(renderArticle)
cmdHandler.run();