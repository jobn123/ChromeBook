安装完git后配置
 git config --global user.name "Your Name" //name
 git config --global user.email "email@example.com" //email

创建版本库
$ mkdir learngit
$ cd learngit
$ pwd
/Users/michael/learngit

$ git init //把这个目录变成Git可以管理的仓库：

把文件添加到版本库
git add readme.txt //告诉Git，把文件添加到仓库
$ git commit -m "wrote a readme file" //-m后面输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的

初始化一个Git仓库，使用git init命令。
添加文件到Git仓库，分两步：
第一步，使用命令git add <file>，注意，可反复多次使用，添加多个文件；
第二步，使用命令git commit，完成。

git status //掌握仓库当前的状态

$ git diff readme.txt //顾名思义就是查看difference

$git log //git log命令显示从最近到最远的提交日志，我们可以看到3次提交,如果嫌输出信息太多，加上 --pretty=oneline参数

Git必须知道当前版本是哪个版本，在Git中，用HEAD表示当前版本
上一个版本就是HEAD^，上上一个版本就是HEAD^^，
当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100

$git reset命令
git reset --hard HEAD^ //返回上一个版本
返回上一个版本后之前的最新的版本就会消失了，只要上面的命令行窗口还没有被关掉，你就可以顺着往上找啊找啊，
找到那个“append GPL”的commit id是3628164...，于是就可以指定回到未来的某个版本：
$ git reset --hard 3628164

Git提供了一个命令git reflog用来记录你的每一次命令

提交后，用git diff HEAD -- readme.txt命令可以查看工作区和版本库
每次修改，如果不add到暂存区，那就不会加入到commit中。

小结撤销回退：
场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。
场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，
第一步用命令git reset HEAD file，就回到了场景1，第二步按场景1操作。
场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库

远程仓库 连github
第1步：创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，
如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：
$ ssh-keygen -t rsa -C "youremail@example.com"
如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，
id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人

第2步：登陆GitHub，打开“Account settings”，“SSH Keys”页面：
然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容
点“Add Key”，你就应该看到已经添加的Key：

添加远程库
首先，登陆GitHub，然后，在右上角找到“Create a new repo”按钮，创建一个新的仓库：
在Repository name填入learngit，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库：
$ git remote add origin git@github.com:jobn123/learngit.git
添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的，但是origin这个名字一看就知道是远程库

下一步，就可以把本地库的所有内容推送到远程库上：
$ git push -u origin master
把本地库的内容推送到远程，用git push命令，实际上是把当前分支master推送到远程。

由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，
还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令
从现在起，只要本地作了提交，就可以通过命令：
$ git push origin master
要关联一个远程库，使用命令git remote add origin git@server-name:path/repo-name.git；
关联后，使用命令git push -u origin master第一次推送master分支的所有内容；
此后，每次本地提交后，只要有必要，就可以使用命令git push origin master推送最新修改；

从远程库克隆
git clone git@github.com:michaelliao/gitskills.git
要克隆一个仓库，首先必须知道仓库的地址，然后使用git clone命令克隆。
 Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快。

创建与合并分支
git checkout -b dev //git checkout命令加上-b参数表示创建并切换
/*
$ git branch dev
$ git checkout dev
*/
$ git branch //查看当前分支，git branch命令会列出所有分支，当前分支前面会标一个*号

$ git checkout master//dev分支的工作完成，我们就可以切换回master分支
$ git merge dev //把dev分支的工作成果合并到master分支上：
$ git branch -d dev //删除dev分支

/*查看分支：git branch

创建分支：git branch <name>

切换分支：git checkout <name>

创建+切换分支：git checkout -b <name>

合并某分支到当前分支：git merge <name>

删除分支：git branch -d <name>
*/

git 分支合并冲突
当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。
用git log --graph命令可以看到分支合并图
git status也可以告诉我们冲突的文件：

分支管理策略
合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，
而fast forward合并就看不出来曾经做过合并

Bug 分支
git stash //可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：
git stash list //命令看看
恢复一下，有两个办法：
一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；
另一种方式是用git stash pop，恢复的同时把stash内容也删了：

feature 管理
开发一个新feature，最好新建一个分支；
如果要丢弃一个没有被合并过的分支，可以通过git branch -D <name>强行删除。

多人协作
要查看远程库的信息，用git remote
$ git remote -v //显示更详细的信息：
推送分支
$ git push origin dev //dev 分支

因此，多人协作的工作模式通常是这样：
首先，可以试图用git push origin branch-name推送自己的修改；
如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
如果合并有冲突，则解决冲突，并在本地提交；
没有冲突或者解决掉冲突后，再用git push origin branch-name推送就能成功！
如果git pull提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream-to origin/branch-name branch-name 。

小结
查看远程库信息，使用git remote -v；
本地新建的分支如果不推送到远程，对其他人就是不可见的；
从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；
建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；
从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。

创建标签
命令git tag <name>用于新建一个标签，默认为HEAD，也可以指定一个commit id；
git tag -a <tagname> -m "blablabla..."可以指定标签信息；
git tag -s <tagname> -m "blablabla..."可以用PGP签名标签；
命令git tag可以查看所有标签。

操作标签
git tag -d v0.1 //删除
$ git push origin v1.0 //推送某个标签到远程，
$ git push origin --tags //一次性推送全部尚未推送到远程的本地标签：
如果标签已经推送到远程
1.先从本地删除：
$ git tag -d v0.9
2.从远程删除。删除命令也是push，但是格式如下：
$ git push origin :refs/tags/v0.9

命令git push origin <tagname>可以推送一个本地标签；
命令git push origin --tags可以推送全部未推送过的本地标签；
命令git tag -d <tagname>可以删除一个本地标签；
命令git push origin :refs/tags/<tagname>可以删除一个远程标签。

使用gitHub
在GitHub上，可以任意Fork开源仓库；
自己拥有Fork后的仓库的读写权限；
可以推送pull request给官方仓库来贡献代码。

自定义git

$ git config --global color.ui true //让Git显示颜色

忽略特殊文件
忽略文件的原则是：
忽略操作系统自动生成的文件，比如缩略图等；
忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的.class文件；
忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件
忽略某些文件时，需要编写.gitignore；
.gitignore文件本身要放到版本库里，并且可以对.gitignore做版本管理！

配置别名
$ git config --global alias.st status//，告诉Git，以后st就表示status：
//--global参数是全局参数，也就是这些命令在这台电脑的所有Git仓库下都有用。

配置文件
配置Git的时候，加上--global是针对当前用户起作用的，如果不加，那只针对当前的仓库起作用。
 配置文件放哪了？每个仓库的Git配置文件都放在.git/config文件中：
 别名就在[alias]后面，要删除别名，直接把对应的行删掉即可。
 而当前用户的Git配置文件放在用户主目录下的一个隐藏文件.gitconfig中
 配置别名也可以直接修改这个文件，如果改错了，可以删掉文件重新通过命令配置。

 搭建Git服务器
 http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137583770360579bc4b458f044ce7afed3df579123eca000
 