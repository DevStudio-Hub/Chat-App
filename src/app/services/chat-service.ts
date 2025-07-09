import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000', {
      withCredentials: true,
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
    this.socket.on('receiveMessage', callback);
  }

  onRoomsUpdated(callback: () => void) {
    this.socket.on('roomsUpdated', callback);
  }

  clearUnReadCount(roomId: string){
    this.socket.emit("markAsRead", { roomId });

  }
  getMessages(roomId: string) {
    return this.http.get(
      `http://localhost:3000/api/search/get-messages?roomId=${roomId}`,
      {
        withCredentials: true,
      }
    );
  }

  getRooms() {
    return this.http.get(`http://localhost:3000/api/search/get-rooms`, {
      withCredentials: true,
    });
  }

  registerUser = (user: any) => {
    return this.http.post('http://localhost:3000/api/auth/register', user, {
      withCredentials: true,
    });
  };
  updateBio = (user: any) => {
    return this.http.post('http://localhost:3000/api/auth/updatebio', user, {
      withCredentials: true,
    });
  };
  searchUser = (query: string) => {
    return this.http.get(
      `http://localhost:3000/api/search/search-user?query=${query}`,
      {
        withCredentials: true,
      }
    );
  };

  getUserInfo = (username: string) => {
    return this.http.get(
      `http://localhost:3000/api/search/user-profile?query=${username}`,
      { withCredentials: true }
    );
  };
}
