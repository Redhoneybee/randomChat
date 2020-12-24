const alertDatas = {
    exitDuringMatch: {
        title: "Matching Cancel",
        desc: "Really, give up the current matching?",
        yes: `<i class="fas fa-check"></i>`,
        no: `<i class="fas fa-times"></i>`
    },
    exitChat: {
        title: "Exit",
        desc: `What do you want to "re match" and "exit"`,
        yes: `<i class="fas fa-redo-alt"></i>`,
        no: `<i class="fas fa-sign-out-alt"></i>`
    }
};


function checkDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // moblie
        return true;
    }
    // other
    return false;
}

function setContentsSize() {
    const chatmodal = document.querySelector('#chat');
    const header = document.querySelector('.chat-header');
    const content = document.querySelector('.chat-content');
    const foot = document.querySelector('.chat-foot');

    const alertModal = document.querySelector('.modal.alert');
    const alertContent = document.querySelector('.alert-content');
    if (checkDevice()) {
        // is moblie
        const windowSizeX = window.innerWidth;
        const modalSize = windowSizeX + 'px';
        const alertSize = windowSizeX - 50 + 'px';
        chatmodal.style.maxWidth = modalSize;
        header.style.width = modalSize;
        content.style.width = modalSize;
        foot.style.width = modalSize;

        alertModal.style.maxWidth = alertSize;
        alertContent.style.width = alertSize;
    } else {
        // is pc
        const defaultSize = '700px';
        const defaultAlertSize = '360px';
        chatmodal.style.maxWidth = defaultSize;
        header.style.width = defaultSize;
        content.style.width = defaultSize;
        foot.style.width = defaultSize;

        alertModal.style.maxWidth = defaultAlertSize;
        alertContent.style.width = defaultAlertSize;
    }
}


(function () {
    "use strict";
    const alert = document.querySelector('.modal.alert');
    const mask = document.querySelector('.mask');
    const modalWrap = document.querySelector('.modal-wrap');

    function drowAlert() {
        const title = document.querySelector('.alert-title');
        const text = document.querySelector('.alert-text');
        const btn = document.querySelectorAll('.alert-btn-box .btn');
        title.innerHTML = alertDatas.exitDuringMatch.title;
        text.innerHTML = alertDatas.exitDuringMatch.desc;
        btn[0].innerHTML = alertDatas.exitDuringMatch.yes;
        btn[1].innerHTML = alertDatas.exitDuringMatch.no;

        btn[0].addEventListener('click', () => {
            document.querySelector('.modal-wrap').classList.remove('visible');
            alert.classList.remove('visible');
            mask.style.zIndex = 'initial';
        });
        btn[1].addEventListener('click', () => {
            alert.classList.remove('visible');
            mask.style.zIndex = 'initial';
        });
    }


    setContentsSize();

    document.querySelector('.start-btn').addEventListener('click', () => {
        modalWrap.classList.add('visible');
    });

    document.querySelector('.chat-close').addEventListener('click', () => {

        mask.style.zIndex = 100;

        alert.classList.add('visible');

        drowAlert();

    });
})();