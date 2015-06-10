安装ruby

安装sass

第一步：移动默认的源
gem sources --remove https://rubygems.org/
第二步：指定淘宝的源
gem sources -a https://ruby.taobao.org/
第三步：查看指定的源是不是淘宝源
gem sources -l
返回结果如下：
*** CURRENT SOURCES ***
https://ruby.taobao.org
请确保只有 ruby.taobao.org。如果无误之后，执行下面的命令：
gem install sass


查测 Sass 及更新
通过上面的几种方法都可以安装 Sass，但是，我们要如何确认自己是否安装 Sass 成功了呢？其实很简单，只需要通过下面的命令即可：
sass -v
如果在你的命令终端能看到类似这样的信息就表示你的电脑安装 Sass 已成功。也就是说可以正常的使用 Sass 了。

更新 Sass
gem update sass

卸载（删除）Sass
gem uninstall sass

“.sass”只能使用 Sass 老语法规则（缩进规则），“.scss”使用的是 Sass 的新语法规则，也就是 SCSS 语法规则（类似 CSS 语法格式）。

单文件编译：
sass <要编译的Sass文件路径>/style.scss:<要输出CSS文件路径>/style.css
这是对一个单文件进行编译，如果想对整个项目所有 Sass 文件编译成 CSS 文件，可以这样操作：
多文件编译：
sass sass/:css/
上面的命令表示将项目中“sass”文件夹中所有“.scss”(“.sass”)文件编译成“.css”文件，并且将这些 CSS 文件都放在项目中“css”文件夹中。

sass --watch sass/bootstrap.scss:css/bootstrap.css
一旦我的 bootstrap.scss 文件有任何修改，只要我重新保存了修改的文件，命令终端就能监测，并重新编译出文件