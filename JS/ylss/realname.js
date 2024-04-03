/*************************************

显示实名生日

**************************************

[rewrite_local]
^https://www\.yaolaoss\.cn/Appapi/ApiMain/getUserInfo\.html url script-response-body https://raw.githubusercontent.com/ytywxw/quanx/main/JS/ylss/realname.js

[mitm]
hostname = *.yaolaoss.cn

*************************************/

var body = $response.body
var json = JSON.parse(body)

body = body.replace(/hyzodiac":"\S*","hyonlychild/g, "hyzodiac\":\"" + json["birthday"].split("-")[1] + "月" + json["birthday"].split("-")[2] + "日" + "\",\"hyonlychild")

if (json["realname"] != ""){
  body = body.replace(/username":"\S*","realname/g, "username\":\"" + json["username"] + "(" + json["realname"] + ")" + "\",\"realname")
}

$done({ body })