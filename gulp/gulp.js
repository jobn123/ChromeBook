安装gulp
npm install gulp -g 

查看gulp的版本号
gulp -v

将gulp安装到项目本地
npm install --save-dev gulp
--save-dev来更新package.json文件，更新devDependencies值，以表明项目需要依赖gulp。
Dependencies可以向其他参与项目的人指明项目在开发环境和生产环境中的node模块依懒关系

安装依赖
npm install gulp-jshint gulp-sass gulp-concat gulp-uglify gulp-rename --save-dev 

新建gulpfile文件
gulp只有五个方法： task，run，watch，src，和dest，在项目根目录新建一个js文件并命名为gulpfile.js

// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// 检查脚本
// Link任务会检查js/目录下得js文件有没有报错或警告。
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass
// Sass任务会编译scss/目录下的scss文件，并把编译完成的css文件保存到/css目录中。
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

// 合并，压缩文件
// scripts任务会合并js/目录下得所有得js文件并输出到dist/目录，
// 然后gulp会重命名、压缩合并的文件，也输出到dist/目录
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// 默认任务
// 使用.run()方法关联和运行我们上面定义的任务，
// 使用.watch()方法去监听指定目录的文件变化，当有文件变化时，
// 会运行回调定义的其他任务
gulp.task('default', function(){
    gulp.run('lint', 'sass', 'scripts');

    // 监听文件变化
    gulp.watch('./js/*.js', function(){
        gulp.run('lint', 'sass', 'scripts');
    });
});


运行gulp任务

gulp
这将执行定义的default任务，换言之，这和以下的命令式同一个意思

gulp default
当然，我们可以运行在gulpfile.js中定义的任意任务，比如，现在运行sass任务：

gulp sass