/*************************************

最后登陆时间

**************************************

[rewrite_local]
^https://www\.yaolaoss\.cn/Appapi/ApiMain/getUserInfo\.html url script-response-body https://raw.githubusercontent.com/ytywxw/quanx/main/JS/ylss/getLoginTime.js

[mitm]
hostname = *.yaolaoss.cn

*************************************/

var body = $response.body
var json = JSON.parse(body)

$task.fetch({
  url: "https://qq.com"
}).then(response => {
  // response.statusCode, response.headers, response.body
  console.log($request.data);
  $notify("Title", "Subtitle", response.body); // Success!
})
$done()