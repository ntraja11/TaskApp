angular.module("taskApp")
	.controller("taskController", function($scope, taskFactory, $routeParams, $location){
		
		//Variable declarations
		$scope.tasks = [];
		$scope.newTask = {};
		$scope.taskToEdit = {};		
		$scope.taskData = [];
		$scope.dueDate = null;
		$scope.reminderDate = null;
		$scope.selectedSortOption = "";
		$scope.categoryArray = [];

		$scope.taskCount = [0,0,0,0];				
		//Default value for D3 Chart
		$scope.taskData = [{category:'Personal', value:2},{category:'Career', value:5},
        {category:'Family',value:3}, {category:'Entertainment',value:2}];

		$scope.getTasks = function(){
			taskFactory.getTasks().then(function(data){            	
                $scope.tasks = data;  
                //console.log("parameter exists " + $scope.tasks); 
                //$scope.populateTasks();                 
                $scope.populateCategoryArray();            
            }, $scope.error);                    
		}
		// not using for now
		$scope.populateTasks = function(){
			angular.forEach($scope.tasks, function(task, key){			     
			     if(task.category == 'Personal'){
			     	$scope.taskCount[0]++;
			     }else if(task.category == 'Entertainment'){
			     	$scope.taskCount[1]++;
			     }else if(task.category == 'Official'){
			     	$scope.taskCount[2]++;
			     }else if(task.category == 'Career'){			     	
			     	$scope.taskCount[3]++;
			     }			     
			});
			$scope.taskData = [{category:'Personal', value:$scope.taskCount[0]},{category:'Career', value:$scope.taskCount[1]},
        {category:'Family', value:$scope.taskCount[2]}, {category:'Entertainment', value:$scope.taskCount[3]}];        
		}

		$scope.populateCategoryArray = function(){						
			angular.forEach($scope.tasks, function(task, key){
				if(!$scope.categoryArray.length){
					$scope.categoryArray.push(task.category);
				}else{
					pushCategory = false;
					for(i=0; i < $scope.categoryArray.length; i++){					
						if($scope.categoryArray[i] != task.category){
							pushCategory = true;						
						}else{
							pushCategory = false;
							i = $scope.categoryArray.length;
						}						
					}
					if(pushCategory){
						$scope.categoryArray.push(task.category);	
					}
				}		
				//console.log("Category Array : " + $scope.categoryArray);				
			})
		}

		// ----------------------------
		// functio to navigate to task table view
		$scope.gotoTaskTable = function(){
			$scope.newTask = {};				
			$scope.taskToEdit = {};	
			$scope.categoryArray = [];	
			$location.path("#/");
		}		
		$scope.addTask = function(){            						
			$scope.newTask.dueDate = moment($scope.dueDate, "DD/MM/YYYY");
			$scope.newTask.reminderDate = moment($scope.reminderDate, "DD/MM/YYYY");			
			//console.log("New task date : " + $scope.newTask.dueDate);
			if($scope.newTask.category != undefined && $scope.newTask.description != undefined
			 && $scope.newTask.dueDate != undefined && $scope.newTask.reminderDate != undefined){				
				taskFactory.addTask($scope.newTask)
				//.then($scope.successCall, $scope.error);            	
			}		        	
        	$scope.getTasks();
        	$scope.gotoTaskTable();			
        }        
        $scope.editTask = function(){
        	taskFactory.editTask($scope.taskToEdit)
        		.then($scope.successCall, $scope.error);
        }
        $scope.successCall = function(response){        	        	
        	$scope.getTasks();
        	$scope.gotoTaskTable();			
        }
        $scope.error = function(errMsg){        	
        	console.log("Error Message : ", errMsg);
        }
        // condition to check $routeParams id to get single task
        if($routeParams.id != undefined){        	       	
        	taskFactory.getTasks().then(function(data){            	
                $scope.tasks = data;                           
                $scope.assignTaskToEdit($routeParams.id);                       
            }, $scope.error);                            	
        }

        $scope.assignTaskToEdit = function(editId){
        	console.log("Tasks loaded editId : " + editId);
        	angular.forEach($scope.tasks, function(task, key){
        		if(task._id.$oid === editId){
        			$scope.taskToEdit = task;        			
        			$scope.dueDate = $scope.taskToEdit.dueDate;
        			$scope.reminderDate = $scope.taskToEdit.reminderDate;
        		}        		
        	})
        }        

		// function calls
		$scope.getTasks();
		
	});