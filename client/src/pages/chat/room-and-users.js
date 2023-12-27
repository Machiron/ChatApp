import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomAndUsers = ({ socket, username, room }) => {
  const [roomUsers, setRoomUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      console.log(data);
      setRoomUsers(data);
    });

    return () => socket.off('chatroom_users');
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
    // Redirect to home page
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.roomAndUsersColumn}>
      <button onClick={leaveRoom}>
        <i class="fa-solid fa-circle-xmark"></i>
      </button>
      <h1 className={styles.roomTitle}>{room}</h1>

      <div className={styles.listUser} >
        {roomUsers.length > 0 && <h5 className={styles.usersTitle}>Users</h5>}
        <ul className={styles.usersList}>
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
                fontStyle: `${user.username === username ? 'italic' : 'normal'}`,
                color: `${user.username === username ? 'red' : 'black'}`,
              }}
              key={user.id}
            >
              <i class="fa-solid fa-user-astronaut"></i> 
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoomAndUsers;
