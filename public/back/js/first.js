$(function(){
    var currentPage=1;
    var pageSize=2;
    render();
    function render(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr=template("firstTpl",info);
                $('tbody').html(htmlStr);
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,page){
                        
                        currentPage=page,
                        render();
                    }
    
                })
                
            }
        })
    }

    $('#addBtn').click(function(){
        $('#addModal').modal("show");
    });
   
    $('#form').bootstrapValidator({
         //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
  

  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  //3. 指定校验字段
  fields: {
    //校验用户名，对应name表单的name属性
    categoryName: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请输入一级分类名称'
        },
        //长度校验
       //正则校验
        }
    },
  }

    })

    $('#form').on('success.form.bv',function(e){
        e.preventDefault();
        
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$('#form').serialize(),
            dataType:"json",
            success:function(info){
                console.log(info);
                if(info.success){
                    $('#addModal').modal('hide');
                    $('#form').data("bootstrapValidator").resetForm(true);
                }

            }
        })
    })

    

    
}) 