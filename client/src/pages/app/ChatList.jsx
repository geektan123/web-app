import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { chatAPI } from '../../services/api';
import {
  Box,
  Container,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  CircularProgress
} from '@mui/material';
import { format } from 'date-fns';

const ChatList = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    loadConversations();

    const interval = setInterval(loadConversations, 5000);

    return () => clearInterval(interval);
  }, [currentUser]);

  const loadConversations = async () => {
    try {
      const response = await chatAPI.getConversations();
      setChats(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading conversations:', error);
      setChats([]);
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInHours = (now - date) / (1000 * 60 * 60);

      if (diffInHours < 24) {
        return format(date, 'HH:mm');
      } else {
        return format(date, 'MMM dd');
      }
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress sx={{ color: '#EF3B5F' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#FFE0E7',
        pb: 2
      }}
    >
      <Container maxWidth="md" sx={{ pt: 2 }}>
        {/* Header */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: '#756568',
            mb: 3
          }}
        >
          Messages
        </Typography>

        {/* Chat List */}
        {chats.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 8
            }}
          >
            <Typography variant="h6" sx={{ color: '#666666', mb: 1 }}>
              No messages yet
            </Typography>
            <Typography variant="body2" sx={{ color: '#999999' }}>
              Start exploring profiles to connect
            </Typography>
          </Box>
        ) : (
          chats.map((chat) => (
            <Card
              key={chat.userId}
              sx={{
                mb: 2,
                borderRadius: 3,
                overflow: 'hidden'
              }}
            >
              <CardActionArea
                onClick={() => navigate(`/app/chat/${chat.userId}`)}
                sx={{ p: 2 }}
              >
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    <Avatar
                      src={chat.imageUrl}
                      alt={chat.name}
                      sx={{
                        width: 56,
                        height: 56
                      }}
                    />

                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 0.5
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: '#000000'
                          }}
                        >
                          {chat.name}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{ color: '#999999' }}
                        >
                          {formatTimestamp(chat.timestamp)}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666666',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {chat.lastMessage}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        )}
      </Container>
    </Box>
  );
};

export default ChatList;
