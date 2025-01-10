/*************************************

查询优惠券

**************************************

[rewrite_local]
^https://trade-acs\.m\.taobao\.com/gw/mtop\.taobao\.detail\.data\.get url script-request-body https://raw.githubusercontent.com/ytywxw/quanx/main/JS/taobao/getCoupon.js

[mitm]
hostname = *.m.taobao.com

*************************************/

var body = $request.body
// var json = JSON.parse(body)

// body = body.replace(/userrank":"\d/g, "userrank\":\"3")

// if (json["memberday"] != ""){
//   year = parseInt(json["memberday"].split("-")[0]) + 10
//   body = body.replace(/memberday":"\d+/g, "memberday\":\"" + year)
// }

$notify("淘宝", body)
$done()