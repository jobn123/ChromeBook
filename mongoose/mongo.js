win7 安装mongoose
1.下载mongodb，解压
2.新建路径，如D:\mongodb，将解压出来的bin目录复制到该目录下
3.在D:\mongodb目录下在新建data目录，在data目录下新建两个目录：db和log。
4.打开命令行，进入目录D:\mongodb\bin；输入mongod.exe --dbpath D:/mongodb/data/db，
  可能会提示“waiting for connections on port 27017”时，到浏览器中输入地址“localhost:27017”，ok！ 
  回到doc窗口。可能会看到“admin web console waiting for connections on port 28017 ”，
  再回到浏览器。输入“localhost:28017”，ok！

5.打开另外一个dos窗口，进入到d:\mongodb\data\db目录，执行命令mongo    ok




    


