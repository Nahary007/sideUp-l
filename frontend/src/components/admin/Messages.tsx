import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Reply, Clock, Send, X } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  reply?: string;
  created_at: string;
  replied_at?: string;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');

  const api = axios.create({
    baseURL: 'http://localhost:8000', // change selon ton backend
    withCredentials: true,
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get('/messages');
        const mapped = res.data.map((msg: any) => ({
          ...msg,
          created_at: msg.created_at,
          replied_at: msg.replied_at,
        }));
        setMessages(mapped);
      } catch (err) {
        console.error('Erreur récupération messages:', err);
      }
    };

    fetchMessages();
  }, []);

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const markAsRead = async (id: string) => {
    try {
      // Récupérer le token CSRF
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
      
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };
      const xsrfToken = getCookie('XSRF-TOKEN');

      await axios.patch(`http://localhost:8000/messages/${id}/read`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': xsrfToken ? decodeURIComponent(xsrfToken) : '',
        },
        withCredentials: true,
      });

      // Met à jour l'état local après modification
      setMessages((prev) =>
        prev.map((message) =>
          message.id === id && message.status === 'new'
            ? { ...message, status: 'read' }
            : message
        )
      );

      console.log('Message marqué comme lu avec succès');
    } catch (error: any) {
      console.error('Erreur marquage lu:', error);
      if (error.response?.data?.message) {
        alert(`Erreur: ${error.response.data.message}`);
      } else {
        alert('Échec du marquage comme lu');
      }
    }
  };

  const sendReply = async (messageId: string, reply: string) => {
    try {
      // Récupérer le token CSRF
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
      
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };
      const xsrfToken = getCookie('XSRF-TOKEN');

      const res = await axios.patch(`http://localhost:8000/messages/${messageId}/reply`, 
        { reply }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': xsrfToken ? decodeURIComponent(xsrfToken) : '',
          },
          withCredentials: true,
        }
      );

      // Met à jour l'état local après modification
      setMessages((prev) =>
        prev.map((message) =>
          message.id === messageId
            ? {
                ...message,
                status: 'replied',
                reply: res.data.reply,
                replied_at: res.data.replied_at,
              }
            : message
        )
      );
      
      setReplyText('');
      setSelectedMessage(null);
      console.log('Réponse envoyée avec succès');
    } catch (error: any) {
      console.error('Erreur envoi réponse:', error);
      if (error.response?.data?.message) {
        alert(`Erreur: ${error.response.data.message}`);
      } else {
        alert('Échec de l\'envoi de la réponse');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'read':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'replied':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return 'Nouveau';
      case 'read':
        return 'Lu';
      case 'replied':
        return 'Répondu';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages clients</h1>
        <p className="text-gray-600">Gérez et répondez aux messages de vos clients</p>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom ou sujet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">Tous les messages</option>
              <option value="new">Nouveaux</option>
              <option value="read">Lus</option>
              <option value="replied">Répondus</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des messages */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                message.status === 'new' ? 'bg-blue-50' : ''
              }`}
              onClick={() => {
                setSelectedMessage(message);
                markAsRead(message.id);
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-medium text-gray-900">{message.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(message.status)}`}>
                    {getStatusText(message.status)}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {formatDate(message.created_at)}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">{message.subject}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedMessage.subject}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-sm text-gray-600">De: {selectedMessage.name}</p>
                    <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedMessage.status)}`}>
                      {getStatusText(selectedMessage.status)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Clock className="w-4 h-4 mr-1" />
                  Reçu le {formatDate(selectedMessage.created_at)}
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {selectedMessage.reply && (
                <div className="mb-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Reply className="w-4 h-4 mr-1" />
                    Votre réponse du {formatDate(selectedMessage.replied_at!)}
                  </div>
                  <div className="bg-teal-50 rounded-lg p-4 border-l-4 border-teal-500">
                    <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.reply}</p>
                  </div>
                </div>
              )}

              {selectedMessage.status !== 'replied' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Votre réponse :</h4>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    rows={6}
                    placeholder="Tapez votre réponse ici..."
                  />
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Fermer
                    </button>
                    <button
                      onClick={() => sendReply(selectedMessage.id, replyText)}
                      disabled={!replyText.trim()}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Envoyer la réponse</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
