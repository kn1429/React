import React from "react";
import "./table.css";
import { render } from "react-dom";

class App extends React.Component {
  render() {
    // This is the data given
    let data = [
      {
        task: "task1",
        resource: ["john", "jimmy"],
        start: "08/25/2015",
        end: "09/25/2015",
        utilization: 50
      },
      {
        task: "task2",
        resource: ["john", "jimmy"],
        start: "09/21/2015",
        end: "09/30/2015",
        utilization: 50
      },
      {
        task: "task3",
        resource: ["john"],
        start: "08/26/2015",
        end: "09/2/2015",
        utilization: 50
      },
      {
        task: "task4",
        resource: ["sara"],
        start: "09/14/2015",
        end: "10/2/2015",
        utilization: 100
      },
      {
        task: "task5",
        resource: ["hg", "hb"],
        start: "09/10/2015",
        end: "10/14/2015",
        utilization: 50
      },
      {
        task: "task6",
        resource: ["hg"],
        start: "09/10/2015",
        end: "09/21/2015",
        utilization: 50
      }
    ];
    /*
      This code is to create a new Data Structure of the form:

      new_data = {
        'john':[
        {
          task:'task1',
          start: "25/08/15",
          end: "25-09-15",
          utilization: 50
        },
        {
          task:'task2',
          start: "21/09/15",
          end: "30-09-15",
          utilization: 50
        }
        ]
      };
		*/
    let new_data = {};
    data.map(task_info => {
      var resources = task_info.resource;
      resources.map(resource => {
        var new_entry = {
          task: task_info["task"],
          start: task_info["start"],
          end: task_info["end"],
          utilization: task_info["utilization"] * 0.08
        };
        if (resource in new_data) {
          new_data[resource].push(new_entry);
        } else {
          new_data[resource] = [new_entry];
        }
      });
    });

    // Creating arrays to find minimum start date and maximum end dates
    let startarray = [];
    let endarray = [];
    for (var i = 0; i < data.length; i++) {
      startarray.push(new Date(data[i].start));
      endarray.push(new Date(data[i].end));
    }
    // Calculatiing the number of columns for the table
    let minDate = Math.min.apply(null, startarray);
    let maxDate = Math.max.apply(null, endarray);
    let numberofDays = parseInt(maxDate - minDate) / (1000 * 60 * 60 * 24);

    // Creating table and table header objects
    const table = document.createElement("TABLE");
    var tr = table.insertRow(-1);
    var firstDate = minDate;
    // Populating header row for the table
    for (var j = -1; j <= numberofDays; j++) {
      var nextDate = new Date(firstDate).toLocaleDateString();
      var th = document.createElement("TH");
      if (j === -1) {
        th.innerHTML = "Resource Name";
        tr.appendChild(th);
        continue;
      }
      th.innerHTML = nextDate;
      tr.appendChild(th);
      firstDate = parseInt(firstDate) + 1000 * 24 * 60 * 60;
    }

    // Populating rows for the table
    for (var resource in new_data) {
      var resourcerow = table.insertRow(-1);
      // Making resource names bold
      var resource_string =
        resource.charAt(0).toUpperCase() + resource.slice(1);
      resourcerow.insertCell(-1).innerHTML = resource_string.bold();

      // creating rows for each task in a resource
      for (var task in new_data[resource]) {
        var taskrow = table.insertRow(-1);
        taskrow.insertCell(-1).innerHTML = new_data[resource][task].task;
        var taskstartdate = new Date(new_data[resource][task].start);
        var taskenddate = new Date(new_data[resource][task].end);
        firstDate = minDate;
        for (var k = 0; k <= numberofDays; k++) {
          nextDate = new Date(firstDate);
          if (nextDate >= taskstartdate && nextDate <= taskenddate) {
            taskrow.insertCell(-1).innerHTML =
              new_data[resource][task].utilization;
          } else {
            taskrow.insertCell(-1).innerHTML = 0;
          }
          firstDate = parseInt(firstDate) + 1000 * 24 * 60 * 60;
        }
      }
      firstDate = minDate;
      // Creating rows for resource
      for (var l = 0; l <= numberofDays; l++) {
        nextDate = new Date(firstDate);
        var total = 0;
        //Calculating total utilization for each resource
        for (task in new_data[resource]) {
          taskstartdate = new Date(new_data[resource][task].start);
          taskenddate = new Date(new_data[resource][task].end);
          if (nextDate >= taskstartdate && nextDate <= taskenddate) {
            total = total + new_data[resource][task].utilization;
          } else {
            total = total + 0;
          }
        }
        resourcerow.insertCell(-1).innerHTML = total;
        firstDate = parseInt(firstDate) + 1000 * 24 * 60 * 60;
      }
    }
    document.body.appendChild(table);
    return <div />;
  }
}
render(<App />, document.getElementById("root"));
