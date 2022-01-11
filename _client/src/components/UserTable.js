import React, {Component} from "react"

import UserTableRow from "./UserTableRow"


export default class UserTable extends Component 
{
    render() 
    {
        return (
            <table class="table table-responsive-md">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-Mail</th>
                        <th> </th>
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.users.map((user) => <UserTableRow key={user._id} user={user}/>)}
                </tbody>
            </table>      
        )
    }
}