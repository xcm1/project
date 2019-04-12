
function Magnifier() {
    //				1.选元素,存属性
    this.sbox = document.querySelector(".s-box");
    this.main = document.querySelector(".main-t-b"); 
    this.pbox = this.sbox.children[1];
    this.bbox = document.querySelector(".b-box");
    this.bimg = this.bbox.children[0];
    
    
    console.log($('.s_box'))
    //				2.绑定进入离开事件
    this.addEvent();
}
Magnifier.prototype.addEvent = function () {
   
    // console.log(this.sbox.id = "aaa")
    // $(this.main).on("mouseover",".s-box",function(){
    //     console.log(1)
    //     that.show();
    // })
    var that = this;
    //				正在绑定....
    $(this.main).on("mouseover",".s-box",function(){
        //					3-1.显示
        that.show();
    })
    $(this.main).on("mouseout",".s-box",function(){
        //					3-2.隐藏
        that.hide()
    })
}
Magnifier.prototype.show = function () {

    this.pbox.style.display = "block";
    this.bbox.style.display = "block";
  
    //				4.绑定移动事件
    this.addMove()
}
Magnifier.prototype.hide = function () {
    this.pbox.style.display = "none";
    this.bbox.style.display = "none";
}
Magnifier.prototype.addMove = function () {
    var that = this;
    //				正在绑定....
    // this.sbox.onmousemove = function (eve) {
    $(this.main).on("mousemove",".s-box",function(eve){
        var e = eve || window.event;
        //					5.色块跟随移动,同时计算比例
    
        that.pBoxMove(e)
    })
}
Magnifier.prototype.pBoxMove = function (e) {
    this.l = e.offsetX - this.pbox.offsetWidth / 2;
    this.t = e.offsetY - this.pbox.offsetHeight / 2;   
    

    if (this.l < 0) this.l = 0;
    if (this.t < 0) this.t = 0;
    if(this.l>this.sbox.offsetWidth - this.pbox.offsetWidth) this.l = this.sbox.offsetWidth - this.pbox.offsetWidth
    if(this.t>this.sbox.offsetHeight - this.pbox.offsetHeight) this.t = this.sbox.offsetHeight - this.pbox.offsetHeight
    

    this.pbox.style.left = this.l + "px";
    this.pbox.style.top = this.t + "px";


    this.x = this.l / (this.sbox.offsetWidth - this.pbox.offsetWidth);
    this.y = this.t / (this.sbox.offsetHeight - this.pbox.offsetHeight);

    //				6.大图跟据比例移动
    this.move()
}
Magnifier.prototype.move = function () {
    this.bimg.style.left = -this.x * (this.bimg.offsetWidth - this.bbox.offsetWidth) + "px";
    this.bimg.style.top = -this.y * (this.bimg.offsetHeight - this.bbox.offsetHeight) + "px";
}

class List {
    constructor(options) {
        //				1.解析参数
        this.cont = options.cont;
        this.url = options.url;
        //				2.请求数据
        this.load();

        //				5.绑定事件
        this.addEvent();
    }
    load() {
        var that = this;
        ajax({
            url: this.url,
            success: function (res) {
                //	
                console.log(res)		//			3.请求成功之后解析数据,并渲染页面
                that.res = JSON.parse(res)
                that.display()
            }
        })
    }
    display() {
        //				4.遍历数据,拼接结构,渲染页面   this.res.length
        var str = "";
        var goods = $.cookie("goodsId");
        for (var i = 0; i < this.res.length; i++) {
            if(goods == this.res[i].goodsId){
                str = `
                <div class="main-t-b-l" >
                <div class="s-box" >
                    <img src="${this.res[i].p1}"/>
                    <span></span>
                    <p></p>
                </div>
                <ul>
                <li><img src="${this.res[i].p1}"/></li>
                <li><img src="${this.res[i].p1}"/></li>
                </ul>
                <div class="b-box">
                    <img src="${this.res[i].p1}" alt=""/>
                </div>
            </div>
            <div class="main-t-b-r" index="${this.res[i].goodsId}">
                <div class="main-t-b-r-t">
                    <ul>
                        <li>
                            <h3>欢迎抢购</h3>
                        </li>
                        <li index="${this.res[i].goodsId}">
                            产品编号：
                            <span >${this.res[i].p7}</span>
                        </li>
                        <li>
                            会员价：
                            <span>${this.res[i].p4}</span>
                        </li>
                        <li>
                            税费：
                            <span><em>${this.res[i].p6}</em></span>
                        </li>
                        <li>
                            商品评价：
                            <a href="#">${this.res[i].p5}<em>0</em>人评价</a>
                        </li>
                        <li>
                            购买方式：
                            <span>${this.res[i].dong}</span>
                        </li>
                        <li>
                            全场包邮
                        </li>
                        <li>
                            已 销 售：
                            <span>49</span>
                             件
                        </li>
                        <li>
                            支持开发票
                        </li>
                        <li>
                            <i>购买数量:</i>
                            <a href="#">-</a>
                            <input type="text" value="1"/>
                            <a href="#">+</a>
                        </li>
                    </ul>
                    
                        </div>
                        <div class="main-t-b-r-b">
                            <a href="car.html" class="shop2">加入购物车</a>
                            
                        </div>
                    </div>
                </div>
            </div>`;
            }
        }

        this.cont.innerHTML = str;
        this.tab()
        new Magnifier()
    //    console.log(getCookie)

                    $(".shop2").on("click",function(){
                        // console.log(this);
                    //   console.log(this.parentNode.parentNode.getAttribute("index"));
                    $.cookie("goodsId",this.parentNode.parentNode.getAttribute("index"));
                })
    }
    tab(){
		$(".main-t-b-l").children("ul").children("li").on("click",function(){
			$(".s-box").children("img").attr("src",$(this).children("img").attr("src"));
			$(".b-box").children("img").attr("src",($(".s-box").children("img").attr("src")))
		})
		
    }
    addEvent() {
        this.cont.addEventListener("click", function (eve) {
            if (eve.target.nodeName == "EM") {
                //						6.被点击时,获取货号,存cookie
                that.id = eve.target.parentNode.getAttribute("index");
                that.setCookie()
            }
        })
    }
    setCookie() {
        //				因为要使用一条cookie存商品,所以数据选择数组里面放对象[{},{}]
        this.goods = getCookie("goods");
        //				情况1:第一次添加
        if (this.goods == "") {
            this.goods = [{
                id: this.id,
                num: 1
            }];
        } else {
            //					情况2:不是第一次添加
            this.goods = JSON.parse(this.goods);
            //					新情况1：这次点击的是老数据
            var onoff = true;
            this.goods.forEach((v) => {
                if (v.id == this.id) {
                    v.num++
                    onoff = false;
                }
            })

            //					新情况2：这次点击的是新数据
            if (onoff) {
                this.goods.push({
                    id: this.id,
                    num: 1
                })
            }
        }
        //				所有关于数组的操作结束之后,将数组转成字符再设置到cookie中
        setCookie("goods", JSON.stringify(this.goods))
    }
}


new List({
    // cont:document.getElementById("cont"),
    cont: document.querySelector(".main-t-b"),

    // cont:$('.cont'),
    url: "http://localhost/test1901/kaola/date/goods.json"
})




