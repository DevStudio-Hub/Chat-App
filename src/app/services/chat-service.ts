import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private messageListener: ((data: any) => void) | null = null;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000', {
      withCredentials: true,
      transports: ['websocket'],
    });
  }
  userData = JSON.parse(localStorage.getItem('user') || '{}');
  currentUserId = this.userData._id;

  joinRoom(roomId: string) {
    this.socket.emit('joinRoom', roomId);
  }

  sendMessage(roomId: string, message: string, recever: string) {
    this.socket.emit('sendMessage', {
      roomId,
      message,
      recever,
    });
  }

  onMessage(callback: (data: any) => void) {
    if (this.messageListener) {
      this.socket.off('receiveMessage', this.messageListener);
    }

    this.messageListener = callback;
    this.socket.on('receiveMessage', this.messageListener);
  }

  removeMessageListener() {
    if (this.messageListener) {
      this.socket.off('receiveMessage', this.messageListener);
      this.messageListener = null;
    }
  }

  onRoomsUpdated(callback: () => void) {
    this.socket.on('roomsUpdated', callback);
  }

  clearUnReadCount(roomId: string) {
    this.socket.emit('markAsRead', { roomId });
  }
  getMessages(roomId: string) {
    return this.http.get(
      `http://localhost:3000/getMessagesAndRooms/GetMessage?roomId=${roomId}`,
      {
        withCredentials: true,
      }
    );
  }

  getRooms() {
    return this.http.get(`http://localhost:3000/getMessagesAndRooms/GetRooms`, {
      withCredentials: true,
    });
  }

  registerUser = (user: any) => {
    return this.http.post('http://localhost:3000/auth/Register', user, {
      withCredentials: true,
    });
  };
  loginUser = (user: any) => {
    return this.http.post('http://localhost:3000/auth/Login', user, {
      withCredentials: true,
    });
  };
  updateBio = (user: any) => {
    return this.http.post('http://localhost:3000/auth/Update-Bio', user, {
      withCredentials: true,
    });
  };
  searchUser = (query: string) => {
    return this.http.get(
      `http://localhost:3000/search/Users?Users=${query}`,
      {
        withCredentials: true,
      }
    );
  };

  getUserInfo = (userId: string) => {
    return this.http.get(
      `http://localhost:3000/search/UserInfo?userId=${userId}`,
      { withCredentials: true }
    );
  };
}
