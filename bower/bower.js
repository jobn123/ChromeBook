安装
npm install bower -g

查看Bower是否安装成功。
bower help

# 更新
npm update -g bower

# 卸载
npm uninstall --global bower

项目初始化 
bower init
会自动生成bower.json文件
有了bower.json文件以后，就可以用bower install命令，一下子安装所有库。

向Bower.com提交你的库
bower register <my-package-name> <git-endpoint>

实例：在 bower.com 登记jquery
bower register jquery git://github.com/jquery/jquery
如果你的库与现有的库重名，就会提交失败。

库的安装
bower install 库的名字

手动指定网址
$ bower install git://github.com/documentcloud/backbone.git
$ bower install http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js
$ bower install ./some/path/relative/to/this/directory/backbone.js
指定的网址可以是github地址、http网址、本地文件。

库的搜索和查看
bower search jquery

bower info命令用于查看某个库的详细信息。
bower info jquery-ui

库的更新和卸载
bower update jquery-ui
如果不给出库名，则更新所有库。
bower update

bower uninstall命令用于卸载指定的库
$ bower uninstall jquery-ui

列出所有库
bower list或bower ls命令，用于列出项目所使用的所有库。

配置文件.bowerrc
它大概像下面这样。
{
  "directory" : "components",
  "json"      : "bower.json",
  "endpoint"  : "https://Bower.herokuapp.com",
  "searchpath"  : "",
  "shorthand_resolver" : ""
}

其中的属性含义如下。

directory：存放库文件的子目录名。
json：描述各个库的json文件名。
endpoint：在线索引的网址，用来搜索各种库。
searchpath：一个数组，储存备选的在线索引网址。如果某个库在endpoint中找不到，则继续搜索该属性指定的网址，通常用于放置某些不公开的库。
shorthand_resolver：定义各个库名称简写形式。
