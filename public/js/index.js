const user = {
    username: 'null',
    age: -1,
    hashtags: []
};

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


function hanldeUserProfile() {
    const infoInputs = document.querySelectorAll('.info-form .textbox input');
    const tagInput = document.querySelector('.new-tag .tagbox input');
    function compareUsername(username) {
        if (username.length > 16) {
            return false;
        }
        return true;
    }
    function compareAge(age) {
        if (!(/^\d\d$/.test(age))) {
            return false;
        }
        if (age[0] === '0' && age[1] === '0') {
            return false;
        }
        return true;
    }


    function drawHashTag() {
        const tagList = document.querySelector('.tag-list');
        let query = ``;
        user.hashtags.forEach((hashtag, i) => {
            query += `<li id = "tag-${i + 1}" class = "tag-items">
                        <span class = "text">${hashtag}</span>
                        <i class = "fas fa-times x-btn"></i>               
                        </li>`
        });

        tagList.innerHTML = query;
    }

    function setHashtag(e) {
        e.stopPropagation();
        const len = user.hashtags.length;
        const hashtag = e.target.value;
        if (hashtag !== '' && len < 5) {
            user.hashtags.push(hashtag);

            drawHashTag();
        }
        e.target.value = '';
    }
    function removeTagEvent(e) {
        const target = e.target;
        let flag = false;
        target.classList.forEach(e => {
            if (e === 'x-btn') flag = true;
        });

        if (flag) {
            const tag = target.parentNode;

            const tagId = tag.getAttribute('id');
            const index = parseInt(tagId.slice(tagId.length - 1), 10) - 1;

            user.hashtags.splice(index, 1);

            drawHashTag()
        }
    }

    infoInputs.forEach(input => {
        console.log(input);
        input.addEventListener('focus', (e) => {
            const textbox = e.target.parentNode;
            textbox.classList.add('visible');
        });

        input.addEventListener('blur', (e) => {
            const textbox = e.target.parentNode;
            const value = e.target.value;

            // value is empty 
            if (value === '') {
                textbox.classList.remove('visible');
            } else {
                const type = e.target.name;
                if (type === 'username') {
                    if (compareUsername(value)) {
                        user.username = value;
                    }
                } else if (type === 'age') {
                    if (compareAge(value)) {
                        user.age = parseInt(value, 10);
                    }
                }
                console.log(user.username, user.age);
            }
        });
    });
    const tagList = document.querySelector('.tag-list');
    tagInput.addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
            setHashtag(e);
            tagList.addEventListener('click', removeTagEvent);
        }
    });
    tagInput.addEventListener('blur', (e) => {
        setHashtag(e);
        tagList.addEventListener('click', removeTagEvent);
    });

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
    hanldeUserProfile();
    document.querySelector('.chat-start-btn').addEventListener('click', () => {
        modalWrap.classList.add('visible');
        chatStart();
    });

    document.querySelector('.chat-close').addEventListener('click', () => {

        mask.style.zIndex = 100;

        alert.classList.add('visible');

        drowAlert();

    });
})();