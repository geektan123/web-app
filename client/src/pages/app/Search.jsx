import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardActionArea,
  CardContent
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Search = () => {
  const navigate = useNavigate();

  const searchCategories = [
    {
      title: 'Digambar Community',
      description: 'Find profiles from Digambar community',
      filter: 'Digambar'
    },
    {
      title: 'Shwetambar Community',
      description: 'Find profiles from Shwetambar community',
      filter: 'Shwetambar'
    },
    {
      title: 'Search by Location',
      description: 'Find profiles from your city or state',
      filter: 'location'
    },
    {
      title: 'Search by Age',
      description: 'Find profiles by age range',
      filter: 'age'
    }
  ];

  const handleSearchClick = (filter) => {
    navigate(`/app/search-results?filter=${filter}`);
  };

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
          Search Profiles
        </Typography>

        {/* Search Categories */}
        {searchCategories.map((category, index) => (
          <Card
            key={index}
            sx={{
              mb: 2,
              borderRadius: 3,
              overflow: 'hidden'
            }}
          >
            <CardActionArea
              onClick={() => handleSearchClick(category.filter)}
              sx={{ p: 2 }}
            >
              <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: '#000000',
                        mb: 0.5
                      }}
                    >
                      {category.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#666666' }}
                    >
                      {category.description}
                    </Typography>
                  </Box>

                  <ChevronRightIcon
                    sx={{
                      color: '#EF3B5F',
                      fontSize: 32
                    }}
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}

        {/* Info Message */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            bgcolor: 'rgba(239, 59, 95, 0.1)',
            borderRadius: 3
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#756568',
              textAlign: 'center'
            }}
          >
            Use filters above to find profiles matching your preferences
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Search;
