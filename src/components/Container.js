import API from "../utils/API";
import React, { Component } from "react"
import SearchBox from "./SearchBox"
// import SearchBox from "./SearchBox"
import TableData from "./TableData"
import "./style.css";

class Container extends Component {

    // Setting the component's initial state
    //search starts as an empty string
    //employess and filteredEmployess are empty arrays because that it's the structure of the data we'll be working with
    //order it's to reference the order that the employees are. By defaltu they come randonly and the first click will trigger then to be in asc order
    state = {
        search: "",
        employees: [],
        filteredEmployees: [],
        order: ""

    };

    // this is the initialization, what do you want the page to display when page it's first loaded
    componentDidMount() {
        API.getUsers().then(res => this.setState({
            employees: res.data.results,
            filteredEmployees: res.data.results
        })).catch(err => console.log(err))
    }

    //if "name" is clicked employee are shown by asc/desc order

    sortByName = () => {
        const filtereds = this.state.filteredEmployees;
        if (this.state.order === "asc") {
            const sorteds = filtereds.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1)
            console.log(sorteds)

            this.setState({
                filteredEmployees: sorteds,
                order: "desc"
            })
        } else {

            const sorteds = filtereds.sort((a, b) => (a.name.first > b.name.first) ? -1 : 1)
            console.log(sorteds)

            this.setState({
                filteredEmployees: sorteds,
                order: "asc"
            })

        }
    }
    handleInputChange = event => {

        const employees = this.state.employees;
        const UserInput = event.target.value;
        const filteredEmployees = employees.filter(employee => employee.name.first.toLowerCase().indexOf(UserInput.toLowerCase()) > -1
        )
        this.setState({
         
            filteredEmployees,
        });
    };

    employeeSearch = () => {
        API.getUsers()
            .then(res => this.setState({
                filteredEmployees: res.data.results,
                employees: res.data.results
            }))
            .catch(err => console.log(err))
    }
    handleSearch = event => {
        event.preventDefault();
        if (!this.state.search) {
            alert("Enter a name")
        }
        const { employees, search } = this.state;

        const filteredEmployees = employees.filter(employee => employee.name.first.toLowerCase().includes(search.toLowerCase()));

        this.setState({
            filteredEmployees
        });
    }
    render() {
        return (
            <div>
                <SearchBox
                    employee={this.state.employees}
                    handleSearch={this.handleSearch}
                    handleInputChange={this.handleInputChange} />
                <TableData results={this.state.filteredEmployees}
                    sortByName={this.sortByName}
                />
            </div >
        )
    }
}

export default Container