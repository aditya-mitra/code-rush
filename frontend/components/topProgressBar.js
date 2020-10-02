import Router from "next/router";
import NProgress from "nprogress";

let timer;
let status;
let activeRequests = 0;
const delay = 100;

function load() {
    if (status === "loading") {
        return;
    }

    status = "loading";

    timer = setTimeout(function () {
        NProgress.start();
    }, delay);
}

function stop() {
    if (activeRequests > 0) {
        return;
    }

    status = "stop";

    clearTimeout(timer);
    NProgress.done();
}

Router.events.on("routeChangeStart", load);
Router.events.on("routeChangeComplete", stop);
Router.events.on("routeChangeError", stop);

const originalFetch = window.fetch;
window.fetch = async function (...args) {
    if (activeRequests === 0) {
        load();
    }

    activeRequests++;

    try {
        const response = await originalFetch(...args);
        return response;
    } catch (error) {
        return Promise.reject(error);
    } finally {
        activeRequests -= 1;
        if (activeRequests === 0) {
            stop();
        }
    }
};

export default function topProgressBar () {
    return null;
}