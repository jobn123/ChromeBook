数据库分类：
1.SQL数据库(实时一致性，事务，多表联合查询)：Oracle, Mysql
2.NoSQL数据库（简单便捷，方便扩展，更好的性能）：Redis, MongoDB

MongoDB
1.无数据结构限制，无需事先定义表结构
2.完全索引支持,单键索引，数组索引，全文索引，地理位置索引
3.方便的冗余与扩展，分片扩展数据规模
4.良好的支持

Shell 客户端操作：
show dbs:查看当前存在的数据库
use:切换数据库
db.dropDatabase()：删除数据库
remove:删除数据，一个参数（必须，否则会报错）：条件，默认删除所有符合条件的数据。
count:查找数据的条数
use imooc:如果数据库不存在，自动创建
db.imooc_collection.insert({x:1}):插入数据
show collections:查看表
db.imooc_collection.find():查询数据
for(i=3;i<100;i++)db.imooc_collection.insert({x:i}):插入97条数据
db.imooc_collection.find().count():进行计数
db.imooc_collection.find().skip(3).limit(2).sort({x:1})
skip(3):过滤调前三条数据
limit(2):限制返回的条数
sort({x:1}):使用x排序 //1为正序，-1为负排序

mongoDB：update方法有四个参数
第一个参数：查找数据的条件，如{c:1} 表示查找c为1的数据
第二个参数：要更新的数据，如{c:2} 跟新符合条件的数据c为2，默认只更新第一个符合条件的数据。
第三个参数：boolean类型，更新数据不存在时是否创建一条数据，默认为false,设置为true时，自动创建数据。
第四个参数：boolean类型，跟新数据时是否更新所有符合条件的数据，默认为false,只跟新一条符合条件的数据，设置为true时，更新所有符合条件的数据。
如db.collection.update({c:1},{$set{c:2}},false,true)

db.collection.update 有两个参数，一个是匹配，一个是更新后数据。
要要更新局部时候，用$set。如：
db.collection.insert({x:100,y:100,z:100})
更新z为999
db.collection.update({z:100},{$set:{z:999}})

db.myCollection.update(conditionJsonObject,newValueJsonObject,booleanFlag)
booleanFlag=true表示，如果更新的记录不存在，则新插入一条，如
db.myCollection.update({y:100},{y:999},true),表示将y=100的记录更新为y=999,如果不存在y=100的记录，则新插入一条y=999的一条记录

db.test.getIndexes() 获得test集合中的所有索引
db.test.ensureIndex({x:1});为test集合新增x字段索引，1：代表升序，-1：代表降序。
如何数据来那个非常大，几千万条或者上亿条时，不建立索引，查询时可能不会返回结果。
数据量非常大时，创建索引会消耗一定的事件。
创建索引会减慢数据写入速度，但会大幅度增加数据查询速度

索引的种类
1._id索引
2.单键索引
3.多键索引
4.复合索引
5.过期索引
6.全文索引
7.地理位置索引

单键索引：
1.单键索引是最普通的索引
2.与_id索引不同，单键索引不会自动创建
如：一条记录，形式为：{x:1,y:2,z:3}
db.imooc_2.getIndexes()//查看索引
db.imooc_2.ensureIndex({x:1})//创建索引，索引可以重复创建，若创建已经存在的索引，则会直接返回成功。
db.imooc_2.find()//查看数据

多键索引：
1.多键索引与单键索引创建形式相同，区别在于字段的值。
1）单键索引：值为一个单一的值，如字符串，数字或日期。
2）多键索引：值具有多个记录，如数组。
db.imooc_2.insert({x:[1,2,3,4,5]})//插入一条数组数据

复合索引：
1.当我们的查询条件不止一个时，就需要建立复合索引
插入{x:1,y:2,z:3} 按照x 与 y的值查询
创建索引 db.collection.ensureIndex({x:1,y:1})
使用x:1,y:1作为查询条件

过期索引：
可减少客户端的开发
索引过期后数据被删除
expireAfterSeconds:10 //指定过期索引的过期时间，单位：秒
建立方法
db.collection.ensureIndex({time:1},{expireAfterSeconds:10})
过期索引的限制：
1.存储在过期索引的值必须是指定是我时间类型
2.如果指定了ISODate数组，则按照最小的时间进行删除
3.过期索引不能是复合索引
4.删除时间不是精确（删除过程由后台程序没60s跑一次，而且删除也需要一些时间，所以存在误差）

全文索引创建方法： 与创建单键索引，复合索引类似。value换成'text'，$**匹配集合下所有
db.articles.ensureIndex({key:"text"})
db.articles.ensureIndex({key_1:"text"},{key_2:"text"})
db.articles.ensureIndex({"$**":"text"})

如何使用全文索引查询：
db.articles.find({$text:{$search:"coffee"}})
db.articles.find({$text:{$search:"aa bb cc"}}) 包含aa或bb或cc的数据
db.articles.find({$text:{$search:"aa bb -cc"}}) 同时包含aa、bb且不包含cc的数据
db.articles.find({$text:{$search:"\"aa\" \"bb\" \"cc\""}})同时包含aa、bb、cc的数据(用“”包裹起来，引号需要用反斜杠转义)

全文索引相似度,并用sort排序：
$meta操作符：{score:{$meta:"textScore"}}
db.imooc_2.find({$text:{$search:"aa bb"}},{score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}})

全局索引的限制：
1. 每次查询，只能指定一个$text查询
2. $text查询不能出现在$nor查询中
3. 查询中如果包含了$text, hint不再起作用
4. MongoDB全文索引还不支持中文

索引属性
名字					db.collection.ensureIndex({},{name:" "})
唯一性				db.collection.ensureIndex({},{uniquw: true/false})
稀疏性				db.collection.ensureIndex({},{sparse:true/false})
是否定时删除

好处： 不必为不存在的字段创建索引
减少磁盘占用，增大插入速度
查找只存在字段的记录

.hint强制使用索引

地理位置索引
将一些点的位置存入mongo中，创建索引后可以按照位置查找

2d: 索引， 储存查找平面上的点
2dsphere 存储和查找球面上的点

创建方式：db.collection.ensureIndex({w: "2d"})
位置表示方式：经纬度【经度、纬度】
取值范围： 经度[-180,180] 纬度[-90,90]
查询方式：
1） $near查询：查询距离某个点最近的点
2） $geoWithin： 查询某个形状内的点

$near 查询最近的100个点， 可以使用$maxDistance控制返回个数
db.collection.find({W:$near[1,1]})

$geowithin 图形查询方式使用
1$box 矩形，使用
{$box[[x1,y1][x2,y2]]}
2$center圆形
{$center:[[x,y],r]}
3$polygon： 多边形
{$polygon:[[x1,y1],[x2,y2],[x3,y3]]}
db.location.find({w:{$geowithin:{$polygon：[0,0],[5,0],[8,0]}}})