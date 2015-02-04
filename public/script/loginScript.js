$(document).ready(function(){
	
	$('.modal').on('hidden.bs.modal', function(){
	    $(this).find('form')[0].reset();
	});
	
	$( ".main1" ).on( "click", "#signUpModelWindow", function() {
			
		
			$("#SpecilizationID").select2({
			placeholder: "Select Specialization",
			minimumInputLength: 0,				
			multiple: true,
			tokenSeparators: [","],	
			ajax: {
				url: "/getspecialization",
				dataType: 'json',
				type: "POST",
				async: false,
				data: function (term, page) {
					return { regex:term };
				},
				results: function (data, page) {
				return {
		                results: $.map(data, function (item) {
		                    return {
		                        text: item.area,			                       
		                        id: item._id
		                    };
		                })
	            };						
				}	
			},
			dropdownCssClass: "bigdrop",
			escapeMarkup: function (m) {
				return m;
			}
		});		
		
	});
	
	$( "#signUpForm" ).submit(function( event ) {
		  
		  event.preventDefault();
		  this.submit();
		});
});