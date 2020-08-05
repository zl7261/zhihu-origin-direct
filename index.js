// ==UserScript==
// @name         去除知乎安全中心。
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  屏蔽知乎安全中心，直接跳转链接地址。
// @author       zl7261
// @match        https://*.zhihu.com/*
// @grant        none
// @license      GPLv3
// ==/UserScript==

// forked from https://greasyfork.org/zh-CN/scripts/396857
// changelog:
// 2020-08-06：  improve performance
//               更新domApi 直接查询有href属性的a标签 使用observerApi而非监听scroll事件

(function () {
    'use strict';


    /// 地址类型
    /// https://link.zhihu.com/?target=http%3A//www.test.com

    /// 获取所以a标签
    /// 循环判断 a 标签是否包含两个 http 字样
    /// 截取最后一个 http 内容

    const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
            // each entry is an instance of ResizeObserverEntry
            getOriginHref();
        }
    })

    observer.observe(document.querySelector('body'))


    /// 获取正确的地址用于跳转
    function getOriginHref() {
        var zhihuPrefix = "link.zhihu.com"
        var documents = document.querySelectorAll('.ListShortcut a[href]');
        for (var i = 0; i < documents.length; i++) {
            if (documents[i].href.indexOf(zhihuPrefix) != -1) {
                documents[i].setAttribute("href", decodeURIComponent(documents[i].href.split("target=")[1]))
            }
        }
    }

})();
