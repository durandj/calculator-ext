chrome.browserAction.onClicked.addListener(() => {
    chrome.windows.create(
        {
            type: 'popup',
            url: './index.html',
        },
    );
});
