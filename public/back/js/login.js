$(function(){
  //  /*
  //  * 1. 进行表单校验配置
  //  *    校验要求:
  //  *        (1) 用户名不能为空, 长度为2-6位
  //  *        (2) 密码不能为空, 长度为6-12位
  //  * */
  // 配置的字段和 input 框中指定的 name 关联, 所以必须要给 input 加上 name
  $('#form').bootstrapValidator({
    // 配置字段
      // 配置校验图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',    // 校验成功
        invalid: 'glyphicon glyphicon-remove',  // 校验失败
        validating: 'glyphicon glyphicon-refresh' // 校验中
      },

    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          //正则校验
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '用户名由数字字母下划线和.组成'
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '用户名长度必须在6到30之间'
          },
          //正则校验
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '用户名由数字字母下划线和.组成'
          },
          callback:{
            message:"密码错误"
          }
          
        }

      }
    }
  })
})
  /*
  * 2. 登陆功能
  *    表单校验插件会在提交表单时进行校验
  *    (1) 校验成功, 默认就提交表单, 会发生页面跳转,
  *        我们需要注册表单校验成功事件, 阻止默认的提交, 通过ajax进行发送请求
  *    (2) 校验失败, 不会提交表单, 配置插件提示用户即可
  * */
 $('#form').on("success.form.bv",function(e){
    e.preventDefault();
    
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$('#form').serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          location.href="index.html";
        }
        // 帐号错误
        if(info.error===1000){
          $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
          $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback");

        }

      }
    })

    $('[type="reset"]').click(function(){
      // 调用插件的方法
      $('#form').data("bootstrapValidator").resetForm();
    })
 });