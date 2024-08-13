[rewrite_local]
# 115生活App 获取 Cookies
^https:\/\/webapi\.115\.com\/user\/signin.*$ url script-request-header 115_get_cookie.js

[mitm]
hostname = webapi.115.com
