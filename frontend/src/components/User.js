import React from 'react'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.username}</td>

            <td>{user.email}</td>
        </tr>
    )
}


const UserList = ({users}) => {
    return (
        <table>
            <tr>
                <th>User Name</th>

                <th>Email</th>
            </tr>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}


export default UserList