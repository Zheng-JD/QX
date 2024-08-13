[rewrite_local]
# 获取115生活app账号Cookies
^https:\/\/.*\.115\.com\/.* path 115_get_cookies.js

[mitm]
hostname = *.115.com
