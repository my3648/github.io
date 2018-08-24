$(function(){
    var currentPage=1;
    var pageSize=2;
    var picArr=[];
    render();
    // 初始化页面
    function render(){
        $.ajax({
            type:"get",
            url:"/product/queryProductDetailList",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                var htmlStr=template('productTpl',info);
                $('tbody').html(htmlStr);
                
                $("#paginator").bootstrapPaginator({
                    
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:info.page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(a,b,c,page){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                      console.log(page);
                      currentPage=page;
                      render();
                    }
                  });
            }
        })
    }
    // 分页
    $('.addP').click(function(){
         $('#addModal').modal('show');
    });
    
    // 下拉框渲染
    $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        dataType:"json",
        data:{
            page:1,
            pageSize:10
        },
        success:function(info){
            console.log(info);
            var htmlStr=template('dropdownTpl',info);
            $('.dropdown-menu').html(htmlStr);
        }
    })
    // 点击dropdown-menu 下面的a注册点击事件 将值赋值给dropdownText
    $('.dropdown-menu').on('click','a',function(){
        var txt=$(this).text();
        $('.drop-toggle').text(txt);
        var id=$(this).data('id');
        $('[name="brandId"]').val(id);
        
    })
 

    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          console.log(data.result);
          picArr.unshift(data.result);
          $('#imgBox').prepend('<img src="'+ data.result.picAddr +'" width="100" alt="">');
          if(picArr.length>3){
              picArr.pop();
              $('#imgBox img').eq(-1).remove();
              
          }
          if(picArr.length===3){
            $('#form').data("bootstrapValidator").updateStatus('picStatus','VALID');
          }
          
        }
       
        

  });
  $("#form").bootstrapValidator({

    excluded: [':disabled', ':hidden', ':not(:visible)'],
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
    
      //3. 指定校验字段
      fields: {
        //校验用户名，对应name表单的name属性
        brandId: {
            validators: {
              notEmpty: {
                message: "请选择二级分类"
              }
            }
          },
          // 产品名称
          proName: {
            validators: {
              notEmpty: {
                message: "请输入商品名称"
              }
            }
          },
          proDesc: {
            validators: {
              notEmpty: {
                message: "请输入产品描述"
              },
              regexp:{
                  regexp:/^[1-9]\d*$/,
                  message:"商品库存必须是非零开头的数字"
              }
            }
          },
          oldPrice:{
            validators: {
                notEmpty: {
                  message: "请输入商品原价"
                }
              }
          },
        //   现价
        price: {
            validators: {
              notEmpty: {
                message: "请输入商品现价"
              }
            }
          },
          picStatus: {
            validators: {
              notEmpty: {
                message: "请选择三张图片"
              }
            }
          }
      }
  })

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    var paramsStr=$('#form').serialize();
    
    $.ajax({
        
    })
  })
    
})