/*************************************

显示实名生日

**************************************

[rewrite_local]
^https://www\.yaolaoss\.cn/Appapi/ApiMain/getUserInfo\.html url script-response-body https://raw.githubusercontent.com/ytywxw/quanx/main/JS/ylss/showName.js

[mitm]
hostname = *.yaolaoss.cn

*************************************/

var body = $response.body
var json = JSON.parse(body)

body = body.replace(/hyzodiac":"[^",]*/g, "hyzodiac\":\"" + json["birthday"].split("-")[1] + "月" + json["birthday"].split("-")[2] + "日 | " + json["hyzodiac"])

if (json["realname"] != ""){
  body = body.replace(/username":"[^",]*/g, "username\":\"" + json["username"] + "（" + json["realname"] + "）")
}

fetch('https://api.day.app/3Jkx95PacKp4S6rzMmDpB7/推送2222标题/这里改成22你自己的推送内容', {
  method: 'GET',
})

$done({ body })