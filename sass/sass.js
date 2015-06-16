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

四种不同的输出风格

嵌套输出方式 nested
嵌套输出方式 expanded
嵌套输出方式 compact
压缩输出方式 compressed
在编译的时候带上参数“ --style nested”:
sass --watch test.scss:test.css --style nested

sass调试
只要你的浏览器支持“sourcemap”功能即可。早一点的版本，需要在编译的时候添加“--sourcemap”  参数：
sass --watch --scss --sourcemap style.scss:style.css

在 Sass3.3 版本之上（我测试使用的版本是 3.4.7），不需要添加这个参数也可以：
sass --watch style.scss:style.css

声明变量
声明变量的符号“$”
变量名称
赋予变量的值

$width: 200px

属性嵌套
Sass 中还提供属性嵌套，CSS 有一些属性前缀相同，只是后缀不一样，比如：border-top/border-right，
与这个类似的还有 margin、padding、font 等属性。假设你的样式中用到了：

.box {
    border-top: 1px solid red;
    border-bottom: 1px solid green;
}

在 Sass 中我们可以这样写：
.box {
  border: {
   top: 1px solid red;
   bottom: 1px solid green;
  }
}

嵌套-伪类嵌套
其实伪类嵌套和属性嵌套非常类似，只不过他需要借助`&`符号一起配合使用

.clearfix{
&:before,
&:after {
    content:"";
    display: table;
  }
&:after {
    clear:both;
    overflow: hidden;
  }
}

编译后的css
clearfix:before, .clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
  overflow: hidden;
}

混合宏

1、声明混合宏
不带参数混合宏：
在 Sass 中，使用“@mixin”来声明一个混合宏。如：
@mixin border-radius{
    -webkit-border-radius: 5px;
    border-radius: 5px;
}

带参数混合宏：
除了声明一个不带参数的混合宏之外，还可以在定义混合宏时带有参数，如：
@mixin border-radius($radius:5px){
    -webkit-border-radius: $radius;
    border-radius: $radius;
}

复杂的混合宏：
上面是一个简单的定义混合宏的方法，当然， Sass 中的混合宏还提供更为复杂的，你可以在大括号里面写上带有逻辑关系，
帮助更好的做你想做的事情,如：
@mixin box-shadow($shadow...) {
  @if length($shadow) >= 1 {
    @include prefixer(box-shadow, $shadow);
  } @else{
    $shadow:0 0 4px rgba(0,0,0,.3);
    @include prefixer(box-shadow, $shadow);
  }
}

-调用混合宏
“@include”来调用声明好的混合宏。
例
@mixin border-radius{
    -webkit-border-radius: 3px;
    border-radius: 3px;
}
在一个按钮中要调用定义好的混合宏“border-radius”，可以这样使用：
button {
    @include border-radius;
}

混合宏的参数--传一个不带值的参数
@mixin border-radius($radius){
  -webkit-border-radius: $radius;
  border-radius: $radius;
}
在混合宏“border-radius”中定义了一个不带任何值的参数“$radius”。
在调用的时候可以给这个混合宏传一个参数值：
.box {
  @include border-radius(3px);
}

混合宏的参数--传多个参数
@mixin center($width,$height){
  width: $width;
  height: $height;
  margin-top: -($height) / 2;
  margin-left: -($width) / 2;
}

扩展/继承
@extend”来继承已存在的类样式块，
.btn {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
  @extend .btn;
}

占位符 %placeholder
他可以取代以前 CSS 中的基类造成的代码冗余的情形。因为 %placeholder 声明的代码，如果不被 @extend 调用的话，
不会产生任何代码。
%mt5 {
  margin-top: 5px;
}
%pt5{
  padding-top: 5px;
}

如果你的代码块中涉及到变量，建议使用混合宏来创建相同的代码块。
如果你的代码块不需要专任何变量参数，而且有一个基类已在文件中存在，那么建议使用 Sass 的继承

插值#{}

$properties: (margin, padding);
@mixin set-value($side, $value) {
    @each $prop in $properties {
        #{$prop}-#{$side}: $value;
    }
}
.login-box {
    @include set-value(top, 14px);
}

注释
1、类似 CSS 的注释方式，使用 ”/* ”开头，结属使用 ”*/ ” 编译后显示

2、类似 JavaScript 的注释方式，使用“//”  编译后不显示