/*************************************

解锁会员

**************************************

[rewrite_local]
^https?:\/\/(biz|wrapper|starplucker)\.(cyapi|caiyunapp)\.(cn|com)\/(.+\/(user\?app_name|activity\?app_name|visitors|operation\/banners|operation\/homefeatures|config)|p\/v\d\/(vip_info|user_info|entries|privileges|trial_card\/info)) url script-response-body https://raw.githubusercontent.com/ytywxw/quanx/main/JS/cytq/getVIP.js
^https?:\/\/(api|wrapper)\.(cyapi|caiyunapp)\.(cn|com)\/v\d\/(satellite|nafp\/origin_images) url script-request-header https://raw.githubusercontent.com/ytywxw/quanx/main/JS/cytq/getVIP.js

[mitm]
hostname = *.cyapi.cn, *.caiyunapp.com

*************************************/

const newBody = {};
const body = JSON.parse(typeof $response != "undefined" && $response.body || null);
const url = $request.url;
const adUrl = /(activity\?app_name|operation\/banners)/;
const tcUrl = /conditions/;
const vipUrl = /https:\/\/biz\.(cyapi\.cn|caiyunapp\.com)\/p\/v\d\/vip_info/;
const userUrl = /https:\/\/biz\.(cyapi\.cn|caiyunapp\.com)\/v\d\/user\?app_name/;
const syUrl = /trial_card\/info/;
const qyUrl = /entries/;
const peUrl = /privileges/;
const topUrl = /operation\/homefeatures/;
var expired = new Date().getTime() + 31536000;

if (typeof $response == "undefined") {
  newBody.headers = $request.headers;
  newBody.headers['device-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiNjViYzc1NzAwYTBkNTYwMDFiZmJkODhjIiwidXNlcl9pZCI6IjVmODNhMDY3MTk5NzZmMDAxNWEyNTRiNiIsInZlcnNpb24iOjIsImV4cCI6MTcwOTQ4MjAwMCwidmlwX2V4cGlyZWRfYXQiOjAsImlzcyI6IndlYXRoZXIiLCJpYXQiOjE3MDY4OTAwMDAsInN2aXBfZXhwaXJlZF9hdCI6MTcxNDMyMTgxMiwicHJpbWFyeSI6dHJ1ZX0.v41eOWgj4FmMMYLygupRLeE2hC8KW_HltSsdFk03oP4';
} else {
  switch (true) {
    case adUrl.test(url):
      body.status = "ok";
      body.activities = [{"items":[{}]}];
      body.data = [];
      break;
    case tcUrl.test(url):
      body.actions = [];
      body.popups = [];
      break;
    case vipUrl.test(url):
      body.vip = {  ...body.vip,
  "expires_time" : expired,  "is_auto_renewal" : true  };
      body.svip =  {  ...body.svip,  "expires_time" : expired,  "is_auto_renewal" : true  };
      body.show_upcoming_renewal = false;
      break;
    case userUrl.test(url):
      body.result = { ...body.result,  is_vip: true,  vip_expired_at: expired,  svip_given: 1,  is_xy_vip: true,  xy_svip_expire: expired,  wt: {  ...body.result.wt,  vip: {  ...body.result.wt.vip,  "expired_at" : 0,  "enabled" : true,  "svip_apple_expired_at" : expired,  "is_auto_renewal" : true,  "svip_expired_at" : expired    },    svip_given: 1,  },  is_phone_verified: true,  vip_take_effect: 1,  is_primary: true,  xy_vip_expire: expired,  svip_expired_at: expired,  svip_take_effect: 1,  vip_type: "s",  };
      break;
    case syUrl.test(url):
      body.receive_status = 0;
      body.vip_type = "svip";
      body.activated_at = 1712600671;
      body.vip_duration = "999";
      body.expired_at = expired;
      body.has_valid_card = 0;
      break;
    case peUrl.test(url):
      body["privileges"] = [{  "vip_type" : "svip",  "subscription_chat_quota" : 999  }];
      break;
    }
  newBody.body = JSON.stringify(body);
}

$done(newBody);