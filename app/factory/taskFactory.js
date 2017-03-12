var url = "https://api.mongolab.com/api/1/databases/ntraja-db/collections/TaskList?",
    config = {params:{apiKey:"c7CC9G_bN_JohbYY9DKIi5__KBOYaVkr"}};

angular.module("taskApp")
	.factory("taskFactory", function($http, $q){
        return {                  
        	getTasks: function(){        		
                var deferred = $q.defer();                

                $http.get(url, config)
                	.success(function(data){                        
                        deferred.resolve(data);
                    })
                    .error(function(error){                        
                        deferred.reject(error);
                    });
                return deferred.promise;
            },

            addTask: function(task){                
                var deferred = $q.defer();                

                $http.post(url, task, config)
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(error){
                        deferred.reject(error);
                    });
                return deferred.prosmise;
            },

            editTask: function(task){
                var deferred = $q.defer();                    

                $http.put(url+"/"+task._id.$oid, task, config)
                  .success(function(data){
                    deferred.resolve(data);
                  })
                  .error(function(error){
                    deferred.reject(error);
                  });
                return deferred.promise;
            },            

            getTaskById: function(id){
                var deferred = $q.defer();
                
                $http.get(url+"/"+ id, config)
                    .success(function(data){                                        
                        deferred.resolve(data);
                    })
                    .error(function(error){
                        deferred.reject(error);
                    });
                return deferred.promise;
            }
        }
});