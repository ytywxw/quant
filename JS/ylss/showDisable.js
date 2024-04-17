/*************************************

显示实名生日

**************************************

[rewrite_local]
^https://www\.yaolaoss\.cn/Appapi/ApiMain/getUserInfo\.html url script-response-body https://raw.githubusercontent.com/ytywxw/quanx/main/JS/ylss/showDisable.js

[mitm]
hostname = *.yaolaoss.cn

*************************************/

var body = $response.body
var json = JSON.parse(body)

if (json["enable"] != "1") {
  body = body.replace(/username":"[^",]*/g, "username\":\"" + "[已注销]" + json["username"])
  body = body.replace(/enable":"[^",]*/g, "enable\":\"1")
}

$done(body)
