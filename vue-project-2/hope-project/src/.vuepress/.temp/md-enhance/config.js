import { defineClientConfig } from "@vuepress/client";
import CodeTabs from "/Users/apple/fzhange/designPattrn_1/vue-project-2/hope-project/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeTabs.js";
import { hasGlobalComponent } from "/Users/apple/fzhange/designPattrn_1/vue-project-2/hope-project/node_modules/vuepress-shared/lib/client/index.js";
import { CodeGroup, CodeGroupItem } from "/Users/apple/fzhange/designPattrn_1/vue-project-2/hope-project/node_modules/vuepress-plugin-md-enhance/lib/client/compact/index.js";
import { useContainer } from "/Users/apple/fzhange/designPattrn_1/vue-project-2/hope-project/node_modules/vuepress-plugin-md-enhance/lib/client/composables/container.js";
import "/Users/apple/fzhange/designPattrn_1/vue-project-2/hope-project/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";
import CodeDemo from "/Users/apple/fzhange/designPattrn_1/vue-project-2/hope-project/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/Users/apple/fzhange/designPattrn_1/vue-project-2/hope-project/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";
import "/Users/apple/fzhange/designPattrn_1/vue-project-2/hope-project/node_modules/vuepress-plugin-md-enhance/lib/client/styles/figure.scss";
import Playground from "/Users/apple/fzhange/designPattrn_1/vue-project-2/hope-project/node_modules/vuepress-plugin-md-enhance/lib/client/components/Playground.js";
import Tabs from "/Users/apple/fzhange/designPattrn_1/vue-project-2/hope-project/node_modules/vuepress-plugin-md-enhance/lib/client/components/Tabs.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    if(!hasGlobalComponent("CodeGroup", app)) app.component("CodeGroup", CodeGroup);
    if(!hasGlobalComponent("CodeGroupItem", app)) app.component("CodeGroupItem", CodeGroupItem);
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
    app.component("Playground", Playground);
    app.component("Tabs", Tabs);
  },
  setup: () => {
useContainer();
  }
});
