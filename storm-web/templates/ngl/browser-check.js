function isWebview() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (userAgent.indexOf('FBAN') > -1 || userAgent.indexOf('FBAV') > -1 || userAgent.indexOf('Instagram') > -1) {
        return true;
    }

    if (userAgent.indexOf('wv') > -1 || (userAgent.indexOf('Android') > -1 && userAgent.indexOf('Chrome') > -1)) {
        return true;
    }

    if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('CriOS') === -1 && window.webkit) {
        return true;
    }

    return false;
}

function handleBrowserCheck() {
    if (isWebview()) {
        document.querySelector('.message-card').style.display = 'none';
        document.querySelector('.action-button').style.display = 'none';

        const popupWarning = document.createElement('div');
        popupWarning.classList.add('popup-warning');
        
        const openInBrowserLink = document.createElement('a');
        openInBrowserLink.href = window.location.href;
        openInBrowserLink.target = '_blank';
        openInBrowserLink.textContent = 'Use device default browser';

        popupWarning.appendChild(openInBrowserLink);
        document.body.appendChild(popupWarning);
    }
}

document.addEventListener('DOMContentLoaded', handleBrowserCheck);