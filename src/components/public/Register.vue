<template>
    <ManageNavbar></ManageNavbar>
    <div style="display: flex; justify-content: center">
        <div class="modal-content" style="width: 20%; margin-top: 5%;">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="registerModalLabel">註冊您的 TutorLink 帳戶</h1>
            </div>
            <br>
            <div>
                <div class="modal-body">
                    <div style=" min-width: 100%;">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="name"
                                @blur="checknameinput()" autocomplete="off" oncopy="return false" onpaste="return false"
                                oncut="return false" oncontextmenu="return false">
                            <label for="floatingInput">姓名</label>
                            <div v-if="namewaring" class="warning-text">請輸入姓名</div>
                        </div>
                    </div>
                    <div style="min-width: 100%;">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="mail"
                                @blur="checkmailinput()">
                            <label for="floatingInput">信箱</label>
                            <div v-if="mailwaring" class="warning-text">請輸入電子郵件</div>
                            <div v-if="mailcheck" class="warning-text">信箱格式錯誤，請確認</div>
                            <div v-if="mailsuccess" class="success-text">帳號可以使用</div>
                            <div v-if="mailerror" class="warning-text">帳號已被使用，請重新填寫或登入</div>
                        </div>
                    </div>
                    <div style="min-width: 100%;">
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="floatingInput" placeholder="" v-model="pwd"
                                @blur="checkpwdinput()" autocomplete="off" oncopy="return false" onpaste="return false"
                                oncut="return false" oncontextmenu="return false">
                            <label for="floatingInput">密碼</label>
                            <div v-if="pwdwaring" class="warning-text">密碼不能為空</div>
                            <div v-if="pwdcheck" class="warning-text">密碼須包含大小寫及8~12個字元，不含特殊符號</div>
                        </div>
                    </div>
                    <div style="min-width: 100%;">
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="floatingInput" placeholder=""
                                v-model="doublepwd" @blur="doublecheck()" autocomplete="off" oncopy="return false"
                                onpaste="return false" oncut="return false" oncontextmenu="return false">
                            <label for="floatingInput">確認密碼</label>
                            <div v-if="pwddoublewaring" class="warning-text">密碼不能為空</div>
                            <div v-if="pwddoublecheckerror" class="warning-text">兩組密碼不相同，請重新輸入</div>
                            <div v-if="pwddoublechecksucess" class="success-text">密碼相同，請繼續</div>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: center;">
                        <button class="btn bar" type="button" @click="normalregister">註冊</button>
                    </div>
                    <div style="display: flex;align-items: center;margin:0 auto;padding-bottom:10px;">
                        <div class="caption-text">已擁有帳號嗎?&emsp;</div>
                        <a type="button" class="caption-text" href="http://localhost:5173/login"
                            style="color: rgb(23, 46, 110);">登入</a>
                    </div>
                    <div class="line-text-box">
                        <hr>
                        <div class="caption-text">&emsp; 使用其他帳號輕鬆註冊&emsp; </div>
                        <hr>
                    </div>
                    <div class="thirdlogin">
                        <GoogleRegister data-bs-dismiss="modal">使用Google帳號註冊</GoogleRegister>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import tutorlink from '@/api/tutorlink.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import GoogleRegister from '../login/googleregiter.vue'
import ManageNavbar from "@/components/public/ManageNavbar.vue"
const router = useRouter()


// ---- function ----


// 驗證mail格式方法
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

// 非同步請求驗證信箱方法
function checkmail(mail) {
    console.log('格式驗證正確，請求後端驗證')
    const API_URL = `/checkmail`
    tutorlink.post(API_URL, { mail: mail }).then((response) => {
        if (response.data == true) {
            mailsuccess.value = true
            mailerror.value = false
        } else if (response.data == false) {
            mailerror.value = true
            mailsuccess.value = false
        }
    })
}

// 註冊請求方法

