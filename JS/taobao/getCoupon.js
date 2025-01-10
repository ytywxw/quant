/*************************************

查询优惠券

**************************************

[rewrite_local]
^https://trade-acs\.m\.taobao\.com/gw/mtop\.taobao\.detail\.data\.get url script-request-body https://raw.githubusercontent.com/ytywxw/quanx/main/JS/taobao/getCoupon.js

[mitm]
hostname = *.m.taobao.com

*************************************/

var path = $request.path
var id = path.match(/(?<=id%22%3A%22)[0-9]+(?=%22)/)
if (id) {
  $notify("淘宝", id[0])
} else {
  $notify("淘宝", '未查询到ID')
}
$done()