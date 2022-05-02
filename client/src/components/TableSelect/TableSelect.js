import React, { Component } from "react";
import { ReactComponent as DownloadSVG } from "./svgFiles/download.svg";
import "./tableSelect.css";
class TableSelect extends Component {
  constructor(props) {
    super();
    this.state = {
      itemsChecked: [],
      tableData: [],
      checkAll: false,
    };
    this.selectAllRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ tableData: this.props.tableData });
  }

  setIndeterminate = (val) => {
    this.selectAllRef.current.indeterminate = val;
  };

  handleChecked = (e, index) => {
    if (
      (this.state.itemsChecked.length + 1 === this.state.tableData.length &&
        e.target.checked === true) ||
      (!this.state.itemsChecked.includes(index) &&
        this.state.itemsChecked.length + 1 === this.state.tableData.length)
    ) {
      this.setIndeterminate(false);
    } else {
      this.setIndeterminate(true);
    }

    if (this.state.itemsChecked.includes(index)) {
      if (this.state.itemsChecked.length - 1 <= 0) {
        this.setIndeterminate(false);
      }
      this.setState({
        itemsChecked: this.state.itemsChecked.filter((item) => item !== index),
        checkAll: false,
      });
    } else {
      this.setState((prevState) => ({
        itemsChecked: [...prevState.itemsChecked, index],
        checkAll:
          this.state.itemsChecked.length + 1 === this.state.tableData.length
            ? true
            : false,
      }));
    }
  };

  handleCheckAll = (e) => {
    if (e.target.checked === true) {
      this.setIndeterminate(false);
      let allItemsChecked = [];

      for (let i in this.state.tableData) {
        allItemsChecked.push(Number(i));
      }

      this.setState({
        checkAll: !this.state.checkAll,
        itemsChecked: allItemsChecked,
      });
    } else {
      this.setState({
        checkAll: !this.state.checkAll,
        itemsChecked: [],
      });
    }
  };

  handleDownload = () => {
    let alertString = "";
    let availableDownloadArr = [];

    for (let val of this.state.itemsChecked) {
      if (this.state.tableData[val].status.toLowerCase() === "available") {
        availableDownloadArr.push(this.state.tableData[val]);
      }
    }

    for (let val of availableDownloadArr) {
      alertString += `Device: ${val.device}\nPath: ${val.path}\n\n`;
    }

    if (availableDownloadArr.length > 0) {
      alert(alertString);
    }
  };

  /* 
    The "React Way" would be to break this HTML down further 
    into smaller more manageable components. For the sake of getting 
    the whole picture of the HTML without having it spread across multiple files
    I have elected to leave it all in this component.
  */
  render() {
    return (
      <div className="tableContainer">
        <div className="statusContainer">
          <input
            className="statusElement largeCheckbox"
            aria-label="select all"
            type="checkbox"
            data-testid="select-all"
            checked={
              this.state.checkAll ||
              (this.state.itemsChecked.length === this.state.tableData.length &&
                this.state.tableData.length > 0)
            }
            ref={this.selectAllRef}
            onClick={(e) => this.handleCheckAll(e)}
          />
          {this.state.itemsChecked.length > 0 ? (
            <span className="statusElement">
              Selected {this.state.itemsChecked.length}
            </span>
          ) : (
            <span className="statusElement">None Selected</span>
          )}
          <button
            className="statusElement downloadSelected"
            onClick={() => this.handleDownload()}
          >
            <DownloadSVG /> Download Selected
          </button>
        </div>
        <table className="customTable">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Device</th>
              <th>Path</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tableData.map((tableData, i) => (
              <tr
                onClick={(e) => this.handleChecked(e, i)}
                key={i}
                className={
                  this.state.itemsChecked.includes(i) ? "rowSelected" : null
                }
                checked={
                  this.state.itemsChecked.includes(i) ||
                  this.state.checkAll === true
                }
              >
                <td>
                  <input
                    type="checkbox"
                    className="largeCheckbox"
                    aria-label={"for " + tableData.name}
                    data-testid={"select-item-" + i}
                    checked={
                      this.state.itemsChecked.includes(i) ||
                      this.state.checkAll === true
                    }
                  />
                </td>
                <td>{tableData.name}</td>
                <td>{tableData.device}</td>
                <td>{tableData.path}</td>
                {tableData.status.toLowerCase() === "available" ? (
                  <td className="tdPadding">
                    {" "}
                    <span className="availableCircle"> </span>
                    {tableData.status.charAt(0).toUpperCase() +
                      tableData.status.slice(1)}
                  </td>
                ) : (
                  <td>
                    {" "}
                    {tableData.status.charAt(0).toUpperCase() +
                      tableData.status.slice(1)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableSelect;
