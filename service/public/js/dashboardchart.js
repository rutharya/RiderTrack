var  ctx = document.getElementById("myStat");
var ctx2= document.getElementById("raceStats");

// PIE chart to show number of races participated vs number of races finished and unfinished
var raceChart = new Chart(ctx2,{
    type: 'pie',
    data: {datasets: [{data: [1, 9, 10]}]},
        labels: ['Red','Green','Blue']
});

// Bar chart to show elevation/distance and time covered in the past week.
var statsChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
            label: 'Distance convered in miles',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: [
                'rgba(0,0,255)',

            ],
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});