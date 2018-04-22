import React from "react";

class TableRows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }
  // Populate rows for each task in a resource
  PopulateRowsforTask(table, resource) {
    for (var task in this.props.new_data[resource]) {
      var taskrow = [];
      taskrow.push(this.props.new_data[resource][task].task);
      var taskstartdate = new Date(this.props.new_data[resource][task].start);
      var taskenddate = new Date(this.props.new_data[resource][task].end);
      var firstDate = this.props.minDate;
      for (var k = 0; k <= this.props.numberofDays; k++) {
        var nextDate = new Date(firstDate);
        if (nextDate >= taskstartdate && nextDate <= taskenddate) {
          taskrow.push(this.props.new_data[resource][task].utilization);
        } else {
          taskrow.push(0);
        }
        firstDate = parseInt(firstDate) + 1000 * 24 * 60 * 60;
      }
      this.state.rows.push(taskrow);
    }
  }
  // Calculate Total Utilization for each resource
  CalculateTotalUtilization(resource, nextDate, total) {
    for (var task in this.props.new_data[resource]) {
      var taskstartdate = new Date(this.props.new_data[resource][task].start);
      var taskenddate = new Date(this.props.new_data[resource][task].end);
      if (nextDate >= taskstartdate && nextDate <= taskenddate) {
        total = total + this.props.new_data[resource][task].utilization;
      } else {
        total = total + 0;
      }
    }
    return total;
  }
  // Populate calculated values for each resource
  PopulateRowsforResource(resource, resourcerow) {
    var firstDate = this.props.minDate;
    // Creating rows for resource
    for (var l = 0; l <= this.props.numberofDays; l++) {
      var nextDate = new Date(firstDate);
      var total = 0;
      //Calculating total utilization for each resource
      total = this.CalculateTotalUtilization(resource, nextDate, total);
      resourcerow.push(total);
      firstDate = parseInt(firstDate) + 1000 * 24 * 60 * 60;
    }
  }
  // Main logic for Table
  populateTable() {
    // Populating rows for the table
    for (var resource in this.props.new_data) {
      var resourcerow = [];
      var resource_string =
        resource.charAt(0).toUpperCase() + resource.slice(1);
      var resource_string1 = <b>{resource_string}</b>;
      resourcerow.push(resource_string1);
      this.PopulateRowsforResource(resource, resourcerow);
      this.state.rows.push(resourcerow);
      this.PopulateRowsforTask(this.props.table, resource);
    }
  }
  render() {
    this.populateTable();

    return (
      <div>
        <Rows rows={this.state.rows} />
      </div>
    );
  }
}
class Rows extends React.Component {
  render() {
    var rows = this.props.rows.map(rowData => {
      return <Row rowData={rowData} />;
    });
    return <tbody>{rows}</tbody>;
  }
}
class Row extends React.Component {
  render() {
    var rowcell = this.props.rowData.map(rowcell => {
      return <Rowcell rowcell={rowcell} />;
    });
    return <tr>{rowcell}</tr>;
  }
}
class Rowcell extends React.Component {
  render() {
    return <td>{this.props.rowcell}</td>;
  }
}
export default TableRows;
