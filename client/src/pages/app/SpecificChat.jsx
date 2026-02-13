import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { chatAPI, usersAPI } from '../../services/api';
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { format } from 'date-fns';

const SpecificChat = () => {
  const { chatId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadOtherUserProfile();
    loadMessages();

    const interval = setInterval(loadMessages, 3000);

    return () => clearInterval(interval);
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadOtherUserProfile = async () => {
    try {
      const response = await usersAPI.getUser(chatId);
      setOtherUser(response.data);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const loadMessages = async () => {
    try {
      const response = await chatAPI.getMessages(chatId);
      setMessages(response.data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await chatAPI.sendMessage(chatId, newMessage.trim());
      setNewMessage('');
      loadMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!otherUser) {
    return null;
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#FFE0E7'
      }}
    >
      {/* Header */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: '#ffffff'
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>

        <Avatar
          src={otherUser.imageUrl1 || otherUser.image01}
          alt={otherUser.Name}
          sx={{ width: 40, height: 40 }}
        />

        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {otherUser.Name}
        </Typography>
      </Paper>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <Typography variant="body2" sx={{ color: '#999999' }}>
              Start the conversation
            </Typography>
          </Box>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === currentUser.uid;

            return (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: isOwn ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    maxWidth: '70%',
                    p: 1.5,
                    bgcolor: isOwn ? '#EF3B5F' : '#ffffff',
                    color: isOwn ? '#ffffff' : '#000000',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 0.5 }}>
                    {message.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: isOwn ? 'rgba(255,255,255,0.7)' : '#999999',
                      fontSize: '0.7rem'
                    }}
                  >
                    {format(new Date(message.timestamp), 'HH:mm')}
                  </Typography>
                </Paper>
              </Box>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: 'flex',
          gap: 1,
          bgcolor: '#ffffff'
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={4}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3
            }
          }}
        />

        <IconButton
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          sx={{
            bgcolor: '#EF3B5F',
            color: '#ffffff',
            '&:hover': {
              bgcolor: '#d32f4f'
            },
            '&:disabled': {
              bgcolor: '#cccccc'
            }
          }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SpecificChat;
