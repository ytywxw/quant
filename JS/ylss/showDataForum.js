/*************************************

显示论坛生日

**************************************

[rewrite_local]
^https://www\.yaolaoss\.cn/Appapi/ApiForum/getForumList\.html url script-response-body https://raw.githubusercontent.com/ytywxw/quanx/main/JS/ylss/showDataForum.js

[mitm]
hostname = *.yaolaoss.cn

*************************************/

var body = $response.body
var json = JSON.parse(body)
var newBody = []

for (let index = 0; index < json.length; index++) {
  const element = json[index]
  element = element.replace(/CityName":"[^",]*/g, "CityName\":\"" + element["Birthday"].split("-")[1] + "月" + element["birthday"].split("-")[2] + "日 · " + element["CityName"]) 
  newBody[index] = element
}

$done(newBody)
