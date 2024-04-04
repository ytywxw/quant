/*************************************

解锁会员

**************************************

[rewrite_local]
^https://www\.yaolaoss\.cn/Appapi/ApiMyself/getMyselfInfo\.html url script-response-body https://raw.githubusercontent.com/ytywxw/quanx/main/JS/ylss/getVIP.js

[mitm]
hostname = *.yaolaoss.cn

*************************************/

var body = $response.body
var json = JSON.parse(body)

body = body.replace(/userrank":"\d/g, "userrank\":\"3")

if (json["memberday"] != ""){
  year = parseInt(json["memberday"].split("-")[0]) + 10
  body = body.replace(/memberday":"\d+/g, "memberday\":\"" + year)
}

$done({ body })