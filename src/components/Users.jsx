import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/productService'; 
import '../styles/Users.css'; 
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="card-container">
      <div className="card">
        <h2>Usuarios</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.Roles.map(role => role.name).join(', ')}
                  </td>
                  <td className="actions">
                    <span  className="action-button">
                      <HiOutlinePencilSquare className="icon-pencil" />
                    </span>
                    <span  className="action-button">
                      <IoMdClose className="icon-pencil-1" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
