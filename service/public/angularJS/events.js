console.log("I am in AngularController")
var events = angular.module('events',[]);
    events.controller('events', function($scope, $http){
      // $scope.events = [{name : "ASU Tempe Trekking", image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", description : "ASU Trekking at Arizona State University at A Mountain Tempe ASU", date : "December 21 2018", location : "A-Mountain", time : "03:00 pm - 06:00 pm"},
      //   {name : "San Jose Marathon", image : "http://www.parcjeandrapeau.com/medias/images/header/marathon-et-demi-marathon-oasis-rock-n-roll-de-montreal.jpg", description : "San Jose Downtown Marathon", date : "March 21 2018", location : "DownTown San Jose", time : "03:00 pm - 06:00 pm"},{name : "Phoenix Rowing", image : "https://fwmdocks.com/wp-content/uploads/2017/01/FWM-Rowing-807x356-1.jpg", description : "San Jose Downtown Marathon", date : "December 21 2018", location : "A-Mountain", time : "03:00 pm - 06:00 pm"},
      //   {name : "Oregon Rowing", image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", description : "San Jose Downtown MarathonSan Jose Downtown Marathon San Jose Downtown Marathon", date : "March 21 2018", location : "DownTown San Jose", time : "03:00 pm - 06:00 pm"},{name : "San Jose Marathon", image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", description : "San Jose Downtown Marathon", date : "December 21 2018", location : "A-Mountain", time : "03:00 pm - 06:00 pm"},
      //   {name : "Seattle Marathon", image : "http://www.parcjeandrapeau.com/medias/images/header/marathon-et-demi-marathon-oasis-rock-n-roll-de-montreal.jpg", description : "San Jose Downtown Marathon San Jose Downtown Marathon", date : "March 21 2018", location : "DownTown San Jose", time : "03:00 pm - 06:00 pm"},{name : "San Jose Marathon", image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", description : "San Jose Downtown Marathon", date : "December 21 2018", location : "A-Mountain", time : "03:00 pm - 06:00 pm"},
      //   {name : "San Jose Marathon", image : "https://fwmdocks.com/wp-content/uploads/2017/01/FWM-Rowing-807x356-1.jpg", description : "SASU Trekking at Arizona State UniversityASU Trekking at Arizona State UniversityASU Trekking at Arizona State University", date : "March 21 2018", location : "DownTown San Jose", time : "03:00 pm - 06:00 pm"},{name : "San Jose Marathon", image : "https://alhujjattravels.com/wp-content/uploads/2017/04/treking-1.jpg", description : "San Jose Downtown Marathon", date : "December 21 2018", location : "A-Mountain", time : "03:00 pm - 06:00 pm"},
      //   {name : "San Jose Marathon", image : "http://thehotzoneusa.com/wp-content/uploads/2014/11/14803118587_20f2a571fc_o.jpg", description : "ASU Trekking at Arizona State University at A Mountain Tempe ASUASU Trekking at Arizona State University at A Mountain Tempe ASU", date : "March 21 2018", location : "DownTown San Jose", time : "03:00 pm - 06:00 pm"},{name : "San Jose Marathon", image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", description : "San Jose Downtown Marathon", date : "December 21 2018", location : "A-Mountain", time : "03:00 pm - 06:00 pm"},
      //   {name : "ASU Tempe Trekking", image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", description : "San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon", date : "March 21 2018", location : "DownTown San Jose", time : "03:00 pm - 06:00 pm"},{name : "San Jose Marathon", image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", description : "San Jose Downtown Marathon", date : "December 21 2018", location : "A-Mountain", time : "03:00 pm - 06:00 pm"},
      //   {name : "San Jose Marathon", image : "http://www.parcjeandrapeau.com/medias/images/header/marathon-et-demi-marathon-oasis-rock-n-roll-de-montreal.jpg", description : "San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon", date : "March 21 2018", location : "DownTown San Jose", time : "03:00 pm - 06:00 pm"},{name : "San Jose Marathon", image : "http://thehotzoneusa.com/wp-content/uploads/2014/11/14803118587_20f2a571fc_o.jpg", description : "San Jose Downtown Marathon", date : "December 21 2018", location : "A-Mountain", time : "03:00 pm - 06:00 pm"},
      //   {name : "Arizona Trekking", image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", description : "San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon", date : "March 21 2018", location : "DownTown San Jose", time : "03:00 pm - 06:00 pm"},{name : "San Jose Marathon", image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", description : "San Jose Downtown Marathon", date : "December 21 2018", location : "A-Mountain", time : "03:00 pm - 06:00 pm"},
      //   {name : "ASU Tempe Trekking", image : "https://fwmdocks.com/wp-content/uploads/2017/01/FWM-Rowing-807x356-1.jpg", description : "ASU Trekking at Arizona State University at A Mountain Tempe ASU Marathon San Jose Downtown Marathon", date : "March 21 2018", location : "DownTown San Jose", time : "03:00 pm - 06:00 pm"},{name : "San Jose Marathon", image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", description : "San Jose Downtown Marathon", date : "December 21 2018", location : "A-Mountain", time : "03:00 pm - 06:00 pm"},
      //   {name : "ASU Tempe Trekking", image : "https://alhujjattravels.com/wp-content/uploads/2017/04/treking-1.jpg", description : "San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon", date : "March 21 2018", location : "DownTown San Jose", time : "03:00 pm - 06:00 pm"},{name : "San Jose Marathon", image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", description : "San Jose Downtown Marathon", date : "December 21 2018", location : "A-Mountain", time : "03:00 pm - 06:00 pm"},
      //   {name : "San Jose Marathon", image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", description : "San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon", date : "March 21 2018", location : "DownTown San Jose", time : "03:00 pm - 06:00 pm"},{name : "San Jose Marathon", image : "http://thehotzoneusa.com/wp-content/uploads/2014/11/14803118587_20f2a571fc_o.jpg", description : "San Jose Downtown Marathon", date : "December 21 2018", location : "A-Mountain", time : "03:00 pm - 06:00 pm"},
      //   {name : "Seattle Marathon", image : "http://www.parcjeandrapeau.com/medias/images/header/marathon-et-demi-marathon-oasis-rock-n-roll-de-montreal.jpg", description : "San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon ", date : "March 21 2018", location : "DownTown San Jose", time : "03:00 pm - 06:00 pm"},{name : "San Jose Marathon" , image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", description : "San Jose Downtown Marathon", date : "March 21 2018", location : "DownTown San Jose", time : "03:00 pm - 06:00 pm"}];

        // $http({
        //     method : "GET",
        //     url : '/getAllEvents',//change the method to get 10 items at a time.
        //     data : {}
        // }).success(function(data) {
        //     console.log("inside success");
        //     console.log("data is ::");
        //     console.log(data);

        //     $scope.events = data;
        //     //set all variables.
                 
        // }).error(function(error) {
        //     console.log("inside error");
        //     console.log(error);
        //     $scope.unexpected_error = false;
        //     $window.alert("unexpected_error");
        // });
        $http.get('/getAllEvents').then(successCallback, errorCallback);

        function successCallback(response){
            //success code
            console.log("In success of frontend after the route js call")
            console.log(response.data)
            $scope.events = response.data;
        }
        function errorCallback(error){
            //error code
            console.log("In error")
        }
    });