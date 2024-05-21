//$(function(){
   $(document).ready(function(){   
      $('.img-thumb-box>img').click(function(){
         const src = $(this).attr('src');
         $('.img-box>img').attr('src', src);
      });
      $('.colors input[type=radio]').click(function(){
         const color = $(this).val();
         $('.selected').text(color+'색');
      });
   
      //상품가격 계산
      const prcode = $("#prcode").val();
      const prprice = Number($('#prprice').val());
      const reserves = parseInt($("#reserves").val()); 
      const delivery = parseInt($("#delivery").val()); 
      const prtitle = $("#title").val();
      let totalmoney = prprice;
      let tmoney = prprice;
      let totalTextLength, opt1, opt11, colortxt, color, opt2, opt21, size, sizetxt, optionText;
      
      $('input[name="color"]').change(function(){
           $('.size').find("option:first").prop("selected", true);
           opt1 = Number($(this).data('color'));  //추가금액
           colortxt = $(this).data("colorname");  
           color = $(this).val();                 //폼으로 전송할 색상값
           if(opt1 > 0) {
            opt11 = "(+" + opt1.toLocaleString() +"원)";
           }else{
            opt11 = "";
           }
           colortxt += " " + opt11;         //화면에 출력할 색상이름
           $('.size').attr('disabled', false); //size 박스 활성화
      });
   
      let opthtml = `
      <ul class="add-opt">
            <li class="d-md-flex align-items-center">
               <div class="total-text col"></div>
               <ul class="add-opts col">
                  <li class="addbox d-flex align-items-center">
                  <label class="title-label">수량</label>
                  <div class="input-group">
                     <div class="input-group-prepend">
                        <button class="btn btn-outline-line qdown" type="button">
                           <i class="fa-solid fa-chevron-down"></i>
                        </button>
                     </div>
                     <input type="number" 
                              class="quantity" 
                              name="quantity[]" 
                              readonly>
                     <div class="input-group-append">
                           <button class="btn btn-outline-line qup" type="button">
                              <i class="fa-solid fa-chevron-up"></i>
                           </button>
                     </div>  
                  </div>              
               </li>
          </ul>
          <input type="hidden" name="subtitle[]" class="subtitle">
          <input type="hidden" name="toptmoney[]" class="toptmoney">
          <div class="tomoney col text-right"></div>  
          <i class="fa-solid fa-close remove-order"></i>
      </li>
    </ul>`;
    
   
      $('.size').change(function(){
          totalTextLength = $('.total-text').length;
          const oradd = $('.addquantity').html();
          let quantityArray = [];  //quantity value 값을 따로 읽어서 배열에 저장
          for(let i = 0; i < $('.quantity').length; i++){
              quantityArray[i] = $('.quantity').eq(i).val();
          }
      
          opt2 = Number($(this).find("option:selected").data('size'));  //추가금액
          size = $(this).find("option:selected").val();
          sizetxt = $(this).find("option:selected").text();
          if(opt2 > 0) {
             opt21 = "(+" + opt2.toLocaleString() +"원)";
          }else{
            opt21 = "";
          }
        if(size){
          tmoney = prprice + (opt1 + opt2); 
          sizetxt += " " + opt21;
          optionText = `<p>${colortxt}-${sizetxt}</p>`;
          $('.addquantity').html(oradd + opthtml);
    
          for(let i = 0; i < $('.quantity').length; i++){
             $('.quantity').eq(i).val(quantityArray[i]);
          }
          $('.subtitle').eq(totalTextLength).val(`${colortxt}-${sizetxt}`); //input type hidden 에 정보 저장
          $('.toptmoney').eq(totalTextLength).val(tmoney); //가격저장
          $('.total-text').eq(totalTextLength).html(optionText);   
          $('.quantity').eq(totalTextLength).val(1);
          $('.tomoney').eq(totalTextLength).html(tmoney.toLocaleString()+"원");
          $('#submit, #cart').attr('disabled', false);
          totalMoney(delivery);
         }
      });
   
   
   
     // $('#qup').click(function(){
      $(document).on('click', ".qup", function(){
         let quantity = Number($(this).parent().prev().val()); //수량가져오기
         //let quantity = Number($('.quantity').eq(totalTextLength).val());
         quantity += 1;
         if(quantity > 9){
            alert("최대수량입니다.");
            quantity = 9;
         }
         
         $(this).parent().prev().val(quantity); //가져온 수량을 input에 넣기
         tmoney = $(this).parents('.add-opt').find('.toptmoney').val(); //input에 저장된 사진+옵션 가격가져오기
         let ttmoney = tmoney * quantity; //(상품가격+옵션)*수량
         ttmoney = ttmoney.toLocaleString(); //세자리 콤마
         $(this).parents('.add-opt').find('.tomoney').html(ttmoney + "원"); //출력
         
         //let ind = $('.qup').index(this);
         //$('.tomoney').eq(ind).html(tmoney + "원");
   
         totalMoney(delivery);
      });
   
      //$('#qdown').click(function(){
      $(document).on('click', ".qdown", function(){   
         //let quantity = Number($('.quantity').eq(totalTextLength).val());
         let quantity = Number($(this).parent().next().val());
         quantity -= 1;
         if(quantity < 1){
            quantity = 1;
         }
         //$('.quantity').eq(totalTextLength).val(quantity);
         $(this).parent().next().val(quantity);
         tmoney = $(this).parents('.add-opt').find('.toptmoney').val(); //input에 저장된 사진+옵션 가격가져오기
         let ttmoney = tmoney * quantity; //(상품가격+옵션)*수량
         ttmoney = ttmoney.toLocaleString(); //세자리 콤마
         $(this).parents('.add-opt').find('.tomoney').html(ttmoney + "원"); //출력
         
         totalMoney(delivery);
      });
   
      $(document).on('click', '.remove-order', function(){
          $(this).parents('.add-opt').remove();
          if($('.addquantity').children().hasClass('add-opt')){
             totalMoney(delivery);
          }else{
            $('.size').find("option:first").prop("selected", true);
            $('#submit, #cart').attr('disabled', true);
            $('.totalmoney').html("");
          }   
      });
   
      //카트로 이동
      $('#cart').click(function(){
         window.location.href="cart.html";
      });
   
     const opt = {
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 1,
        centerMode: true,
        autoplay: true,
        responsive: [{
           breakpoint: 768,
           settings: {
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: false,
            autoplay: true,         
           }
        }]
      };
   
     //본문 상세보기 스크립트
     $('.nav-pills li').click(function(){
       $('.nav-pills>li').removeClass('active');
       $(this).addClass('active');
       const link = $(this).find('a').attr('href');
       if(link == "#review"){
          setTimeout(function(){
            $('.review-photo').not('.slick-initialized').slick(opt);   
          }, 200);
       }else{
           $('.review-photo').slick('unslick');
       }
     });
   
    /*
      viewReview();
      
      //슬릭생성
      $('#review').show(function(){
         $('.review-photo').slick({
               slidesToShow: 8,
               slidesToScroll: 1,
               centerMode: true
         });
      });
     */
   
   //리뷰 팝업창
   $('.imgs').click(function(e){
      e.preventDefault();
      const src = $(this).find('img').attr('src');  //getter
      $('.imgbox').find('img').attr('src', src).attr('alt', src); //setter
      $('.rp').fadeIn();
   });
   
   $(document).mouseup(function(e){
   
      /*
       if($('.rp').has(e.target).length === 0){
          $('.rp').fadeOut();
       }
      */
     if($(e.target).hasClass('rp')){
        $('.rp').fadeOut();
     }
      
   });
   
   $('.rp-close').click(function(){
        $('.rp').fadeOut();
   });
   
   $('.cartview-close').click(function(){
      $('.cartview').fadeOut();
   });
   
   viewCart();
   $(document).on('click', '#cart', function(){
      let quantity, subtitle, toptmoney, ct;
      let mycart = getCart();
      //const forms = $("#detail-form").serializeArray();
      const title = $('#title').val();
      const img = $("#imgid").val();
      for(let i=0; i < $('.quantity').length; i++){
          quantity = $('.quantity').eq(i).val();
          subtitle = $('.subtitle').eq(i).val();
          toptmoney = $('.toptmoney').eq(i).val();
          ct = { "title":title, "img":img, "quantity": quantity, "subtitle": subtitle, "toptmoney":toptmoney}; 
          mycart.push(ct);
      }
        addCart(mycart); 
        viewCart();
    });
   
   });
   
   //카트확인
   function getCart(){  
      return JSON.parse(localStorage.getItem('cart'))||[];
   }
   
   function viewCart(){
      const vcart = getCart();
      if(vcart.length > 0){
         $('.cart-count').text(vcart.length);
         let chtml = '', ct;
         for(let i =0; i < vcart.length; i++){
            ct = `<li class="list-group-item">
                     <div class="d-flex">
                        <a href="#"><img src="images/pd/${vcart[i].img}.jpg" alt="${vcart[i].img}" 
                                         class="img-thumbnail"></a>
                        <div class="cart-txt">
                           <h1>
                              <a href="#">${vcart[i].title}</a>
                           </h1>
                           <p>${vcart[i].subtitle}</p>
                        </div>
                     </div>
                     <div class="c-money">
                        <span>${vcart[i].quantity}</span>${vcart[i].toptmoney.toLocaleString()}원
                     </div>
                  </li>`;
            chtml += ct;      
         }
         $(".cartin>.list-group").html(chtml);
         $('.cartview').show();
      }
   }
   
   //카트에 상품추가
   function addCart(product){
      let cart = getCart(); //카트에서 기존에 있던 카트를 받아옴
      //기존에 카트에 새 상품을 추가 한 후 newCart에 보관
        //cart.push(product);
      //newCart를 문자열로 만든 후 로컬스토리지에 저장
      localStorage.setItem("cart", JSON.stringify(product));
   }
   
   
   //리뷰 퍼센트 보기 함수
   function viewReview(){
      $('.box-line-color').each(function(){
         let h = $(this).css('height');
         $(this).html("<span>"+h+"</span>");
      });
   }
   
   function totalMoney(delivery){
      let tm = 0;
         $('input[name="toptmoney[]"]').each(function(index){
            let moneyVal = parseInt($(this).val());
               let qt = parseInt($(".quantity").eq(index).val());
               tm += moneyVal * qt;
               console.log(tm);
               //배송정책
               if(tm > 200000) {
                  delivery = 0;
               }
               let txt = "총 상품금액(수량) : <strong>"+tm.toLocaleString()+"원</strong>+(배송비 :"+delivery.toLocaleString()+"원)";
               $('.totalmoney').html(txt);
         });
   }