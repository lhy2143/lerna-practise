const data = [
  "ucf.id",
  "ucf.api.logger.log",
  "ucf.api.logger.info",
  "ucf.api.logger.debug",
  "ucf.api.logger.warn",
  "ucf.api.logger.error",
  "ucf.api.logger.loggerPath",
  "ucf.api.logger.config",
  "ucf.api.logger.submitTo",
  "ucf.api.logger.forceUpload",
  "ucf.api.setQuitMode",
  "ucf.api.showMainWindow",
  "ucf.api.getMainWindow",
  "ucf.api.routerMap./.id",
  "ucf.api.routerMap./.home",
  "ucf.api.routerMap./.path",
  "ucf.api.routerMap./.options.titleBarStyle",
  "ucf.api.routerMap./.options.frame",
  "ucf.api.routerMap./.options.width",
  "ucf.api.routerMap./.options.height",
  "ucf.api.routerMap./.options.transparent",
  "ucf.api.routerMap./.options.title",
  "ucf.api.routerMap./.options.resizable",
  "ucf.api.routerMap./.options.maximizable",
  "ucf.api.routerMap./.options.show",
  "ucf.api.routerMap.home.id",
  "ucf.api.routerMap.home.home",
  "ucf.api.routerMap.home.path",
  "ucf.api.routerMap.home.options.titleBarStyle",
  "ucf.api.routerMap.home.options.frame",
  "ucf.api.routerMap.home.options.width",
  "ucf.api.routerMap.home.options.height",
  "ucf.api.routerMap.home.options.transparent",
  "ucf.api.routerMap.home.options.title",
  "ucf.api.routerMap.home.options.resizable",
  "ucf.api.routerMap.home.options.maximizable",
  "ucf.api.routerMap.home.options.show",
  "ucf.api.routerMap.newWindow.id",
  "ucf.api.routerMap.newWindow.path",
  "ucf.api.routerMap.newWindow.options.frame",
  "ucf.api.routerMap.newWindow.options.movable",
  "ucf.api.routerMap.newWindow.options.maximizable",
  "ucf.api.routerMap.newWindow.options.resizable",
  "ucf.api.routerMap.newWindow.options.mutipleTab",
  "ucf.api.route",
  "ucf.api.start",
  "ucf.api.bind",
  "ucf.api.navigate",
  "ucf.api.trigger",
  "ucf.api.windowManager",
  "ucf.api.initWindowManger",
  "ucf.api.worker.create",
  "ucf.api.fs.createStorageTo",
  "ucf.api.fs.readFile",
  "ucf.api.fs.readFileAsJSON",
  "ucf.api.fs.writeFile",
  "ucf.api.fs.access",
  "ucf.api.fs.rename",
  "ucf.api.fs.showItemInFolder",
  "ucf.api.fs.openPath",
  "ucf.api.net.fetch",
  "ucf.api.net.downloader",
  "ucf.api.net.download",
  "ucf.api.net.createWebsocket",
  "ucf.api.net.setProxy",
  "ucf.api.net.emptyProxy",
  "ucf.api.net.resolveProxy",
  "ucf.api.net.startNetCheck",
  "ucf.api.net.stopNetCheck",
  "ucf.api.storage._filePath",
  "ucf.api.storage._data.LOGIN_CONFIG",
  "ucf.api.storage._data.downloadList",
  "ucf.api.storage._data.globalStorage",
  "ucf.api.base.getBasePath",
  "ucf.api.applet.init",
  "ucf.api.applet.loadTemplate",
  "ucf.api.platform.uuid",
  "ucf.api.platform.relaunch",
  "ucf.api.platform.getPageGroupMap",
  "ucf.api.platform.getLanguage",
  "ucf.api.platform.setLanguage",
  "ucf.api.platform.onLanguageChange",
  "ucf.api.platform.getThemeInfo",
  "ucf.api.platform.setThemeInfo",
  "ucf.api.platform.onThemeChange",
  "ucf.api.platform.setZoomLevel",
  "ucf.api.platform.openPage",
  "ucf.api.platform.closePage",
  "ucf.api.platform.closeWindow",
  "ucf.api.platform.subscribe",
  "ucf.api.platform.publish",
  "ucf.api.platform.unSubscribe",
  "ucf.api.platform.showDialog",
  "ucf.api.platform.getWindowById",
  "ucf.api.platform.maxWindow",
  "ucf.api.platform.minWindow",
  "ucf.api.platform.nativeActions",
  "ucf.api.platform.handleNativeActions",
  "ucf.api.platform.createWindow",
  "ucf.api.webview.createView",
  "ucf.api.shortcuts.register",
  "ucf.api.shortcuts.registerAll",
  "ucf.api.shortcuts.isRegistered",
  "ucf.api.shortcuts.unregister",
  "ucf.api.shortcuts.unregisterAll",
  "ucf.api.session.userLogin",
  "ucf.api.session.userLogout",
  "ucf.api.session.lock",
  "ucf.api.session.unlock",
  "ucf.api.session.isLocked",
  "ucf.api.session.getUser",
  "ucf.api.session.onChange",
  "ucf.api.os.getSystemInfo",
  "ucf.api.os.getDiskInfo",
  "ucf.api.updater.check",
  "ucf.api.updater.clearCache",
  "ucf.api.updater.install",
  "ucf.api.updater.setFeed",
  "ucf.api.updater.setAutoDownload",
  "ucf.api.updater.downloadUpdate",
  "ucf.api.updater.getCurrentVersion",
  "ucf.api.updater.compareVersion",
  "ucf.api.updater.getDescJson",
  "ucf.api.system.pluginName",
  "ucf.api.system.getCpuUsage",
  "ucf.api.system.getMemoryUsage",
  "ucf.api.system.getCPUInfo",
  "ucf.api.system.getMemoryInfo",
  "ucf.api.system.getOSInfo",
  "ucf.api.system.install",
  "ucf.api.system.uninstall",
  "ucf.api.application.setAppName",
  "ucf.api.application.setAboutPanelOptions",
  "ucf.api.sa.init",
  "ucf.api.sa.login",
  "ucf.api.sa.setCommonProperties",
  "ucf.api.sa.track",
  "ucf.api.da.init",
  "ucf.api.da.login",
  "ucf.api.da.setCommonProperties",
  "ucf.api.da.track",
  "ucf.api.lifecycle._store._isDisposed",
  "ucf.api.lifecycle._onReady._options",
  "ucf.api.lifecycle._onReady._disposed",
  "ucf.api.lifecycle._onReady._event",
  "ucf.api.lifecycle._onReady._deliveryQueue",
  "ucf.api.lifecycle._onReady._listeners",
  "ucf.api.lifecycle.onReady",
  "ucf.api.lifecycle._onActivate._options",
  "ucf.api.lifecycle._onActivate._disposed",
  "ucf.api.lifecycle._onActivate._event",
  "ucf.api.lifecycle._onActivate._deliveryQueue",
  "ucf.api.lifecycle._onActivate._listeners",
  "ucf.api.lifecycle.onActivate",
  "ucf.api.lifecycle._onWindowAllClosed._options",
  "ucf.api.lifecycle._onWindowAllClosed._disposed",
  "ucf.api.lifecycle._onWindowAllClosed._event",
  "ucf.api.lifecycle._onWindowAllClosed._deliveryQueue",
  "ucf.api.lifecycle._onWindowAllClosed._listeners",
  "ucf.api.lifecycle.onWindowAllClosed",
  "ucf.api.lifecycle._onBeforeQuit._options",
  "ucf.api.lifecycle._onBeforeQuit._disposed",
  "ucf.api.lifecycle._onBeforeQuit._event",
  "ucf.api.lifecycle._onBeforeQuit._deliveryQueue",
  "ucf.api.lifecycle._onBeforeQuit._listeners",
  "ucf.api.lifecycle.onBeforeQuit",
  "ucf.channel.subscribe",
  "ucf.channel.unSubscribe",
  "ucf.channel.publish",
  "ucf.shortcuts.register",
  "ucf.shortcuts.unregister",
  "ucf.process.env.BRIDGE_PATH",
  "ucf.process.env.OS",
  "ucf.process.env.CPU.length",
  "ucf.process.env.CPU.arch",
  "ucf.process.env.CPU.model",
];

module.exports = { data };
