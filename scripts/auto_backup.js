require("shelljs/global");
try {
  hexo.on("deployAfter", function () {
    //当deploy完成后执行备份
    backup();
  });
} catch (e) {
  console.log("产生了一个错误啊<(￣3￣)> !，错误详情为：" + e.toString());
}
function backup() {
  if (!which("git")) {
    echo("=================Sorry, this script requires git=================");
    exit(1);
  } else {
    echo(
      "==============================Auto Backup Begin=============================="
    );
    cd("D:/blog项目相关/hexoblog"); //此处修改为Hexo根目录路径
    if (exec("git add --all").code !== 0) {
      echo("=================Error: Git add failed=================");
      exit(1);
    }
    if (exec('git commit -am "blog auto backup script\'s commit"').code !== 0) {
      echo("=================Error: Git commit failed=================");
      exit(1);
    }
    if (exec("git push").code !== 0) {
      echo("=================Error: Git push failed=================");
      exit(1);
    }
    echo(
      "==============================Auto Backup Complete=============================="
    );
  }
}
