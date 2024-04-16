/*************************************

解锁会员

**************************************

[rewrite_local]
^https://biz\.cyapi\.cn/v2/user url script-response-body https://raw.githubusercontent.com/ytywxw/quanx/main/JS/cytq/getVIP.js

[mitm]
hostname = *.cyapi.cn

*************************************/

var body = $response.body
var json = JSON.parse(body)
var expired = Math.floor((new Date().getTime() + 31536000000) / 1000);

json["result"]["is_vip"] = true
json["result"]["vip_type"] = "s"
json["result"]["svip_given"] = 0
json["result"]["svip_expired_at"] = expired
json["result"]["wt"]["svip_expired_at"] = expired
body = JSON.stringify(json)

$done(body)