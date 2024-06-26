const obsidian = require("obsidian")
const Module = require("module")
const internals = {}
/*
class APISettingsTab extends obsidian.PluginSettingTab {
    
}
*/

class ModulesAPI {
    constructor(r = require, m = globalThis.module) {
        this.require = r

        this.getSearchPaths = (dir = "{0}") => {
            const paths = Module._nodeModulePaths(dir)
            if (StringIsNullOrWhitespace(dir))
                return paths
            paths.push.apply(paths, m.paths)
            return paths.map(path => StringFormat(path, dir))
        }

        Object.defineProperties(this, {
            "paths": {
                get() {
                    this.getSearchPaths("")
                },
                set(dir) {
                    m.paths.push(dir)
                }
            },
            "cache": {
                get() {
                    return Module._cache
                }
            }
        })
    }
}

class APIPlugin extends obsidian.Plugin {
    async onload() {
        // await this.loadSettings()
        // this.addSettingTab(new APISettingsTab(this.app, this))
        // const { settings } = this
        internals.plugin = this

        Object.defineProperties(this, {
            "obsidian": {
                get() {
                    return this.module.require("obsidian")
                }
            },
            "electron": {
                get() {
                    return this.module.require("electron")
                }
            }
        })
        /*
        this.addCommand({
            id: "command-id",
            name: "command name"
            callback: cb
        })
        */
    }
    // onunload(){}
    // async loadSettings(){}
    // async saveSettings(){}

    ModulesAPI = ModulesAPI

    module = new ModulesAPI()
}

module.exports = APIPlugin