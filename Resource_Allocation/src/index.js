import React from "react";
import "./table.css";
import Header from "./TableHeader";
import { render } from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
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
      ],
      minDate: {},
      maxDate: {},
      numberofDays: {},
      new_data: [],
      table: document.createElement("TABLE")
    };

    this.CreateNewData();
    this.CalculateTableColumns();
  }

  CreateNewData() {
    this.state.data.map(task_info => {
      var resources = task_info.resource;
      resources.map(rr => {
        var new_entry = {
          task: task_info["task"],
          start: task_info["start"],
          end: task_info["end"],
          utilization: task_info["utilization"] * 0.08
        };
        if (rr in this.state.new_data) {
          this.state.new_data[rr].push(new_entry);
        } else {
          this.state.new_data[rr] = [new_entry];
        }
      });
    });
  }
  CalculateTableColumns() {
    let startarray = [];
    let endarray = [];
    for (var i = 0; i < this.state.data.length; i++) {
      startarray.push(new Date(this.state.data[i].start));
      endarray.push(new Date(this.state.data[i].end));
    }
    // Calculatiing the number of columns for the table
    this.state.minDate = Math.min.apply(null, startarray);
    this.state.maxDate = Math.max.apply(null, endarray);
    this.state.numberofDays =
      parseInt(this.state.maxDate - this.state.minDate) / (1000 * 60 * 60 * 24);
  }
  render() {
    return (
      <div>
        <table>
          <Header
            new_data={this.state.new_data}
            minDate={this.state.minDate}
            numberofDays={this.state.numberofDays}
          />
        </table>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
