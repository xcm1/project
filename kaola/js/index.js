$("#banner1").banner({
    items: $("#banner1 .imgbox a"),
    left: $("#banner1 .btns #left"),
    right: $("#banner1 .btns #right"),
    isList: true,
    autoPlay: true,
})



function Search() {
    this.txt = document.getElementById("put")
    this.ul = document.getElementById("list2")
    this.url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su"
    this.addEvent();
}

Search.prototype.addEvent = function () {
    var that = this;
    this.txt.onkeyup = function () {
        that.val = this.value
        that.load()
    }
}

Search.prototype.load = function () {
    var that = this;
    jsonp(this.url, function (res) {
        that.res = res
        that.display()
    }, {
            _name: "cb",
            cb: "sfsf",
            wd: this.val
        })
}

Search.prototype.display = function () {
    console.log(this.res.s)
    var str = ""
    this.res.s.forEach(function (v) {
        str += `<li>${v}</li>`
    })
    this.ul.innerHTML = str;
}

new Search()

$(".nav").children("li").click(function(){
			
    
                var index = $(this).index()+1;
                
   
                var t = $(".shop"+index).offset().top;
                
  
                $("html").animate({
                    scrollTop:t
                })
                
            })

            $(".list1").children(".t").mouseover(function () {
    
                $(this).children("ul").stop().show(200).end().siblings().children("ul").stop().hide(200)
            
               
            })