function initialization() {
    namewaring.value = false
    mailwaring.value = false
    pwdwaring.value = false
    mailcheck.value = false
    mailsuccess.value = false
    mailerror.value = false
    mailsuccess.value = false
    pwddoublecheckerror.value = false
    pwddoublewaring.value = false
    pwddoublechecksucess.value = false
}

// ---- 全域變數 ----

// 驗證姓名，搭配v-if決定是否顯示div
const namewaring = ref(false)

// 驗證信箱，搭配v-if決定是否顯示div
const mailwaring = ref(false)
const mailcheck = ref(false)
const mailerror = ref(false)
const mailsuccess = ref(false)

// 驗證密碼，搭配v-if決定是否顯示div
const pwdwaring = ref(false)
const pwdcheck = ref(false)
const pwddoublewaring = ref(false)
const pwddoublecheckerror = ref(false)
const pwddoublechecksucess = ref(false)

// 欄位抓值用
const name = ref('')
const mail = ref('')
const pwd = ref('')
const doublepwd = ref('')



// 註冊請求方法
const normalregister = () => {
    const API_URL = `/normalregister`
    const register = {
        name: name.value,
        mail: mail.value,
        pwd: pwd.value
    }
    tutorlink.post(API_URL, register).then(response => {
        if (response.data == '註冊成功') {
            alert('註冊成功，請登入')
            router.replace({ path: '/' })
        } else if (response.data == '註冊失敗') {
            alert('註冊失敗，請重新註冊')
        }
    })
}
// 驗證姓名判斷式
function checknameinput() {
    console.log('觸發方法')
    name.value == '' ? namewaring.value = true : namewaring.value = false
}

// 驗證信箱判斷式，會即時與server端請求驗證信箱是否重複
function checkmailinput() {
    mail.value == '' ? (mailwaring.value = true, mailcheck.value = false) : (isValidEmail(mail.value) ? (mailcheck.value = false, checkmail(mail.value)) : mailcheck.value = true, mailwaring.value = false, mailsuccess.value = false)
}

// 驗證密碼判斷式
function checkpwdinput() {
    pwd.value == '' ? (pwdwaring.value = true, pwdcheck.value = false) : ((pwd.value.length >= 8 && pwd.value.length <= 12) ? (pwdcheck.value = false, pwdwaring.value = false) : (pwdwaring.value = false, pwdcheck.value = true))
}

// 驗證密碼二次判斷式
function doublecheck() {
    doublepwd.value == '' ? (pwddoublewaring.value = true, pwddoublecheckerror.value = false, pwddoublechecksucess.value = false) : (((pwd.value == doublepwd.value) ? (pwddoublecheckerror.value = false, pwdwaring.value = false, pwddoublechecksucess.value = true) : (pwddoublecheckerror.value = true, pwdwaring.value = false)), pwddoublewaring.value = false)
}

</script>
    
<style scoped>
button {
    font-weight: bold;
    margin: 5px 20px;
}

.warning-text {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}

.success-text {
    color: green;
    font-size: 12px;
    margin-top: 5px;
}


.thirdlogin {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    align-items: center
}

.modal-body {
    padding-bottom: 0px;
}

.modal-header {
    color: rgba(76, 87, 102, 0.6);
    font-weight: bold;
}


.caption-text {
    font-size: 14px;
    color: rgba(76, 87, 102, 0.6);
}

hr {
    display: block;
    /* unicode-bidi: isolate; */
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    margin-inline-start: auto;
    margin-inline-end: auto;
    overflow: hidden;
    border-style: inset;
    border-width: 1px;
}

.bar {
    min-width: 100%;
    background-color: #343a40;
    color: white;
}

.btn:hover {
    background-color: #51585e;
}

.line-text-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 16px 0 16px 0;
}

.line-text-box hr {
    height: 2px;
    border: none;
    background-color: #2f2f29;
    -webkit-box-flex: 1;
    -ms-flex: 1 1;
    flex: 1 1;
}
</style>