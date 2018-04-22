import React from "react";
import TableRows from "./Tablerows";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: []
    };
  }
  render() {
    var firstDate = this.props.minDate;
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    for (var j = -1; j <= this.props.numberofDays; j++) {
      var nextDate =
        new Date(firstDate).getDate() +
        " " +
        months[new Date(firstDate).getMonth()];
      if (j === -1) {
        this.state.headers.push("Resource Name");
        continue;
      }
      this.state.headers.push(nextDate);

      firstDate = parseInt(firstDate) + 1000 * 24 * 60 * 60;
    }
    return (
      <div>
        <Headings headings={this.state.headers} />
        <TableRows
          new_data={this.props.new_data}
          minDate={this.props.minDate}
          numberofDays={this.props.numberofDays}
        />
      </div>
    );
  }
}

class Heading extends React.Component {
  render() {
    return <th>{this.props.heading}</th>;
  }
}

class Headings extends React.Component {
  render() {
    var header = this.props.headings.map(heading => {
      return <Heading heading={heading} />;
    });
    return (
      <thead>
        <tr>{header}</tr>
      </thead>
    );
  }
}

export default Header;
