$(function(){
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        dataType:"json",
        success:function(info){
            console.log(info);  
            var htmlStr=template('leftTpl',info);
            $('.mui-scroll ul').html(htmlStr);
          
            renderSecondById(info.rows[0].id);

        }

    })

    $('.lt_category_left').on("click","a",function(){
        $(this).addClass('current').parent().siblings().find("a").removeClass('current');
        var id=$(this).data('id');
        renderSecondById(id);
    })

    function renderSecondById(id){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            dataType:"json",
            data:{
                id:id
            },
            success:function(info){
                console.log(info);
                var htmlStr=template("rightTpl",info);
                $('.lt_category_right ul').html(htmlStr);
            }
        })
    }
})
