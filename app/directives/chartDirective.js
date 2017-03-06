angular.module('taskApp').		   
   directive('barsChart', function ($parse) {		     
     var directiveDefinitionObject = {		         
         restrict: 'E',		         
         replace: false,		         
         scope: {taskData: '=chartData'},
         link: function (scope, element, attrs) {		           
           var chart = d3.select(element[0]);		           
           chart.append("div").attr("class", "chart")
             .selectAll('div')
             .data(scope.taskData).enter().append("div")		             
             .transition().ease("elastic")
             .style("width", function(d) { return  35 + (d.value * 5) + "%"; })
             .text(function(d) { return d.category + " : " + d.value + " tasks"; });		           
         } 
      };
      return directiveDefinitionObject;
   });