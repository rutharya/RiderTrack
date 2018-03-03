  console.log("I am in AngularController")
  var events = angular.module('events',[]);
  events.controller('events', function($scope, $http){
        //START: As soon as events page loads
        $http.get('/getAllEvents').then(successCallback, errorCallback);

        function successCallback(response){
              //success code
              console.log("Successfully returning to frontend JS after loading all events")
              console.log(response.data)
              getFutureEvents(response.data)
              $scope.allEvents = response.data;
            }
          //while error from backend
          function errorCallback(error){
            console.log("Error loading all events")
            console.log("In error")
          }
          
          function getFutureEvents(allEvents){
            console.log("Loading upcoming events")
            var upcomingEvents = [];
            var k = 0;
            var currentDate = new Date();
            currentDate.setHours(0,0,0,0);
            for(i = 0; i<allEvents.length; i++){
              var eventDate = new Date(allEvents[i].date);
              eventDate.setHours(0,0,0,0);
              if(eventDate.getTime() >= currentDate.getTime()){
                upcomingEvents[k++] = allEvents[i]
              }
            }
            formatDate(upcomingEvents);
            upcomingEvents.reverse();
            $scope.events = upcomingEvents;
          }



          //Upcoming events
          $scope.getUpcomingEvents = function() {
            getFutureEvents($scope.allEvents);
          }

          // Past events
          $scope.getPastEvents = function() {
            console.log("Loading past events");
            var pastEvents = [];
            var k = 0;
            var currentDate = new Date();
            currentDate.setHours(0,0,0,0);
            for(i = 0; i<$scope.allEvents.length; i++){
              var eventDate = new Date($scope.allEvents[i].date);
              eventDate.setHours(0,0,0,0);
              if(eventDate.getTime() < currentDate.getTime()){
                pastEvents[k++] = $scope.allEvents[i]
              }
            }
            formatDate(pastEvents);
            $scope.events = pastEvents;
          }


          function formatDate(eventsList){
              //success code
              console.log("Formatting dates, list length: " + eventsList.length);
              var monthNames = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];
              eventsList.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
              });

              for(i = 0; i<eventsList.length; i++){
                var eventDate = new Date(eventsList[i].date);
                eventDate.setHours(0,0,0,0)
                var setDate = monthNames[eventDate.getMonth()] + ' ' + eventDate.getDate() + ' ' + eventDate.getFullYear();
                eventsList[i].date = setDate;
              }
            }


            $scope.addRider = function(id){

              console.log("TEST  "+ id)
              $http({
                method : "POST",
                url : '/addRiderToEvent',
                data : {
                  "eventid" : id,
                  "riderid" : "5a98d0ae0dfdacf13eac0be8" //Should not be hardcoded random value and mapped with rider table(grab it from auth token)
                }
              }).then(AddUserSuccessCallback, AddUserErrorCallback);

              function AddUserSuccessCallback(response){
              //success code
              console.log("Successfully returning to frontend JS after loading all events")
            }
          //while error from backend
              function AddUserErrorCallback(error){
                console.log("Error loading all events")
                console.log("In error")
              }

        }






          // function formatDate(eventsList){
          //     //error code
          //     for(int i = 0; i<5;i++){
          //       console.log(eventsList[i])
          //     }
          // }
          // var d = new Date("02-10-2018");
          // var e = new Date();
          // d.setHours(0,0,0,0);
          // e.setHours(0,0,0,0);
          // console.log(d);
          // console.log(e);
          // if(d.getTime() == e.getTime()){
          //   console.log("Same dates");
          // }else{console.log("Different dates");}
        });