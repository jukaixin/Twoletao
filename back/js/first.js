

$(function(){
  // 1.请求数据渲染页面
  var currentPage=1;
  var pageSize=5;
  render();
function render (){
  $.ajax({
    type:'GET',
    url:'/category/queryTopCategoryPaging',
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    dataType:'json',
    success:function(info){
      // console.log(info);
      // 模板引擎进行渲染
      var htmlStr=template('firstTmp',info);
      $('tbody').html( htmlStr );

      $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion :3,//版本
        totalPages:Math.ceil(info.total/info.size),
        currentPage:info.page,
        onPageClicked:function(a,b,c,page){
          
          currentPage=page;
          render();
        }
      })
    }
  });
}
  
  // 2.点击添加分类按钮，添加模态框
  $('#btn-Add').click(function(){
    $('#addModal').modal('show');
  });

  // 表单校验
  $('#form').bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields:{
    categoryName:{
      validators:{
        notEmpty:{
          message:'一级分类不能为空'
        }
      }
      
    }
  },
  })
// 3校验成功时，进行向后台添加数据
$('#form').on('success.form.bv',function(e){
  e.preventDefault();
   // 3.点击添加按钮，向后台添加数据

  //  $('#addBtn').click(function(){
    $.ajax({
      type:'POST',
      url:'/category/addTopCategory',
      data:$('#form').serialize(),
      dataType:'json',
      success:function( info ){
        // console.log( info );
        if(info.success) {
           // 关闭模态框
        // $('#addModal').modal("hide");
        // 页面重新渲染第1页
        currentPage = 1;
        render();
            // 4.重置表单
  $('#form').data('bootstrapValidator').resetForm(true);
        }
      }
  // })
  })
 
})
})