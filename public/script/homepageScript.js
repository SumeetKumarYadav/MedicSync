$(document).ready( function () {
	
	var data = [
	            [
	                "#123",
	                "Sumeet",
	                "Cardiology",
	                "52",
	                "2011/04/25",
	                "$3,120"
	            ],
	            [
	                "#124",
	                "Santosh",
	                "Radiology",
	                "86",
	                "2011/07/25",
	                "$5,300"
	            ]
	        ];
	
    $('#table_id').DataTable({data:data});
} );