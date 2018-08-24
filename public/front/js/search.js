$(function(){
    // 添加假数据
    // var arr=["泰拳","警告","再","号","信"];
    // var jsonStr=JSON.stringify(arr);
    // localStorage.setItem("search_list",jsonStr);

    // 从本地存储中获取数据为JSON格式
    // 转换成数组
    // 通过模板引擎渲染
    render();



    function getHistory(){
        var history=localStorage.getItem('search_list')||'[]';
        var arr=JSON.parse(history);
        
        return arr;
    }
    // render:获取本地存储然后渲染
    function render(){
        var arr=getHistory(arr);
        var htmlStr=template("historyTpl",{arr:arr});
        $('.lt_history').html(htmlStr );
    }

    // 删除所有历史记录

    $('.lt_history').on("click",".trash",function(){
        mui.confirm("你确定要删除历史记录吗","温馨提示",["取消","确认"],function(e){
            console.log(e);
            if(e.index===1){
                localStorage.removeItem('search_list');
                render();
            }
        });
        
    })

    // 删除单条记录
    $('.lt_history').on("click",".btn_del",function(){
        var that=this;
        mui.confirm("你确定要清楚此条记录吗","温馨提示",["取消","确认"],function(e){
            
            if(e.index===1){
               
                var index=$(that).data('index');
                
                console.log(index);
                var arr=getHistory();
                arr.splice(index,1);
                var jsonStr=JSON.stringify(arr);
                localStorage.setItem("search_list",jsonStr);
                render();
            }
        });
    })

    // 添加历史记录功能
    // (1) 给搜索按钮, 添加点击事件
  // (2) 获取输入框的值
  // (3) 获取本地历史中存的数组
  // (4) 往数组的最前面追加
  // (5) 转成 jsonStr, 将修改后的存储到本地存储中
  // (6) 页面重新渲染
    $('.search_btn').click(function(){
        // 校验 如果为空 弹出toast提示
        var key=$('.search_input').val().trim();
        if(key===""){
            mui.toast("请输入搜索关键字",{duration:2000})
            return;
        }
        
        
    // 如果有重复的,将重复的删除,并且将这一项添加到最前面
        
        var arr=getHistory();
        var index=arr.indexOf(key);
        if(index!=-1){
            arr.splice(index,1);
        }
        // 如果数组大于10,将最后一项删除
        if(arr.length>=10){
            arr.pop();
        }
        // 添加到本地存储直接渲染
        arr.unshift(key);
        localStorage.setItem("search_list",JSON.stringify(arr));
        render();
        $('.search_input').val("");
        location.href="searchList.html?key="+key;
    })

    
    
})