/*************************************

淘气兔每日签到

*************************************/

const myRequest = {
    url: "https://api-cdn.taoqitu.me/gateway/tqt/cn/user/sign",
    method: "GET",
    headers: {"Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDgyMiwic2Vzc2lvbiI6ImI3NDU2YzM5YzNhMmM0Nzk3ZTk0ZjliODkzMjEyODJjIn0.m6Ol2jwD7iDQj5K6jkoNmIU17Bu44pqXhZLJk_1nr-0"}
}

$task.fetch(myRequest).then(response => {
    var data = response.body
    var json = JSON.parse(data)
    if (json["total"] != undefined) {
        $notify("淘气兔", json["message"], "当前剩余签到流量：" + json["total"] + "GB")
    } else {
        $notify("淘气兔", json["message"])
    }
    $done()
}, reason => {
    $notify("淘气兔", "接口请求失败")
    $done()
})