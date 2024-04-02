/*************************************

显示实名

**************************************

[rewrite_local]
^https://www\.yaolaoss\.cn/Appapi/ApiMain/getUserInfo\.html url script-response-body https://raw.githubusercontent.com/ytywxw/quanx/main/JS/ylss/realname.js

[mitm]
hostname = *.yaolaoss.cn

*************************************/

var body = $response.body
var json = JSON.parse(body)

if (json["realname"] != ""){
  body = $response.body.replace(/username":"\S*","realname/g, "username\":\"" + "(" + json["realname"] + ")" + "\",\"realname")
}

$done({ body })