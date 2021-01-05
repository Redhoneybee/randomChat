const user = {
    username: '',
    age: null,
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

const warringDatas = {
    type_error: {
        desc: 'you need to right arguments'
    },
    username_error: {
        desc: 'plz, your username is 16 or less and over 0'
    },
    age_error: {
        desc: 'plz, your age is only two digits number'
    }
};
const TYPE_ERROR = 'TYPE_ERROR';
const USERNAME_LENGTH_ERROR = 'USERNAME_LENGTH_ERROR';
const AGE_ERROR = 'AGE_ERROR';
const SUCCESS = 'SUCCESS';

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

function compareUsername(username) {
    if (username.length > 16 || username.length <= 0) {
        return false;
    }
    return true;
}
function compareAge(age) {
    if (!(/^\d\d$/.test(age)) && !(/^\d$/.test(age))) {
        return false;
    }
    if (age[0] === '0' && age[1] === '0') {
        return false;
    }
    return true;
}


function validateUser() {
    const { username, age, hashtags } = user;
    console.log(username, age, hashtags);

    if (username !== 'string' && age !== 'number' && !(hashtags instanceof Array)) {
        return TYPE_ERROR;
    } else if (!compareUsername(username)) {
        return USERNAME_LENGTH_ERROR;
    } else if (!compareAge(age)) {
        return AGE_ERROR;
    }

    return SUCCESS;
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

        drawFormData()
    }
}
function drawFormData() {
    if (user.username) {
        const usernameInput = document.querySelector('.info-form .textbox #user-input');

        if (user.username !== '') {
            usernameInput.parentNode.classList.add('visible');
            usernameInput.value = user.username;

        }

    }
    if (user.age) {
        const ageInput = document.querySelector('.info-form .textbox #age-input');

        if (user.age) {
            ageInput.parentNode.classList.add('visible');
            ageInput.value = user.age;
        }

    }

    const tagList = document.querySelector('.tag-list');
    let query = ``;
    user.hashtags.forEach((hashtag, i) => {
        query += `<li id = "tag-${i + 1}" class = "tag-items">
                    <span class = "text">${hashtag}</span>
                    <i class = "fas fa-times x-btn"></i>               
                    </li>`
    });

    tagList.innerHTML = query;
    tagList.addEventListener('click', removeTagEvent);

}


function saveLocalData() {
    const userString = JSON.stringify(user);

    localStorage.setItem('userdatas', userString);
}

function loadLocalData() {
    const loadUser = localStorage.getItem('userdatas');

    if (loadUser) {
        const p = JSON.parse(loadUser);

        user.username = p.username;
        user.age = p.age;
        user.hashtags = p.hashtags;

    } else {
        saveLocalData();
    }
    drawFormData();
}


function hanldeUserProfile() {
    const infoInputs = document.querySelectorAll('.info-form .textbox input');
    const tagInput = document.querySelector('.new-tag .tagbox input');


    function setHashtag(e) {
        const len = user.hashtags.length;
        const hashtag = e.target.value;
        if (hashtag !== '' && len < 5) {
            user.hashtags.push(hashtag);

            drawFormData();
        }
        e.target.value = '';
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
            const type = e.target.name;
            if (value === '') {
                textbox.classList.remove('visible');
                if (type === 'username' && !value) user.username = '';
                else if (type === 'age' && !value) user.age = null;
            } else {
                if (type === 'username') {
                    if (compareUsername(value)) {
                        user.username = value;
                    } else {
                        user.username = '';
                    }
                } else if (type === 'age') {
                    if (compareAge(value)) {
                        user.age = parseInt(value, 10);
                    } else {
                        user.age = null;
                    }
                }
                console.log(user.username, user.age);
            }
            saveLocalData();
        });
    });
    tagInput.addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
            setHashtag(e);
            saveLocalData();
        }
    });
    tagInput.addEventListener('blur', (e) => {
        setHashtag(e);
        saveLocalData();
    });

}

(function () {
    "use strict";
    const alert = document.querySelector('.modal.alert');
    const mask = document.querySelector('.mask');
    const modalWrap = document.querySelector('#popup');

    function drowAlert() {
        const title = document.querySelector('.alert-title');
        const text = document.querySelector('.alert-text');
        const btn = document.querySelectorAll('.alert-btn-box .btn');
        title.innerHTML = alertDatas.exitDuringMatch.title;
        text.innerHTML = alertDatas.exitDuringMatch.desc;
        btn[0].innerHTML = alertDatas.exitDuringMatch.yes;
        btn[1].innerHTML = alertDatas.exitDuringMatch.no;

        btn[0].addEventListener('click', () => {
            document.querySelector('#popup').classList.remove('visible');
            alert.classList.remove('visible');
            mask.style.zIndex = 'initial';
        });
        btn[1].addEventListener('click', () => {
            alert.classList.remove('visible');
            mask.style.zIndex = 'initial';
        });
    }


    setContentsSize();
    loadLocalData();
    hanldeUserProfile();

    document.querySelector('.chat-start-btn').addEventListener('click', () => {
        const sysCode = validateUser();
        let desc = '';
        if (sysCode === TYPE_ERROR) {
            desc += warringDatas.type_error.desc;
        } else if (sysCode === USERNAME_LENGTH_ERROR) {
            desc += warringDatas.username_error.desc;
        } else if (sysCode === AGE_ERROR) {
            desc += warringDatas.age_error.desc;
        }

        if (desc) {
            const warring = document.querySelector('#warring');
            const warring_desc = document.querySelector('#warring .warring-modal .warring-desc');
            console.log(warring);
            warring_desc.innerHTML = desc;
            warring.classList.add('visible');
            setTimeout(function () { warring.classList.remove('visible') }, 1000);
        } else {
            modalWrap.classList.add('visible');
            chatStart();
        }
    });

    document.querySelector('.chat-close').addEventListener('click', () => {

        mask.style.zIndex = 100;

        alert.classList.add('visible');

        drowAlert();

    });
})();