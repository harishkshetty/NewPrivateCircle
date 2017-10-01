
$(document).ready(function(){

$('.downarrow').click(function(){

$('#box').slideToggle();

});

$("#showfilter").click(function(){


	$('.filter').toggle();
})


});
 var app=angular.module('myapp',[]);
 app.controller('privatecontroller',function($scope,$http){
$scope.search = {};
var mat=true;

$scope.filterchange=function(){
if(mat==true){
$scope.search.one="Fund";

$scope.search.two="company";

$scope.search.three="HNI";
mat=false;
}
else{
$scope.search.one="";

$scope.search.two="";

$scope.search.three="";
}
}
 	$scope.back=function(){
 		    window.history.back();

 	}
$http.get('data.json').then(function(res){

$scope.Entity=res.data.info;
$scope.data=$scope.Entity[0];

});

$http.get('message.json').then(function(res){

$scope.mesdata=res.data.mes;
console.log($scope.mesdata);

})
$scope.HeadInfo=function(id){
	 document.getElementById('container').style.display= "block";

$scope.data=$scope.Entity[id];
console.log($scope.data);
}

$scope.HeadInfoData=function(id){

$scope.data=$scope.Entity[id];
console.log($scope.data);
window.location.href="detail.html";
}
 }).filter('multipleChecks', function(){
	return function(Entity, models) {
		modelIsDefined = false;
		for (var key in models) {
			if (models[key] && models[key] !== '') {
				modelIsDefined = true;
			}
		}
		if (modelIsDefined) {
			let output = [];
		 	for (var keys in models) {
                var modelValue = models[keys]; // get model values one by one
                if(modelValue && modelValue !== '') {
                    for (let j = 0; j < Entity.length; j++) {
                        var eachRow = Entity[j];
                        var matchFound = false;

                        //loop through each item in the object to check if it contains the searched value;
                        for(var item in eachRow ) {
                            if (typeof(eachRow[item]) === 'string') {
                                var k = eachRow[item].toLowerCase();
                                if(k.indexOf(modelValue.toLowerCase()) !== -1) {
                                    matchFound = true;
                                }   
                            }
                        }
                        if (matchFound) {
                            output.push(eachRow);
                        }
                    }
                }    
            }   

			return output;	 
		} else {
			return Entity
		}
	}
})

