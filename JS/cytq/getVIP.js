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

body = body.replace(/svip_expired_at":\d+/g, "expires_time\":" + expired)

$done(body)