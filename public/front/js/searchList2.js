$(function(){
    var currentPage=1;
    var pageSize=2;
    function render(){
        var params={};
        params.proName=$('.search_input').val();
        params.page=currentPage;
        params.pageSize=pageSize;
        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            dataType:"json",
            data:params,
            success:function(info){
                var htmlStr=template("productTpl",info);
                $('.lt_product').html(htmlStr);
            }
        })

    }
})