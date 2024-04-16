/*************************************

解锁会员

**************************************

[rewrite_local]
^https://biz\.cyapi\.cn/p/v1/vip_info url script-response-body https://raw.githubusercontent.com/ytywxw/quanx/main/JS/cytq/getVIP.js

[mitm]
hostname = *.cyapi.cn

*************************************/

var body = $response.body
var json = JSON.parse(body)
var expired = Math.floor((new Date().getTime() + 31536000000) / 1000);

body = body.replace(/expires_time":"\d+/g, "expires_time\":\"" + expired)

$done(body)