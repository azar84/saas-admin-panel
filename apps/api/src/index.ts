import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { db, DesignSystemConfig } from './database';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Sample API endpoints
app.get('/api/users', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive' },
    ]
  });
});

app.get('/api/stats', (req, res) => {
  res.json({
    totalUsers: 1234,
    revenue: 45678,
    growth: 12.5,
    issues: 3
  });
});

app.get('/api/activity', (req, res) => {
  res.json({
    activities: [
      { id: 1, user: 'John Doe', action: 'created a new account', time: '2 minutes ago', status: 'success' },
      { id: 2, user: 'Jane Smith', action: 'updated profile', time: '5 minutes ago', status: 'primary' },
      { id: 3, user: 'Bob Johnson', action: 'deleted account', time: '10 minutes ago', status: 'error' },
    ]
  });
});

// Design System API endpoints
app.get('/api/design-system', async (req, res) => {
  try {
    const configs = await db.getAllConfigs();
    res.json(configs);
  } catch (error) {
    console.error('Error fetching design system configs:', error);
    res.status(500).json({ error: 'Failed to fetch design system configurations' });
  }
});

app.get('/api/design-system/:id', async (req, res) => {
  try {
    const config = await db.getConfigById(req.params.id);
    if (!config) {
      return res.status(404).json({ error: 'Design system configuration not found' });
    }
    res.json(config);
  } catch (error) {
    console.error('Error fetching design system config:', error);
    res.status(500).json({ error: 'Failed to fetch design system configuration' });
  }
});

app.get('/api/design-system/active/default', async (req, res) => {
  try {
    const configs = await db.getAllConfigs();
    const activeConfig = configs[0]; // Get the first (most recent) config
    if (!activeConfig) {
      return res.status(404).json({ error: 'No design system configuration found' });
    }
    res.json(activeConfig);
  } catch (error) {
    console.error('Error fetching active design system config:', error);
    res.status(500).json({ error: 'Failed to fetch active design system configuration' });
  }
});

app.post('/api/design-system', async (req, res) => {
  try {
    const config = req.body;
    const savedConfig = await db.saveConfig(config);
    res.json({ 
      success: true, 
      message: 'Design system configuration saved successfully',
      config: savedConfig
    });
  } catch (error) {
    console.error('Error saving design system config:', error);
    res.status(500).json({ error: 'Failed to save design system configuration' });
  }
});

app.put('/api/design-system/:id', async (req, res) => {
  try {
    const config = req.body;
    const updatedConfig = await db.updateConfig(req.params.id, config);
    if (!updatedConfig) {
      return res.status(404).json({ error: 'Design system configuration not found' });
    }
    res.json({ 
      success: true, 
      message: 'Design system configuration updated successfully',
      config: updatedConfig
    });
  } catch (error) {
    console.error('Error updating design system config:', error);
    res.status(500).json({ error: 'Failed to update design system configuration' });
  }
});

app.delete('/api/design-system/:id', async (req, res) => {
  try {
    const deleted = await db.deleteConfig(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Design system configuration not found' });
    }
    res.json({ 
      success: true, 
      message: 'Design system configuration deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting design system config:', error);
    res.status(500).json({ error: 'Failed to delete design system configuration' });
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
}); 