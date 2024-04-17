/*************************************

显示最后访问时间

**************************************

[rewrite_local]
^https://www\.yaolaoss\.cn/Appapi/ApiMain/getUserInfo\.html url script-response-body https://raw.githubusercontent.com/ytywxw/quanx/main/JS/ylss/showLoginTime.js

[mitm]
hostname = *.yaolaoss.cn

*************************************/
var aes = require("../common/aes.js")
const apiId = 100003
const apiKey = "zhapp_oslrifmkdl"
const apiSecret = "51a683bea5e5c138fd03"
var body = $response.body
var json = JSON.parse(body)

const userId = 144869

function wxEncrypt(e, t, a) {
  n = aes.CryptoJS.enc.Utf8.parse(e),
  o = aes.CryptoJS.enc.Utf8.parse(t),
  s = aes.CryptoJS.enc.Utf8.parse(a);
  return aes.CryptoJS.AES.encrypt(s, n, {
      iv: o,
      mode: aes.CryptoJS.mode.CBC,
      padding: aes.CryptoJS.pad.Pkcs7
  }).toString();
}

function getToken() {
  var e = apiId + "," + parseInt(new Date().getTime() / 1e3) + "," + userId,
  r = apiKey,
  n = apiSecret;
  return wxEncrypt(r, n, e);
}

const url = "https://www.yaolaoss.cn/Appapi/ApiHome/getSearchUser.html"
const headers = {
    "Host": "www.yaolaoss.cn",
    "Content-Length": 142,
    "Content-Type": "application/x-www-form-urlencoded"
}
const data = {
    "data": {"appid": apiId, "token": getToken, "queryid": userId}
}

const myRequest = {
    url: url,
    method: POST,
    headers: headers,
    body: JSON.stringify(data)
}

$notify("Title", "Subtitle", 111)
$task.fetch(myRequest).then(response => {
    console.log(response.body)
    $notify("Title", "Subtitle", 222)
    // $notify("Title", "Subtitle", response.body)
    $done()
}, reason => {
    $notify("Title", "Subtitle", 333)
    // $notify("Title", "Subtitle", reason.error)
    $done()
})
