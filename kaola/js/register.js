class Register{
			constructor(){

				this.url = "http://www.icodeilife.cn/ctrl/register.php";
				

				this.init();
			}
			init(){
				var that = this;
				$("#btn").click(function(){

					that.load()
				})
			}
			load(){
				$.ajax({

					url:this.url,

					success:function(res){
						switch(res){
							case "0":
								$("span").html("用户名重复");break;
							case "1":
								$("span").html("注册成功，2秒后跳转到登录");
								setTimeout(()=>{
									location.href = "login.html";
								},2000)
								break;
							case "2":
								$("span").html("数据不全");break;
						}
					},

					data:{
						tel:$("#user").val(),
						pass:$("#pass").val()
					},

				})
			}
		}
		
		new Register;		
