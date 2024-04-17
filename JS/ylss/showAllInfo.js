/*************************************

完善详情页信息

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

if (json["enable"] != "1") {
  body = body.replace(/username":"[^",]*/g, "username\":\"" + "[已注销]" + json["username"])
  body = body.replace(/enable":"[^",]*/g, "enable\":\"1")
}

$done(body)
