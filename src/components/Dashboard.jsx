import React, { useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { 
  Button, Container, Typography, Box, Paper, 
  TextField, List, ListItem, ListItemText, IconButton, CircularProgress 
} from '@mui/material';
// FIX: 'Add' ko 'Plus' se badal diya gaya hai
import { Delete, Plus } from 'lucide-react';

const Dashboard = ({ user }) => {
  const [sites, setSites] = useState([]);
  const [newSite, setNewSite] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. User ka data (websites ki list) load karein
  useEffect(() => {
    const userData = netlifyIdentity.currentUser()?.user_metadata;
    if (userData && userData.sites) {
      setSites(userData.sites);
    }
    setLoading(false);
  }, []);

  // 2. Logout function
  const handleLogout = () => {
    netlifyIdentity.logout();
  };

  // 3. Nayi site add karne ka function
  const handleAddSite = async () => {
    if (newSite.trim() === '') return;
    
    // --- Free Plan Limit ---
    if (sites.length >= 3) {
      setError('Free plan limit reached (3 sites). Please upgrade to Pro.');
      return;
    }

    const newSiteList = [...sites, newSite.trim()];
    setLoading(true);

    try {
      // Netlify Identity ko naya data save karne ke liye bolein
      await netlifyIdentity.currentUser().update({
        data: { sites: newSiteList }
      });
      
      // State update karein
      setSites(newSiteList);
      setNewSite('');
      setError('');
    } catch (err) {
      setError('Failed to add site. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 4. Site delete karne ka function
  const handleDeleteSite = async (siteToDelete) => {
    const newSiteList = sites.filter(site => site !== siteToDelete);
    setLoading(true);

    try {
      await netlifyIdentity.currentUser().update({
        data: { sites: newSiteList }
      });
      setSites(newSiteList);
    } catch (err) {
      setError('Failed to delete site. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container sx={{ mt: 5 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Your Dashboard
        </Typography>
        <Button color="error" variant="outlined" onClick={handleLogout}>
          Log Out
        </Button>
      </Box>
      
      {/* Site Add karne ka Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '16px' }}>
        <Typography variant="h6" gutterBottom>Add a new site to monitor</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="Enter website URL (e.g., google.com)"
            value={newSite}
            onChange={(e) => setNewSite(e.target.value)}
            variant="outlined"
          />
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleAddSite}
            disabled={loading}
            // FIX: '<Add />' ko '<Plus />' se badal diya gaya hai
            startIcon={loading ? <CircularProgress size={20} /> : <Plus />}
            sx={{ px: 4 }}
          >
            Add
          </Button>
        </Box>
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </Paper>

      {/* Sites ki List */}
      <Typography variant="h5" gutterBottom>Your Monitored Sites ({sites.length}/3)</Typography>
      {loading && sites.length === 0 && <CircularProgress />}
      
      <List>
        {sites.length === 0 && !loading && (
          <Typography color="text.secondary">You are not monitoring any sites yet.</Typography>
        )}
        {sites.map((site) => (
          <Paper key={site} sx={{ mb: 1, borderRadius: '8px' }}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSite(site)} disabled={loading}>
                  <Delete color="error" />
                </IconButton>
              }
            >
              <ListItemText 
                primary={site}
                // (Yahaan hum Phase 3 mein expiry date dikhaayenge)
                secondary="Status: Monitoring" 
              />
            </ListItem>
          </Paper>
        ))}
      </List>

    </Container>
  );
};

export default Dashboard;