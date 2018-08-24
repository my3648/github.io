
$(function(){
    var currentPage=1;
    var pageSize=100;
    var key=getSearch("key");
    $('.search_input').val(key);
    render();



    function render(){
        $('.lt_product').html("<div class='loading'></div>");
        var parmas={};
        parmas.proName=$('.search_input').val();
        parmas.page=currentPage;
        parmas.pageSize=pageSize;
         // 价格: price    1升序，2降序
        // 库存: num      1升序，2降序
        var $current=$('.lt_sort a.current');
        if($current.length>0){
            var sortName=$current.data('type');
            var sortValue=$current.find("i").hasClass("fa-angle-down")?2:1;
            parmas[sortName]=sortValue;
        }

        setTimeout(function(){
            $.ajax({
                type:"get",
                url:"/product/queryProduct",
                dataType:"json",
                data:parmas,
                success:function(info){
                    console.log(info);
                    var htmlStr=template("productTpl",info);
                    $('.lt_product').html(htmlStr);
                    
                }
            }); 
        },500)
        

    }

    // 点击搜索按钮，实现搜索 并将搜索关键字存储到本地
    $('.search_btn').click(function(){
        // 不为空
        var key=$('.search_input').val().trim();
        if(key===""){
            mui.toast("请输入关键字",{
                duration:2000
            });
            return;
        }
        render();


        // 删除重复的
        var history=localStorage.getItem('search_list')||'[]';
        var arr=JSON.parse(history);

        var index=arr.indexOf(key);
        if(index!=-1){
            arr.splice(index,1);
        }
        // 如果长度大于10，删除最后一项 
        // 将关键字追加到arr前面
        if(arr.lenth>10){
            arr.pop();
        }

        arr.unshift(key);
        localStorage.setItem('search_list',JSON.stringify(arr));

    });

     // 功能3: 排序功能
  // 通过属性选择器给价格和库存添加点击事件
  // (1) 如果自己有 current 类, 切换箭头的方向即可
  // (2) 如果自己没有 current 类, 给自己加上 current 类, 并且移除兄弟元素的 current

  $('.lt_sort a[data-type]').click(function(){
      if($(this).hasClass("current")){
          $(this).find('i').toggleClass("fa-angle-up").toggleClass("fa-angle-down");
      }
      else{
          $(this).addClass('current').siblings().removeClass("current");
      }
      render();
  })
})
