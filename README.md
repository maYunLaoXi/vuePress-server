## 简单的静态网站服务器
在服务器端安装git 
```
git clone https://github.com/maYunLaoXi/vuePress-server.git
```
静态网页（blog)和项目放在同一个文件夹下

pm2 start app.js --watch

ok ，之后blog的内容用持续集成就可以了。（可以忘掉服务器的密码了）