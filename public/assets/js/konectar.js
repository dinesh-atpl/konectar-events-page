
const element2 = document.getElementById('website_url');
const url_key = element2.dataset.key;
const brochure_request_url = `${url_key}/send_mail/brochure_request`;
const element3 = document.getElementById('instance_name');
const instance = element3.dataset.key;

    

function submitBrochureForm(form_type,konectar_instance){
	if(!$(`#requestBr${form_type}`).validate({
		rules: {
			full_name: {
				required: true,
				minlength: 2,
				maxlength: 250
			},
			business_email: {
				required: true,
				email: true
			}
		},
		messages: {
			full_name: {
				required: "Please enter your name",
				minlength: "Your name must consist of at least 2 characters",
				maxlength: "Your name must consist of maximum 250 characters"
			},
			business_email: "Please enter a valid email address"
		}
	}).form()){
		return false;
	}else{
		var data = {};//$("#requestBr1").serialize();
		data["full_name"] = $(`#full_name${form_type}`).val();
		data["business_email"] = $(`#business_email${form_type}`).val();
		data["brochure_request_type"] = $(`#brochure_request_type${form_type}`).val();
		data['requested_type']=konectar_instance;
        // document.write(data["full_name"],data["business_email"],data["brochure_request_type"],data['requested_type']);
		$.ajax({
			url: brochure_request_url,
			type:"post",
			dataType:"json",
			data: data,
			beforeSend: function() {
        		$('#requestFormSubmit').val('Requesting');        
    		},
			success: function(retData){
				if(retData.status = 'true'){
					$(`#requestBr${form_type}`).hide();
					$(".messageDiv").html('<p class="brocure_message">Thank you!</p><p class="brocure_message">We will email you shortly.</p>');
				}
			}
		});
	}
}


function form_content(form_type,instance)
{
    return `
    <div class="messageDiv"></div>
    <form class="brochureForm" method="post" id="requestBr${form_type}" role="form" data-toggle="validator">
	<input type="hidden" id="brochure_request_type${form_type}" name="brochure_request_type" value='${form_type}'>
	<div class="requestForm">
		<input type="text" id="full_name${form_type}" name="full_name" class="form-control required" placeholder="Full name*">
	</div>

	<div class="requestForm">
		<input type="email" id="business_email${form_type}" name="business_email" class="form-control required" placeholder="Business email*">
	</div>

	<div class="requestForm">
		<input type="button" onclick="submitBrochureForm(${form_type},'${instance}');return false;" class="form-control blue-button gAnalytics_requestBrochure_submitBtn" id="requestFormSubmit" value="Request">
	</div>
</form>
    `;
}

$(document).ready(function(e) {
    window.innerWidth >= 768 && window.innerWidth <= 991 ? (e("#reqstForm1").webuiPopover({
        dismissible: !1,
        closeable: !0,
        title: "",
        type: "html",
        cache: !1,
        // url: base_url + "/konectar/get_form/1/" + method,
        content: form_content('1',instance),
        placement: "left",
        width: "250px",
        height: "172px"
    }), e("#reqstForm2").webuiPopover({
        dismissible: !1,
        closeable: !0,
        title: "",
        type: "html",
        cache: !1,
        content: form_content('2',instance),
        placement: "left",
        width: "250px",
        height: "172px"
    }), e("#reqstForm3").webuiPopover({
        dismissible: !1,
        closeable: !0,
        title: "",
        type: "html",
        cache: !1,
        content: form_content('3',instance),
        placement: "left",
        width: "250px",
        height: "172px"
    })) : (e("#reqstForm1").webuiPopover({
        dismissible: !1,
        closeable: !0,
        title: "",
        type: "html",
        cache: !1,
        content: form_content('1',instance),
        placement: "top",
        width: "250px",
        height: "172px"
    }), e("#reqstForm2").webuiPopover({
        dismissible: !1,
        closeable: !0,
        title: "",
        type: "html",
        cache: !1,
        content: form_content('2',instance),
        placement: "top",
        width: "250px",
        height: "172px"
    }), e("#reqstForm3").webuiPopover({
        dismissible: !1,
        closeable: !0,
        title: "",
        type: "html",
        cache: !1,
        content: form_content('3',instance),
        placement: "top",
        width: "250px",
        height: "172px"
    })), e(window).scroll(function() {
        e(".hideme").each(function(t) {
            var s = e(this).offset().top + e(this).outerHeight();
            e(window).scrollTop() + e(window).height() > s && e(this).addClass("showme animated fadeInUp")
        })
    })
})
, 
767 > $(window).width() ? ($("#carousel-slider").addClass("carousel carousel-dark slide").attr("data-bs-ride", "carousel"), $("#carousel-slider-inner").removeClass("carousel-desktop"), $(".carousel-nav-button").show()) : ($("#carousel-slider").removeClass("carousel carousel-dark slide").attr("data-bs-ride", ""), $("#carousel-slider-inner").addClass("carousel-desktop"), $(".carousel-nav-button").hide());