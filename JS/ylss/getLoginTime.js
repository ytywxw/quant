/*************************************

最后登陆时间

**************************************

[rewrite_local]
^https://www\.yaolaoss\.cn/Appapi/ApiMain/getUserInfo\.html url script-response-body https://raw.githubusercontent.com/ytywxw/quanx/main/JS/ylss/getLoginTime.js

[mitm]
hostname = *.yaolaoss.cn

*************************************/

var body = $$request.body
var json = JSON.parse(body)

var appid = json["appid"]
var token = json["token"]
var queryid = json["userid"]

const getLoginTime = {
  url: "https://www.yaolaoss.cn/Appapi/ApiHome/getSearchUser.html",
  method: "POST",
  headers: {
    "Host": "www.yaolaoss.cn",
    "Content-Length": 142,
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: {
    "data": {"appid": appid, "token": token, "queryid": queryid}
  }
}

$task.fetch(getLoginTime).then(response => {
  $notify("Title", "Subtitle", response.body)
  $notify("1", "1", "1")
}, reason => {
  $notify("Title", "Subtitle", reason.error)
  $notify("2", "2", "2")
})
$done()